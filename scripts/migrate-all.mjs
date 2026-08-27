// Migrates GitBook-style plugin docs (living in each plugin repo's docs/) into the
// Starlight content collection, and regenerates the sidebar from each SUMMARY.md.
//
//   node scripts/migrate-all.mjs
//
// For every plugin below whose source docs/ dir exists, it:
//   * copies docs/**.md  ->  src/content/docs/plugins/<slug>/
//   * README.md          ->  index.md (directory index)
//   * adds frontmatter    (title lifted from the first `# H1`, description from first paragraph)
//   * strips that H1 from the body (Starlight renders the title itself)
//   * rewrites relative *.md links to final Starlight URLs (/plugins/<slug>/.../)
//   * builds that plugin's sidebar group from SUMMARY.md
// Finally writes the complete sidebar to src/sidebar.json (imported by astro.config.mjs).

import {
  readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync, rmSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)); // site repo root
const DOCS = join(ROOT, 'src/content/docs');

// Master list — order here is the sidebar order. DzusillCore (framework) first.
const PLUGINS = [
  { slug: 'dzusillcore',   name: 'DzusillCore',   src: '../DzusillCore/docs' },
  { slug: 'dstattrack',    name: 'dStattrack',    src: '../bStattrack/docs' },
  { slug: 'warpgui',       name: 'WarpGUI',       src: '../warpgui/docs' },
  { slug: 'dhomegui',      name: 'dHomeGUI',      src: '../dHomeGUI/docs' },
  { slug: 'dnicks',        name: 'dNicks',        src: '../dNicks/docs' },
  { slug: 'dbloodmoney',   name: 'dBloodMoney',   src: '../dbloodmoney/docs' },
  { slug: 'dkilltracker',  name: 'dKillTracker',  src: '../dKillTracker/docs' },
  { slug: 'dfate',         name: 'dFate',         src: '../dFate/docs' },
  { slug: 'toolsnotifier', name: 'ToolsNotifier', src: '../ToolNotifier/docs' },
  // The dzusill-branded successors to the Oberon originals. Both are listed: the Oberon pages stay
  // for the servers still running them, and these document the rebuilt plugins, which have since
  // diverged (dLive gained saved links and the skin face; dAnnounce, its own preset library).
  { slug: 'dlive',         name: 'dLive',         src: '../dLive/docs' },
  { slug: 'dannounce',     name: 'dAnnounce',     src: '../dAnnounce/docs' },
  { slug: 'ddeathpenalty', name: 'dDeathPenalty', src: '../DeathPenalty/docs' },
  { slug: 'dlottery',      name: 'dLottery',      src: '../dLottery/docs' },
  // BasicLand.cz build of the same lottery — kept right after the general-purpose one.
  { slug: 'blottery',      name: 'bLottery',      src: '../bLottery2/docs' },
  { slug: 'dmentions',     name: 'dMentions',     src: '../DzMentions/docs' },
  { slug: 'drotatingshop', name: 'DRotatingShop', src: '../DRotatingShop/docs' },
  // Sits right after the shop it derives its sell prices from.
  { slug: 'ddonutworth',   name: 'dDonutWorth',   src: '../dDonutWorth/docs' },
  { slug: 'dgems',         name: 'dGems',         src: '../dGems/docs' },
  // dFactions source lives in docs-site/ (the plugin repo's docs/ holds a separate Jekyll site).
  { slug: 'dfactions',     name: 'dFactions',     src: '../dFactions/docs-site' },
  // The Phalanx stack: linking first (dPhalanx and dStore both build on it), then the rest.
  { slug: 'dweblink',      name: 'dWebLink',      src: '../dWebLink/docs' },
  { slug: 'dphalanx',      name: 'dPhalanx',      src: '../dPhalanx/docs' },
  { slug: 'dstore',        name: 'dStore',        src: '../dStore/docs' },
  { slug: 'ddialogs',      name: 'DDialogs',      src: '../DDialogs/docs' },
  // The Oberon suite's own docs are written straight into this site (see IN_PLACE) — these four are
  // the exception: their docs live with the plugin, so they are migrated like everything else.
  { slug: 'oberonstats',   name: 'OberonStats',   src: '../OberonStats/docs' },
  { slug: 'oberonannounce', name: 'OberonAnnounce', src: '../OberonAnnounce/docs' },
  { slug: 'oberontools',   name: 'OberonTools',   src: '../OberonTools/docs' },
  // Sits with the shop plugins rather than the Oberon block: it is the selling half of that economy.
  { slug: 'oberonsell',    name: 'OberonSell',    src: '../OberonSell/docs' },
  // The buying half, and the PerfShop replacement.
  { slug: 'oberonshop',    name: 'OberonShop',    src: '../OberonShop/docs' },
  // The dzusill-branded successors to OberonSell and OberonShop, kept beside them for the same
  // reason as dLive above: the Oberon pages still serve the servers running those builds.
  { slug: 'dsell',         name: 'dSell',         src: '../dSell/docs' },
  { slug: 'dshop',         name: 'dShop',         src: '../dShop/docs' },
  { slug: 'dloyalityrewards', name: 'dLoyalityRewards', src: '../dLoyalityRewards/docs' },
];

