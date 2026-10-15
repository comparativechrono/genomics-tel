---
title: Drawing phylogenetic trees
topic: trees
lede: Draw a tree from Newick text with phylotree.js, or with d3 and a page of your own code, and turn it into an exercise. For outbreak trees, embed Nextstrain at a fixed date. Use Phylocanvas.gl only for very large trees.
description: How to draw phylogenetic trees in a teaching web page with phylotree.js, d3 and Phylocanvas.gl, work around two phylotree.js bugs, build a clade quiz that works by keyboard, and embed Nextstrain, with live examples.
---

## Which tree viewer to use

<div class="table-wrap" markdown="1">

| | phylotree.js | d3, by hand | Phylocanvas.gl | Nextstrain or Microreact |
|---|---|---|---|---|
| What it is | A tree library built on d3, drawing SVG | Your own code: a short Newick parser and d3's tree layout | A tree library that draws with WebGL | Outbreak websites, shown in an iframe |
| Download | 209 kB with underscore (66 kB compressed) | 280 kB for d3 (94 kB compressed) | 637 kB (176 kB compressed) | About 0.8 MB for Nextstrain, 2 MB for Microreact |
| Best for | Most pages: names as real text, and a menu to collapse, reroot and select | Quizzes, and trees that must be exactly right and work by keyboard | Trees with thousands of tips | Outbreaks, with a map, dates and metadata beside the tree |
| Limits | Two bugs to work around; its menu works by mouse only | 100 to 200 lines of code to look after | Needs WebGL; nothing for screen readers or keyboards | You control only what the address sets; both load their own analytics |
| Licence | MIT | ISC (d3) | MIT | Free to use; cite their papers |

</div>

Most examples use the same small tree, so that you can compare the tools: nine primates and the mouse, from a study that used the DNA around 2,030 ultraconserved elements, regions that have barely changed across distantly related species [1]. It is tree Tr49836 in TreeBASE, a Bayesian consensus tree whose branch lengths are substitutions per site and whose node labels are posterior probabilities, all 1.00. TreeBASE does not allow other websites to read its files, so the primate examples carry the Newick text in the page. The outbreak examples use Nextstrain's Zika virus dataset. All examples were tested on 15 October 2026 with phylotree.js 2.6.0, underscore 1.13.8, d3 7.9.0 and Phylocanvas.gl 1.64.1.

## A tree in a few lines

phylotree.js reads Newick text and draws the tree as SVG, so the names are real text that you can style, search, copy and print [2]. It needs the underscore library, loaded first, and a few lines of code.

{% include example.html file="examples/phylotree-basic.html" title="phylotree.js: a primate tree from Newick text" height="450" %}

How it works:

- **`new phylotree.phylotree(newick)`** reads the Newick text. It understands quoted names such as `'Homo sapiens'`.
- **`render()`** lays out the tree and builds the SVG, but does not put it on the page. `appendChild(tree.display.show())` does that.
- **`"fit-to-size"`** stretches the tree to the width and height you give. If the names do not fit, phylotree.js makes the font smaller, as it does on a phone.
- **`"show-scale": false`** turns off the built-in scale bar, which is wrong in this version ([see below](#work-around-two-bugs-in-phylotreejs-260)).
- **`nodeLabel()`** sets the text at each node. Here it turns `Homo_sapiens` into *Homo sapiens*.

To load a tree from another website, fetch its text first. The Open Tree of Life serves this same tree, with its branch lengths but without support values, and lets other websites read it [3]:

```js
fetch("https://api.opentreeoflife.org/v3/study/pg_2579/tree/tree5983.tre?tip_label=ot:ottTaxonName")
  .then(response => response.text())
  .then(newick => {
    const tree = new phylotree.phylotree(newick);   // then render() and show() as above
  });
```

A `.nwk` file stored next to your page on GitHub Pages works the same way.

## Let students collapse, reroot and search

phylotree.js has a menu on every internal node, with commands to collapse a clade, reroot, select branches and hide a subtree, and functions that do the same jobs from your own buttons. This example adds buttons, a search box that highlights species, and the workarounds for the two bugs described in the next section.

{% include example.html file="examples/phylotree-explore.html" title="Collapse, ladderise, reroot and search with phylotree.js" height="575" %}

The parts to reuse:

- **The menu** needs `phylotree-menus.css` from the package's `src` folder if your page does not use Bootstrap, and the tree's container needs `position: relative`. The menu closes only on a click inside the tree, so the example also closes it on Escape and on clicks elsewhere. It cannot be reached from the keyboard, which is why the buttons are there.
- **Collapsing**: `tree.mrca([...])` finds the most recent common ancestor of some species. Calling `toggleCollapse(node)` on `tree.display`, then `update()`, collapses or expands its clade. A collapsed clade is drawn as a grey shape with no label.
- **Ladderising**: `tree.resortChildren(compare)` sorts each node's branches; the example sorts them by number of tips.
- **Rerooting**: `tree.reroot(node)` puts the root halfway along the branch above that node. phylotree.js then throws the drawing away, builds a new one and sends a `reroot` event to the container, so anything set on the old drawing, such as `nodeLabel`, has to be set again (`setUp()` in the example).
- **Highlighting**: the `node-styler` function runs for every node at each redraw. Here it marks the tips whose names contain a search word.

## Work around two bugs in phylotree.js 2.6.0

Both bugs give wrong answers without any error message, which matters in a page meant to teach students to read trees. We found them in version 2.6.0, the latest release on 15 October 2026, and the same code was on the project's main branch on that date.

**The scale bar is too long.** phylotree.js places the nodes at 80% of the scale it uses for its scale bar (`scales[1]*.8` in `src/render/draw.js`), and with `"fit-to-size"` spacing its bar also ignores the room taken by the names. In our tests the bar was 1.17 times too long with the default spacing, and 1.65 to 1.91 times too long with `"fit-to-size"`, depending on the width. Turn it off with `"show-scale": false` and draw your own from the drawing itself: the distance in pixels from the root to a tip, divided by the sum of the branch lengths in between, gives pixels per unit. `drawScaleBar()` in the example does this, and its bar matched the branches exactly. Whatever you use, check the scale bar against one branch of known length.

**Rerooting moves support values onto the wrong branches.** Newick stores a support value as the label of the node below its branch. When phylotree.js reroots, it turns round the branches between the old root and the new one and moves their lengths, but it leaves each label on its node, so every support value on that path ends up one branch nearer the new root.

Every value in the primate tree is 1.00, so you cannot see this in it. The example therefore has a switch that gives the seven internal branches made-up values from 0.91 to 0.97, and counts how many are out of place after a reroot. Rooted on humans, six of the seven were on the wrong branch. Rooted on the mouse or the galago, with no labelled branch between them and the old root, none moved.

The example hides support values after a reroot unless the switch is on. You can also remove the reroot command from the menu (`reroot: false`), or reroot the tree with your own code before handing it to phylotree.js, as the next example does. When a new version comes out, the same switch shows whether the bug has been fixed.

{% include ad.html slot="in_article" %}

## Draw the tree yourself with d3

d3 has no tree format of its own, but it lays out any hierarchy, so a 20-line Newick parser and a few dozen lines of drawing code give you a tree [4]. You decide exactly what happens, which suits quizzes and anything that has to be correct. This example, about 120 lines of code in all, collapses clades by mouse or keyboard, ladderises, shows branch lengths, and reroots with every support value kept on its own branch. The same made-up values let you check.

{% include example.html file="examples/d3-tree.html" title="A tree drawn with d3, with correct rerooting" height="540" %}

How it works:

- **Reading Newick.** `parseNewick()` splits the text at brackets, commas, colons and semicolons, and builds nested objects. Each node's `length` and `support` describe the branch above it. It does not handle quoted names; use a library's parser for those.
- **Layout.** `d3.hierarchy` turns the objects into a tree, and `d3.cluster` spaces the tips evenly down the page. The horizontal position of a node is the sum of the branch lengths from the root.
- **The scale bar** is an axis drawn with the same `x` scale as the branches, so the two cannot disagree.
- **Rerooting.** `reroot()` builds the tree again outwards from the middle of the chosen branch, and each branch carries its own length and support value with it. We rerooted on each of the ten species in turn: all seven made-up values stayed on their branches, and all 45 distances between pairs of species were unchanged.
- **Keyboard.** Node circles have `tabindex="0"` and `role="button"`, and respond to Enter and Space. After each redraw, focus goes back to the same node.
- **A text version.** The same tree as nested lists sits under the drawing, for screen readers and for copying.

## Turn the tree into a clade quiz

The quiz asks six questions about the primate tree. Students answer by selecting species on the tree with a mouse or the keyboard, and the page explains each wrong answer. Several wrong answers are traps for well-known misreadings of trees, which the [educators' page](../../educators/trees/#where-students-go-wrong) describes.

{% include example.html file="examples/clade-quiz.html" title="Activity: a clade quiz that works by mouse and keyboard" height="660" caption="The tree is drawn as a cladogram: it shows the order of branching, and its branch lengths mean nothing." %}

The parts to reuse:

- **Questions are data.** Each entry in `QUESTIONS` has its text, the right answer as a list of species, and feedback for particular wrong answers. Change the tree and the list to make a quiz of your own.
- **Tips are checkboxes.** Each name has `role="checkbox"`, `aria-checked` and `tabindex="0"`, so students can reach it with Tab and select it with Space, and screen readers say whether it is selected.
- **Checking a clade.** `mrca()` walks up from one selected species until it reaches a node that is an ancestor of all of them. If that node has more descendants than were selected, the selection is not a clade, and the page shades the clade that contains them.
- **Rotating** a node reverses the order of its branches. The relationships do not change, which is the point of the last question.
- **A cladogram.** `d3.cluster` with a horizontal size lines the tips up, so students judge the tree by its branching alone.

## Embed Nextstrain at a fixed date

Nextstrain shows outbreak trees together with a map, dates and the data behind them [5], and its pages can be shown inside yours in an iframe. Add `@` and a date to a dataset's address and Nextstrain serves the dataset as it was on that date, so the tree does not change during your course. On 15 October 2026, `nextstrain.org/zika` had 1,045 genomes, updated four days earlier; `nextstrain.org/zika@2024-01-01` had 972, built on 8 December 2023.

{% include example.html file="examples/nextstrain-embed.html" title="Nextstrain's Zika virus tree, fixed at 1 January 2024" height="630" load="click" note="This example opens nextstrain.org inside the page (about 0.8 MB). Nextstrain's pages load Plausible Analytics." %}

The rest of the address sets the view. These settings come from [Auspice's documentation](https://docs.nextstrain.org/projects/auspice/en/stable/advanced-functionality/view-settings.html):

<div class="table-wrap" markdown="1">

| To do this | Add to the address |
|---|---|
| Fix the dataset at a date | `@2024-01-01` after the dataset's name |
| Choose the panels | `d=tree` or `d=tree,map` |
| Colour by a field | `c=region`, `c=country` |
| Put divergence, not time, on the horizontal axis | `m=div` |
| Change the layout | `l=radial`, `l=unrooted`, `l=clock` |
| Keep only some samples | `f_region=Oceania` |
| Hide the header and footer, for an iframe | `onlyPanels` |
| Close the side bar or the legend | `sidebar=closed`, `legend=closed` |

</div>

Microreact can be framed in the same way [6]. `https://microreact.org/project/zika-virus?tt=rc` opens a project of 26 Zika virus genomes with a map, a rectangular tree and a timeline. It downloads about 2 MB and loads two analytics services. Microreact does not let other websites read its project data, so you can embed or link a project but not draw its tree yourself.

## Draw a Nextstrain dataset yourself

The same address returns the dataset as JSON when it is asked for JSON, and Nextstrain lets other websites read it. The tree is already nested, so d3 can draw it without a parser. Here each node is placed at its date, which is the sampling date for a genome and an estimate for an ancestor, so the tree is a time tree.

{% include example.html file="examples/nextstrain-d3.html" title="The Zika virus dataset drawn with d3" height="620" %}

How it works:

- **The request** sends one header, `Accept: application/json`, which browsers allow without asking the server first. Any other header makes the browser send a pre-flight request, and Nextstrain's reply to that lacks the header that lets other websites read it, so the request fails.
- **The data.** `tree` holds nested `children`. Each node's `node_attrs` has `num_date` (the date as a decimal year), `div` (divergence from the root), `country` and `region`. Nextstrain also estimates dates for the ancestors.
- **Colour.** Seven colours are hard to tell apart, so the menu picks out one region and greys out the rest. The counts for each region are written under the tree.

## Use Phylocanvas.gl for very large trees

SVG makes every branch and name a separate element on the page. For trees with thousands of tips, Phylocanvas.gl draws on a WebGL canvas instead, with five layouts and zooming. Microreact's tree panel is drawn with it. This example draws the 972 Zika virus genomes from the same dataset.

{% include example.html file="examples/phylocanvas-large.html" title="972 Zika virus genomes drawn by Phylocanvas.gl" height="590" load="click" note="This example downloads Phylocanvas.gl and the Nextstrain dataset (about 0.35 MB in all), and needs a browser that can draw WebGL." %}

How it works:

- **`new phylocanvas.PhylocanvasGL(element, settings, plugins)`** draws the tree. It takes Newick text as `source`, so `toNewick()` converts Nextstrain's JSON, with branch lengths in years.
- **Tip names are IDs.** They must be unique (a few repeat in this dataset), and `styles` gives each ID its own colour.
- **`setTreeType()`** switches between the rectangular, circular and radial layouts. `interactive: true` turns on zooming with the mouse wheel and moving by dragging, so the canvas takes over scrolling while the pointer is on it.
- **Without WebGL**, as on some locked-down or remote desktops, the canvas stays blank apart from the Phylocanvas logo, with one error in the console. The example checks first and says so instead.

## Things that catch people out

- **Support values belong to branches.** Newick writes them as node labels, so any code that reroots a tree has to move them with their branches. Test a library with made-up values before you trust it.
- **Scale bars.** Measure a branch of known length against the scale bar before you publish a tree.
- **Roots that mean nothing.** Newick nests every tree in brackets, so a file always looks rooted, even when the method that made it cannot place a root. The TreeBASE file marks this tree as rooted (`[&R]`). Root a tree on an outgroup before students read clades from it, or tell them the root means nothing.
- **Names.** Names with spaces or punctuation must be in single quotes. The 20-line parser does not handle quotes; phylotree.js does. In unquoted names, underscores stand for spaces.
- **Phones.** Species names can take half the width of a phone screen. The examples size the tree to the page, and phylotree.js shrinks the font when the names do not fit.
- **Screen readers and keyboards.** phylotree.js puts the names on the page as text, but its menu and tips cannot be reached from the keyboard. Phylocanvas.gl draws on a canvas, so a screen reader finds nothing to read. Give a text version and keyboard controls, as the d3 examples do. See [accessibility](../accessibility/).
- **Datasets change.** Nextstrain's live builds change as genomes arrive, so teach from a dated address. Microreact projects belong to their owners, who can change or delete them.
- **Reading files from other websites.** TreeBASE does not allow it, so copy the Newick text into your page or host the file next to it. The Open Tree of Life API, Nextstrain and GitHub Pages all allow it.
- **Versions.** Each example names an exact version of its library. phylotree.js released versions 2.2 to 2.6 between December 2025 and March 2026; when you update, check the scale bar and rerooting again.

## Licences and credits

phylotree.js, Phylocanvas.gl and underscore are under the MIT licence, and d3 under the ISC licence. If you publish teaching material built on them, cite phylotree.js [2] and d3 [4]; for Nextstrain and Microreact, cite their papers [5, 6] and the groups who shared the data, whom Nextstrain names with each dataset. The primate tree comes from Faircloth and colleagues [1] and is deposited in TreeBASE as study S12156 ([trees for that study](https://treebase.org/treebase-web/search/study/trees.html?id=12156)). TreeBASE's files carry an acknowledgement but name no licence, so the examples give the full citation with the tree. The Open Tree of Life holds the same tree as study pg_2579 [3].

## References

{: .references}
1. Faircloth BC, McCormack JE, Crawford NG, Harvey MG, Brumfield RT, Glenn TC (2012). Ultraconserved elements anchor thousands of genetic markers spanning multiple evolutionary timescales. *Systematic Biology* 61(5): 717–726. [doi:10.1093/sysbio/sys004](https://doi.org/10.1093/sysbio/sys004)
2. Shank SD, Weaver S, Kosakovsky Pond SL (2018). phylotree.js: a JavaScript library for application development and interactive data visualization in phylogenetics. *BMC Bioinformatics* 19: 276. [doi:10.1186/s12859-018-2283-2](https://doi.org/10.1186/s12859-018-2283-2)
3. Hinchliff CE, Smith SA, Allman JF, et al. (2015). Synthesis of phylogeny and taxonomy into a comprehensive tree of life. *PNAS* 112(41): 12764–12769. [doi:10.1073/pnas.1423041112](https://doi.org/10.1073/pnas.1423041112)
4. Bostock M, Ogievetsky V, Heer J (2011). D³: data-driven documents. *IEEE Transactions on Visualization and Computer Graphics* 17(12): 2301–2309. [doi:10.1109/TVCG.2011.185](https://doi.org/10.1109/TVCG.2011.185)
5. Hadfield J, Megill C, Bell SM, et al. (2018). Nextstrain: real-time tracking of pathogen evolution. *Bioinformatics* 34(23): 4121–4123. [doi:10.1093/bioinformatics/bty407](https://doi.org/10.1093/bioinformatics/bty407)
6. Argimón S, Abudahab K, Goater RJE, et al. (2016). Microreact: visualizing and sharing data for genomic epidemiology and phylogeography. *Microbial Genomics* 2(11): e000093. [doi:10.1099/mgen.0.000093](https://doi.org/10.1099/mgen.0.000093)
