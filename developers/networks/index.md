---
title: Drawing networks with Cytoscape.js
topic: networks
lede: Draw pathways and protein networks in a teaching page with Cytoscape.js, load them from STRING or Cytoscape desktop, and give every picture a text version. Where a node sits means nothing unless you make it mean something, so say what the layout does.
description: How to draw interactive biological networks with Cytoscape.js 3.34.3, including a pathway with a source for every interaction, a step-by-step reveal, networks from the STRING API and Cytoscape desktop, layouts, PNG export and tables for screen readers, with live examples.
---

## Which starting point to use

<div class="table-wrap" markdown="1">

| <span class="visually-hidden">Feature</span> | Write the network in the page | Ask the STRING API | Export from Cytoscape desktop |
|---|---|---|---|
| What it is | Nodes and edges typed into the page's code | A live request for the links among proteins you name | A network file and a style file saved from the desktop program |
| Best for | Pathways you teach, where every arrow needs a source | What is known about a set of proteins, and the evidence for each link | Networks you have already arranged and styled by hand |
| Limits | You check every interaction yourself | Functional and physical links have no direction, and the page needs STRING to answer during the class | Some styling is lost, and the file is a snapshot |
| Licence | Yours | STRING data: CC BY 4.0 | Yours |

</div>

All three are drawn with Cytoscape.js, an open-source library for drawing networks in a web page [1]. It is one script of 435 kB (about 135 kB compressed) and needs no build step. The data come from STRING [2] and from Cytoscape desktop [3].

The examples below all use proteins of the p53 pathway, so you can compare the approaches on the same molecules. They were tested on 15 October 2026 with Cytoscape.js 3.34.3, cytoscape-dagre 4.0.1, cytoscape-fcose 2.2.0 and STRING 12.5.

## Start with a small network

One script tag and one call to `cytoscape()` give you a network. The call takes a container and three things: the elements, a style and a layout.

{% include example.html file="examples/cytoscape-basic.html" title="Four proteins in Cytoscape.js" height="370" %}

How it works:

- **Elements** are nodes and edges, each with a `data` object. A node needs a unique `id`. An edge needs a `source` and a `target`, which are node ids. Any other field, such as `label` or `effect`, is yours to use.
- **The style** is a list of rules, like CSS. The selector `node` picks every node, and `edge[effect = "inhibits"]` picks the edges whose data say so. `data(label)` reads a field.
- **The layout** places the nodes. `cose`, which is built in, pulls linked nodes together and pushes all nodes apart. Also built in are `grid`, `circle`, `concentric`, `breadthfirst`, `random`, and `preset`, which uses positions you supply.
- **The container** needs a height in CSS. Without one, the network does not appear at all.
- **The mouse wheel** zooms the network unless you set `userZoomingEnabled: false`, which lets the wheel scroll the page instead. That suits a small diagram that already fits its box.

## Draw a pathway with a source for every interaction

In a teaching diagram, each arrow is a claim, so each needs a source. This example draws the response to DNA damage through ATM, CHK2 and p53, including the negative feedback loop between p53 and MDM2. Each of its 12 interactions links to the papers that support it. Click a molecule to read what it does and where the evidence comes from; everything not connected to it fades.

{% include example.html file="examples/p53-pathway.html" title="The p53–MDM2 feedback loop, with a source for each interaction" height="615" caption="The table under the diagram holds the same information as text. Open it with the arrow beside its title." %}

How the code works:

- **One set of data.** Two lists, `nodes` and `edges`, hold everything. Each edge has an `effect` (activates or inhibits), a `mech` (how it acts) and `refs` (PubMed IDs). The diagram, the details panel and the table are all built from these lists, so they cannot disagree.
- **Style from data.** Edges that inhibit end in a flat bar (`tee`) instead of an arrowhead, and edges that switch on a gene are dashed. The colours are blue and vermilion rather than green and red, and the shapes and line styles carry the same meaning, so the diagram still reads in greyscale and for colour-blind readers [4].
- **The layout** is `dagre`, from the cytoscape-dagre extension. It puts the nodes in rows that follow the arrows, so DNA damage is at the top and the outcomes are at the bottom.
- **Clicks.** `cy.on("tap", "node", …)` runs when a node is clicked or tapped. `node.closedNeighborhood()` returns the node with its edges and neighbours, and everything else gets a `faded` class.
- **Filters.** Unticking a mechanism adds a `filtered` class to those edges, and a style rule hides that class with `display: none`.
- **Keyboard.** Nobody can move to a node on a canvas with the Tab key, so each molecule also has a real button that does the same as clicking it.

