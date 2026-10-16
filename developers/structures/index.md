---
title: Embedding 3D structure viewers
topic: structures
lede: Put a protein structure in a teaching page, turned to the part that matters, with the residue you are teaching marked and labelled. Mol* suits most pages. Use the PDBe Mol* tag if you would rather not write code, and 3Dmol.js when the page must stay small.
description: How to embed Mol*, PDBe Mol*, 3Dmol.js and NGL in a teaching web page, load PDB entries and AlphaFold models through their APIs, and mark, label and zoom to residues, with live examples.
---

## Which viewer to use

<div class="table-wrap" markdown="1">

| <span class="visually-hidden">Feature</span> | Mol\* | PDBe Mol\* | 3Dmol.js | NGL |
|---|---|---|---|---|
| What it is | The viewer used by the RCSB PDB and PDBe websites, as one script | PDBe's packaging of Mol\*, with a `<pdbe-molstar>` tag | A small viewer with a JavaScript API and a no-code mode | An older viewer, one of the two that Mol\* grew from |
| Version tested | 5.12.0 | 3.12.0, which contains Mol\* 5.8.0 | 2.5.5 | 2.5.0 |
| Download | 5.2 MB (1.5 MB compressed) | 6.1 MB (1.6 MB compressed) | 0.5 MB (155 kB compressed) | 1.3 MB (360 kB compressed) |
| Best for | Most teaching pages: hover labels, a sequence panel, scenes, scripted views and AlphaFold confidence | A viewer from one tag, and choosing residues by their UniProt number | Small pages, several viewers on one page, and labels without code | Pages that already use it |
| Limits | Large, and its options change between monthly releases | Larger still, with an older Mol\* inside; selections need code | Few built-in tools for students | No Greek letters in labels; its AlphaFold shortcut asks for deleted files |
| Licence | MIT | Apache 2.0 | BSD 3-clause | MIT |

</div>

The examples below all show human haemoglobin and the residue changed in sickle-cell disease, glutamate 6 of the β chains, so that you can compare the viewers on the same view. The structure is PDB entry 4HHB, deoxyhaemoglobin at 1.74 Å resolution [1]. All the examples were tested on 15 October 2026 with the versions in the table. The Mol\* and PDBe Mol\* examples wait for a click before they load, because each downloads about 1.5 MB and opens its own WebGL context, the browser's connection to the graphics card.

## A viewer in a few lines

A stylesheet, a script and one call to `molstar.Viewer.create` give you a working viewer [2]. `loadPdb` then fetches an entry from the RCSB PDB.

{% include example.html file="examples/molstar-basic.html" title="Mol* open at haemoglobin" height="465" load="click" note="This example downloads Mol* (1.5 MB compressed) when it starts." %}

How it works:

