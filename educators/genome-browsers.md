---
title: Teaching with genome browsers
topic: genome-browsers
lede: A genome browser shows students where a gene sits, what it is made of and what evidence supports it. A good activity also teaches them to weigh that evidence rather than trust whatever is drawn.
description: How to use genome browsers such as UCSC, Ensembl, IGV and JBrowse in university teaching, with activities, assessment ideas, common misconceptions and references.
---

## What genome browsers teach well

A genome browser puts a reference sequence, its annotation and evidence from experiments on one coordinate axis. On that axis students can see three ideas that a slide rarely shows well: genes have structure, annotations are claims, and a position only means something together with the assembly it belongs to.

After a well-designed session, students should be able to:

- go to a gene by name, accession or coordinates, and say which assembly and which annotation they are looking at;
- describe a gene's structure from the tracks: exons, untranslated regions, strand and alternative transcripts;
- convert positions between files that count from 0 and files that count from 1, and explain why a position differs between GRCh37 and GRCh38;
- weigh several kinds of evidence, such as RNA-seq coverage, conservation, predictions and read alignments, to judge a gene model or a variant;
- build a gene model from evidence and defend it.

The first three suit a first-year class. The last two take longer and suit project work, where students have time to get lost and find their way back.

## Activities

### Find the variant

*First year. 20 to 30 minutes, alone or in pairs.*

The page checks each step and answers straight away, so students can work at their own pace while you go round the room. The variants are real ClinVar records; the four people are invented.

1. Students open [the activity](../../developers/genome-browsers/examples/igv-find-the-variant.html) in a new tab. It starts on another part of chromosome 11, so they have to search for *HBB*.
2. They zoom in until they can read single bases.
3. They find the sickle-cell variant among the seven variants in the gene, and click it.
4. They work out which of the four people has two copies of the sickle-cell allele, and click that genotype.
5. Finish with a short discussion. Why does one copy of the sickle-cell allele on its own not cause the disease? Individual_3 carries one sickle-cell allele and one HbC allele, at the very next base: why does that pair cause HbSC disease, a form of sickle-cell disease?