The interactions and the papers that support them, each checked in PubMed:

<div class="table-wrap" markdown="1">

| Interaction | What happens | Sources |
|---|---|---|
| DNA damage activates ATM | ATM molecules phosphorylate each other on serine 1981, and the inactive dimers separate | [Bakkenist and Kastan 2003](https://pubmed.ncbi.nlm.nih.gov/12556884/) |
| ATM activates CHK2 | Phosphorylation of threonine 68 | [Matsuoka et al. 2000](https://pubmed.ncbi.nlm.nih.gov/10973490/) |
| ATM activates p53 | Phosphorylation of serine 15 | [Banin et al. 1998](https://pubmed.ncbi.nlm.nih.gov/9733514/), [Canman et al. 1998](https://pubmed.ncbi.nlm.nih.gov/9733515/) |
| CHK2 activates p53 | Phosphorylation of serine 20, which stabilises p53 | [Hirao et al. 2000](https://pubmed.ncbi.nlm.nih.gov/10710310/), [Chehab et al. 2000](https://pubmed.ncbi.nlm.nih.gov/10673500/) |
| ATM inhibits MDM2 | Phosphorylation of serine 395, which reduces the degradation of p53 | [Maya et al. 2001](https://pubmed.ncbi.nlm.nih.gov/11331603/) |
| p53 activates MDM2 | p53 switches on the MDM2 gene | [Barak et al. 1993](https://pubmed.ncbi.nlm.nih.gov/8440237/), [Wu et al. 1993](https://pubmed.ncbi.nlm.nih.gov/8319905/) |
| MDM2 inhibits p53 | MDM2 binds p53, blocks its activity and tags it with ubiquitin for degradation | [Momand et al. 1992](https://pubmed.ncbi.nlm.nih.gov/1535557/), [Haupt et al. 1997](https://pubmed.ncbi.nlm.nih.gov/9153395/), [Kubbutat et al. 1997](https://pubmed.ncbi.nlm.nih.gov/9153396/), [Honda et al. 1997](https://pubmed.ncbi.nlm.nih.gov/9450543/) |
| p53 activates p21 | p53 switches on the gene for p21 (CDKN1A) | [el-Deiry et al. 1993](https://pubmed.ncbi.nlm.nih.gov/8242752/) |
| p21 inhibits CDK2–cyclin E | p21 binds and inhibits the G1 cyclin-dependent kinases | [Harper et al. 1993](https://pubmed.ncbi.nlm.nih.gov/8242751/) |
| CDK2–cyclin E activates the G1/S transition | Cyclin E is needed for the cell to enter S phase | [Ohtsubo et al. 1995](https://pubmed.ncbi.nlm.nih.gov/7739542/) |
| p53 activates BAX | p53 switches on the BAX gene directly | [Miyashita and Reed 1995](https://pubmed.ncbi.nlm.nih.gov/7834749/) |
| BAX activates apoptosis | BAX speeds up programmed cell death | [Oltvai et al. 1993](https://pubmed.ncbi.nlm.nih.gov/8358790/) |

</div>

To draw another pathway, replace the two lists and keep the same fields. Check each interaction against a primary paper, and keep the PubMed IDs with the data, so that students and colleagues can check them too. If a pathway grows much bigger, consider splitting it into several diagrams [4].

{% include ad.html slot="in_article" %}

## Turn the pathway into a step-by-step activity

A whole pathway is a lot to take in at once. Revealing it a step at a time, with a question to answer before each step, lets students predict what comes next and build up the picture in a sensible order. The [educators' page](../../educators/networks/#walk-through-a-feedback-loop) describes how to run it in class.

{% include example.html file="examples/p53-step-by-step.html" title="The feedback loop, one step at a time" height="630" %}

What the code does:

- **Positions come first.** The layout runs once on the whole pathway, so nodes stay where they are as the steps add them. Elements not yet shown have a `hidden` class, which a style rule turns into `display: none`.
- **Each step** lists the ids it adds, a sentence and a question. `cy.batch()` makes all the class changes in one redraw, and the newest elements get a yellow glow from the `underlay-color` style.
- **Zoom.** `cy.animate({ fit: … })` zooms to what is shown, and `maxZoom` stops the first step, with only two nodes, from filling the box. Readers who have asked their system for reduced motion get the change without the animation.
- **Text.** The sentence and the question go into an element with `aria-live="polite"`, so screen readers read each step aloud.

## Load a network from STRING

STRING collects known and predicted links between proteins, drawn from experiments, computational predictions and curated knowledge, and gives each link a score [2]. Its API answers requests from any website, needs no key, and returns JSON that becomes Cytoscape.js elements in a few lines. This example asks for ten proteins around p53 and shows which kind of evidence supports each link.

{% include example.html file="examples/string-network.html" title="Ten proteins around p53, live from STRING" height="690" caption="If STRING does not answer within 20 seconds, the example shows a saved copy of the same request, made on 15 October 2026, and says so. Add `?offline=1` to the example's address to use the saved copy from the start." %}

Points to note in the code:

- **Two calls, sometimes three.** `get_string_ids` matches the names to STRING's proteins. Names it does not know are left out of the reply, so the page lists them. `network` then returns the links among those proteins, and a third call fetches descriptions of any partners STRING added. STRING asks for one second between calls, and for a `caller_identity` that names your site.
- **A fixed version.** `https://version-12-5.string-db.org` answers from STRING 12.5, so the network does not change when STRING is updated. STRING's [API documentation](https://string-db.org/help/api/) recommends a version-specific address like this for anything in production.
- **Evidence.** Each link has a combined `score` and one score per kind of evidence, including `escore` (experiments), `dscore` (curated databases) and `tscore` (text mining), all from 0 to 1. The example draws a link as a solid line when experiments alone score it at least 0.4, dashed when curated databases do, and dotted otherwise. The cut-off of 0.4 is our own choice, not STRING's.
- **Every protein appears**, even one with no links, because the nodes come from the first call rather than from the links. When students raise the minimum score, they see links disappear while the proteins stay.

The `network` call takes these parameters:

<div class="table-wrap" markdown="1">

| Parameter | What it does |
|---|---|
| `identifiers` | Protein names or STRING IDs, separated by `%0d` (a carriage return) |
| `species` | The NCBI taxon ID, such as 9606 for human |
| `required_score` | The minimum combined score, from 0 to 1000, so 700 matches a score of 0.7 in the replies |
| `network_type` | `functional` (the default), `physical` or `regulatory` |
| `add_nodes` | Adds this many of the proteins' best-scoring partners |
| `caller_identity` | The name of your site or tool |

</div>

Three things caught us out:

- **Ask for every protein you need.** TP53 with 10 added partners gave AURKA, CSNK2A1, CUL9, DDX5, MAPK1, MAPK14, RPA1, SIRT1, STUB1 and TBP, but not MDM2. At least 60 of p53's partners share the top score of 0.999, and MDM2 came eleventh in STRING's list. STRING also adds 10 partners by itself when you give it a single protein. So name every protein you want, rather than relying on STRING to add them.
- **Use gene symbols.** STRING read `p21` as TCEAL1, a different protein, not CDKN1A. The example reports any name that STRING read as another protein.
- **Scores are confidence, not strength.** STRING's [help on scores](https://string-db.org/help/scores/) says the score "represents the confidence that a protein–protein relationship exists", and does "not measure interaction strength, binding affinity, or the magnitude of the biological effect". Even a physical link "does not necessarily mean that the two proteins directly bind each other".

## Show a network made in Cytoscape desktop

Cytoscape desktop is an open-source program for building, arranging and styling networks [3]. It can save a network, with its positions and table columns, in the JSON format that Cytoscape.js reads, and it can save the style too. A page can then show the same picture, and readers can click it.

{% include example.html file="examples/cytoscape-desktop.html" title="A network and style saved from Cytoscape desktop" height="590" %}

To export the two files, as the [Cytoscape manual](https://manual.cytoscape.org/en/stable/Cytoscape.js_and_Cytoscape.html) describes for version 3.10:

1. Choose **File → Export → Network to File…**, then the format **Cytoscape.js JSON (\*.cyjs)**.
2. Choose **File → Export → Styles to File…**, then the format **Style for cytoscape.js (\*.json)**.

A few points about the code:

- **The network file** has an `elements` object with `nodes` and `edges`, which go straight into `cytoscape()`. Each node keeps its saved `position`, and the `preset` layout uses them.
- **The style file** holds a list of named styles, each with a Cytoscape.js stylesheet in `style`. The example picks one by its `title`.
- **Table columns** become fields in `data`. Cytoscape uses each element's SUID, its internal number, as the `id`, and replaces characters such as spaces in column names with underscores, so "Gene Name" becomes `Gene_Name`.
- **Fonts.** Desktop styles name Java fonts such as `SansSerif`, which browsers do not have, so the example adds a rule that sets `font-family`.
- **What is lost.** Custom graphics, edge bends, tooltips, node label width and the line type of node borders are not exported, and arrows always take the colour of their edge.

Our two files were written by hand in the format that Cytoscape 3.10 writes, because we could not run Cytoscape desktop where we tested. To check the code against a real export, we also loaded a 331-node network that Cytoscape had exported (`gal.cyjs`, from the Cytoscape team's cyjs-sample repository on GitHub) with its styles, and it drew without errors.

## Choose a layout, and say what it means

A layout places nodes so that the picture is readable. Unless you choose a layout that encodes something, the positions mean nothing: two proteins drawn close together are not necessarily related, and the protein in the middle is not necessarily the most important. Readers still read closeness as relatedness and the centre as importance [4], so say in the caption what the layout does. This example draws the same ten proteins and 31 links from STRING with six layouts.

{% include example.html file="examples/network-layouts.html" title="One network, six layouts" height="600" %}

<div class="table-wrap" markdown="1">

| Layout | Where it comes from | What the positions mean |
|---|---|---|
| `fcose` | cytoscape-fcose 2.2.0 [5] | Little: linked nodes pull together and all nodes push apart, from random starting positions |
| `cose` | Built in | The same idea, also from a random start |
| `dagre` | cytoscape-dagre 4.0.1 | Rows follow the direction of the edges; the order within a row only tidies the drawing |
| `breadthfirst` | Built in | Rows by the number of steps from the root nodes you choose |
| `concentric` | Built in | Rings by a number you choose, such as the number of links |
| `circle`, `grid` | Built in | The order of your list, and nothing else |
| `random` | Built in | Nothing |
| `preset` | Built in | Positions you supply, for example from Cytoscape desktop |

</div>

Load the extensions after Cytoscape.js. fcose needs two helper libraries, loaded first in this order. cytoscape-dagre 4 is a single file that includes dagre itself, so the separate dagre script in older tutorials is no longer needed. Both extensions register themselves when they are loaded with a script tag.

```html
<script src="https://cdn.jsdelivr.net/npm/cytoscape@3.34.3/dist/cytoscape.min.js"
        integrity="sha384-qPKQxl9uMXOw7vSTUDAnpUilhLuulovw6P5Z4db4bqxW5VhumS7przEmHX0iM0Oc"
        crossorigin="anonymous"></script>

<!-- fcose: layout-base, then cose-base, then cytoscape-fcose -->
<script src="https://cdn.jsdelivr.net/npm/layout-base@2.0.1/layout-base.js"
        integrity="sha384-5E2lB9AIGE6LRCnOOSTnZRlYZFZ01iMeN2fw97Z1r4Z/kXALxKw2AC+ZzQqoeDsG"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/cose-base@2.2.0/cose-base.js"
        integrity="sha384-RswRBkrMsPUYpJLbZ1CVA08zbNzAkykE2oGJTujBwfjWNdfxv2WVjLJNqv1LhAOp"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/cytoscape-fcose@2.2.0/cytoscape-fcose.js"
        integrity="sha384-uk5Wbjq1+KqUdHO30w7N7GrEGdzBhaJeW9o/ANF6v9+yx3M/cBmoX51C000JNCUf"
        crossorigin="anonymous"></script>

<!-- dagre: one file -->
<script src="https://cdn.jsdelivr.net/npm/cytoscape-dagre@4.0.1/dist/cytoscape-dagre.min.js"
        integrity="sha384-CIu9EFddQ0GplFvevqHZ1sIPo1IRXFvxHd0A6jaJ3m052fy+mDfer/ItnvIS5uY3"
        crossorigin="anonymous"></script>
```

The three fcose files add 324 kB (69 kB compressed), and dagre adds 46 kB (16 kB compressed). Run a layout with `cy.layout({ name: "fcose" }).run()`, adding any options to the object. In fcose, `randomize: true` is the default, so each run gives a different picture; `quality: "proof"` takes longer for a tidier result. When students will compare screenshots, use a layout that gives the same picture every time, such as dagre, or save the positions and use `preset`.

## Save the network as a picture

`cy.png()` returns the drawing as a PNG image for slides and handouts. Ask for the whole network rather than the part on screen, at twice the screen resolution, and on a white background, because the image is otherwise transparent:

```js
const link = document.createElement("a");
link.href = cy.png({ full: true, scale: 2, bg: "#ffffff" });   // a data: address that holds the image
link.download = "p53-pathway.png";
link.click();
```

The pathway example's "Download PNG" button does this, and gave an image of about 85 kB in our tests. For large networks, `output: "blob-promise"` returns a Blob instead of a data address.

## Give a text version of the network

Cytoscape.js draws on a canvas, so screen readers find nothing in the drawing, and keyboard users cannot reach the nodes. Give the container a short description with `role="img"` and `aria-label`, and put the full information in a table near it [6]. Build the table from the same lists as the diagram, so that the two always agree:

```js
// one row per interaction, from the same lists of nodes and edges that draw the diagram
const name = id => nodes.find(n => n.id === id).label;
document.getElementById("edge-table").innerHTML = edges.map(e =>
  `<tr><td>${name(e.source)}</td><td>${e.effect}</td><td>${name(e.target)}</td><td>${e.detail}</td></tr>`
).join("");
```

Keep the table small enough to read with a keyboard: Smits and colleagues cite a study in which blind screen-reader users had trouble with tables of up to 6 columns and 61 rows [6]. The pathway example also has a real button for each molecule, and both the pathway and STRING examples put the details of the selected node in an element with `aria-live="polite"`, so screen readers read them out.

## Things that catch people out

- **Phones.** We checked every example at 358 and 412 pixels wide. Side panels move under the network on narrow screens, and wide tables sit in a box with `overflow-x: auto`, so nothing scrolls sideways. On a touch screen, dragging on the network moves the network.
- **The scroll wheel.** Over a network, the mouse wheel zooms the network and the page stops scrolling. With `userZoomingEnabled: false`, the wheel scrolled the page in our test. All the examples here do this except the STRING one, where a dense network may need zooming.
- **Pictures that change.** fcose, cose and random start from random positions, so every load gives a new picture. That makes a good demonstration, but it confuses students comparing screenshots.
- **`:visible` can be out of date.** After we hid 3 of 12 edges inside `cy.batch()`, the `:visible` selector still counted 12, even after the batch had ended. Select by your own classes instead, as the examples do with `.not(".hidden")`.
- **Warnings.** Setting `width: "label"`, which sized a node to its label, is deprecated and prints a warning, as does a custom `wheelSensitivity`. The pathway example sizes nodes with a function instead.
- **Hairballs.** Cytoscape.js can draw hundreds of nodes, but nobody can read them. Show less detail, fade what matters less, or split the network into several figures [4].
- **STRING in class.** STRING's help pages ask heavy users to download the full data set rather than call the API many times. For a large class, point students at the saved copy (`?offline=1`) or save your own copy of the replies.
- **Versions.** Each example names an exact version of every library, and STRING's address names its version. When you update, read the release notes and test the page again.

## Licences and credits

Cytoscape.js, cytoscape-dagre, cytoscape-fcose, layout-base and cose-base are all under the MIT licence. If you publish teaching material built on them, cite the Cytoscape.js paper [1] and, if you use fcose, its paper [5]. STRING's data are free to use under the Creative Commons Attribution 4.0 licence, on condition that you credit STRING and cite it [2]; the STRING example does this under the network. If you use Cytoscape desktop, cite its paper [3]. The sources for the p53 pathway are in the table in the pathway section.

## References

{: .references}
1. Franz M, Lopes CT, Fong D, et al. (2023). Cytoscape.js 2023 update: a graph theory library for visualization and analysis. *Bioinformatics* 39(1): btad031. [doi:10.1093/bioinformatics/btad031](https://doi.org/10.1093/bioinformatics/btad031)
2. Szklarczyk D, Nastou K, Koutrouli M, et al. (2025). The STRING database in 2025: protein networks with directionality of regulation. *Nucleic Acids Research* 53(D1): D730–D737. [doi:10.1093/nar/gkae1113](https://doi.org/10.1093/nar/gkae1113)
3. Shannon P, Markiel A, Ozier O, et al. (2003). Cytoscape: a software environment for integrated models of biomolecular interaction networks. *Genome Research* 13(11): 2498–2504. [doi:10.1101/gr.1239303](https://doi.org/10.1101/gr.1239303)
4. Marai GE, Pinaud B, Bühler K, Lex A, Morris JH (2019). Ten simple rules to create biological network figures for communication. *PLOS Computational Biology* 15(9): e1007244. [doi:10.1371/journal.pcbi.1007244](https://doi.org/10.1371/journal.pcbi.1007244)
5. Balci H, Dogrusoz U (2022). fCoSE: a fast compound graph layout algorithm with constraint support. *IEEE Transactions on Visualization and Computer Graphics* 28(12): 4582–4593. [doi:10.1109/TVCG.2021.3095303](https://doi.org/10.1109/TVCG.2021.3095303)
6. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
