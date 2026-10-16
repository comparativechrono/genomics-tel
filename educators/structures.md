---
title: Teaching with 3D structures
topic: structures
lede: A structure viewer shows students where a residue sits in the folded protein and what surrounds it. It can also teach them to ask what a picture leaves out, and how far a predicted model can be trusted.
description: How to teach with 3D structure viewers such as Mol* and AlphaFold DB, including how to read AlphaFold confidence, with activities, assessment ideas, common misconceptions and references.
---

## What 3D structures teach well

A structure viewer links a change in a sequence to a place in a folded molecule: on the surface or buried in the core, at the contact between two chains or far from it, next to a ligand or not. It also shows that every picture of a molecule is a choice. A cartoon, a surface and a stick model show different things, colours stand for conventions or for data, and an AlphaFold model is a prediction with its own measures of confidence. The BioMolViz framework sets out these skills as 12 themes, among them alternate renderings, macromolecular assemblies, structure-function relationships and "structural model skepticism", with 27 learning goals [1].

After a well-designed session, students should be able to:

- open an entry by its PDB ID or UniProt accession, and say whether it is an experimental structure or a prediction;
- find a residue by chain and number, and convert between PDB and UniProt numbering;
- choose a representation and colour scheme for a stated question, and explain every colour in their figure;
- say whether a residue is on the surface, buried, at a contact between chains or near a ligand, and suggest what changing it might do;
- judge an AlphaFold model region by region, using pLDDT and the predicted aligned error, and say what the model leaves out.

The first three suit a first-year class. The last two take longer and suit later years, where students can work on a protein of their own.

## Activities

### Find the sickle-cell residue

*First year. 20 to 30 minutes, alone or in pairs.*

The page checks each step and answers straight away, so students can work at their own pace while you go round the room. It uses PDB entry 4HHB, a structure of human deoxyhaemoglobin [2], and every step can also be done from the keyboard, with the form below the steps.

1. Students open [the activity](../../developers/structures/examples/molstar-find-glu6.html) in a new tab.
2. They hover over haemoglobin's four chains to tell the α chains from the β chains.
3. They find glutamate 6 of a β chain, in the 3D view or in the sequence.
4. They decide whether it lies on the surface or inside the molecule.
5. They explain why UniProt numbers the same residue 7.