// Plugins whose pages are written directly into src/content/docs/plugins/<slug>/ rather than
// migrated from a repo's docs/. They have no source dir to build a sidebar group from, so their
// existing group is carried over from the current sidebar.json — which is also what stops this
// script from deleting them, as it silently did before.
//
// ddialogs is here despite having a docs/ dir: that dir holds 5 pages while the site holds 22, the
// rest written straight into the site. Migrating it would delete the other 17.
const IN_PLACE = [
  'oberonchat', 'oberonkills', 'oberonmob', 'oberonmsg', 'oberonstaff', 'oberonwhitelist', 'oberonutils',
  'ddialogs',
];

// --sidebar-only regroups the existing sidebar and touches no page.
//
// Worth knowing before running this script without it: a full run rewrites every migrated plugin's
// pages from its repo's docs/, so any edit made to the site copy afterwards is reverted. Several
// plugins have such edits. Unless you have just changed a source docs/ dir, --sidebar-only is the
// one you want.
const SIDEBAR_ONLY = process.argv.includes('--sidebar-only');

// Sidebar categories. Order here is the order they appear; order within each list is the order
// plugins appear inside the category. A plugin missing from every list lands in Miscellaneous, so
// adding a plugin above without touching this still produces a working sidebar.
const CATEGORIES = [
  { label: '🛠️ Framework', plugins: ['dzusillcore', 'ddialogs'] },
  { label: '🌙 Oberon Suite', plugins: ['oberonutils', 'oberonchat', 'oberonannounce', 'oberontools', 'oberonmsg', 'oberonstaff', 'oberonwhitelist', 'oberonkills', 'oberonmob', 'oberonstats'] },
  { label: '💰 Economy & Shops', plugins: ['dshop', 'drotatingshop', 'oberonshop', 'dsell', 'ddonutworth', 'oberonsell', 'dgems', 'dstore', 'dlottery', 'blottery', 'dloyalityrewards'] },
  { label: '⚔️ PvP & Combat', plugins: ['dfactions', 'dkilltracker', 'dbloodmoney', 'ddeathpenalty', 'dfate'] },
  { label: '🧭 Teleportation', plugins: ['warpgui', 'dhomegui'] },
  { label: '💬 Chat & Social', plugins: ['dnicks', 'dmentions', 'dlive', 'dannounce'] },
  { label: '🔗 Web & Integrations', plugins: ['dweblink', 'dphalanx'] },
  { label: '🧰 Tools & Utilities', plugins: ['dstattrack', 'toolsnotifier'] },
];
const MISC_LABEL = '📦 Miscellaneous';

// Emoji prefixes for the sidebar — one per plugin, per section header, and the intro item.
const PLUGIN_EMOJI = {
  dzusillcore: '🛠️', dstattrack: '📊', warpgui: '🧭', dhomegui: '🏠',
  dnicks: '🎨', dbloodmoney: '💰', toolsnotifier: '🔔', ddeathpenalty: '💀',
  dlottery: '🎰', drotatingshop: '🛒', dfactions: '⚔️', dkilltracker: '🗡️', dfate: '🔮',
  ddonutworth: '🍩', ddialogs: '💬', blottery: '🍀', dmentions: '🙋',
  dgems: '💎', dweblink: '🔗', dphalanx: '🌐', dstore: '🧾',
  oberonstats: '📈', oberonannounce: '📣', oberontools: '🪣', oberonsell: '🏷️',
  oberonshop: '🏪',
  dlive: '📡', dannounce: '📣', dsell: '🏷️', dshop: '🏪', dloyalityrewards: '🎁',
};
const SECTION_EMOJI = {
  'getting started': '🚀', 'features': '✨', 'configuration': '⚙️', 'reference': '📖',
  'core concepts': '🧠', 'messages & colors': '💬', 'commands': '⌨️', 'guis': '🖼️',
  'events': '📡', 'integrations': '🔌', 'nms & multi-version': '🧬', 'storage': '🗃️',
  'database': '🗄️', 'utilities': '🧰', 'testing': '🧪', 'credits': '❤️',
};
const sectionEmoji = (label) => SECTION_EMOJI[label.toLowerCase()] ?? '📂';
const introEmoji = (label) => (/^(introduction|overview)$/i.test(label) ? '📘 ' : '');

