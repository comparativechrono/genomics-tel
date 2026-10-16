---
title: Teaching with sequences and alignments
topic: sequences
lede: A multiple alignment lines up the same protein from several species, so students can see which positions never change and ask why. It can also teach them that an alignment is computed rather than observed, and that a residue number means little until you say whose numbering it is.
description: How to teach with protein sequences, BLAST searches and multiple sequence alignments in university courses, with activities, assessment ideas, common misconceptions and references.
---

## What sequences and alignments teach well

A multiple alignment puts related sequences in rows and lines up the positions that correspond in columns. With several species side by side, students can see what one sequence cannot show. Some positions are held in place by what the protein does. Similarity is evidence of shared ancestry, not proof of it. And the columns come from a program, with settings that someone chose. A search tool such as BLAST adds the statistics: how often a match this good would turn up by chance.

After a well-designed session, students should be able to:

- retrieve a protein sequence and its annotation by accession, and say which database release and which numbering they are using;
- tell similarity, identity and homology apart, and justify a claim of homology from a statistically significant match [1];
- read BLAST output (E-value, bit score, identity and coverage), and explain why the same match gets a different E-value in a database of a different size [2];
- find conserved and variable columns in a multiple alignment, and relate a conserved position to the protein's structure or function;
- criticise an alignment, and explain how another program or other settings would change it.

The first four suit first- and second-year classes. The last takes longer and suits final-year or master's students, who have time to align a difficult family twice and compare the results.

## Activities

### Compare the sickle-cell position across species

*First or second year. 30 minutes, in pairs.*

Students look at β-globin from eight species, find the position that changes in sickle-cell disease, and compare it with positions that never change.

1. Before anyone opens the alignment, ask pairs to predict whether the residue that changes in sickle-cell disease is the same in all eight species, and collect the predictions. Students who only watch a demonstration may learn no more than students who do not see it [3], so the prediction matters.
2. Pairs open [the alignment](../../developers/sequences/examples/nightingale-msa.html), press **Sickle-cell position**, and record the residue each species has in column 7, with its number in that species' own sequence. The read-out under the alignment gives both. The [SVG version](../../developers/sequences/examples/svg-alignment.html) shows the same alignment and list, and works fully from the keyboard.
3. They switch the colours to **Share of rows with this residue**, find two columns where every species agrees, and check one of them in the [UniProt look-up](../../developers/sequences/examples/uniprot-residue.html). Columns 64 and 93 work well: both hold histidines that bind the haem.
4. Discuss: why would a position be the same in every species? Column 7 is not: mouse and rat have alanine there. Does that mean the position does not matter in human β-globin?

