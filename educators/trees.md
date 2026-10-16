---
title: Teaching with phylogenetic trees
topic: trees
lede: A phylogenetic tree shows which species share a more recent common ancestor. Students have to learn to read that from the branching, because the order of the names, the number of nodes between them and how early a lineage branches off tell them nothing about it.
description: How to teach students to read and use phylogenetic trees, with activities built on a live clade quiz and Nextstrain, the BETTSI diagnostic, common misconceptions and references.
---

## What phylogenetic trees teach well

A phylogenetic tree is a hypothesis about common ancestry: which species, genes or virus samples share a more recent common ancestor with which. Reading trees and reasoning from them is called tree-thinking [1]. Trees appear throughout genomics, from gene families to outbreak reports, yet many students misread them. In one introductory biology course, only about half of the students could judge correctly how closely the taxa on a tree were related [2].

Interactive trees earn their place when students change the tree themselves: rotating branches, moving the root, collapsing clades. Earlier meta-analyses found only small advantages for animations over static pictures, but when Ploetzner and colleagues re-analysed one of them, animations did clearly better when the change itself was what students had to learn [3].

After a well-designed session, students should be able to:

- judge which of two species is more closely related to a third from their most recent common ancestor, not from the order of the names or the number of nodes between them;
- say whether a group of species is a clade, and find the smallest clade that contains two given species;
- recognise that trees which differ only by rotation at a node, or which are drawn as a ladder rather than a tree, show the same relationships;
- read a root, branch lengths and a scale bar, support values and polytomies (nodes with more than two branches);
- explain how the choice of outgroup decides which groups are clades;
- build a tree from an alignment, root it and criticise it;
- reason carefully from a time-scaled outbreak tree, and say what it cannot show.

The first three suit a first-year class. Tree-reading skills develop before tree-building skills [4], so teach students to read trees before you ask them to build one.

## Activities

### Practise reading clades with a quiz

*First year. 20 minutes, alone or in pairs.*

