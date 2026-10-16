---
title: Teaching with charts of genomic data
topic: charts
lede: Manhattan plots, volcano plots and heatmaps each squeeze thousands of statistical tests into one picture. Students can read them once they know what each axis, line and colour stands for, and which of those were choices.
description: How to teach students to read and criticise Manhattan plots, volcano plots and expression heatmaps, including multiple testing, the 5 × 10⁻⁸ threshold, volcano-plot cut-offs and colour scales, with activities, assessment ideas, common misconceptions and references.
---

## What charts of genomic data teach well

These charts are a direct route into data literacy. Each is built on decisions that the picture hides: a transformed axis, a threshold for significance, a way of scaling the values, a colour scale. Reading the chart well means knowing what those decisions were and what would change without them. The core bioinformatics competencies for undergraduate life scientists, drawn up after a survey of 1,260 US biology lecturers, include the statistics of large datasets and multiple comparisons [1].

After a well-designed session, students should be able to:

- read a −log₁₀(p) axis and a log₂ fold-change axis, and turn a point back into a p-value or a fold change;
- explain why testing a million variants needs a stricter threshold than testing one, and where 5 × 10⁻⁸ comes from;
- say what each cut-off on a volcano plot assumes, and predict how the list of genes changes when a cut-off moves;
- tell apart statistical significance, size of effect and cause, and explain why the variant at the top of a peak may not be the one that matters;
- read a heatmap's scaling and colour scale, and explain why its clustered order is only one of many;
- choose, build and criticise a chart for a stated question.

The first three suit first- and second-year classes in genetics or statistics. The others need more background and suit later years.

## Activities

### Read a Manhattan plot

*First or second year. 30 minutes, in pairs.*

1. Before showing anything, ask pairs to sketch what a scan of the whole genome would look like if no variant affected the trait.
2. Open the [FinnGen Manhattan plot](../../developers/charts/examples/manhattan-finngen.html) of alcohol use disorder. Pairs say what one point is, what the two axes show and what the dashed line means.
3. They find the tallest point, read its height from the axis (about 22.83) and turn it into a p-value: 10<sup>−22.83</sup>, about 1.5 × 10⁻²³. The tooltip lets them check.
4. They count the peaks above the line, then open the table under the chart: there are 19.
5. The table gives each peak's effect size (beta) and allele frequency. The tallest peak, at *ADH1B*, also has the largest effect. But the peak on chromosome 5 (variant 5:156995417:A:AT) has an effect about four times larger than most (beta 0.25 against about 0.06), and only about 1% of chromosomes carry it. It stands lower than the second-tallest peak, on chromosome 6, whose variant has a small effect (beta 0.06) and is carried by about 31% of chromosomes. Pairs explain why.

Students hand in an annotated screenshot and three sentences on why the height of a peak is not the size of the effect.

### Simulate a scan in which nothing is real

*First or second year. 50 minutes, alone and then as a class.*

1. Ask students to predict: in a scan of 1,000,000 tests where nothing is real, how many tests will have p < 0.05? How many p < 10⁻⁵, and how many p < 5 × 10⁻⁸?
2. Students open the [simulated scan](../../developers/charts/examples/null-scan.html) and compare their predictions with the counts. Chance predicts 50,000, 10 and 0.05: a million times each threshold.
3. They work out 0.05 / 1,000,000 = 5 × 10⁻⁸. Then each student presses "Run another scan" ten times and notes how many scans had any point above the line. Pooled across the class, about 1 scan in 20 does: the 5% chance of any false positive that the threshold allows.
4. Discuss where the million comes from. Pe'er and colleagues estimated about one million independent tests across the genome for common variants in people of European ancestry, and about twice that for people of African ancestry [2]. Variants close together are often inherited together, so a scan of 20 million variants is not 20 million independent tests.