Students produce a screenshot of the finished checklist and two sentences answering the discussion questions. The [developers' page](../../developers/genome-browsers/#turn-the-browser-into-an-activity) shows how the activity is built, so you can make one for another gene.

### Find out why two positions disagree

*First or second year. 50 minutes, in pairs.*

1. Give each pair one single-base variant written two ways, as a line from a VCF file and as a line from a BED file, and a link to a browser view fixed on GRCh38.
2. Pairs find the variant from each file, note the position the browser shows, and work out why the two files disagree (see the table [below](#where-students-go-wrong)).
3. Round two: give them a position from an older paper, on GRCh37. Pairs explain why it lands on a different base in GRCh38, then convert it and check the result.
4. Finish with a question everyone votes on, then discuss in pairs, then vote again.

Students hand in an annotated screenshot and three lines naming the assembly, the file's counting convention and the conversion they made.

### Build a gene model from evidence

*Second or third year. Two 2-hour practicals, or part of a research project in a course, alone or in pairs.*

This follows the Genomics Education Partnership, whose students build gene models from evidence in a customised UCSC browser [1], and G-OnRamp, which builds browsers for this kind of class project and has been used at 15 institutions [2].

1. Give each student or pair a gene in a less well annotated genome.
2. Students go through the evidence tracks and record the exon coordinates in a table, before they use any annotation editor.
3. They load their model as a custom BED or GFF track, compare it with other students' models of the same gene, and settle disagreements by discussing the evidence.
4. Set expectations: in the Genomics Education Partnership, 60 to 80% of student models agree completely with the reconciled model, depending on how hard the project is [2].

Students produce a table of their gene model, a custom track, and a 300-word justification that cites the evidence.

### Review variant calls at the level of reads

*Third year, master's or clinical students. 90 minutes, in pairs.*

1. Provide a small slice of aligned reads (BAM or CRAM) and the matching variant calls from an openly consented sample, chosen to include both genuine variants and artefacts. The [genomic data page](../data-and-ethics/) suggests sources.
2. Students inspect read depth, the balance of the two alleles, mapping and base quality, and which strands the reads come from, then classify each call and say how confident they are.
3. Compare their answers with a key, and discuss the disagreements.

Students produce a short report with screenshots and a statement of confidence for each call. For a semester-long project in which students use Galaxy and IGV on public ChIP-seq data, see Schmidt and colleagues [3].

{% include ad.html slot="in_article" %}

## Assessing what students learned

- **A screenshot with a caption**, marked against a checklist: the assembly is named, the tracks are named, the counting convention is stated, and the claim is supported by something visible in the image.
- **Multiple-choice questions whose wrong answers are common mistakes.** For example: "The BED line `chr1 99 100` describes which position, counting from 1?" (Answer: 100.)
- **Accuracy of a gene model** against the reconciled model, together with the quality of the evidence given for it.
- **A short viva**: "Show me why you put this splice site here."

## Where students go wrong

**Counting from 0 or from 1.** File formats disagree about where counting starts, and the browser shows yet another convention from some of the files it reads.

<div class="table-wrap" markdown="1">

| Where students meet it | How it counts | The first base of chromosome 1 |
|---|---|---|
| The UCSC browser's display and position box | From 1, both ends included | `chr1:1-1` |
| BED files and UCSC's database tables | From 0, end not included | `chr1 0 1` |
| GTF and GFF files | From 1 | start = 1 |
| VCF files | From 1; for insertions and deletions, the base before the change | POS = 1 |

</div>

To convert from counting from 1 to counting from 0, subtract 1 from the start and leave the end alone.

**Mixing assemblies.** GRCh38 moved coordinates for the first time since 2009 [4], so positions in older papers do not match today's browsers. Conversion tools can misplace variants, sometimes onto another chromosome [5]. Students may also meet the complete T2T-CHM13 assembly, which adds nearly 200 million bases [6].

**`chr1` or `1`.** UCSC names chromosomes `chr1`, while Ensembl and many data files say `1`. The UCSC browser ([Nassar et al. 2023](https://doi.org/10.1093/nar/gkac1072)) and igv.js now match the two styles for you, but many analysis tools do not, and a mismatch can make them skip every line without an error.

**Believing the annotation.** Annotation sets disagree, and student gene models in the Genomics Education Partnership have included exons that every prediction program missed [1]. Ask students what evidence supports a feature, not only whether it is there.

**Missing what is hidden.** Collapsed tracks and default track sets can hide alternative transcripts and variants. Genes on the reverse strand read from right to left, so remind students to take the reverse complement when they copy a sequence.

**Screens that change.** Ensembl announced a move to a new platform [7] and switched its website over in August 2026 ([EMBL-EBI news, 25 August 2026](https://www.ebi.ac.uk/about/news/updates-from-data-resources/ensembl-new-website/)), and every browser changes its look from time to time. Put a date on your instructions, and teach what to look for rather than where to click [8].

## Practical tips

- **Devices.** Laptops work best. Tablets are fine for looking, but dragging to move is fiddly, so teach the search box and zoom buttons; they also help students who cannot drag at all.
- **Accounts.** Students need no account to look at data. Give everyone the same starting link, so that every student begins with the same assembly, position and tracks. JBrowse 2 can also share whole sessions [9].
- **Network.** Reading BAM or bigWig files across the internet needs reliable Wi-Fi. Keep pictures of the key views in case the network fails. A browser built into your own page, with small data files hosted beside it, keeps working when public servers are slow; the [developers' page](../../developers/genome-browsers/#host-a-small-dataset-next-to-the-page) shows how.
- **Timing.** Allow about ten minutes for students to find their way around before the first real task [8]. Over a whole project, teachers in the Genomics Education Partnership found that students need many hours with the tools before they can ask their own questions [10].
- **Accessibility.** Genome browsers rely on dragging and colour, and their default colours are not always easy to tell apart for colour-blind readers [11]. Give a table of the key features as well as the picture, and see the [accessibility page](../accessibility/).

## The evidence

The strongest evidence for teaching with genome browsers comes from course-based research projects. In the Genomics Education Partnership, students' reported gains rose with the class time given to the project. The quarter of courses that gave it more than 36 hours (45.5 on average) had the largest gains, although they did not differ significantly from the next quarter down [10]. The general case for active learning is set out on the [planning page](../planning/).

We found no classroom studies that compare learning with a genome browser against learning from static figures. The advice on this page about short activities comes from these broader findings and from teaching experience.

## References

{: .references}
1. Shaffer CD, Alvarez C, Bailey C, et al. (2010). The Genomics Education Partnership: successful integration of research into laboratory classes at a diverse group of undergraduate institutions. *CBE—Life Sciences Education* 9(1): 55–69. [doi:10.1187/09-11-0087](https://doi.org/10.1187/09-11-0087)
2. Sargent L, Liu Y, Leung W, et al. (2020). G-OnRamp: generating genome browsers to facilitate undergraduate-driven collaborative genome annotation. *PLOS Computational Biology* 16(6): e1007863. [doi:10.1371/journal.pcbi.1007863](https://doi.org/10.1371/journal.pcbi.1007863)
3. Schmidt CA, Hodkinson LJ, Comstra HS, et al. (2023). A cost-free CURE: using bioinformatics to identify DNA-binding factors at a specific genomic locus. *Journal of Microbiology & Biology Education* 24(3): e00120-23. [doi:10.1128/jmbe.00120-23](https://doi.org/10.1128/jmbe.00120-23)
4. Schneider VA, Graves-Lindsay T, Howe K, et al. (2017). Evaluation of GRCh38 and de novo haploid genome assemblies demonstrates the enduring quality of the reference assembly. *Genome Research* 27(5): 849–864. [doi:10.1101/gr.213611.116](https://doi.org/10.1101/gr.213611.116)
5. Ormond C, Ryan NM, Corvin A, Heron EA (2021). Converting single nucleotide variants between genome builds: from cautionary tale to solution. *Briefings in Bioinformatics* 22(5): bbab069. [doi:10.1093/bib/bbab069](https://doi.org/10.1093/bib/bbab069)
6. Nurk S, Koren S, Rhie A, et al. (2022). The complete sequence of a human genome. *Science* 376(6588): 44–53. [doi:10.1126/science.abj6987](https://doi.org/10.1126/science.abj6987)
7. Yates AD, Austine-Orimoloye O, Azov AG, et al. (2026). Ensembl 2026. *Nucleic Acids Research* 54(D1): D1053–D1060. [doi:10.1093/nar/gkaf1239](https://doi.org/10.1093/nar/gkaf1239)
8. Via A, De Las Rivas J, Attwood TK, et al. (2011). Ten simple rules for developing a short bioinformatics training course. *PLoS Computational Biology* 7(10): e1002245. [doi:10.1371/journal.pcbi.1002245](https://doi.org/10.1371/journal.pcbi.1002245)
9. Diesh C, Stevens GJ, Xie P, et al. (2023). JBrowse 2: a modular genome browser with views of synteny and structural variation. *Genome Biology* 24: 74. [doi:10.1186/s13059-023-02914-z](https://doi.org/10.1186/s13059-023-02914-z)
10. Shaffer CD, Alvarez CJ, Bednarski AE, et al. (2014). A course-based research experience: how benefits change with increased investment in instructional time. *CBE—Life Sciences Education* 13(1): 111–130. [doi:10.1187/cbe-13-08-0152](https://doi.org/10.1187/cbe-13-08-0152)
11. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
