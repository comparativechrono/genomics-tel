---
title: Planning a session
lede: An interactive tool gives students something to do. What they learn from it depends on the task you set, the support you give while the tool is new, and whether the assessment checks the outcome you had in mind.
description: How to plan a university genomics session around an interactive tool, using the evidence on active learning, worked examples, cognitive load, constructive alignment, Bloom's taxonomy, course-based research and the ISCB and NIBLSE competencies, with a planning checklist.
---

This page collects the research that applies to every tool on this site. The topic pages put it into practice: each one has activities with a level and a timing, ideas for assessment and the mistakes students usually make. For tool-specific activities, go to [genome browsers](../genome-browsers/), [sequences and alignments](../sequences/), [3D structures](../structures/), [networks](../networks/), [Galaxy](../galaxy/), [R and Python in the browser](../r-and-python/), [phylogenetic trees](../trees/) or [charts of genomic data](../charts/).

## Give students a task, not a demonstration

Active learning means that students work on something in class and think about it, rather than listen. The evidence for it is strong. A meta-analysis of 225 studies of undergraduate science, engineering and mathematics courses found that examination and concept-inventory scores were on average 0.47 standard deviations higher with active learning, and that students taught by traditional lecturing were 1.5 times more likely to fail [1]. A second meta-analysis found that active learning narrowed the gaps between under-represented students and their classmates, by 33% in examination scores and 45% in pass rates, but only in classes that spent much of their time on activities [2].

Students do not always like it at first. In a randomised comparison in physics classes, students in active classes learned more, but felt that they had learned less than students who heard polished lectures [3]. They took the extra effort as a sign of poor learning. Tell students early in the course why the class works this way.

With an interactive tool, the temptation is to demonstrate it. Brown and Wilson summarise research from physics teaching: students who watch a demonstration learn no more than students who do not see it, and asking them to predict the outcome first makes demonstrations more effective [4]. So before you zoom in to single bases or rotate a structure, ask everyone to commit to a prediction, such as which codon the sickle-cell variant changes, or which residues line a pocket.

Peer instruction is another way to make students think before they look [4]. Show a multiple-choice question built on a common mistake, let every student vote, let neighbours argue for a few minutes, then vote again. The best questions are ones that 40 to 60% of students answer correctly the first time [4].

## Show worked examples, then take the support away

Early on, novices learn a new procedure better from worked examples than from solving problems, but problem solving becomes the better choice as they gain skill. Renkl and Atkinson propose fading: start with a complete example, then hand over the steps one at a time until students solve problems on their own [5]. Good examples label the steps of the solution, come several to a type of problem, sit next to matched practice problems, and prompt students to explain each step to themselves [6].

Guidance matters most for novices: its advantage fades only once learners know enough to guide themselves [7]. The reverse is also true. Support that helps novices can get in the way of students who already have the skill [8]. In programming, naming each step of a worked example (a subgoal label) helps: students given subgoal labels were better at Parsons problems, in which they put jumbled lines of code in order, than students who were not [9].

The same pattern works for any tool:

1. **A worked example.** A short screencast or a list of steps, each labelled with its purpose: "find the gene", "zoom to single bases", "read the genotype".
2. **A completion problem.** The same steps for a new case, with some left for students to do.
3. **An independent problem.** A new gene, structure or dataset, with only the step names.
4. **An open problem.** A question that nobody in the room knows the answer to, as in a research project ([below](#run-a-research-project-inside-a-course)).

Leave out the early stages for students who already use the tool well [8]. Galaxy Training Network tutorials are built this way: each one lists learning objectives written with Bloom's taxonomy, prerequisites and a time estimate, and mixes hands-on boxes with question boxes [10].

## Keep the interface from using up students' attention

New information passes through working memory, which holds only a little, for a short time [11]. An unfamiliar interface competes for that space. A tip from teachers of live coding applies to every tool: if learners work in a different environment from yours, the extra mental effort does nothing for learning, so make your set-up as close to theirs as you can [12]. In practice:

- **One starting link.** Open the tool at the right place, with the right tracks or view, so that nobody starts by hunting.
- **Only what the task needs.** Hide tracks, panels and menus that do not matter today.
- **One thing at a time.** Build fluency with one part of a picture before asking students to combine several. Offerdahl and colleagues show how to do this for the level of abstraction in molecular diagrams [13].
- **Small data first.** Start with a "toy" dataset small enough to hold in mind, then move to real, rich data [14].
- **Time to look around.** Give learners time to get used to a new interface [15]. About ten minutes suits a genome browser.
- **Instructions that last.** Teach what to look for rather than where to click, and put a date on handouts, because interfaces change [15].

Interactivity is not automatically better. The nearest evidence comes from animations: meta-analyses comparing animations with static pictures found only small advantages for animations, and a review of 194 studies, which re-analysed one of them, found a clear advantage only when students had to learn how something changes [16]. Use an interactive tool when change or movement is the point, such as rotating a binding site, zooming from a chromosome to a single base, or re-rooting a tree. Otherwise consider an annotated figure, which also works for students who cannot use the tool.

## Line up outcomes, activities and assessment

Constructive alignment means that the intended learning outcomes, the activities and the assessment all point at the same thing [17]. It changes how students study: in one study, students on more closely aligned courses were more likely to take a deep approach to learning and less likely to take a surface approach [18].

Bloom's taxonomy, in its revised form, sorts what students do into six levels: remember, understand, apply, analyse, evaluate and create [19]. The Blooming Biology Tool helps biology teachers check which level their assessment questions reach, and write questions at the higher levels [20].

Interactive tools invite vague outcomes such as "explore the genome browser" or "understand protein structure". Rewrite each one with a verb you could check in a student's work. These outcomes come from the topic pages, sorted by level:

<div class="table-wrap" markdown="1">

| Tool | Apply or analyse | Evaluate or create |
|---|---|---|
| Genome browsers | Convert a position between files that count from 0 and files that count from 1 | Judge a gene model against the evidence tracks; build one and defend it |
| Sequences and alignments | Interpret the E-value and coverage of a BLAST hit | Critique how an alignment depends on the method and its settings |
| 3D structures | Locate a variant in the structure and say what it touches | Judge whether a predicted model can be trusted, from pLDDT and PAE |
| Networks | Classify each edge by the kind of evidence behind it | Design a network figure for a stated purpose |
| Galaxy | Run a pipeline and explain each step | Test how a parameter or a reference genome changes the result |
| R and Python | Read, run and change code that filters and plots a table | Judge whether someone else's notebook reproduces its results |
| Phylogenetic trees | Infer relatedness from the most recent common ancestor | Build a tree from an alignment and critique it |
| Charts of genomic data | Separate statistical significance from effect size in a volcano plot | Explain what a genome-wide significance threshold assumes |

</div>

Here is one unit from the [genome browsers page](../genome-browsers/), lined up from outcome to assessment:

<div class="table-wrap" markdown="1">

| Intended outcome | Activity | Assessment |
|---|---|---|
| Convert between BED and VCF positions (apply) | [Off-by-one detective](../genome-browsers/#off-by-one-detective) | Peer-instruction questions and an annotated screenshot |
| Judge a gene model against the evidence (evaluate) | [Build a gene model from evidence](../genome-browsers/#build-a-gene-model-from-evidence) | Accuracy of the model, and a marked written justification |
| Report a finding about one locus (create) | A poster at the end of a research project | A poster rubric |

</div>

Write the assessment before the activity. Then check that the activity gives students practice at exactly what the assessment asks of them.

{% include ad.html slot="in_article" %}

## Run a research project inside a course

A course-based undergraduate research experience (CURE) puts a real research question into a timetabled course. Its five dimensions are the use of scientific practices, discovery, work that matters beyond the class, collaboration and iteration [21]. Bioinformatics projects suit the format: they are free, safe and possible to run remotely, and may be more accessible for students with disabilities [22].

A long-running example is the Genomics Education Partnership, in which students improve draft genome sequence and build gene models from the evidence in a genome browser. By 2010 its students had improved more than 2 million bases and produced hundreds of gene models, and they showed knowledge gains on quizzes taken before and after the course [23]. Time matters. Teachers typically gave the project 25 to 45 hours of class time, and students needed more than 36 hours to gain the full benefit of a research experience [24]. A shared central support system made up for what individual campuses lacked, such as time to develop a curriculum and IT services [25].

Students who completed all three semesters of one large CURE programme were more likely than matched students to earn a degree in science, technology, engineering or mathematics, and to graduate within six years, with no effect on their final grades [26]. CUREs vary widely, though, and which of their parts produce these benefits is not yet known [27].

Genomics CUREs that you can adapt include:

- **Yeast genes of unknown function.** More than 1,300 students at 34 institutions studied yeast "ORFan" genes, and gained an understanding of gene ontology and of how bioinformatics assigns gene function [28].
- **A cost-free CURE with Galaxy.** Students map public ChIP-seq data to a locus chosen by the teacher, in one 50-minute session a week over a 14-week semester, and present a poster [22].
- **Genome annotation with G-OnRamp.** Genome browsers built with G-OnRamp have been used in a CURE with students at 15 colleges and universities [29].
- **A protein variant in a large lecture course.** Students in a Biochemistry course of more than 70 study a novel protein variant using Google Colab; more than 250 students have taken part since autumn 2024 [30].

Almost all of this research comes from the United States. In a UK degree, a second-year practical series or a final-year project is the natural place for a CURE. Use public data only: see [genomic data and ethics](../data-and-ethics/).

## Check the course against the competency frameworks

Two frameworks describe what bioinformatics teaching should cover. The International Society for Computational Biology (ISCB) competencies were written to apply across careers and kinds of training [31]. The NIBLSE competencies are written for undergraduate life scientists, and came from a survey of 1,260 biology faculty in the United States [32].

The 14 ISCB competencies run from A to N: general biology (A), depth in an area of biology (B), data-generation technologies (C), the scientific discovery process (D), statistical methods (E), bioinformatics tools and their use (F), whether a computing system meets a scientific need (G), computing requirements (H), web and graphical computing skills (I), the command line and scripting (J), building software (K), the impact of bioinformatics on people and society (L), professional, ethical, legal, security and social issues (M), and communication (N) [31].

The nine NIBLSE competencies are the role of computation and data mining (C1), computational concepts such as algorithms and databases (C2), statistical concepts (C3), using bioinformatics tools on biological problems (C4), finding, retrieving and organising data (C5), networks and data integration (C6), command-line tools and scripts (C7), data types, structure and reproducibility (C8), and the ethical, legal, medical and social implications of biological data (C9) [32].

This is how we suggest the tools on this site map onto them:

<div class="table-wrap" markdown="1">

| Tools | NIBLSE | ISCB |
|---|---|---|
| Genome browsers | C4, C5, C8 | F, I |
| Sequences and alignments | C3, C4, C5 | E, F |
| 3D structures | C4, C5 | F, I |
| Networks | C3, C6 | E, F |
| Galaxy | C4, C5, C8 | F, H, I |
| R and Python in the browser | C2, C3, C7, C8 | E, J |
| Phylogenetic trees | C4 | A, B, F |
| Charts of genomic data | C3, C8 | E, N |
| Data and ethics, with any tool | C9 | L, M |

</div>

In a national survey, the barrier that US faculty reported most often was their own lack of expertise and training in bioinformatics. Others were students' lack of interest and preparation, and curricula that were already full [33]. The activities on this site are short and come with tested examples, to lower the first of these barriers.

## A checklist for a session with an interactive tool

1. **Outcomes.** Two to four, each with a verb you could check, at the Bloom level you are aiming for.
2. **A reason for the tool.** The task needs interaction, such as moving between scales, rotating, or changing a setting. If it does not, a figure may serve better.
3. **Data.** Public, openly consented or synthetic, and small enough to load quickly in the room. See [genomic data and ethics](../data-and-ethics/).
4. **A starting point.** One link that opens the tool where the task begins, with only the tracks or panels the task needs.
5. **Support that fades.** A worked example with labelled steps, then a completion problem, then an independent problem.
6. **A prediction or a vote.** At least one moment when every student commits to an answer before seeing the result.
7. **A second route.** A keyboard route and a text version of every visual step. See [accessibility](../accessibility/).
8. **A rehearsal.** Run the task on the room's network and devices, with the accounts students will use, and keep screenshots and other offline material in case the network fails [34].
9. **Dated instructions.** Put the date and the tool's version on handouts, and describe what to look for rather than where to click.
10. **Aligned assessment.** Decide what students hand in and how it will be marked, and check that the activity practises it.
11. **Time.** About ten minutes for students to find their way around a new tool before the first real task.

## What the evidence does and does not show

The strongest evidence is general rather than specific to a tool. Active learning has strong support across science, engineering and mathematics [1, 2], and the advice on worked examples [5, 6] and alignment [17, 18] comes from wider educational research. Within genomics, course-based research projects built on genome browsers have been studied across many institutions [23, 24], and the [phylogenetic trees page](../trees/) describes the evidence on teaching tree thinking. For the other tools, published reports mostly describe single courses and students' views of their own learning, and few compare one way of teaching with another. For network viewers and for R and Python in the browser, we found no classroom studies at all. Most of the research comes from the United States, and how well it carries over to UK courses has not been tested.

## References

{: .references}
1. Freeman S, Eddy SL, McDonough M, et al. (2014). Active learning increases student performance in science, engineering, and mathematics. *PNAS* 111(23): 8410–8415. [doi:10.1073/pnas.1319030111](https://doi.org/10.1073/pnas.1319030111)
2. Theobald EJ, Hill MJ, Tran E, et al. (2020). Active learning narrows achievement gaps for underrepresented students in undergraduate science, technology, engineering, and math. *PNAS* 117(12): 6476–6483. [doi:10.1073/pnas.1916903117](https://doi.org/10.1073/pnas.1916903117)
3. Deslauriers L, McCarty LS, Miller K, Callaghan K, Kestin G (2019). Measuring actual learning versus feeling of learning in response to being actively engaged in the classroom. *PNAS* 116(39): 19251–19257. [doi:10.1073/pnas.1821936116](https://doi.org/10.1073/pnas.1821936116)
4. Brown NCC, Wilson G (2018). Ten quick tips for teaching programming. *PLOS Computational Biology* 14(4): e1006023. [doi:10.1371/journal.pcbi.1006023](https://doi.org/10.1371/journal.pcbi.1006023)
5. Renkl A, Atkinson RK (2003). Structuring the transition from example study to problem solving in cognitive skill acquisition: a cognitive load perspective. *Educational Psychologist* 38(1): 15–22. [doi:10.1207/S15326985EP3801_3](https://doi.org/10.1207/S15326985EP3801_3)
6. Atkinson RK, Derry SJ, Renkl A, Wortham D (2000). Learning from examples: instructional principles from the worked examples research. *Review of Educational Research* 70(2): 181–214. [doi:10.3102/00346543070002181](https://doi.org/10.3102/00346543070002181)
7. Kirschner PA, Sweller J, Clark RE (2006). Why minimal guidance during instruction does not work: an analysis of the failure of constructivist, discovery, problem-based, experiential, and inquiry-based teaching. *Educational Psychologist* 41(2): 75–86. [doi:10.1207/s15326985ep4102_1](https://doi.org/10.1207/s15326985ep4102_1)
8. Kalyuga S, Ayres P, Chandler P, Sweller J (2003). The expertise reversal effect. *Educational Psychologist* 38(1): 23–31. [doi:10.1207/S15326985EP3801_4](https://doi.org/10.1207/S15326985EP3801_4)
9. Morrison BB, Margulieux LE, Ericson B, Guzdial M (2016). Subgoals help students solve Parsons problems. In: *Proceedings of the 47th ACM Technical Symposium on Computing Science Education (SIGCSE '16)*, pp. 42–47. [doi:10.1145/2839509.2844617](https://doi.org/10.1145/2839509.2844617)
10. Hiltemann S, Rasche H, Gladman S, et al. (2023). Galaxy Training: a powerful framework for teaching! *PLOS Computational Biology* 19(1): e1010752. [doi:10.1371/journal.pcbi.1010752](https://doi.org/10.1371/journal.pcbi.1010752)
11. Sweller J, van Merriënboer JJG, Paas F (2019). Cognitive architecture and instructional design: 20 years later. *Educational Psychology Review* 31(2): 261–292. [doi:10.1007/s10648-019-09465-5](https://doi.org/10.1007/s10648-019-09465-5)
12. Nederbragt A, Harris RM, Hill AP, Wilson G (2020). Ten quick tips for teaching with participatory live coding. *PLOS Computational Biology* 16(9): e1008090. [doi:10.1371/journal.pcbi.1008090](https://doi.org/10.1371/journal.pcbi.1008090)
13. Offerdahl EG, Arneson JB, Byrne N (2017). Lighten the load: scaffolding visual literacy in biochemistry and molecular biology. *CBE—Life Sciences Education* 16(1): es1. [doi:10.1187/cbe.16-06-0193](https://doi.org/10.1187/cbe.16-06-0193)
14. Timbers TA, Çetinkaya-Rundel M (2026). Ten simple rules for teaching data science. *PLOS Computational Biology* 22(6): e1014338. [doi:10.1371/journal.pcbi.1014338](https://doi.org/10.1371/journal.pcbi.1014338)
15. Via A, De Las Rivas J, Attwood TK, et al. (2011). Ten simple rules for developing a short bioinformatics training course. *PLoS Computational Biology* 7(10): e1002245. [doi:10.1371/journal.pcbi.1002245](https://doi.org/10.1371/journal.pcbi.1002245)
16. Ploetzner R, Berney S, Bétrancourt M (2020). A review of learning demands in instructional animations: the educational effectiveness of animations unfolds if the features of change need to be learned. *Journal of Computer Assisted Learning* 36(6): 838–860. [doi:10.1111/jcal.12476](https://doi.org/10.1111/jcal.12476)
17. Biggs J (1996). Enhancing teaching through constructive alignment. *Higher Education* 32(3): 347–364. [doi:10.1007/BF00138871](https://doi.org/10.1007/BF00138871)
18. Wang X, Su Y, Cheung S, Wong E, Kwong T (2013). An exploration of Biggs' constructive alignment in course design and its impact on students' learning approaches. *Assessment & Evaluation in Higher Education* 38(4): 477–491. [doi:10.1080/02602938.2012.658018](https://doi.org/10.1080/02602938.2012.658018)
19. Krathwohl DR (2002). A revision of Bloom's taxonomy: an overview. *Theory Into Practice* 41(4): 212–218. [doi:10.1207/s15430421tip4104_2](https://doi.org/10.1207/s15430421tip4104_2)
20. Crowe A, Dirks C, Wenderoth MP (2008). Biology in Bloom: implementing Bloom's Taxonomy to enhance student learning in biology. *CBE—Life Sciences Education* 7(4): 368–381. [doi:10.1187/cbe.08-05-0024](https://doi.org/10.1187/cbe.08-05-0024)
21. Auchincloss LC, Laursen SL, Branchaw JL, et al. (2014). Assessment of course-based undergraduate research experiences: a meeting report. *CBE—Life Sciences Education* 13(1): 29–40. [doi:10.1187/cbe.14-01-0004](https://doi.org/10.1187/cbe.14-01-0004)
22. Schmidt CA, Hodkinson LJ, Comstra HS, et al. (2023). A cost-free CURE: using bioinformatics to identify DNA-binding factors at a specific genomic locus. *Journal of Microbiology & Biology Education* 24(3): e00120-23. [doi:10.1128/jmbe.00120-23](https://doi.org/10.1128/jmbe.00120-23)
23. Shaffer CD, Alvarez C, Bailey C, et al. (2010). The Genomics Education Partnership: successful integration of research into laboratory classes at a diverse group of undergraduate institutions. *CBE—Life Sciences Education* 9(1): 55–69. [doi:10.1187/09-11-0087](https://doi.org/10.1187/09-11-0087)
24. Shaffer CD, Alvarez CJ, Bednarski AE, et al. (2014). A course-based research experience: how benefits change with increased investment in instructional time. *CBE—Life Sciences Education* 13(1): 111–130. [doi:10.1187/cbe-13-08-0152](https://doi.org/10.1187/cbe-13-08-0152)
25. Lopatto D, Hauser C, Jones CJ, et al. (2014). A central support system can facilitate implementation and sustainability of a classroom-based undergraduate research experience (CURE) in genomics. *CBE—Life Sciences Education* 13(4): 711–723. [doi:10.1187/cbe.13-10-0200](https://doi.org/10.1187/cbe.13-10-0200)
26. Rodenbusch SE, Hernandez PR, Simmons SL, Dolan EL (2016). Early engagement in course-based research increases graduation rates and completion of science, engineering, and mathematics degrees. *CBE—Life Sciences Education* 15(2): ar20. [doi:10.1187/cbe.16-03-0117](https://doi.org/10.1187/cbe.16-03-0117)
27. Corwin LA, Graham MJ, Dolan EL (2015). Modeling course-based undergraduate research experiences: an agenda for future research and evaluation. *CBE—Life Sciences Education* 14(1): es1. [doi:10.1187/cbe.14-10-0167](https://doi.org/10.1187/cbe.14-10-0167)
28. Miller M, Tobin T, Aiello DP, et al. (2024). CURE on yeast genes of unknown function increases students' bioinformatics proficiency and research confidence. *Journal of Microbiology & Biology Education* 25(1): e00165-23. [doi:10.1128/jmbe.00165-23](https://doi.org/10.1128/jmbe.00165-23)
29. Sargent L, Liu Y, Leung W, et al. (2020). G-OnRamp: generating genome browsers to facilitate undergraduate-driven collaborative genome annotation. *PLOS Computational Biology* 16(6): e1007863. [doi:10.1371/journal.pcbi.1007863](https://doi.org/10.1371/journal.pcbi.1007863)
30. Berndsen CE, Shenk KE, Young A, Scanlan SE, Sardelli AM, Kayll AJ (2026). Breaking barriers in large classes: using cloud computing and computational biology to implement research-inspired curricula in Biochemistry I. *Biochemistry and Molecular Biology Education* 54(5): 442–449. [doi:10.1002/bmb.70069](https://doi.org/10.1002/bmb.70069)
31. Mulder N, Schwartz R, Brazas MD, et al. (2018). The development and application of bioinformatics core competencies to improve bioinformatics training and education. *PLOS Computational Biology* 14(2): e1005772. [doi:10.1371/journal.pcbi.1005772](https://doi.org/10.1371/journal.pcbi.1005772)
32. Wilson Sayres MA, Hauser C, Sierk M, et al. (2018). Bioinformatics core competencies for undergraduate life sciences education. *PLOS ONE* 13(6): e0196878. [doi:10.1371/journal.pone.0196878](https://doi.org/10.1371/journal.pone.0196878)
33. Williams JJ, Drew JC, Galindo-Gonzalez S, et al. (2019). Barriers to integration of bioinformatics into undergraduate life sciences education: a national study of US life sciences faculty uncover significant barriers to integrating bioinformatics into undergraduate instruction. *PLOS ONE* 14(11): e0224288. [doi:10.1371/journal.pone.0224288](https://doi.org/10.1371/journal.pone.0224288)
34. Moore B, Carvajal-López P, Chauke PA, et al. (2021). Ten simple rules for organizing a bioinformatics training course in low- and middle-income countries. *PLOS Computational Biology* 17(8): e1009218. [doi:10.1371/journal.pcbi.1009218](https://doi.org/10.1371/journal.pcbi.1009218)