Students produce a table of the residues and residue numbers in column 7, and three sentences that explain one conserved column using what UniProt records about it. The [developers' page](../../developers/sequences/#mark-the-sickle-cell-position-in-an-alignment) shows how the alignment is built.

### Residue numbering detective

*First or second year. 50 minutes, in pairs.*

The sources students read give the sickle-cell change different numbers. This activity has them reconcile the numbers instead of being confused by them.

1. Give each pair four descriptions of the same change: "HbS, β6 Glu→Val" as older textbooks write it, `NM_000518.5(HBB):c.20A>T` and `p.Glu7Val` from ClinVar, and "chain B, residue 6" from PDB entry 4HHB.
2. Work through the first one together, then let pairs do the rest. Worked examples help most early on, and the support can then be faded [4].
3. Pairs find the change in three views: codon 7 and base c.20 in the [exon viewer](../../developers/sequences/examples/seqviz-exon.html), column 7 in [the alignment](../../developers/sequences/examples/nightingale-msa.html), and residue 7 in the [UniProt look-up](../../developers/sequences/examples/uniprot-residue.html). The look-up also shows that UniProt records the first methionine as removed from the mature protein.
4. Each pair writes one sentence for each source, saying why it uses the number it does.
5. Finish with a question that everyone votes on, then discusses in pairs, then votes on again [3]: "The distal histidine, which sits above the haem iron, is His63 in PDB entry 4HHB. Which residue is it in UniProt entry P68871?" (Answer: 64.) A harder follow-up: "Which residue is it in UniProt's horse entry, P02062?" (Answer: 63, because that entry starts at the mature protein.)

Students produce a conversion table and the rule they used for each source.

### Watch the E-value change with the database

*First or second year. 50 minutes, alone and then in groups.*

1. Students predict, then run, a BLASTP search with human β-globin (UniProt P68871) on [NCBI BLAST](https://blast.ncbi.nlm.nih.gov/Blast.cgi): once against a small database (Protein Data Bank proteins, `pdb`) and once against a large one (Non-redundant protein sequences, `nr`). They record the E-value of one match that appears in both lists.
2. They search again with a shuffled copy of the query, which has the same letters in a random order, and record the best E-value. This copy was shuffled for the activity:

   ```
   >P68871_shuffled same letters as human beta-globin, in random order
   LFKEVAMVANAVAVLHAALFSHGGKPETKVVEHFPFENYYADGLAKFVVPPDAGSGGALL
   VRDLLTHDWGSPDHFKNLKQTLVLLFGVCQAVEFLTVGKHKAHNTLKVDHGLMNRLPLVE
   YDVRGASKGWGALQKPENVSEAHTCTV
   ```

3. Groups explain the differences, and link them to the statistics: the size of the database searched changes how likely a score is to appear by chance [2].

Students produce a table of predictions and observations, and a three-sentence explanation.

### Treat an alignment as a hypothesis

*Final year or master's. 2 to 3 hours, in pairs.*

1. Give each pair a protein family whose members share little identity, with 10 to 20 sequences.
2. Pairs align the family twice, with two programs or two gap settings, for example [Clustal Omega](https://www.ebi.ac.uk/jdispatcher/msa/clustalo) and [MAFFT](https://www.ebi.ac.uk/jdispatcher/msa/mafft) on EBI's servers, saving each result in FASTA format.
3. They open both results in one viewer, such as Jalview [5] or the [SVG alignment viewer](../../developers/sequences/examples/svg-alignment.html), which opens aligned FASTA files without uploading them, and mark the columns where the two alignments disagree.
4. They remove the most gappy columns, build a quick tree from each alignment (for example with Jalview's average-distance tree), and compare the trees (see [teaching with phylogenetic trees](../trees/)).
5. Each pair writes a short critique: which alignment would they trust for which question, and why?

Students produce two alignments, two trees and a one-page critique.

{% include ad.html slot="in_article" %}

## Assessing what students learned

- **Questions on real BLAST output.** Give students a results table and ask which matches they would call homologous, and why.
- **An annotated alignment figure**, marked against a checklist: the colour scheme is named, the numbering is stated, the sequences' source and release are given, and the claim is supported by something visible in the figure.
- **Multiple-choice questions whose wrong answers are common mistakes.** For example: "A search finds 25% identity over 300 residues, with E = 1e-30. Are the two proteins homologous?" (Answer: almost certainly. Homology is inferred from statistically significant similarity, and identity alone does not decide it [1].)
- **A methods critique**, from the last activity, marked on how well students justify their choice rather than on which alignment they choose.

## Where students go wrong

**"These proteins are 70% homologous."** Homology means shared ancestry, which two proteins either have or do not. It is inferred from statistically significant similarity [1], and percentages describe identity or similarity. The muddle is old: a 1987 paper was titled "'Homology' in proteins and nucleic acids: a terminology muddle and a way out of it" [6].

**"The E-value is the chance that the match is wrong."** The E-value is the number of matches this good that you would [expect to see by chance](https://blast.ncbi.nlm.nih.gov/doc/blast-help/FAQ.html) in a database of that size, so the same match gets a different E-value in a different database [2].

**"Percent identity settles homology, or function."** It does not, on its own. Teach statistical significance and the length of the match alongside identity [1].

**"An alignment is data."** It is the output of a program and its settings. Different methods can put different residues in the same column, especially for distant sequences, and anything built on the alignment, such as a tree, changes with it. The last activity makes this visible.

**"Red means bad."** A colour scheme shows one chosen property, such as type of residue, chemistry or conservation. Ask students to name the scheme in every figure legend.

**"Residue 6 and residue 7 are different residues."** The sickle-cell glutamate is Glu6 in the older numbering and in PDB structures, and residue 7 in UniProt and in HGVS variant names, because UniProt counts the first methionine. Each species' entry can start at a different point too: the same glutamate is residue 6 in UniProt's horse entry and residue 5 in its cow entry. Ask students to say whose numbering they are using, every time.

**"A gap means the species lost those residues."** Gaps are where the program put them. At the ends of a sequence they often mean that the database entry starts or stops at a different point. In the β-globin alignment, the horse and dog rows begin with one gap because their entries describe the mature protein, without its first methionine. The cow row begins with two, because the cow chain is one residue shorter at its start.

**"If a position matters, it never changes."** Column 7 holds glutamate in six of the eight species and alanine in mouse and rat, yet valine at that position in human β-globin causes sickle-cell disease. Conservation is evidence that a position is constrained. Variation between species does not show that every change is harmless.

## Practical tips

- **Devices.** Alignments are wide, so laptops or larger screens work best; a phone shows only 10 to 15 columns at a time. Jalview is a desktop program, so check that it is installed on the lab machines well before the class. The examples on this site run in any current browser.
- **Accounts.** None are needed for UniProt, NCBI BLAST or EBI's alignment tools.
- **Network.** Public servers can queue at busy times. Use short queries, or hand out results you computed earlier [7]. The alignment examples here carry their data in the page, so they keep working when a public server is slow; only the UniProt look-up needs UniProt.
- **Timing.** Allow 5 to 10 minutes for each BLAST round, including any queue. Start with one column before the whole alignment: building fluency with one part of a diagram before combining several reduces the load on novices [8].
- **Accessibility.** Residue colours depend on hue, and about 8% of men and 0.4% of women of European ancestry have red-green colour vision deficiency [9]. Keep the letters visible, give conservation as numbers or words, and name the colour scheme. The [SVG alignment viewer](../../developers/sequences/examples/svg-alignment.html) works from the keyboard and lists the chosen column as text. See the [accessibility page](../accessibility/).

## The evidence

We found no classroom studies that test alignment viewers or BLAST exercises themselves, and no studies of what students misunderstand about E-values. The activities on this page rest on general findings instead. The general case for active learning is set out on the [planning page](../planning/). Peer instruction works best with questions that 40 to 60% of students answer correctly the first time [3]. A survey of 1,260 life-science faculty in the United States produced a list of core bioinformatics competencies for undergraduates, which includes statistical ideas such as E-values and using tools to answer biological questions [2].

We found no studies that measure how common the misconceptions above are among students. They come from the sources cited with them and from teaching experience.

## References

{: .references}
1. Pearson WR (2013). An introduction to sequence similarity ("homology") searching. *Current Protocols in Bioinformatics* 42(1): 3.1.1–3.1.8. [doi:10.1002/0471250953.bi0301s42](https://doi.org/10.1002/0471250953.bi0301s42)
2. Wilson Sayres MA, Hauser C, Sierk M, et al. (2018). Bioinformatics core competencies for undergraduate life sciences education. *PLOS ONE* 13(6): e0196878. [doi:10.1371/journal.pone.0196878](https://doi.org/10.1371/journal.pone.0196878)
3. Brown NCC, Wilson G (2018). Ten quick tips for teaching programming. *PLOS Computational Biology* 14(4): e1006023. [doi:10.1371/journal.pcbi.1006023](https://doi.org/10.1371/journal.pcbi.1006023)
4. Renkl A, Atkinson RK (2003). Structuring the transition from example study to problem solving in cognitive skill acquisition: a cognitive load perspective. *Educational Psychologist* 38(1): 15–22. [doi:10.1207/S15326985EP3801_3](https://doi.org/10.1207/S15326985EP3801_3)
5. Waterhouse AM, Procter JB, Martin DMA, Clamp M, Barton GJ (2009). Jalview Version 2—a multiple sequence alignment editor and analysis workbench. *Bioinformatics* 25(9): 1189–1191. [doi:10.1093/bioinformatics/btp033](https://doi.org/10.1093/bioinformatics/btp033)
6. Reeck GR, de Haën C, Teller DC, et al. (1987). "Homology" in proteins and nucleic acids: a terminology muddle and a way out of it. *Cell* 50(5): 667. [doi:10.1016/0092-8674(87)90322-9](https://doi.org/10.1016/0092-8674%2887%2990322-9)
7. Via A, De Las Rivas J, Attwood TK, et al. (2011). Ten simple rules for developing a short bioinformatics training course. *PLoS Computational Biology* 7(10): e1002245. [doi:10.1371/journal.pcbi.1002245](https://doi.org/10.1371/journal.pcbi.1002245)
8. Offerdahl EG, Arneson JB, Byrne N (2017). Lighten the load: scaffolding visual literacy in biochemistry and molecular biology. *CBE—Life Sciences Education* 16(1): es1. [doi:10.1187/cbe.16-06-0193](https://doi.org/10.1187/cbe.16-06-0193)
9. Birch J (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A* 29(3): 313–320. [doi:10.1364/JOSAA.29.000313](https://doi.org/10.1364/JOSAA.29.000313)