Students produce a screenshot of glutamate 6 with its label, and one sentence each on where it sits and why the numbering differs. The [developers' page](../../developers/structures/#turn-the-viewer-into-an-activity) shows how the activity is built.

Follow it with a short discussion. The residue sits on the surface, 21 Å from the nearest haem group, so how can changing it cause a disease? (In sickle-cell haemoglobin, the valine sticks to a neighbouring haemoglobin molecule when oxygen is low, and the molecules join into long fibres.) The same change appears as one base in codon 7 in the [genome browser activity](../genome-browsers/#find-the-variant) and on the site's [home page](../../).

### Choose the right picture of a molecule for each question

*First year. 50 minutes, in pairs.*

Molecular pictures combine several things at once, such as graphical conventions, the level of abstraction and the layout in space. Offerdahl and colleagues suggest building fluency with one of these at a time before students combine them, to lower the cognitive load [3].

1. Show haemoglobin in five representations (cartoon, ball and stick, spacefill, molecular surface and backbone) and in three colour schemes (by element, by chain and by secondary structure). The full [Mol\* viewer](https://molstar.org/viewer/?pdb=4hhb) can make all of them.
2. Pairs match each picture to the question it answers best, such as "Where are the haem groups?", "Which chains touch each other?" or "Is this pocket open to water?"
3. For a new question, each pair makes a view of their own and justifies it in two sentences.

Students hand in the matching sheet and one figure with a legend that explains every colour.

### Judge how far a predicted model can be trusted

*Second or third year. 90 minutes, in pairs.*

1. Open the [AlphaFold example](../../developers/structures/examples/molstar-alphafold.html) and load p53. Students list which regions are very high confidence and which very low, using the colours and the text in the legend, and look up what each region does in the protein's [UniProt entry](https://www.uniprot.org/uniprotkb/P04637/entry).
2. They switch to calmodulin and read its predicted aligned error: two dark squares for the two lobes, with pale areas between them. They write one sentence on what AlphaFold is confident about and one on what it is not.
3. They switch to β-globin, which is very high confidence almost everywhere, and compare it with the experimental structure [4HHB](https://www.rcsb.org/structure/4HHB): how many chains does each have, and where are the haem groups?
4. Pairs list what a predicted model leaves out, such as partner chains, ligands like haem, and chemical modifications [4].

Students hand in an annotated figure and a 150-word statement of how far they would trust each model, region by region.

### Explain a variant from its place in the structure

*Third year, master's or clinical students. 2 to 4 weeks, part-time, in teams.*

This follows a project that Berndsen and colleagues run in a Biochemistry I lecture course of more than 70 students; more than 250 students have taken part since autumn 2024 [5].

1. Each team picks a missense variant in a protein with a good experimental structure or a confident model. The ClinVar variants in β-globin used in the [genome browser activity](../genome-browsers/#find-the-variant), such as HbC and HbE, are a good start.
2. Teams find the variant in Mol\*, record what is around it (contacts, burial, nearby ligands or other chains) and give its number in both PDB and UniProt numbering.
3. They propose how the change might affect the protein, with their evidence and its limits.

Teams produce a short report or a poster, marked with a rubric. In the source course the final variant project is individual and worth about 15 to 20% of the final grade [5].

{% include ad.html slot="in_article" %}

## Assessing what students learned

- **A figure with a legend**, marked against a checklist: the entry and whether it is experimental or predicted, the representation, every colour explained, the residue named in each numbering where they differ, and a claim supported by something visible. Share the checklist with colleagues. In a survey of 116 instructors, only a minority used a rubric for molecular visualisation work, and many wanted common assessment tools [6].
- **Multiple-choice questions whose wrong answers are common mistakes.** For example: "In an AlphaFold model, a loop is coloured orange (pLDDT below 50). What is the best reading?" (a) The loop moves a lot in the crystal. (b) AlphaFold has no confident prediction for it, and it may be disordered in the real protein. (c) The loop is rich in oxygen atoms. (Answer: b.)
- **A confidence statement.** Give students a model and its predicted aligned error, and ask which parts they would use to argue about how the protein works, and why.
- **A short viva**: "Show me where this variant is, and tell me what is around it."

## Where students go wrong

**"The colours are real."** Colours are either conventions or a mapping of data. Element colours follow the CPK convention, with oxygen red and nitrogen blue [7], while AlphaFold DB colours its models by confidence [8]. Ask students to write a legend for every colour they use.

**"A cartoon is the molecule."** Cartoons, sticks and surfaces are abstractions at different levels [3]. A cartoon hides the side chains that make contacts, and a surface hides the chain inside it.

**"An AlphaFold model is an experimental structure."** Predictions leave out ligands, covalent modifications and other conditions. Even very-high-confidence predictions can differ from experimental maps in how domains are oriented and in the details of the backbone and side chains, so Terwilliger and colleagues suggest treating them as "exceptionally useful hypotheses" [4].

**"Low-confidence spaghetti is structure."** Regions with very low pLDDT largely overlap with intrinsically disordered regions, which have no single fixed shape, so the loops drawn there are not a prediction of one [8, 9].

**Misreading confidence.** AlphaFold gives two measures, and students need both [8]:

<div class="table-wrap" markdown="1">

| Measure | What it tells you | Where to find it |
|---|---|---|
| pLDDT, 0 to 100 | Confidence in each residue's local structure: 90 and above very high, 70 to 90 confident, 50 to 70 low, below 50 very low | The colours of the model, and the B-factor column of the file |
| Predicted aligned error (PAE), 0 to 31.75 Å | Confidence in where two residues sit relative to each other, and so whether domains are placed correctly | The square plot beside the model |

</div>

pLDDT is local: two domains can each have very high pLDDT while their positions relative to each other are uncertain, as in calmodulin. And "colour by B-factor" on an AlphaFold model shows pLDDT, not how much the atoms move [8].

**Residue 6 or residue 7.** PDB entries often number the finished protein, while UniProt, AlphaFold and HGVS variant names count from the first methionine, which is removed from the finished protein. So the sickle-cell residue is Glu6 in 4HHB and in older papers, but p.Glu7Val in ClinVar. The [developers' page](../../developers/structures/#match-the-pdb-and-uniprot-numbering) has a table.

**"One chain is the protein."** Haemoglobin works as four chains holding four haem groups. The AlphaFold DB model of β-globin is one chain with no haem, and the sickle-cell change acts between whole haemoglobin molecules, so no single-chain model can show it.

## Practical tips

- **Devices.** Mol\* runs in the browser, including on iPads, which many students use instead of laptops [5]. Some tasks, such as converting file formats or changing a sequence, are hard or impossible in Mol\* and easier in desktop programs such as ChimeraX or PyMOL [5]. Turning and clicking are easiest with a mouse.
- **Accounts.** Students can view PDB and AlphaFold DB entries, and the examples on this site, without an account.
- **Network.** The viewer is about 1.5 MB and a structure such as 4HHB another 123 kB, so a class of 30 downloads about 50 MB in all. Open the pages before the class starts, and keep pictures of the key views in case the network fails.
- **Timing.** Allow 10 to 15 minutes for students to learn to turn, zoom and hover before the first real task. In the source course, each of the four projects gets one or two class periods for getting started with the software [5].
- **Dated instructions.** AlphaFold DB redesigned its entry pages in 2025 [10], and every viewer changes its look from time to time. Put a date on your instructions and screenshots.
- **Accessibility.** Turning a molecule by dragging needs an alternative that does not drag, and anything that spins by itself needs a pause button ([WCAG 2.2](https://www.w3.org/TR/WCAG22/), success criteria 2.5.7 and 2.2.2). Give a text list of the key residues and alt text that states the structural point [11], and let students use the keyboard routes in the activities here. Screen readers cannot read the 3D view itself, and most life-science data portals still have serious accessibility problems [12]. See the [accessibility page](../accessibility/).

## The evidence

Schönborn and Anderson argued in 2006 that visual literacy, the ability to read and use pictures of molecules, should be taught explicitly, and proposed 10 guidelines for doing so [13]. A decade later, Dries and colleagues noted that few instructors say they teach it explicitly [1]. Offerdahl and colleagues argue that reading molecular pictures carries a high cognitive load, which falls when students master one component at a time [3].

Most reports of 3D viewers in courses are descriptive. A survey of 116 instructors found a wide spread of programs and no common standards for assessment [6]. Berndsen and colleagues describe a variant project in a large lecture course, with gains in students' self-assessed confidence [5]. The general case for active learning is set out on the [planning page](../planning/). Earlier meta-analyses found only small advantages for animations over static pictures; when Ploetzner and colleagues re-analysed one of them, animations did clearly better when students had to learn how something changes [14].

We found no controlled study that compares learning with an interactive structure viewer against learning from static figures of the same structures, and none on how well students read pLDDT and the predicted aligned error. The advice on this page about short, checked activities and about reading confidence comes from these broader findings, from AlphaFold DB's documentation and from teaching experience.

## References

{: .references}
1. Dries DR, Dean DM, Listenberger LL, et al. (2017). An expanded framework for biomolecular visualization in the classroom: learning goals and competencies. *Biochemistry and Molecular Biology Education* 45(1): 69–75. [doi:10.1002/bmb.20991](https://doi.org/10.1002/bmb.20991)
2. Fermi G, Perutz MF, Shaanan B, Fourme R (1984). The crystal structure of human deoxyhaemoglobin at 1.74 Å resolution. *Journal of Molecular Biology* 175(2): 159–174. [doi:10.1016/0022-2836(84)90472-8](https://doi.org/10.1016/0022-2836%2884%2990472-8)
3. Offerdahl EG, Arneson JB, Byrne N (2017). Lighten the load: scaffolding visual literacy in biochemistry and molecular biology. *CBE—Life Sciences Education* 16(1): es1. [doi:10.1187/cbe.16-06-0193](https://doi.org/10.1187/cbe.16-06-0193)
4. Terwilliger TC, Liebschner D, Croll TI, et al. (2024). AlphaFold predictions are valuable hypotheses and accelerate but do not replace experimental structure determination. *Nature Methods* 21(1): 110–116. [doi:10.1038/s41592-023-02087-4](https://doi.org/10.1038/s41592-023-02087-4)
5. Berndsen CE, Shenk KE, Young A, Scanlan SE, Sardelli AM, Kayll AJ (2026). Breaking barriers in large classes: using cloud computing and computational biology to implement research-inspired curricula in Biochemistry I. *Biochemistry and Molecular Biology Education* 54(5): 442–449. [doi:10.1002/bmb.70069](https://doi.org/10.1002/bmb.70069)
6. Craig PA, Michel LV, Bateman RC (2013). A survey of educational uses of molecular visualization freeware. *Biochemistry and Molecular Biology Education* 41(3): 193–205. [doi:10.1002/bmb.20693](https://doi.org/10.1002/bmb.20693)
7. Hattab G, Rhyne TM, Heider D (2020). Ten simple rules to colorize biological data visualization. *PLOS Computational Biology* 16(10): e1008259. [doi:10.1371/journal.pcbi.1008259](https://doi.org/10.1371/journal.pcbi.1008259)
8. Varadi M, Anyango S, Deshpande M, et al. (2022). AlphaFold Protein Structure Database: massively expanding the structural coverage of protein-sequence space with high-accuracy models. *Nucleic Acids Research* 50(D1): D439–D444. [doi:10.1093/nar/gkab1061](https://doi.org/10.1093/nar/gkab1061)
9. Ruff KM, Pappu RV (2021). AlphaFold and implications for intrinsically disordered proteins. *Journal of Molecular Biology* 433(20): 167208. [doi:10.1016/j.jmb.2021.167208](https://doi.org/10.1016/j.jmb.2021.167208)
10. Bertoni D, Tsenkov M, Magana P, et al. (2026). AlphaFold Protein Structure Database 2025: a redesigned interface and updated structural coverage. *Nucleic Acids Research* 54(D1): D358–D362. [doi:10.1093/nar/gkaf1226](https://doi.org/10.1093/nar/gkaf1226)
11. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
12. L'Yi S, Zhang HG, Mar AP, et al. (2025). A comprehensive evaluation of life sciences data resources reveals significant accessibility barriers. *Scientific Reports* 15: 23676. [doi:10.1038/s41598-025-08731-7](https://doi.org/10.1038/s41598-025-08731-7)
13. Schönborn KJ, Anderson TR (2006). The importance of visual literacy in the education of biochemists. *Biochemistry and Molecular Biology Education* 34(2): 94–102. [doi:10.1002/bmb.2006.49403402094](https://doi.org/10.1002/bmb.2006.49403402094)
14. Ploetzner R, Berney S, Bétrancourt M (2020). A review of learning demands in instructional animations: the educational effectiveness of animations unfolds if the features of change need to be learned. *Journal of Computer Assisted Learning* 36(6): 838–860. [doi:10.1111/jcal.12476](https://doi.org/10.1111/jcal.12476)
