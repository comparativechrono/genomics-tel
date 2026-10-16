---
title: Teaching with networks
topic: networks
lede: A network diagram shows which molecules act on which, and how sure we are. Teach students to read the arrows and the evidence behind each line, and to treat where a node is drawn as a choice made by the drawing, not a finding.
description: How to teach with biological networks and pathway diagrams, such as STRING and Cytoscape, in university courses, with activities, assessment ideas, common misconceptions about layouts, hubs and evidence, and references.
---

## What networks teach well

A network diagram puts many relationships on one page: which proteins act on which, in what direction, and with what evidence. Students can follow ideas there that are hard to hold in words, such as feedback loops and pathways that branch, and the difference between knowing that two proteins are linked and knowing how. It also makes it easy to mislead, because readers find meaning in every part of the picture, including the parts the drawing chose at random.

After a well-designed session, students should be able to:

- read a pathway diagram: say what each arrowhead, bar and line style stands for, and work out the overall effect of one molecule on another along a path;
- explain a negative feedback loop, such as the one between p53 and MDM2, from a diagram;
- tell physical binding from other kinds of association, and read the evidence and the confidence score behind a link in STRING [1, 2];
- say which visual properties of a network figure carry meaning and which do not, such as where a node is drawn [3];
- run an enrichment analysis with a stated background set and a correction for multiple testing, and criticise one that has neither [4];
- design a network figure for a stated purpose, with a caption that says what the layout means [3].

The first four suit first- and second-year classes. The last two take longer and suit final-year and master's students, who have time to make and defend their own figures.

## Activities

### Walk through a feedback loop

*First or second year. 20 to 30 minutes, alone or in pairs.*

Students build up the response to DNA damage one step at a time, from the kinase ATM to p53 and the genes it switches on. Before each step, the page asks a question for students to answer in writing. Some answers appear in the next step; the rest are for discussion.

1. Spend a few minutes on the key first: arrowhead, flat bar, dashed line and solid line. Helping students become fluent with each part of a diagram before they put the parts together lightens the load on them [5].
2. Students work through the six steps, writing a line or two in answer to each question before they press "Next step".
3. At step 5, they count the flat bars on the path from p53 to the G1/S transition. There is one, so p53 holds the cell back from entering S phase.
4. Finish with the whole pathway. Students open the version with sources, click MDM2 and read the papers behind its three interactions.

Students produce their answers to the six questions, and a short explanation of the feedback loop in their own words: once ATM stops signalling, the MDM2 that p53 has switched on brings p53 back down.

