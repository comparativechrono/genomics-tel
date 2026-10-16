---
title: Showing sequences and alignments
topic: sequences
lede: Show a multiple alignment in a teaching page, with the position you are teaching marked and a text version that does not depend on colour. Nightingale suits most pages. Use react-msaview for conservation tracks, plain SVG when the page must work without a library, and SeqViz for a single DNA sequence.
description: How to show protein sequences and multiple alignments in a teaching web page with Nightingale, react-msaview, plain SVG and SeqViz, fetch entries from the UniProt REST API, and get residue numbers right, with live examples.
---

## Which viewer to use

<div class="table-wrap" markdown="1">

| <span class="visually-hidden">Feature</span> | Nightingale | react-msaview | Plain SVG | SeqViz |
|---|---|---|---|---|
| What it is | Web components for protein data, from EMBL-EBI | The JBrowse project's alignment viewer, as one script that includes React | About 100 lines of your own JavaScript | A viewer for one DNA sequence with its annotations and translation |
| Download | Five modules, 341 kB (115 kB compressed) | 1.3 MB (425 kB compressed) | Nothing | 0.63 MB (166 kB compressed) |
| Best for | Most alignment pages: a highlighted column, zooming, and clicks your page can answer | Conservation tracks, your own data for each column, trees, and showing only the differences | Pages that must work offline, from the keyboard or with a screen reader | An exon, a gene or a plasmid, with codons and single bases marked |
| Limits | Drawn on a canvas, with no keyboard control, so it needs a text version | Heavier, and four major versions between August and October 2026 | You write it and look after it | One sequence, not an alignment |
| Licence | MIT | MIT | Yours | MIT |

</div>

The examples below use β-globin, the protein coded by the *HBB* gene, and the position that changes in sickle-cell disease, so that you can compare the viewers on the same data. All of them were tested on 15 October 2026, with Nightingale 5.11.0, react-msaview 8.4.1 and SeqViz 3.10.25. Older alignment libraries, such as BioJS MSAViewer [1] and react-msa-viewer, have had no new release since 2016 and 2018.

## Mark the sickle-cell position in an alignment

Nightingale is a set of web components for protein data, used on the UniProt and InterPro websites [2]. Each component is an HTML element: here a navigation bar, a ruler with the human sequence, and the alignment. A `nightingale-manager` element around them keeps them in step, so zooming one zooms all three. This example aligns β-globin from eight species and highlights column 7, the sickle-cell position.

{% include example.html file="examples/nightingale-msa.html" title="β-globin in eight species, with the sickle-cell position highlighted" height="475" caption="Eight reviewed UniProt entries (release 2026_03), aligned with FAMSA [3]. The read-out under the alignment is the text version of the highlighted column." %}

How it works:

- **Loading.** Nightingale 5 is published as ES modules. Each component imports the shared core package by name, so a short import map tells the browser where that name lives, and all the components share one copy of it. The map's `integrity` list holds a hash for each module. Chromium refused to run a module when we changed its hash; we did not test other browsers.
- **Data.** Set `msa.data` to a list of `{ name, sequence }` objects, with gaps written as `-`. The alignment is written into the page, so the example works as a single downloaded file.
- **Highlight and zoom.** Set `highlight="7:7"` (first and last column, counting from 1), `display-start` and `display-end` on the manager. It passes every attribute named in its `reflected-attributes` to all the tracks inside it.
- **Clicks.** The alignment sends an `onResidueClick` event. Its `detail` holds `position` (the column) and `i` (the row), both counting from 0.
- **Text version.** The read-out lists every species' residue in the chosen column, with its number in that species' own sequence, in an element with `aria-live="polite"` so that screen readers announce it. The buttons and the column box do everything the mouse does, apart from dragging the view.
- **Small screens.** The page works out how many columns fit at about 18 pixels each: 43 in this guide, 11 on a phone. `min-width="300"` on each track avoids errors when the page first draws.