Students hand in the plot and a five-sentence explanation of where 5 × 10⁻⁸ comes from. The [developers' page](../../developers/charts/#show-what-chance-alone-produces) shows how the simulation is built. Students who write R or Python can simulate the p-values themselves, in the browser: see [R and Python in the browser](../r-and-python/).

### Choose the cut-offs on a volcano plot

*Second or third year. 60 minutes, in groups of three.*

1. Explain the axes. Across is the log₂ fold change: 1 means twice as much, 0.58 means 1.5 times and −1 means half. Up is −log₁₀ of the p-value. The adjusted p-values control the false discovery rate: if you keep the genes with an adjusted p-value below 0.01, you can expect at most 1 in 100 of them, on average, to be false discoveries [3].
2. Groups open the [volcano plot](../../developers/charts/examples/volcano-thresholds.html), choose a fold-change cut-off and a p-value cut-off, and write down their reasons before they look at the count.
3. They switch between adjusted and raw p-values and record what changes. At p < 0.05 and a 1.5-fold change, the count rises from 5,444 genes with adjusted p-values to 5,897 with raw ones.
4. Groups compare their lists and discuss why they differ, and which list they would hand to a colleague for follow-up experiments.

Students hand in an annotated plot and a short justification of their cut-offs.

### Improve a heatmap one change at a time

*Second or third year, or master's. 60 to 90 minutes, in pairs.*

1. Open the heatmap [in its poor version](../../developers/charts/examples/heatmap-makeover.html?values=raw&order=alpha&colours=rainbow): values not scaled, rows in alphabetical order, rainbow colours. Pairs write down what the chart seems to show.
2. They change one thing at a time and note what each change shows or hides: z-scores within each gene, then clustered rows, then blue-white-red colours. Unscaled, the colours mostly show which genes are expressed most overall, such as *Spp1* and *Mcl1*. As z-scores, they show in which samples each gene is above or below its own average.
3. They check the red-green and rainbow versions in a colour-blindness simulator such as Coblis or Viz Palette [4].
4. They discuss what the clustering shows and what it does not: the order depends on the scaling, the distance and the linkage chosen, and the branches of a dendrogram can be swapped round without changing the tree.

Students hand in before-and-after figures, each with a caption that states the scaling, the colour scale and how the rows were ordered.

### Trace a peak to the genes beneath it

*Third year, master's or clinical students. 90 minutes, in pairs.*

1. Pairs pick a peak in the [zoomable Manhattan plot](../../developers/charts/examples/plotly-manhattan-zoom.html) and zoom in. The 2 Mb around rs1229984 alone holds 472 of the listed variants.
2. They open the same endpoint in [FinnGen's own browser](https://r13.finngen.fi/pheno/AUD_SWEDISH). Its table of lead variants gives a credible set for each peak: the variants that statistical fine-mapping says are likely to include the causal one. The *ADH1B* peak narrows to a single missense variant; the peak near *LINC01122* on chromosome 2 spreads over 482 variants.
3. For their peak, pairs list the genes nearby and say which they would study first, and why.
4. Discuss linkage disequilibrium. Variants inherited together with the causal one share its signal, so the variant with the smallest p-value need not be causal, and moving from association to a causal variant needs fine-mapping that takes linkage disequilibrium into account [5].

Students hand in a one-page memo that explains why the nearest gene is not necessarily the one that matters, and what evidence would settle it.

### See why exome sequencing misses some variants

*First or second year. 20 minutes, alone or in pairs.*

1. Open the [coverage plot](../../developers/charts/examples/coverage-cftr.html) of *CFTR* in gnomAD's genomes and exomes.
2. Ask what a mean depth of 31 means, why there is no exome line between the exons, and why the exomes are deeper over exon 6 than over exon 9. (Exome sequencing first captures the exons with probes, and some exons are captured better than others.)
3. Students say whether exome sequencing would find a variant deep in an intron of *CFTR*, and what depth they would want before trusting a call.

Students hand in three sentences comparing exome and genome sequencing for this gene.

{% include ad.html slot="in_article" %}

## Assessing what students learned

- **The Graph Rubric.** Angra and Gardner's rubric scores graph mechanics, communication and choice, each at three levels, and can be used to give students feedback as well as to mark [6].
- **"Explain this figure" questions.** Give a Manhattan or volcano plot from a paper and ask what one point is, what the lines are and what the authors' cut-offs were.
- **Multiple-choice questions whose wrong answers are common mistakes.** For example: "Variant A has −log₁₀(p) = 12 and variant B has 8. Which must be true?" (Answer: A's p-value is 10,000 times smaller than B's. Nothing follows about which effect is larger.) For peer instruction, the best questions are ones that 40 to 60% of students answer correctly the first time [7].
- **Error bars.** If your course also uses bar charts, include questions on what error bars show. From 3,506 student responses, Stoczynski and colleagues concluded that students are not getting enough teaching on variability, and called for "more scaffolded repeated instruction" [8].
- **The makeover figures**, marked on whether the caption states the scaling, the colour scale and the clustering method.

## Where students go wrong

**Reading the y axis the wrong way round.** On a −log₁₀ scale, higher means a smaller p-value, and each step up is ten times smaller. A point at 8 is not twice as significant as a point at 4: its p-value is 10,000 times smaller.

**"5 × 10⁻⁸ is a law of nature."** It is roughly a Bonferroni correction: 0.05 divided by about a million independent tests of common variants in people of European ancestry [2]. Estimated directly from UK data, the threshold came out at about 7.2 × 10⁻⁸ [9]. The threshold needed depends on allele frequency, linkage disequilibrium and ancestry, and for rare and low-frequency variants the burden of testing is smaller in recent genetic isolates [10]. FinnGen's own paper calls Finland's an isolated population [11].

**"The tallest peak is the cause, or the biggest effect."** How high a peak stands depends on the size of the effect, on how common the allele is and on how many people were studied. In the FinnGen data, a rare variant on chromosome 5 with a large effect sits lower than common variants with small ones. The *ADH1B* variant is rarer still, but its effect is so large that its peak stands highest. The top variant of a peak also shares its signal with every variant inherited along with it [5].

**"The nearest gene is the gene."** Results tables name the nearest gene to each variant because it is easy to compute. It is a place to start looking, not a finding.

**Raw p-values on a volcano plot.** If none of 15,804 genes really changed, a cut-off of p < 0.05 would still pass about 790 of them. Adjusted p-values guard against this, but correction is often skipped in related analyses: in a survey of 186 articles, 43% of enrichment analyses had none [12].

**Fold-change cut-offs as facts.** A log₂ fold change of 0.58 (1.5-fold) or 1 (2-fold) is a convention, not a biological boundary. A small change in a tightly controlled gene can matter more than a large change in one whose expression varies a lot.

**"Colour is neutral."** Rainbow and red-green colour maps distort data and are unreadable to people with colour-vision deficiency [13]. The cividis colour map was designed so that people with and without red-green colour blindness read it almost identically [14].

**Reading meaning into a clustered order.** Hierarchical clustering produces a tree from any table, even one of random numbers, and the order of its leaves can be flipped at every branch. The clusters depend on how the values were scaled, which distance was used and how clusters were joined.

**Averages that hide the spread.** The coverage plot shows the mean depth across thousands of people, and any one person's depth can be far lower. Many different distributions of data can give the same bar or line [15].

**Gene names turned into dates.** Excel, used with its default settings, turns some gene symbols into dates or numbers, and about a fifth of papers with gene lists in supplementary Excel files had such errors [16]. A later scan found them in 30.9% of such articles [17]. Ask students to open results tables in R, Python or a text editor, or to import the columns as text.

**Plotting everything without a question.** In think-aloud interviews, most undergraduates plotted all the data they were given, while all the professors thought about the data before drawing, and aligned the graph with the research question [18]. Students arriving in introductory biology also had difficulty representing data in graphs [19]. Ask for the question before the chart.

## Practical tips

- **Devices.** Laptops work best: the charts need width, and tooltips need a pointer. On phones the examples shrink and drop some labels, and a tap stands in for hovering. The tables under each chart work anywhere.
- **Accounts.** No accounts are needed, and the examples run in any recent browser.
- **Network.** The Manhattan plots read FinnGen's server, and the coverage plot reads UCSC's, each time they open. UCSC asks for no more than one request a second, so a whole class starting at once may wait a little. The volcano plot and the heatmap read files stored with the examples. Keep screenshots in case a server is down.
- **Timing.** Give students five minutes to try each chart's controls before the first question. The simulation and the threshold game each fit a 50- or 60-minute session.
- **Accessibility.** About 8% of men and 0.4% of women of European ancestry have red-green colour-vision deficiency [20]: in a class of 200 with as many men as women, expect about eight students. The examples' colours were checked for this. Charts are pictures, so each example also gives its key values as text, in a table or in a status line that screen readers announce [21]. See the [accessibility page](../accessibility/) for more.

## The evidence

Students' difficulties with graphs are well documented. Undergraduates tend to plot all the data they have, where experts start from the question [18], and a course that wove quantitative work through its biology content improved the quality of students' graphs [19]. The Graph Rubric gives a tested way to give feedback on them [6]. The general case for active learning is set out on the [planning page](../planning/).

Whether the interactive versions help more than static figures is less clear. A review of 194 studies, which re-analysed an earlier meta-analysis, found animations more effective than static pictures when the features of a change had to be learned [22]. That suggests using the live charts where change is the point, such as a moving cut-off or repeated simulations, and annotated static figures elsewhere.

We found no classroom studies that compare ways of teaching Manhattan plots, volcano plots or heatmaps. The advice on thresholds comes from statistical genetics, the advice on colour from vision science and visualisation research, and the activities from the general findings above and from teaching experience.

## References

{: .references}
1. Wilson Sayres MA, Hauser C, Sierk M, et al. (2018). Bioinformatics core competencies for undergraduate life sciences education. *PLOS ONE* 13(6): e0196878. [doi:10.1371/journal.pone.0196878](https://doi.org/10.1371/journal.pone.0196878)
2. Pe'er I, Yelensky R, Altshuler D, Daly MJ (2008). Estimation of the multiple testing burden for genomewide association studies of nearly all common variants. *Genetic Epidemiology* 32(4): 381–385. [doi:10.1002/gepi.20303](https://doi.org/10.1002/gepi.20303)
3. Benjamini Y, Hochberg Y (1995). Controlling the false discovery rate: a practical and powerful approach to multiple testing. *Journal of the Royal Statistical Society: Series B* 57(1): 289–300. [doi:10.1111/j.2517-6161.1995.tb02031.x](https://doi.org/10.1111/j.2517-6161.1995.tb02031.x)
4. Hattab G, Rhyne TM, Heider D (2020). Ten simple rules to colorize biological data visualization. *PLOS Computational Biology* 16(10): e1008259. [doi:10.1371/journal.pcbi.1008259](https://doi.org/10.1371/journal.pcbi.1008259)
5. Schaid DJ, Chen W, Larson NB (2018). From genome-wide associations to candidate causal variants by statistical fine-mapping. *Nature Reviews Genetics* 19(8): 491–504. [doi:10.1038/s41576-018-0016-z](https://doi.org/10.1038/s41576-018-0016-z)
6. Angra A, Gardner SM (2018). The Graph Rubric: development of a teaching, learning, and research tool. *CBE—Life Sciences Education* 17(4): ar65. [doi:10.1187/cbe.18-01-0007](https://doi.org/10.1187/cbe.18-01-0007)
7. Brown NCC, Wilson G (2018). Ten quick tips for teaching programming. *PLOS Computational Biology* 14(4): e1006023. [doi:10.1371/journal.pcbi.1006023](https://doi.org/10.1371/journal.pcbi.1006023)
8. Stoczynski L, Zis D, Woodruff A, et al. (2026). Revealing undergraduate biology students' conception of variability and error bars within graphing. *PLOS ONE* 21(3): e0343301. [doi:10.1371/journal.pone.0343301](https://doi.org/10.1371/journal.pone.0343301)
9. Dudbridge F, Gusnanto A (2008). Estimation of significance thresholds for genomewide association scans. *Genetic Epidemiology* 32(3): 227–234. [doi:10.1002/gepi.20297](https://doi.org/10.1002/gepi.20297)
10. Fadista J, Manning AK, Florez JC, Groop L (2016). The (in)famous GWAS P-value threshold revisited and updated for low-frequency variants. *European Journal of Human Genetics* 24(8): 1202–1205. [doi:10.1038/ejhg.2015.269](https://doi.org/10.1038/ejhg.2015.269)
11. Kurki MI, Karjalainen J, Palta P, et al. (2023). FinnGen provides genetic insights from a well-phenotyped isolated population. *Nature* 613: 508–518. [doi:10.1038/s41586-022-05473-8](https://doi.org/10.1038/s41586-022-05473-8)
12. Wijesooriya K, Jadaan SA, Perera KL, Kaur T, Ziemann M (2022). Urgent need for consistent standards in functional enrichment analysis. *PLOS Computational Biology* 18(3): e1009935. [doi:10.1371/journal.pcbi.1009935](https://doi.org/10.1371/journal.pcbi.1009935)
13. Crameri F, Shephard GE, Heron PJ (2020). The misuse of colour in science communication. *Nature Communications* 11: 5444. [doi:10.1038/s41467-020-19160-7](https://doi.org/10.1038/s41467-020-19160-7)
14. Nuñez JR, Anderton CR, Renslow RS (2018). Optimizing colormaps with consideration for color vision deficiency to enable accurate interpretation of scientific data. *PLOS ONE* 13(7): e0199239. [doi:10.1371/journal.pone.0199239](https://doi.org/10.1371/journal.pone.0199239)
15. Weissgerber TL, Milic NM, Winham SJ, Garovic VD (2015). Beyond bar and line graphs: time for a new data presentation paradigm. *PLOS Biology* 13(4): e1002128. [doi:10.1371/journal.pbio.1002128](https://doi.org/10.1371/journal.pbio.1002128)
16. Ziemann M, Eren Y, El-Osta A (2016). Gene name errors are widespread in the scientific literature. *Genome Biology* 17: 177. [doi:10.1186/s13059-016-1044-7](https://doi.org/10.1186/s13059-016-1044-7)
17. Abeysooriya M, Soria M, Kasu MS, Ziemann M (2021). Gene name errors: lessons not learned. *PLOS Computational Biology* 17(7): e1008984. [doi:10.1371/journal.pcbi.1008984](https://doi.org/10.1371/journal.pcbi.1008984)
18. Angra A, Gardner SM (2017). Reflecting on graphs: attributes of graph choice and construction practices in biology. *CBE—Life Sciences Education* 16(3): ar53. [doi:10.1187/cbe.16-08-0245](https://doi.org/10.1187/cbe.16-08-0245)
19. Speth EB, Momsen JL, Moyerbrailean GA, et al. (2010). 1, 2, 3, 4: infusing quantitative literacy into introductory biology. *CBE—Life Sciences Education* 9(3): 323–332. [doi:10.1187/cbe.10-03-0033](https://doi.org/10.1187/cbe.10-03-0033)
20. Birch J (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A* 29(3): 313–320. [doi:10.1364/JOSAA.29.000313](https://doi.org/10.1364/JOSAA.29.000313)
21. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
22. Ploetzner R, Berney S, Bétrancourt M (2020). A review of learning demands in instructional animations: the educational effectiveness of animations unfolds if the features of change need to be learned. *Journal of Computer Assisted Learning* 36(6): 838–860. [doi:10.1111/jcal.12476](https://doi.org/10.1111/jcal.12476)