[Open the step-by-step activity](../../developers/networks/examples/p53-step-by-step.html) and the [pathway with its sources](../../developers/networks/examples/p53-pathway.html), or see how they are built on the [developers' page](../../developers/networks/#turn-the-pathway-into-a-step-by-step-activity). Every interaction in them links to the papers that support it.

### Same network, different layouts

*Second year. 50 minutes, in pairs.*

1. Open the layouts example, which draws ten proteins around p53 and the 31 links between them in STRING. In the fcose, circle and concentric layouts, each pair writes down which protein looks most central and which two proteins look most closely related.
2. Press fcose two or three more times. Which of their claims survive every picture?
3. Compare their claims with the number of links each protein has, which the page lists under the network and which never changes.
4. Discuss why closeness looks meaningful. Marai and colleagues warn that "nodes drawn in proximity will be interpreted as conceptually related", even when the layout gives closeness no meaning [3].
5. Ask why TP53 and CDKN1A link to every other protein here. Part of the answer is that the list was chosen around p53.

Students produce screenshots of three layouts and two lists: the claims that held in every layout, and the claims that depended on one.

[Open the layouts example](../../developers/networks/examples/network-layouts.html), or read [what each layout does](../../developers/networks/#choose-a-layout-and-say-what-it-means) on the developers' page.

### Evidence detective

*Second or third year. 90 minutes, in pairs or threes.*

1. Students open the STRING example with its ten proteins, and the table of links under it. For six links that you choose, they record the combined score and the scores from experiments, curated databases and text mining.
2. They switch the network from functional to physical, then raise the minimum score from 0.7 to 0.9, and record which links disappear at each change. When we tried it on 15 October 2026, the physical network kept 20 of the 31 links.
3. Discuss what each kind of evidence means. STRING combines experiments, curated pathways and complexes, text mining, co-expression and conserved genomic context [1], and since version 12.5 it has offered separate functional, physical and regulatory networks [2].
4. Ask whether the number of links a protein has reflects its biology or how much it has been studied. Annotation is very unequal across genes, and researchers tend to focus on genes that are already well annotated [6].

Students produce the evidence table, and a paragraph on which links they would trust as physical binding, and why.

[Open the STRING example](../../developers/networks/examples/string-network.html). If STRING is slow or blocked on your network, the address ending `?offline=1` shows a copy saved on 15 October 2026, with the functional network only.

### From gene list to network story

*Final year or master's. 3 hours, in pairs.*

1. Start from a public list of differentially expressed genes. Students run an enrichment analysis, state the background set of genes they used, and correct for multiple testing. In a survey of 186 articles, 95% of analyses with over-representation tests did not use an appropriate background list or did not describe one, and 43% did not correct for multiple tests [4]. Other sources of bias call for caution even when both are done [7].
2. They build a network of the genes behind the top result, in STRING or Cytoscape desktop, and show fold change with a colour scale that still works in greyscale and for colour-blind readers [3].
3. They revise the figure against Marai and colleagues' ten rules, which cover, among other things, purpose, layout, labels, colour, level of detail, layering and splitting into several figures [3].
4. They write a caption that says what the layout means, and a methods paragraph that names the STRING version, the network type and the score threshold.

Students produce a figure, a caption and a methods paragraph, reviewed by another pair against a checklist built from the ten rules. To put the finished network on a web page, students can export it from Cytoscape desktop, as the [developers' page](../../developers/networks/#show-a-network-made-in-cytoscape-desktop) describes.

{% include ad.html slot="in_article" %}

## Assessing what students learned

Network diagrams suit short tasks that test reading and judgement rather than recall.

- **Fix this figure.** Give students a flawed network figure: red and green edges, labels too small to read, a tangle of a hundred nodes, and a caption that calls the node in the middle the most important. They redraw it and justify each change against the ten rules [3].
- **Trace a path.** Ask about the overall effect along a path, with wrong answers built from common mistakes. For example: "What is the effect of p53 on the G1/S transition?" The answer is that p53 holds it back, through one inhibition. A student who answers "activates, because the arrows lead there" has missed the flat bar.
- **An evidence table**, marked for accuracy against STRING, with a sentence on which links they would call physical binding.
- **Reporting.** In enrichment work, check that students state the background set, the correction method, and the versions of the tools and databases they used [4].

## Where students go wrong

**Reading meaning into position.** The most common layouts are force-directed: they place nodes by simulated forces, often from a random start. Yet readers see nodes drawn close together as related, and the node in the middle as the most important [3]. In the layouts example, the same ten proteins and 31 links give a new picture every time fcose runs. Teach students to ask what the layout does before they read anything into where a node sits. Three-dimensional networks add hidden nodes and distorted distances to the same problem, and are seldom appropriate [3].

**Treating hubs as the most important proteins.** A protein with many links may simply be well studied. Annotation is very unequal across genes, and researchers focus on richly annotated genes rather than the genes with the strongest data [6], so a protein's number of links may say as much about research attention as about biology. In the STRING example, TP53 links to every other protein partly because the list was built around it. Before asking which node has the most links, ask how the network was made.

**Taking every line as physical binding.** STRING's links include functional associations from text mining, co-expression, genomic context and curated pathways, as well as experiments [1]. Since version 12.5, STRING has offered separate functional, physical and regulatory networks [2], and its [help on scores](https://string-db.org/help/scores/) notes that even a physical link "does not necessarily mean that the two proteins directly bind each other". Ask which kind of evidence lies behind each link.

**Reading the score as strength.** A STRING score of 0.999 is STRING's confidence that the association exists. It does "not measure interaction strength, binding affinity, or the magnitude of the biological effect", in the words of the same help page.

**Reading every arrow as the same thing.** Diagrams with arrows tend to be read as sequences of actions and outcomes [3], but an arrow in a pathway summarises experiments of different kinds. In the p53 pathway, arrows stand for phosphorylation, for switching on a gene, and for less direct effects such as "needed for". Ask students what each arrow stands for and what evidence supports it.

**Trusting enrichment results.** An enrichment p-value means little without its background set and a correction for multiple testing, yet published analyses often lack them. In a survey of research articles, almost all over-representation analyses failed to use or describe a suitable background set [4]. Other biases remain even when the methods are sound [7]. Ask students for both before they interpret a result.

**Names that mean two things.** When we tested it on 15 October 2026, STRING read "p21" as TCEAL1 rather than CDKN1A. Many proteins have several names, so teach students to use official gene symbols and to check which protein a tool has matched.

## Practical tips

- **Devices.** STRING's website and the examples on this site need only a web browser. The examples work at phone width, but a laptop gives more room for a network and its table. Cytoscape desktop is a program to install, so check that it runs on the lab computers before the class.
- **Accounts.** None are needed, for STRING or for these examples.
- **Network.** STRING answered within a few seconds in our tests, but it asks that its API be used for "limited or occasional" access. The STRING example falls back to a saved copy when STRING does not answer, and `?offline=1` uses the saved copy from the start, which suits a large class. Export any other network students need before the class.
- **Timing.** Start with the notation (arrowheads, bars and line styles) before the first task [5]. Keep networks small: Marai and colleagues suggest showing less detail, fading what matters less, or splitting a busy network across several figures [3]. Ask students to record the STRING version (12.5 when we wrote this) and their settings.
- **Accessibility.** Avoid pairs of red and green, and check figures in greyscale [3]; the examples use blue and vermilion, and different arrowheads. Labels should be at least as large as the caption text [3]. Give a table of the links for screen-reader users [8]: the pathway, STRING and Cytoscape desktop examples each have one. See the [accessibility page](../accessibility/).

## The evidence

We found no classroom studies of teaching with network diagrams or network viewers in genomics, so none of the advice here has been tested against a comparison group. It comes from three other kinds of evidence. Visualisation and accessibility research gives rules for drawing network figures [3] and for making data resources accessible [8], drawn from design principles and experience rather than from classroom trials. The general case for active learning is set out on the [planning page](../planning/). Earlier meta-analyses found only small advantages for animations over static pictures, and when Ploetzner and colleagues re-analysed one of them, animations did clearly better when students had to learn how something changes [9].

So use the interactive features for tasks, such as predicting the next step or watching links disappear as the threshold rises, rather than for display. A network that students only look at may teach no more than a static figure with a good caption. That conclusion is our reading of the evidence, and it has not been tested for networks.

## References

{: .references}
1. Szklarczyk D, Kirsch R, Koutrouli M, et al. (2023). The STRING database in 2023: protein–protein association networks and functional enrichment analyses for any sequenced genome of interest. *Nucleic Acids Research* 51(D1): D638–D646. [doi:10.1093/nar/gkac1000](https://doi.org/10.1093/nar/gkac1000)
2. Szklarczyk D, Nastou K, Koutrouli M, et al. (2025). The STRING database in 2025: protein networks with directionality of regulation. *Nucleic Acids Research* 53(D1): D730–D737. [doi:10.1093/nar/gkae1113](https://doi.org/10.1093/nar/gkae1113)
3. Marai GE, Pinaud B, Bühler K, Lex A, Morris JH (2019). Ten simple rules to create biological network figures for communication. *PLOS Computational Biology* 15(9): e1007244. [doi:10.1371/journal.pcbi.1007244](https://doi.org/10.1371/journal.pcbi.1007244)
4. Wijesooriya K, Jadaan SA, Perera KL, Kaur T, Ziemann M (2022). Urgent need for consistent standards in functional enrichment analysis. *PLOS Computational Biology* 18(3): e1009935. [doi:10.1371/journal.pcbi.1009935](https://doi.org/10.1371/journal.pcbi.1009935)
5. Offerdahl EG, Arneson JB, Byrne N (2017). Lighten the load: scaffolding visual literacy in biochemistry and molecular biology. *CBE—Life Sciences Education* 16(1): es1. [doi:10.1187/cbe.16-06-0193](https://doi.org/10.1187/cbe.16-06-0193)
6. Haynes WA, Tomczak A, Khatri P (2018). Gene annotation bias impedes biomedical research. *Scientific Reports* 8: 1362. [doi:10.1038/s41598-018-19333-x](https://doi.org/10.1038/s41598-018-19333-x)
7. Timmons JA, Szkop KJ, Gallagher IJ (2015). Multiple sources of bias confound functional enrichment analysis of global -omics data. *Genome Biology* 16: 186. [doi:10.1186/s13059-015-0761-7](https://doi.org/10.1186/s13059-015-0761-7)
8. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
9. Ploetzner R, Berney S, Bétrancourt M (2020). A review of learning demands in instructional animations: the educational effectiveness of animations unfolds if the features of change need to be learned. *Journal of Computer Assisted Learning* 36(6): 838–860. [doi:10.1111/jcal.12476](https://doi.org/10.1111/jcal.12476)