The colour menu makes a point worth teaching: colours are a choice. Clustal colours residues by type, Zappo by chemistry, and the third option shades each residue by how many rows share it. Name the scheme in every caption and handout.

## Get residue numbers right

The sickle-cell glutamate has two numbers, and both are right. UniProt counts along the sequence it stores, which for human β-globin starts with the methionine coded by the start codon. That methionine is removed from the finished protein: UniProt records it as an "Initiator methionine" feature and the mature chain as residues 2 to 147. Older papers number the mature chain, so the glutamate is Glu6 there, and in protein structures such as PDB entry 4HHB. It is residue 7 in UniProt and in variant names that follow the HGVS rules, such as `p.Glu7Val`.

<div class="table-wrap" markdown="1">

| Where you meet it | Number of the sickle-cell glutamate |
|---|---|
| UniProt P68871, the AlphaFold model of P68871, and ClinVar's name for the variant, `NM_000518.5(HBB):c.20A>T (p.Glu7Val)` | 7 |
| The older haemoglobin numbering (HbS is "β6 Glu→Val") and PDB entry 4HHB, chain B | 6 |
| The gene's coding sequence: bases c.19 to c.21 (GAG); the sickle-cell change is c.20A>T | codon 7 |
| UniProt's horse and dog entries, which describe the mature protein | 6 |
| UniProt's cow entry, whose sequence starts two columns later in this alignment | 5 |
| This alignment | column 7 |

</div>

An alignment column is not a residue number either: add a sequence with one extra residue at the start, and every column number moves. So say whose numbering you use every time you print a number, and work out residue numbers from each sequence, not from the column. In code, count the residues in the row up to the column, skipping gaps:

```js
// The residue number of an alignment column (counting from 1) in one aligned sequence, or null for a gap
const residueNumber = (aligned, column) =>
  aligned[column - 1] === "-" ? null : aligned.slice(0, column).replace(/-/g, "").length;

residueNumber("-VQLSGEEK", 7);   // 6: the horse glutamate in column 7
```

The same offset applies to every residue of human β-globin. The two histidines that hold the haem are His63 and His92 in PDB entry 4HHB, and residues 64 and 93 in UniProt.

{% include ad.html slot="in_article" %}

## Fetch sequences from UniProt

UniProt's REST API answers requests from any website (it sends `Access-Control-Allow-Origin: *`), so a page can look up entries while students work [4]. This example fetches one entry and lists everything UniProt records at the residue you choose: the sickle-cell variant at residue 7, for instance, or the histidine at residue 64 that holds the haem.

{% include example.html file="examples/uniprot-residue.html" title="What UniProt records about one residue" height="705" caption="Live data from UniProt. The page names the UniProt release that answered." %}

Two kinds of request cover most teaching pages. The first returns one entry as JSON, the second several entries as FASTA text:

```text
https://rest.uniprot.org/uniprotkb/P68871?format=json&fields=accession,id,sequence,ft_chain,ft_variant
https://rest.uniprot.org/uniprotkb/accessions?accessions=P68871,P02062&format=fasta
```

How the code works:

- **One entry.** Listing only the [fields you need](https://www.uniprot.org/help/return_fields) cut the reply for this entry from 342 kB to 106 kB. The example asks for 15 fields.
- **Features.** Each feature, such as `Natural variant`, `Binding site` or `Helix`, has a `location` whose `start` and `end` count from 1 along the stored sequence. The `Chain` feature says where the mature protein starts, which is how the page can say "residue 6 of the mature protein".
- **Several sequences.** The FASTA request is how this guide's alignment started: one request for all eight entries.
- **The release.** UniProt lets pages read its `X-UniProt-Release` header, so you can record which release students saw. Entries change between releases, so keep a copy of anything a class depends on, as the alignment examples here do.
- **Errors.** A badly formed accession gets a 400 reply with a message. A merged or retired entry comes back with `"entryType": "Inactive"` and no sequence. The page handles both, and tries once more if UniProt is busy.
- **Entry names.** UniProt also accepts names such as `HBB_HUMAN`, but answers with a redirect that drops the `fields` list, so the page asks for accessions only.

## Add conservation tracks with react-msaview

react-msaview adds tracks above the alignment and can draw a tree beside it. Here it loads the same alignment from a file next to the page, marks the sickle-cell residue, and adds a track of its own: the share of species that match human in each column. The third button hides every residue that matches human, which leaves only the differences.

{% include example.html file="examples/react-msaview.html" title="react-msaview with a highlight, your own track and differences from human" height="515" %}

The parts to reuse, all described in the project's [usage guide](https://github.com/GMOD/JBrowseMSA/blob/v8.4.1/USAGE.md):

- **Starting it.** `ReactMSAView.mount(element, options)` draws the viewer and returns `update` and `destroy`. `update` merges new options into the running viewer, which is how the buttons work.
- **Highlights.** With a `row`, `start` and `end` are that row's own residue numbers, so `{ row: "HBB_HUMAN", start: 7, end: 7 }` marks human residue 7 wherever the gaps fall.
- **Your own track.** `columnTracks` draws one number for each column as a bar. The built-in conservation tracks appear below it.
- **Differences only.** `relativeTo: "HBB_HUMAN"` replaces every residue that matches human with a dot.
- **Clicks.** `onCellClick` receives the column and the clicked row's residue number, both counting from 1.
- **Phones.** The toolbar wraps onto three lines on a phone, so on narrow screens the example leaves it out with `hideHeader: true`, and its zoom button shows 12 residues instead of 30. The `height` option counts the toolbar when it is shown.

The package released major versions 6, 7, 8 and 9 between 18 August and 12 October 2026. Pin the exact version, and read the changes before you move to a new one.

## Draw an alignment without a library

When a page must work offline, from the keyboard or with a screen reader, draw the alignment yourself. This viewer is about 100 lines of JavaScript that build an SVG drawing, with nothing to download. Students can also open their own aligned FASTA file in it.

{% include example.html file="examples/svg-alignment.html" title="An alignment drawn as SVG, with no library" height="510" caption="Files opened here are read by the browser. Nothing is uploaded." %}

How it is built:

- **Letters and colours.** Each residue is a coloured rectangle with its letter on top, so colour is never the only clue. Six of the seven colours come from the Okabe-Ito palette. We checked all seven in a simulation of the three common kinds of colour blindness, as Hattab and colleagues recommend [5], and every pair of residue classes stayed clearly different. Black letters keep a contrast of at least 5.4:1 on every colour.
- **Conservation.** The bars show the share of species that carry the commonest residue in each column. Columns that are the same in every species are darker: 77 of the 147 here.
- **Keyboard and screen readers.** A range input chooses the column, so the arrow keys work, and the list below the alignment gives each species' residue with its number in its own sequence. The summary sentence sits in an `aria-live` region.
- **Phones.** The alignment scrolls sideways inside its own box, so the page never becomes wider than the screen.
- **Students' own files.** The page reads the chosen file with `file.text()` and checks that every row has the same length before it draws.

## Show one DNA sequence and its translation

SeqViz shows one DNA sequence with its complementary strand, its annotations and its translation. Here it shows the first exon of *HBB* in the direction the gene is read. The button makes the sickle-cell change, so students can watch codon 7 turn from GAG to GTG, and the amino acid from E to V.

{% include example.html file="examples/seqviz-exon.html" title="HBB exon 1 with its translation and the sickle-cell base" height="475" %}

Some details:

- **Drawing.** `seqviz.Viewer(element, options).render()` draws the viewer, and `setState(options)` draws it again with new options.
- **Positions** in `annotations`, `translations` and `highlights` count from 0 and leave out the end. The sickle-cell base, c.20, is base 70 of this exon, so its highlight is `start: 69, end: 70`. The read-out turns selections back into exon positions and c. numbers.
- **Strand.** The exon is the reverse complement of GRCh38 chr11:5,226,930-5,227,071, because *HBB* lies on the reverse strand. The [genome browsers page](../genome-browsers/) shows the same base on the chromosome.
- **Fonts.** SeqViz downloads a font from Google Fonts when it starts, unless you set `disableExternalFonts: true`, as this example does.

## Things that catch people out

- **Residue numbers.** Say whose numbering you use, and never print an alignment column as if it were a residue number. See [get residue numbers right](#get-residue-numbers-right).
- **Phones.** Nightingale and react-msaview fit a 390-pixel screen only by showing fewer columns or very small letters. The examples on this page show fewer columns. The SVG version scrolls inside its own box.
- **Screen readers and keyboards.** Nightingale and react-msaview draw on a canvas, which screen readers cannot read, and Nightingale's view cannot be moved from the keyboard. Give every task a text version, as the read-outs here do, and see [accessibility](../accessibility/).
- **Colour schemes.** Clustal and Zappo colour residues by type or chemistry, not by right and wrong. In the same simulation, two pairs of Nightingale's Clustal colours came close: green and yellow for one kind of colour blindness, orange and pink for another. Keep the letters visible and name the scheme.
- **Gaps at the start.** The horse and dog rows begin with a gap, but those species do not lack a residue: their UniProt entries describe the mature protein, which has already lost its first methionine.
- **One copy of the core.** The import map gives every Nightingale component the same copy of the core, so load all of them from the core's release, here 5.11.0, even when one component has a newer patch release.
- **Requests to other sites.** Before you publish, open your browser's developer tools and check the network tab for requests you did not expect, such as SeqViz's font.
- **Versions.** Each example names an exact version of its library. When you update, read the release notes and test the page again.

## Licences and credits

Nightingale, react-msaview and SeqViz are under the MIT licence; their code is on GitHub at [ebi-webcomponents/nightingale](https://github.com/ebi-webcomponents/nightingale), [GMOD/JBrowseMSA](https://github.com/GMOD/JBrowseMSA) and [Lattice-Automation/seqviz](https://github.com/Lattice-Automation/seqviz). UniProt data are under the [Creative Commons Attribution 4.0 licence](https://www.uniprot.org/help/license), so credit UniProt when you reuse its sequences or annotations. If you publish teaching material built on these tools or on the alignment, cite the papers below.

## References

{: .references}
1. Yachdav G, Wilzbach S, Rauscher B, et al. (2016). MSAViewer: interactive JavaScript visualization of multiple sequence alignments. *Bioinformatics* 32(22): 3501–3503. [doi:10.1093/bioinformatics/btw474](https://doi.org/10.1093/bioinformatics/btw474)
2. Salazar GA, Luciani A, Watkins X, et al. (2023). Nightingale: web components for protein feature visualization. *Bioinformatics Advances* 3(1): vbad064. [doi:10.1093/bioadv/vbad064](https://doi.org/10.1093/bioadv/vbad064)
3. Deorowicz S, Debudaj-Grabysz A, Gudyś A (2016). FAMSA: fast and accurate multiple sequence alignment of huge protein families. *Scientific Reports* 6: 33964. [doi:10.1038/srep33964](https://doi.org/10.1038/srep33964)
4. UniProt Consortium (2025). UniProt: the Universal Protein Knowledgebase in 2025. *Nucleic Acids Research* 53(D1): D609–D617. [doi:10.1093/nar/gkae1010](https://doi.org/10.1093/nar/gkae1010)
5. Hattab G, Rhyne TM, Heider D (2020). Ten simple rules to colorize biological data visualization. *PLOS Computational Biology* 16(10): e1008259. [doi:10.1371/journal.pcbi.1008259](https://doi.org/10.1371/journal.pcbi.1008259)