- **The container** needs a height and `position: relative`, because Mol\* fills it. Label it with `role="region"` and an `aria-label` that says what is shown; `role="img"` would hide Mol\*'s own buttons from screen readers.
- **Options** switch parts of the interface on and off. `layoutIsExpanded: false` keeps Mol\* inside the page, and `layoutShowControls: false` hides the side panels and the sequence. The expand button in the corner still lets students fill the screen.
- **`loadPdb("4hhb")`** fetches the entry from `models.rcsb.org/4hhb.bcif` as BinaryCIF, a compact binary form of the PDB's mmCIF format: 553 kB, or 123 kB compressed. Add `pdbProvider: "pdbe"` to the options to fetch PDBe's copy instead. `loadStructureFromUrl` loads any file, and `loadAlphaFoldDb` an AlphaFold model.
- **Hovering** over a residue names it in the corner. For glutamate 6 of chain B, Mol\* shows `B | GLU 6` and `UNP P68871 7 E`: the same residue is number 7 in UniProt. The [numbering section](#residue-6-or-residue-7) explains why.

## Mark and label a residue

A teaching view usually needs three things: colours that make the point, the residue that matters marked and labelled, and buttons that take students to the right place. Mol\* builds the first two from a MolViewSpec scene, a description of what to load and how to draw it [3], and does the third with `structureInteractivity`.

{% include example.html file="examples/molstar-hbs.html" title="Haemoglobin with glutamate 6 of each β chain marked and labelled" height="590" load="click" note="This example downloads Mol* (1.5 MB compressed) when it starts." %}

How it works:

- **The scene** is built with `MVSData.createBuilder()`: download a file, parse it and make a structure, then add components (`"polymer"`, `"ligand"` or a list of residues), each with a representation (`cartoon`, `ball_and_stick`, `spacefill`) and colours. `loadMVS` draws it. A scene also adds a one-item list of scenes to the corner of the viewer, which the example removes with `managers.snapshot.clear()`.
- **Residues** are named by chain and number, as in `{ auth_asym_id: "B", auth_seq_id: 6 }`. These are the author's chain letter and residue number, the ones printed in the PDB file.
- **The label** is a MolViewSpec primitive with a background and a line to the residue. Its size is in ångströms (`label_size: 3`), so it grows as students zoom in.
- **The starting view.** A label can hide behind nearer parts of the molecule, so the scene's `focus` has a `direction`: the camera looks from Glu6 of chain B towards the centre of the molecule, along a vector worked out once from the coordinates. Glu6 then faces the reader.
- **Buttons** call the viewer's `structureInteractivity` with an `action`. `"focus"` moves the camera, `"select"` outlines residues in green until they are cleared, and `"highlight"` shows them as if the pointer were over them, until the pointer next moves over the molecule. With no target, it clears. It needs Mol\* 5.5 or later.
- **A chain letter is more than the chain.** `auth_asym_id: "B"` also matches chain B's haem, a phosphate ion and 57 water molecules, because they carry the same letter. `label_asym_id: "B"`, the file's own name for the chain, is the protein alone, which is why the highlight button uses it.
- **Saving a scene.** `MVSData.toMVSJ()` turns a scene's state into a small JSON file, and the viewer's `loadMvsFromUrl()` loads one. A colleague can then change the colours or a label in the file without touching the code.

### Residue 6 or residue 7

The same glutamate has two numbers, and both are correct. The gene's first codon codes for a methionine, which is removed from the finished protein. The PDB entry numbers the finished chain, so in 4HHB each β chain starts at valine 1 and the sickle-cell residue is Glu6. UniProt and AlphaFold number the sequence the gene codes for, so the same residue is 7. Variant names follow the gene: ClinVar records the sickle-cell change as `NM_000518.5(HBB):c.20A>T (p.Glu7Val)`, while older papers and textbooks call it Glu6Val.

<div class="table-wrap" markdown="1">

| Where | The sickle-cell residue | Counts from |
|---|---|---|
| PDB entry 4HHB, chains B and D | Glu6 (`auth_seq_id` and `label_seq_id` are both 6) | The valine that starts the finished protein |
| UniProt P68871 | 7 | The methionine coded by the start codon |
| AlphaFold model AF-P68871-F1 | Glu7 | The UniProt sequence |
| ClinVar and other HGVS variant names | p.Glu7Val | The start codon |
| Older papers and textbooks | Glu6Val, β6 | The finished protein |

</div>

So say which numbering a page uses, and test every selection on the file you load. Two more traps are rarer in teaching entries: in some entries `auth_seq_id` and `label_seq_id` differ, and some number extra residues with insertion codes, such as 52A. PDBe Mol\* can select residues by their UniProt number, as shown [further down](#put-a-viewer-in-a-page-without-code).

{% include ad.html slot="in_article" %}

## Turn the viewer into an activity

Mol\* tells your page what students click, in the 3D view and in the sequence panel above it. With that, a page can check each step of a task and answer straight away, as the [genome browser activity](../genome-browsers/#turn-the-browser-into-an-activity) does with igv.js.

{% include example.html file="examples/molstar-find-glu6.html" title="Activity: find the sickle-cell residue" height="690" load="click" note="This example downloads Mol* (1.5 MB compressed) when it starts." %}

The parts to reuse:

- **Listening for clicks.** `viewer.subscribe()` on the plugin's `behaviors.interaction.click` event runs your function on every click in the 3D view. A click on a letter in the sequence panel sends the same event.
- **Naming what was clicked.** The event carries a "loci", Mol\*'s description of a set of atoms. `molstar.lib`, which the 5.12.0 bundle exposes, reads it: `Loci.getFirstLocation` from `StructureElement` gives one atom, and `StructureProperties` gives its chain, residue number, residue name and molecule name.
- **The sequence panel** needs `layoutShowControls: true`. Turning off the other panels (`layoutShowLeftPanel: false`, `collapseRightPanel: true`, `layoutShowLog: false`) leaves only the sequence above the structure.
- **Changing the scene.** When a student finds the residue, the page loads the scene again with Glu6 drawn and labelled, and turns the camera to face it. `loadMVS` replaces the old scene; pass `{ keepCamera: true }` if you would rather keep the student's view.
- **Without a mouse.** The form finds a residue by chain and number with `Schema.toLoci` from `StructureElement`, moves the camera to it with `structureInteractivity`, and runs the same check, so every step works from the keyboard. Haem and water carry chain letters and numbers too, so the form accepts only amino acids.
- **Feedback** goes into an element with `aria-live="polite"`, so screen readers announce it.

To use the activity with another protein, change the entry, the chain letters, the residue number, the view direction and the wording.

## Colour an AlphaFold model by confidence

AlphaFold DB holds predicted structures for hundreds of millions of proteins [4]. Ask its API which model files are current rather than writing a file address into your page: file names carry a version (`_v6` today), and AlphaFold DB has deleted the older versions, so `AF-P68871-F1-model_v5.bcif` now returns an error.

{% include example.html file="examples/molstar-alphafold.html" title="AlphaFold models coloured by pLDDT, with the predicted aligned error" height="640" load="click" note="This example downloads Mol* (1.5 MB compressed) and a model from AlphaFold DB when it starts." %}

How it works:

- **The API.** A request for `/api/prediction/P04637` on `alphafold.ebi.ac.uk` returns a list with one record for each model. A record gives the model files (`bcifUrl`, `cifUrl`, `pdbUrl`), the scores for each residue (`plddtDocUrl`), the predicted aligned error as a picture (`paeImageUrl`) and as numbers (`paeDocUrl`), the version (`latestVersion`), the mean pLDDT (`globalMetricValue`) and the share of residues in each band (`fractionPlddtVeryHigh` and three more). The API and the files allow use from other websites.
- **pLDDT** is AlphaFold's confidence in the local structure around each residue, on a scale of 0 to 100. AlphaFold DB colours it in four bands: very high (90 and above), confident (70 to 90), low (50 to 70) and very low (below 50) [5]. `theme: { globalName: "plddt-confidence" }` gives the same colours in Mol\*. The viewer's `loadAlphaFoldDb("P04637")` does the lookup and the loading in one line, if you do not need the record.
- **Finding low-confidence residues.** AlphaFold files keep pLDDT in the B-factor column [5], so a query on `B_iso_or_equiv` below 50 selects the very low residues: 117 of p53's 393.
- **A text version.** The file of scores gives each band's share of the residues and its longest unbroken stretch, so the colours are not the only way to read the model.
- **The predicted aligned error (PAE)** is the error, in ångströms, that AlphaFold expects in the position of one residue when the model and the true structure are lined up on another. Low values between two domains mean that AlphaFold is confident about their positions relative to each other [5]. AlphaFold DB's picture of it is a bare 320-pixel square, so the page adds a key and a caption. Values stop at 31.75 Å [5].
- **Three proteins, three lessons.** p53's DNA-binding domain (residues 94 to 292) is mostly very high, while most of its first 90 residues and much of its far end are very low. Calmodulin's two lobes are each confident, but the PAE between them is high: from the PAE file, about 4 Å within each lobe and 22 Å between them. β-globin is very high almost everywhere, yet the model is one chain without its haem.

## Put a viewer in a page without code

Two of the viewers can be set up in HTML alone. PDBe Mol\* gives you the whole of Mol\* as one tag. 3Dmol.js turns a `<div>` with the right attributes into a viewer, at a tenth of the size [6].

{% include example.html file="examples/pdbe-molstar-tag.html" title="PDBe Mol*: haemoglobin from one tag" height="515" load="click" note="This example downloads PDBe Mol* (1.6 MB compressed) when it starts." %}

How it works:

- **Attributes** set everything: `molecule-id` (a PDB ID, fetched from PDBe), `custom-data-url` and `custom-data-format` for other files, `alphafold-view` for pLDDT colours, `hide-controls`, `sequence-panel`, `pdbe-link`, and the background as `bg-color-r`, `bg-color-g` and `bg-color-b`. An empty value counts as true, and `false`, `off` or `0` as false.
- **Scripting.** The tag's `viewerInstance` is the PDBe Mol\* plugin. `visual.select` colours residues, shows their side chains and greys out the rest in one call; `visual.clearSelection` and `visual.reset` undo it.
- **UniProt numbers.** PDBe's files map the protein's residues to UniProt, so `uniprot_accession` and `uniprot_residue_number` work as selectors. Residue 7 of P68871 selects Glu6 of chains B and D, and the hover label shows `B | GLU 6` with `UNP P68871 7 E`. This works only with PDBe's own files.
- **An older Mol\*.** PDBe Mol\* 3.12.0, from April 2026, contains Mol\* 5.8.0, and it writes its settings to the browser's console. Its wiki still shows older versions and older names, such as `struct_asym_id` for what is now `label_asym_id`.

{% include example.html file="examples/3dmol-no-code.html" title="3Dmol.js: haemoglobin with no JavaScript written" height="490" %}

How it works:

- **Any element** with the class `viewer_3Dmoljs` becomes a viewer when the script loads. `data-pdb` fetches a PDB-format file from the RCSB PDB, and `data-href` loads any address, taking the format from the file name. The largest entries have no PDB-format file, so use `data-href` with an mmCIF file for those.
- **Selections and styles** come in numbered pairs, applied in order: `data-select2` chooses atoms and `data-style2` says how to draw them. A style replaces the earlier style of those atoms, so style 2 repeats the cartoon.
- **Labels.** `data-labelres2` labels each chosen residue with its name and number. Options inside options need the attribute written as JSON.
- **More control** needs JavaScript, and the API is small: `$3Dmol.createViewer`, `addModel`, `setStyle`, `addLabel` and `setClickable`, whose callback receives the clicked atom with its `chain`, `resi` and `resn`. `data-callback` can run code after loading, but through `eval`, which a strict content security policy blocks.

## NGL, briefly

NGL [7] is one of the two viewers that Mol\* grew from [2], and it still works. Its selection language is short and readable, but version 2.5.0 came nearly two years after 2.4.0, and two problems matter for teaching: labels cannot show Greek letters, and its built-in AlphaFold shortcut asks for files that no longer exist.

{% include example.html file="examples/ngl-basic.html" title="NGL: haemoglobin with Glu6 labelled" height="495" %}

- **Selections** are short strings: `":B"` is chain B, `"6:B"` is residue 6 of chain B, and `"HEM"` the haem groups.
- **Labels** are looked up by atom index. The font has no Greek letters (β shows as a question mark in a diamond), so the example writes "beta". `fixedSize: true` keeps the text one size on screen.
- **Resizing.** Call `stage.handleResize()` when the window changes size.
- **AlphaFold.** `alphafold://P68871` asks for version 4 files, which now return an error. Load the address from the API instead, as the Mol\* example does.
- **No WebGL.** NGL draws nothing and says nothing, so the example checks first.

## Things that catch people out

- **No WebGL.** All four viewers draw with WebGL, which some locked-down or old computers lack. Mol\* then shows its own message ("WebGL does not seem to be available") and NGL shows nothing. We could not test 3Dmol.js without WebGL, because Chromium fell back to drawing in software. Check with `canvas.getContext("webgl2") || canvas.getContext("webgl")`, as the NGL example does, and give a picture and a sentence of text instead.
- **Computers without a graphics card** draw in software. In our tests Mol\* then took 3.5 to 7 seconds to show a structure, camera moves took a few seconds, and a molecular surface in NGL took more than 30 seconds. Make surfaces optional.
- **Several viewers on one page.** Each viewer uses its own WebGL context, and browsers allow only a limited number at once (about 16 in Chrome). Load viewers when they are needed, as this page does.
- **Phones and tablets.** The examples worked without sideways scrolling in Chrome's emulation of a Pixel 7 phone and at 350 pixels wide, but we have not tested real phones or touch gestures. Mol\*'s expand button gives the viewer the whole screen, and Mol\* runs on iPads, which many students use instead of laptops [8].
- **Screen readers and keyboards.** The 3D view is a picture drawn on a canvas, which screen readers cannot read, and turning it needs a drag. Give every task another route: buttons, a form, a text list of the key residues, and alt text that states the structural point [9]. Turning by dragging needs an alternative that does not drag ([WCAG 2.2](https://www.w3.org/TR/WCAG22/), success criterion 2.5.7), and a molecule that spins by itself needs a pause button (2.2.2). See [accessibility](../accessibility/).
- **Numbering.** PDB author numbers, PDB label numbers, UniProt numbers and HGVS names can all differ. Say which you use, and test each selection on the file you load. The [haemoglobin table](#residue-6-or-residue-7) shows one case.
- **AlphaFold versions.** Never write a file address with a version in it, such as `…model_v4.pdb`. Ask the API.
- **Versions.** Mol\* releases about once a month (5.10.0 in June 2026, 5.13.0 in October), and its options change between releases. We tested 5.12.0. Pin the version, and read the release notes before you update.

## Licences and credits

Mol\* and NGL are under the MIT licence, PDBe Mol\* under Apache 2.0 and 3Dmol.js under BSD 3-clause. If you publish teaching material built on them, cite their papers (below). PDB data are in the public domain (CC0) under the [wwPDB usage policy](https://www.wwpdb.org/about/usage-policies), which encourages you to credit the authors of each entry; for 4HHB, that is Fermi and colleagues [1]. AlphaFold DB files are under a CC BY 4.0 licence, which requires credit: cite AlphaFold DB [4, 5] and AlphaFold [10].

## References

{: .references}
1. Fermi G, Perutz MF, Shaanan B, Fourme R (1984). The crystal structure of human deoxyhaemoglobin at 1.74 Å resolution. *Journal of Molecular Biology* 175(2): 159–174. [doi:10.1016/0022-2836(84)90472-8](https://doi.org/10.1016/0022-2836%2884%2990472-8)
2. Sehnal D, Bittrich S, Deshpande M, et al. (2021). Mol\* Viewer: modern web app for 3D visualization and analysis of large biomolecular structures. *Nucleic Acids Research* 49(W1): W431–W437. [doi:10.1093/nar/gkab314](https://doi.org/10.1093/nar/gkab314)
3. Midlik A, Bittrich S, Fleming JR, et al. (2025). MolViewSpec: a Mol\* extension for describing and sharing molecular visualizations. *Nucleic Acids Research* 53(W1): W408–W414. [doi:10.1093/nar/gkaf370](https://doi.org/10.1093/nar/gkaf370)
4. Bertoni D, Tsenkov M, Magana P, et al. (2026). AlphaFold Protein Structure Database 2025: a redesigned interface and updated structural coverage. *Nucleic Acids Research* 54(D1): D358–D362. [doi:10.1093/nar/gkaf1226](https://doi.org/10.1093/nar/gkaf1226)
5. Varadi M, Anyango S, Deshpande M, et al. (2022). AlphaFold Protein Structure Database: massively expanding the structural coverage of protein-sequence space with high-accuracy models. *Nucleic Acids Research* 50(D1): D439–D444. [doi:10.1093/nar/gkab1061](https://doi.org/10.1093/nar/gkab1061)
6. Rego N, Koes D (2015). 3Dmol.js: molecular visualization with WebGL. *Bioinformatics* 31(8): 1322–1324. [doi:10.1093/bioinformatics/btu829](https://doi.org/10.1093/bioinformatics/btu829)
7. Rose AS, Bradley AR, Valasatava Y, et al. (2018). NGL viewer: web-based molecular graphics for large complexes. *Bioinformatics* 34(21): 3755–3758. [doi:10.1093/bioinformatics/bty419](https://doi.org/10.1093/bioinformatics/bty419)
8. Berndsen CE, Shenk KE, Young A, et al. (2026). Breaking barriers in large classes: using cloud computing and computational biology to implement research-inspired curricula in Biochemistry I. *Biochemistry and Molecular Biology Education* 54(5): 442–449. [doi:10.1002/bmb.70069](https://doi.org/10.1002/bmb.70069)
9. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
10. Jumper J, Evans R, Pritzel A, et al. (2021). Highly accurate protein structure prediction with AlphaFold. *Nature* 596(7873): 583–589. [doi:10.1038/s41586-021-03819-2](https://doi.org/10.1038/s41586-021-03819-2)