const walk = (dir) => readdirSync(dir).flatMap((e) => {
  const p = join(dir, e);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

const isReadme = (base) => /^readme\.md$/i.test(base);

// source relpath (posix, relative to docs/) -> page slug under src/content/docs (lowercased,
// no extension, README -> its directory index). '' === plugin root index.
function slugForRel(rel) {
  let p = rel.replace(/\\/g, '/').toLowerCase();
  if (isReadme(posix.basename(p))) p = posix.dirname(p); // README -> dir
  else p = p.replace(/\.md$/i, '');
  if (p === '.' || p === '/') p = '';
  return p.replace(/^\/+|\/+$/g, '');
}

const urlFor = (slug, rel) => {
  const s = slugForRel(rel);
  return `/plugins/${slug}${s ? '/' + s : ''}/`;
};

function titleFromBody(body) {
  const m = body.match(/^[ \t]*#[ \t]+(.+?)[ \t]*$/m);
  return m ? m[1].trim() : null;
}

function stripFirstH1(body) {
  return body.replace(/^[ \t]*#[ \t]+.+?[ \t]*$\n?/m, '');
}

function descFromBody(body) {
  const lines = body.split('\n');
  let inFence = false;
  for (let raw of lines) {
    const line = raw.trim();
    if (line.startsWith('```')) { inFence = !inFence; continue; }
    if (inFence || !line) continue;
    // skip headings, blockquotes, tables, list markers, ordered lists, html — but NOT **bold** text
    if (/^(#{1,6}\s|>|\||[-*+]\s|\d+\.\s|<)/.test(line)) continue;
    let t = line
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links/images -> text
      .replace(/[`*_~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (t.length < 3) continue;
    if (t.length > 160) t = t.slice(0, 157).replace(/\s+\S*$/, '') + '…';
    return t;
  }
  return null;
}

function rewriteLinks(body, slug, fileRel) {
  const baseDir = posix.dirname(fileRel.replace(/\\/g, '/'));
  return body.replace(/\]\(([^)]+)\)/g, (full, target) => {
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(target)) return full;
    const hashAt = target.indexOf('#');
    const path = hashAt >= 0 ? target.slice(0, hashAt) : target;
    const hash = hashAt >= 0 ? target.slice(hashAt) : '';
    if (!/\.md$/i.test(path)) return full;
    const resolved = posix.normalize(posix.join(baseDir, path));
    return `](${urlFor(slug, resolved)}${hash})`;
  });
}

function migrateFiles(plugin, srcDir) {
  const destBase = join(DOCS, 'plugins', plugin.slug);
  rmSync(destBase, { recursive: true, force: true });
  const files = walk(srcDir).filter((f) => {
    const b = posix.basename(f).toUpperCase();
    // SUMMARY becomes the sidebar; SPIGOTMC_UPDATE is release-post copy, not docs.
    return b.endsWith('.MD') && b !== 'SUMMARY.MD' && b !== 'SPIGOTMC_UPDATE.MD';
  });
  for (const abs of files) {
    const rel = posix.relative(srcDir.replace(/\\/g, '/'), abs.replace(/\\/g, '/'));
    let body = readFileSync(abs, 'utf8').replace(/^﻿/, '');
    let title = titleFromBody(body);
    if (title) body = stripFirstH1(body);
    if (!title) {
      const s = slugForRel(rel);
      title = s
        ? s.split('/').pop().replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        : plugin.name;
    }
    const desc = descFromBody(body) || `${plugin.name} documentation`;
    body = rewriteLinks(body, plugin.slug, rel).replace(/^\s+/, '');
    const fm = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(desc)}\n---\n\n`;
    const destRel = isReadme(posix.basename(rel))
      ? posix.join(posix.dirname(rel), 'index.md').replace(/^\.\//, '')
      : rel;
    const destPath = join(destBase, destRel === 'index.md' || destRel === '.' ? 'index.md' : destRel);
    mkdirSync(dirname(destPath), { recursive: true });
    writeFileSync(destPath, fm + body.trimEnd() + '\n');
  }
  return files.length;
}

// Parse SUMMARY.md -> Starlight sidebar group for this plugin.
function buildSidebarGroup(plugin, srcDir) {
  const summaryPath = join(srcDir, 'SUMMARY.md');
  const emoji = PLUGIN_EMOJI[plugin.slug] ?? '📦';
  const group = { label: `${emoji} ${plugin.name}`, collapsed: true, items: [] };
  if (!existsSync(summaryPath)) {
    group.items.push({ label: '📘 Overview', slug: `plugins/${plugin.slug}` });
    return group;
  }
  const lines = readFileSync(summaryPath, 'utf8').split('\n');
  let current = null; // current sub-group, or null = top-level items of the plugin group
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      const name = h2[1].trim();
      current = { label: `${sectionEmoji(name)} ${name}`, items: [] };
      group.items.push(current);
      continue;
    }
    const item = line.match(/^\s*[-*]\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (item) {
      const label = item[1].trim();
      const slug = (`plugins/${plugin.slug}/` + slugForRel(item[2])).replace(/\/$/, '');
      // Plugin groups get an emoji; the intro item too; leaf pages stay clean.
      const displayLabel = current ? label : `${introEmoji(label)}${label}`;
      (current ? current.items : group.items).push({ label: displayLabel, slug });
    }
  }
  // drop empty sub-groups
  group.items = group.items.filter((it) => !it.items || it.items.length);
  return group;
}

// The sidebar that is about to be replaced, keyed by slug. Used to carry over the groups this
// script cannot build: the in-place plugins, whose page order is curated by hand and exists
// nowhere else.
function previousGroupsBySlug() {
  const file = join(ROOT, 'src/sidebar.json');
  if (!existsSync(file)) return new Map();
  const bySlug = new Map();
  // A plugin group always has a direct child carrying the plugin's own slug (its Introduction);
  // a category never does, its children are plugin groups. Matching on a *direct* child rather than
  // the first slug found anywhere is what keeps a re-run over an already-categorised file from
  // mistaking the whole category for its first plugin — which silently dropped every other plugin
  // group in that category.
  const directSlug = (node) => (node.items ?? []).map((child) => child.slug).find(Boolean);
  const visit = (nodes) => {
    for (const node of nodes) {
      if (!node.items) continue;
      const match = directSlug(node)?.match(/^plugins\/([^/]+)/);
      if (match) bySlug.set(match[1], node);
      else visit(node.items);
    }
  };
  try {
    visit(JSON.parse(readFileSync(file, 'utf8')));
  } catch {
    console.log('note: could not parse the existing sidebar.json; in-place plugins will be dropped');
  }
  return bySlug;
}

const previous = previousGroupsBySlug();
const groups = new Map(); // slug -> sidebar group
let total = 0;

if (SIDEBAR_ONLY) {
  for (const [slug, group] of previous) groups.set(slug, group);
  console.log(`sidebar-only: regrouping ${groups.size} plugins, no pages touched\n`);
} else {
  for (const p of PLUGINS) {
    const srcDir = join(ROOT, p.src);
    if (!existsSync(srcDir) || !existsSync(join(srcDir, 'README.md'))) {
      console.log(`skip ${p.slug.padEnd(14)} (no docs yet at ${p.src})`);
      continue;
    }
    if (IN_PLACE.includes(p.slug)) {
      console.log(`skip ${p.slug.padEnd(14)} (in-place: migrating would delete its site-only pages)`);
      continue;
    }
    const n = migrateFiles(p, srcDir);
    groups.set(p.slug, buildSidebarGroup(p, srcDir));
    total += n;
    console.log(`ok   ${p.slug.padEnd(14)} ${n} pages`);
  }

  for (const slug of IN_PLACE) {
    const carried = previous.get(slug);
    if (carried) {
      groups.set(slug, carried);
      console.log(`keep ${slug.padEnd(14)} (authored in place)`);
    } else {
      console.log(`WARN ${slug.padEnd(14)} listed as in-place but absent from the current sidebar`);
    }
  }
}

const sidebar = [{ label: '👋 Welcome', link: '/' }];
const placed = new Set();
for (const category of CATEGORIES) {
  const items = category.plugins.map((slug) => groups.get(slug)).filter(Boolean);
  category.plugins.forEach((slug) => groups.has(slug) && placed.add(slug));
  if (items.length) sidebar.push({ label: category.label, collapsed: true, items });
}
// Anything not named in CATEGORIES still reaches the sidebar rather than vanishing.
const leftovers = [...groups.keys()].filter((slug) => !placed.has(slug));
if (leftovers.length) {
  sidebar.push({ label: MISC_LABEL, collapsed: true, items: leftovers.map((slug) => groups.get(slug)) });
  console.log(`\nuncategorised (went to Miscellaneous): ${leftovers.join(', ')}`);
}

writeFileSync(join(ROOT, 'src/sidebar.json'), JSON.stringify(sidebar, null, 2) + '\n');
console.log(`\nwrote src/sidebar.json (${groups.size} plugins in ${sidebar.length - 1} categories), ${total} pages total`);