Students answer six questions about a tree of nine primates and the mouse, by selecting species on the tree or choosing an answer. The page explains every wrong answer, and four of the questions are built around the misreadings described [below](#where-students-go-wrong): reading the order of the names, counting nodes, ladder thinking, and taking a rotation for a change. It works with a mouse or the keyboard.

[Open the quiz](../../developers/trees/examples/clade-quiz.html) on its own page, or see how it is built on the [developers' page](../../developers/trees/#turn-the-tree-into-a-clade-quiz). The tree is real, from a study of ultraconserved DNA elements.

1. Students work through the quiz alone, and write one sentence for each answer naming the most recent common ancestor they used.
2. Pairs compare their sentences. They press **Rotate branches at random** a few times and check that every answer still holds.
3. Finish with one question on a tree students have not seen: everyone votes, discusses in pairs, then votes again.

Students produce their answers, each with a one-sentence justification.

### Sort trees that show the same relationships

*First year. 30 to 50 minutes, in pairs.*

1. Give each pair six small trees on paper. Some differ only by rotation at a node, and some are drawn as ladders (diagonal lines) instead of trees (brackets).
2. Pairs sort the trees into sets that show the same relationships, and justify each decision with the most recent common ancestor.
3. Each pair redraws one ladder as a tree.
4. Finish with multiple-choice questions whose wrong answers come from reading the tips, counting nodes and ladder thinking: vote, discuss in pairs, vote again.

Start with the tree format rather than the ladder format. Students understand ladders less easily than trees, especially students with weaker backgrounds in biology [5], and Novick and Catley recommend teaching with the tree format first and saying plainly that the most recent common ancestor decides relatedness [6]. The rotate controls in the clade quiz make new versions of a tree in seconds.

Students produce the sorted sets, each with a one-sentence justification.

### Move the root and see which clades survive

*First or second year. 30 minutes, in pairs.*

1. Pairs open the [primate tree drawn with d3](../../developers/trees/examples/d3-tree.html), which is rooted on the mouse, and write down three clades. They leave the box for made-up support values unticked.
2. They root the tree on the galago (*Otolemur garnettii*), then on humans, and after each change check whether each of their clades is still a clade.
3. They explain in two or three sentences why the mouse makes a sensible outgroup for this tree and humans do not.

Students produce a table of their clades under each rooting, and the explanation.

### Read an outbreak tree from Nextstrain

*Second or third year, master's or clinical students. 90 minutes, in groups of three or four.*

1. Groups open [Nextstrain's Zika virus tree as it stood on 1 January 2024](https://nextstrain.org/zika@2024-01-01), so that everyone sees the same data. Nextstrain shows the tree together with places and dates [7].
2. They switch the horizontal axis between time and divergence, and explain what a branch length means in each view.
3. They answer three questions. Where and when did the outbreak in the Americas probably begin? Can this tree show who infected whom? How might the places and dates that were sampled shape the tree?

Students produce a one-page briefing note for a public-health audience, with one annotated screenshot. The [developers' page](../../developers/trees/#embed-nextstrain-at-a-fixed-date) shows how to put the same fixed view in your own page.

### Build a tree and test what it depends on

*Third year or master's. 3 hours, alone or in pairs.*

1. Students align a set of sequences, build a tree, root it on an outgroup and display it in [iTOL](https://itol.embl.de/), which is free and does not require an account [8].
2. They change one choice, such as how the alignment is trimmed or the substitution model, build the tree again, and compare the branching and the support values of the two trees.
3. They decide which clades survive both analyses, and which conclusions they would stand behind.

Students produce two annotated trees and a one-page critique. Students who have not aligned sequences before need a session on [sequences and alignments](../sequences/) first.

{% include ad.html slot="in_article" %}

## Assessing what students learned

- **BETTSI, before and after.** The Basic Evolutionary Tree-Thinking Skills Instrument is a short multiple-choice test of tree reading, checked for reliability and validity, for use before and after teaching [9]. Its final version has 11 questions on reading trees and three on confidence and familiarity, and it is [published on QUBES](https://doi.org/10.25334/ZQY1-W289) under a Creative Commons Attribution-ShareAlike licence. Its authors suggest using it first to decide how much class time each skill needs, then teaching those skills explicitly [9].
- **A delayed test.** Novick and Catley tested their tree-thinking curriculum five to six weeks after teaching, without warning students, and found a medium-sized gain over usual teaching [10]. A few tree questions in a later module show what has lasted.
- **Questions whose wrong answers are misreadings.** Write multiple-choice questions in which each wrong answer is what a student would choose by reading the tips, counting nodes or ladder thinking, as in Kummer and colleagues' 20-question assessment [11]. The clade quiz on the developers' page is built this way.
- **The reason as well as the answer.** In one course, many students gave correct answers with reasoning they had memorised but could not apply [2]. Ask for one sentence naming the most recent common ancestor, and mark the sentence.
- **Outbreak briefing notes**, marked on whether every claim stays within what the tree can show: dates with their uncertainty, nothing about who infected whom, and the gaps in sampling noted.

## Where students go wrong

**Reading the order of the tips.** Students judge relatedness by how close two names sit on the page. The branches at any node can be rotated, so the order of the tips is arbitrary [2]. In one study this misreading was less common in higher-level courses than in an introductory one [11].

**Counting nodes.** Students count the nodes between two species and take fewer nodes to mean closer relatives. In an introductory biology course, counting nodes and counting the shared characters marked on a tree were the commonest wrong ways of reasoning [2]. In another study, node counting was more common in higher-level courses than in an introductory one [11]. What matters is how recent the most recent common ancestor is. The gibbon question in the clade quiz is built to catch node counting.

**Ladder thinking.** Students read a tree as a ladder of progress, from "primitive" species near the root to "advanced" ones, often humans, at the far end. Omland and colleagues call its most serious form the "primitive lineage fallacy": taking a lineage with few species that branches off early to be ancestral [12]. On most trees students meet, every tip is a living species, and every lineage has been evolving for the same length of time since the root. In one study, ladder thinking, and the belief that species that look alike must be close relatives, persisted through a typical undergraduate degree [11].

**Taking a rotation for a change.** The same tree can be drawn in many ways. Rotate the branches at any node, or redraw the brackets as a diagonal ladder, and the relationships stay the same, but students may read a new drawing as a new tree. In experiments that asked students to translate between the two drawings, they understood ladders less well than trees, especially students with weaker backgrounds in biology [5]. Practise with several drawings of one tree, and ask what has changed.

**One living species descended from another.** Students say that one living species evolved from another, as in "humans evolved from chimpanzees". Living species share ancestors; neither is the other's ancestor [2].

**Branch lengths.** On a tree drawn to scale, a branch's length shows the amount of change; on a time tree it shows time; on many textbook trees it means nothing. Kummer and colleagues found students judging relatedness by the length of the lines between two species, and suggest that the habit may start when students first meet trees drawn to scale [11].

**Polytomies.** A node with more than two branches usually means that the order of splitting is not known. After two days of teaching, students marked clades well but still misjudged relatedness, especially among species in a polytomy [13].

**Textbook trees.** In 31 biology textbooks, about 72% of the evolutionary diagrams were cladograms, with almost no explanation of how to read them, and the authors judged many of the diagrams confusing [14].

## Practical tips

- **Before you teach.** Gregory's introduction to evolutionary trees explains how to read them and covers ten common misconceptions [15]. It suits staff who have not taught trees before.
- **Devices.** The live examples work on phones, but long species names leave little room for the tree, so laptops are better. Keep paper copies too, so that students can rotate and redraw trees by hand. To show how one tree fits into the whole tree of life, OneZoom lets students zoom through all of it, and runs smoothly even on old phones [16].
- **Accounts.** The examples and Nextstrain need no account. iTOL is free, and its accounts are optional [8].
- **Network.** The quiz and the other primate examples carry their tree inside the page, but load their software from the internet, and Nextstrain needs a steady connection. Keep the Newick text and pictures of the key views in case the network fails.
- **Timing.** Come back to trees in later modules rather than teaching them once. In several studies, misreadings survived the teaching [2, 11, 13].
- **Accessibility.** A tree is a picture, so give a text version: the Newick text or a nested list, as the examples do, or a tactile print. Label clades in words, not by colour alone ([WCAG 2.2](https://www.w3.org/TR/WCAG22/), success criterion 1.4.1). The clade quiz works from the keyboard; the phylotree.js menu and Phylocanvas.gl do not. See the [accessibility page](../accessibility/).

## The evidence

Tree-thinking has better evidence than most topics on this site: comparative studies of teaching, well-documented misconceptions, and a validated diagnostic.

- A software laboratory, and a paper-based activity with a recorded lecture, both gave large gains on some misconceptions, and did equally well overall [17].
- In a study of 117 students, a research-based curriculum of a booklet, a laboratory and lectures gave a medium-sized gain over usual teaching, on a test five to six weeks later. Novick and Catley concluded that the key idea for expert tree-reading is that any one tree is a small part of the whole tree of life [10].
- Broad teaching that left students to draw their own conclusions added very little to their understanding, while teaching aimed at relationships helped to some extent [2].
- Students read trees more easily than ladders [5], and learn to read trees before they learn to build them [4].
- More generally, the case for active learning is set out on the [planning page](../planning/).

The research does not show that tree viewers like those on our developers' page help. We found no studies of them, so the clade quiz is built on the research into misconceptions, not on trials of the quiz itself. Most of the classroom studies cited here come from universities in the United States, and many from introductory biology courses.

## References

{: .references}
1. Meisel RP (2010). Teaching tree-thinking to undergraduate biology students. *Evolution: Education and Outreach* 3(4): 621–628. [doi:10.1007/s12052-010-0254-9](https://doi.org/10.1007/s12052-010-0254-9)
2. Dees J, Momsen JL, Niemi J, Montplaisir L (2014). Student interpretations of phylogenetic trees in an introductory biology course. *CBE—Life Sciences Education* 13(4): 666–676. [doi:10.1187/cbe.14-01-0003](https://doi.org/10.1187/cbe.14-01-0003)
3. Ploetzner R, Berney S, Bétrancourt M (2020). A review of learning demands in instructional animations: the educational effectiveness of animations unfolds if the features of change need to be learned. *Journal of Computer Assisted Learning* 36(6): 838–860. [doi:10.1111/jcal.12476](https://doi.org/10.1111/jcal.12476)
4. Halverson KL (2011). Improving tree-thinking one learnable skill at a time. *Evolution: Education and Outreach* 4(1): 95–106. [doi:10.1007/s12052-010-0307-0](https://doi.org/10.1007/s12052-010-0307-0)
5. Novick LR, Catley KM (2007). Understanding phylogenies in biology: the influence of a Gestalt perceptual principle. *Journal of Experimental Psychology: Applied* 13(4): 197–223. [doi:10.1037/1076-898X.13.4.197](https://doi.org/10.1037/1076-898X.13.4.197)
6. Novick LR, Catley KM (2013). Reasoning about evolution's grand patterns: college students' understanding of the tree of life. *American Educational Research Journal* 50(1): 138–177. [doi:10.3102/0002831212448209](https://doi.org/10.3102/0002831212448209)
7. Hadfield J, Megill C, Bell SM, et al. (2018). Nextstrain: real-time tracking of pathogen evolution. *Bioinformatics* 34(23): 4121–4123. [doi:10.1093/bioinformatics/bty407](https://doi.org/10.1093/bioinformatics/bty407)
8. Letunic I, Bork P (2024). Interactive Tree of Life (iTOL) v6: recent updates to the phylogenetic tree display and annotation tool. *Nucleic Acids Research* 52(W1): W78–W82. [doi:10.1093/nar/gkae268](https://doi.org/10.1093/nar/gkae268)
9. Jenkins KP, Mead L, Baum DA, et al. (2022). Developing the BETTSI: a tree-thinking diagnostic tool to assess individual elements of representational competence. *Evolution* 76(4): 708–721. [doi:10.1111/evo.14458](https://doi.org/10.1111/evo.14458)
10. Novick LR, Catley KM (2016). Fostering 21st-century evolutionary reasoning: teaching tree thinking to introductory biology students. *CBE—Life Sciences Education* 15(4): ar66. [doi:10.1187/cbe.15-06-0127](https://doi.org/10.1187/cbe.15-06-0127)
11. Kummer TA, Whipple CJ, Jensen JL (2016). Prevalence and persistence of misconceptions in tree thinking. *Journal of Microbiology & Biology Education* 17(3): 389–398. [doi:10.1128/jmbe.v17i3.1156](https://doi.org/10.1128/jmbe.v17i3.1156)
12. Omland KE, Cook LG, Crisp MD (2008). Tree thinking for all biology: the problem with reading phylogenies as ladders of progress. *BioEssays* 30(9): 854–867. [doi:10.1002/bies.20794](https://doi.org/10.1002/bies.20794)
13. Phillips BC, Novick LR, Catley KM, Funk DJ (2012). Teaching tree thinking to college students: it's not as easy as you think. *Evolution: Education and Outreach* 5(4): 595–602. [doi:10.1007/s12052-012-0455-5](https://doi.org/10.1007/s12052-012-0455-5)
14. Catley KM, Novick LR (2008). Seeing the wood for the trees: an analysis of evolutionary diagrams in biology textbooks. *BioScience* 58(10): 976–987. [doi:10.1641/B581011](https://doi.org/10.1641/B581011)
15. Gregory TR (2008). Understanding evolutionary trees. *Evolution: Education and Outreach* 1(2): 121–137. [doi:10.1007/s12052-008-0035-x](https://doi.org/10.1007/s12052-008-0035-x)
16. Wong Y, Rosindell J (2022). Dynamic visualisation of million-tip trees: the OneZoom project. *Methods in Ecology and Evolution* 13(2): 303–313. [doi:10.1111/2041-210X.13766](https://doi.org/10.1111/2041-210X.13766)
17. Perry J, Meir E, Herron JC, Maruca S, Stal D (2008). Evaluating two approaches to helping college students understand evolutionary trees through diagramming tasks. *CBE—Life Sciences Education* 7(2): 193–201. [doi:10.1187/cbe.07-01-0007](https://doi.org/10.1187/cbe.07-01-0007)
