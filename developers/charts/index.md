---
title: Charting genomic data
topic: charts
lede: Build Manhattan plots, volcano plots, heatmaps and sequencing-depth plots into a teaching page. Vega-Lite suits most pages, because each chart is a short description that students can read and change. Use Plotly.js when students need to zoom.
description: How to build interactive Manhattan plots, volcano plots, expression heatmaps and sequencing-depth plots into teaching pages with Vega-Lite, Plotly.js or Observable Plot, from public FinnGen, Galaxy Training Network and gnomAD data, with live examples.
---

## Which charting library to use

<div class="table-wrap" markdown="1">

| <span class="visually-hidden">Feature</span> | Vega-Lite | Observable Plot | Plotly.js |
|---|---|---|---|
| What it is | A chart written as a description: the data, the marks, and which field goes where | A chart built by a short JavaScript function, from the makers of d3 | Charts built from "traces", with zooming and selection built in |
| Download, compressed | 280 kB for three scripts | 160 kB with d3 | 500 kB for the common chart types |
| Best for | Most teaching pages, and charts that students edit | Short code and fast drawing of large scatter plots | Zooming into a region and selecting points |
| Screen readers | Labels the chart and each mark from text you give it | Labels from text you give it | Nothing on the data: describe the chart yourself |
| Limits | No zooming unless you add it; slows down above about 10,000 marks | Still version 0.6, so updates can change how it works; no zooming | Largest; a "Share chart" button sends charts to Plotly's cloud unless you turn it off |
| Licence | BSD 3-Clause | ISC | MIT |

</div>

Vega-Lite [1] describes a chart as a JavaScript object, or a JSON file: where the data are, which mark to draw, and which field goes on each axis and colour. Python's Altair library writes the same descriptions, so the grammar students learn here also works in a notebook. We built the same charts with Observable Plot 0.6.17: its code was the shortest and it drew the 15,804 points of the volcano plot in under 0.2 seconds, but it cannot zoom and has had no release since February 2025.

The examples below use real public data: genome-wide association results from FinnGen, RNA-seq results from the Galaxy Training Network and sequencing depth from gnomAD. All were tested on 15 October 2026 in Chromium 141, with Vega 6.4.0, Vega-Lite 6.4.3 and vega-embed 7.3.0, and Plotly.js 4.1.1 for the zoomable plot.

## Start with a simple chart

Three script tags and one call to `vegaEmbed` give you a chart. The chart itself is a plain object, called a specification, with the data, a mark and an encoding.

{% include example.html file="examples/vega-lite-basic.html" title="A Vega-Lite bar chart of the human chromosomes" height="330" %}

How it works:

- **Three scripts, in this order.** Vega draws the chart, Vega-Lite turns the short specification into a full Vega one, and vega-embed puts it in the page and adds tooltips.
- **The specification** has `data`, a `mark` (here `bar`) and an `encoding`, which says which field goes on `x`, `y`, `color` or `tooltip`. The `type` of each field tells Vega-Lite how to treat it: `nominal` for names, `quantitative` for numbers.
- **`width: "container"`** makes the chart as wide as the element it sits in, and redraws it when the window changes size.
- **`description`** becomes the chart's label for screen readers. Vega also describes each axis and each bar.
- **`actions: false`** hides vega-embed's menu. The menu offers downloads, but also "Open in Vega Editor", which sends the specification, with any data written into it, to vega.github.io.

To try changes without a page of your own, use the online [Vega Editor](https://vega.github.io/editor/). It takes the same specification written as JSON, so students can paste one in and change it.

## Draw a Manhattan plot from FinnGen's results

A Manhattan plot places every tested variant along the genome, with −log₁₀ of its p-value upwards, so the strongest associations stand tallest. This one reads FinnGen's published results for alcohol use disorder [2] from FinnGen's own server each time it opens.

{% include example.html file="examples/manhattan-finngen.html" title="Manhattan plot of FinnGen R13 results for alcohol use disorder" height="515" caption="FinnGen release R13, endpoint AUD_SWEDISH: 29,711 cases and 470,475 controls. Open the table under the chart to compare the height of each peak with its effect size and allele frequency." %}

How the code works:

- **The data** come from FinnGen's results browser, PheWeb [3], as one file from `r13.finngen.fi` (145 kB to download, 1 MB unpacked) at `/api/manhattan/pheno/AUD_SWEDISH`. It lists the 2,080 strongest variants one by one and sends the rest already summarised in 3 Mb bins, which is all a picture of the whole genome needs. Other endpoints work the same way: change the code at the end of the address (`T2D` gives type 2 diabetes, 663 kB with 10,122 variants listed).
- **One axis for 23 chromosomes.** Each variant goes at its chromosome's start plus its own position, using the GRCh38 chromosome lengths. The labels sit at each chromosome's middle, and any chromosome narrower than 13 pixels loses its label, so that they do not overlap on a phone.
- **Layers** draw the binned ranges, the binned values, the listed variants, the line at p = 5 × 10⁻⁸ (7.3 on the −log₁₀ scale) and the labels. Each layer can have its own `data`.
- **Tooltips that are easy to hit.** A `params` entry with `nearest: true` gives the variants an invisible Voronoi layer, so the tooltip opens for whichever point is nearest and the pointer need not land on a dot a few pixels wide.
- **Screen readers** get the chart's `description` and a `description` for each listed variant. The binned layers have `aria: false`; without it, Vega would label almost 8,000 marks.
- **The table** is the text version of the chart: the top variant of each of the 19 peaks past the line, with FinnGen's effect size (beta) and the frequency of the allele.

FinnGen's server answers requests from any website, and from pages opened from your own disk, so the page needs no copy of FinnGen's data.

## Show what chance alone produces

A scan of a genome with no real associations still produces peaks. This example simulates one: a million random p-values, which is what a million independent tests of variants with no effect would give. Students can run it again and again, and count how often anything crosses 5 × 10⁻⁸. The [educators' page](../../educators/charts/#simulate-a-scan-in-which-nothing-is-real) turns it into a class activity.

{% include example.html file="examples/null-scan.html" title="A simulated genome-wide scan with no real associations" height="620" caption="Simulated data: no genome or person is involved." %}

What the code does:

- **With no real effect, a p-value is equally likely to fall anywhere between 0 and 1**, so `1 - Math.random()` stands in for one test. In our tests, one scan of a million, drawn on the chart, took about 0.4 seconds, and 100 scans, of which only the last is drawn, took about 2 seconds.
- **Only tests with p < 0.01 are drawn**, about 10,000 of them, in the same spirit as FinnGen's bins.
- **A named dataset.** The points sit in `datasets: { points: … }`, so each new scan replaces them with `view.data("points", …).runAsync()` instead of rebuilding the chart.
- **The table** sets each count beside what chance predicts: a million times the threshold.

Chance predicts 50,000 tests below 0.05 and 10 below 10⁻⁵ in every scan. With the line at 5 × 10⁻⁸, the probability that at least one test in a million crosses it is 1&nbsp;−&nbsp;(1&nbsp;−&nbsp;5&nbsp;×&nbsp;10⁻⁸)<sup>1,000,000</sup>, about 5%, and in our runs about 5 scans in 100 did. That is what the threshold is for. It is 0.05 divided by one million, the number of independent tests that Pe'er and colleagues estimated for common variants in European genomes [4].

{% include ad.html slot="in_article" %}

## Let students move the cut-offs on a volcano plot

A volcano plot shows a whole table of differential-expression results at once: fold change across, −log₁₀ of the p-value upwards. The genes people talk about are the ones past two cut-offs, and where the cut-offs go is a choice. Here students move them and watch the list of genes change.

{% include example.html file="examples/volcano-thresholds.html" title="Volcano plot of 15,804 mouse genes, with cut-offs you can move" height="645" caption="limma-voom results [5, 6] for luminal cells from pregnant and lactating mice [7], from the Galaxy Training Network's training data [8, 9], CC BY 4.0." %}

Points to note in the code:

- **The cut-offs are parameters.** `params` declares `lfcCut`, `pCut` and `useAdj`, and the calculations in `transform` use them to give each gene its height and its group. The page changes them with `view.signal("lfcCut", 1).runAsync()`, and Vega recalculates only what depends on them: 0.2 to 0.4 seconds for 15,804 genes in our tests.
- **The controls are ordinary HTML**, a slider and two menus with labels, so they work from a keyboard. The chart redraws when the slider is let go (its `change` event), while the text beside it follows every move (`input`). Vega-Lite can also make controls for you with `bind`, but you then have less say over how they look and behave.
- **The dashed lines move** because their positions are calculated from the same parameters, in small layers of their own.
- **The status line** counts the genes past both cut-offs, and screen readers announce it after each change. At the start (adjusted p < 0.01 and a 1.5-fold change) it is 4,429 genes: 2,101 higher in pregnancy and 2,328 higher in lactation.
- **Labels.** Vega-Lite does not move labels apart when they collide. The page labels only the three genes on each side that sit furthest out (fold change times −log₁₀ p), placed towards the middle so that they cannot run off the edge.
- **The data** are 5 of the 9 columns of the published table, rounded to 6 significant figures and stored next to the page: 1.1 MB instead of 2.5 MB. No gene changes group at any setting the page offers, and `data/README.txt` says how the file was made.

The columns `adj.P.Val` and `P.Value` have dots in their names, which Vega reads as paths into nested objects. The page renames them as it reads the table. Inside a Vega expression you can also write `datum['adj.P.Val']`.

## Choose the scaling, order and colours of a heatmap

A heatmap shows a table of numbers as colours, and what it shows depends on three choices: how the values are scaled, how the rows are ordered and which colours are used. This example lets students change all three, so it can carry a "makeover" activity.

{% include example.html file="examples/heatmap-makeover.html" title="Expression heatmap of 31 genes, with a choice of scaling, order and colours" height="770" tall=true caption="Normalised expression from the Galaxy Training Network's heatmap training data [10], CC BY 4.0. The address can set the starting choices, as in [this poor version](examples/heatmap-makeover.html?values=raw&order=alpha&colours=rainbow)." %}

How the example is put together:

- **From a wide table to long data.** `fold` turns the 12 sample columns into rows of gene, sample and value. Sample names with dots, such as `MCL1.DG`, must be escaped (`"MCL1\\.DG"` in JavaScript), for the reason given above.
- **z-scores in the specification.** `joinaggregate` adds each gene's mean and standard deviation to its rows, and `calculate` turns each value into a z-score: how far that sample sits above or below the gene's own average.
- **Clustering happens beforehand.** Vega-Lite cannot cluster rows or draw a dendrogram. The clustered order was worked out in Python with SciPy, by average linkage on the z-scores, and pasted into the page as a list.
- **The colour scale** `redblue`, reversed and with `domainMid: 0`, puts white at each gene's average, blue below and red above, and `clamp` gives anything beyond ±2.5 the end colours. The red-green and rainbow choices are there to be criticised.
- **Each change rebuilds the chart.** The page writes a new specification and calls `vegaEmbed` again, which is quick for 372 cells.
- **The text version** names the group in which each gene is highest and lowest: 31 short rows instead of 372 numbers.

The file next to the page holds the 31 rows the chart needs, unchanged: 8 kB, where the full table on Zenodo is 4 MB.

## Plot sequencing depth across exons

A coverage plot shows how many sequencing reads cover each base. This one sets gnomAD's genomes beside its exomes across exons 4 to 9 of *CFTR* [11, 12]. It shows students that exome sequencing reads little beyond the exons, and that its depth changes from exon to exon.

{% include example.html file="examples/coverage-cftr.html" title="Sequencing depth across CFTR exons 4 to 9 in gnomAD genomes and exomes" height="495" %}

A few points about the code:

- **The UCSC Genome Browser's API** [13] returns any track in a region as JSON. The page asks `api.genome.ucsc.edu` for `getData/track` with the genome, chromosome, start, end and track name (`API` in the code). It allows requests from any website. Its positions count from 0, as in BED files, so the page adds 1 to match what genome browsers show.
- **One request a second.** UCSC recommends no more than one request a second to its API, so the page fetches its three tracks in turn, with a pause between them. The data take about 3 seconds to arrive.
- **Gaps in a line.** Exome depth exists only near the exons. Elsewhere the page sets it to `null`, and Vega-Lite breaks the line there instead of joining across the gap.
- **Layers that share an axis** need the same explicit `domain`. Without it, the exon bands pull the axis back to 0, because rectangles start their scales at zero by default.
- **The tooltip** comes from an invisible rule at every base with `nearest: true`, so it always shows both depths at the base nearest the pointer.
- **The text version** gives the average depth across each exon.

## Zoom into a peak with Plotly.js

Vega-Lite charts do not zoom unless you build it in. Plotly.js zooms and pans with no extra code, which suits tasks such as "zoom into the peak on chromosome 4 and count the variants in it". This is the FinnGen plot again, with buttons that go to four peaks.

{% include example.html file="examples/plotly-manhattan-zoom.html" title="A zoomable Manhattan plot made with Plotly.js" height="575" %}

What the code does:

- **Traces.** Plotly takes one array per axis for each set of points, called a trace. A `null` in the arrays breaks a line, which is how the binned ranges become separate strokes.
- **The toolbar.** Plotly 4 adds a "Share chart" button unless told not to. After a dialog, it opens Plotly Cloud in a new tab and sends it the chart, data included. Turn it off with `showSendToCloud: false`, remove the link to Plotly's website with `displaylogo: false`, and take out tools you do not need with `modeBarButtonsToRemove`.
- **Hover labels** come from `hovertemplate`; `<extra></extra>` hides the trace name that Plotly adds to each one.
- **Words for every view.** Plotly adds nothing that a screen reader can use. After every zoom (the `plotly_relayout` event), the page says in a status line what is in view and which variant is strongest, and relabels the axis with positions such as `4:99.5 Mb`.
- **Keyboard.** The buttons above the chart and Plotly's toolbar work from the keyboard; dragging does not. The chart sits in a `<figure>` with a caption. Do not give it `role="img"`, which would hide the toolbar's buttons from screen readers.

The cartesian bundle used here holds the common chart types, including scatter, bar, box and heatmap: 1.5 MB, or about 500 kB to download. The full `plotly.min.js` is 4.8 MB.

## Make charts that everyone can read

- **Colour.** The examples use blue (`#2a78d6`) with orange (`#eb6834`) for alternating chromosomes and for the two coverage lines, and blue with red (`#e34948`) on the volcano plot. Both pairs stay far apart under simulated red-green colour blindness, which affects about 8% of men and 0.4% of women of European ancestry [14]. On the volcano plot, grey means "neither", and the dashed lines say the same thing by position.
- **Colour scales.** For values either side of zero, such as z-scores, use a diverging scale with a pale middle, such as ColorBrewer's red-blue. For values from low to high, use a sequential scale such as viridis. Rainbow and red-green scales distort the data, and many colour-blind readers cannot read them [15].
- **Never colour alone.** Give every chart with two or more colours a legend, or label the groups on the chart itself.
- **Text versions.** In Vega-Lite, the chart's `description` and the `description` encoding become labels for screen readers, and `aria: false` keeps dense background layers out of the way. Put a short table or summary next to each chart; a table of every point is too long to use [16].
- **Keyboard.** Nothing inside a Vega-Lite chart can be reached with the Tab key, and tooltips need a pointer. The examples put their controls in ordinary HTML and give the key values in text, so nothing depends on hovering.
- **Phones.** `width: "container"` fits a chart to the screen. Leave out labels that would overlap, as the Manhattan plots do for small chromosomes, and remember that a tap stands in for hovering.

The [accessibility page](../accessibility/) has more.

## Things that catch people out

- **Large data.** Drawn as SVG, every point is an element in the page. Vega drew the 15,804 points of the volcano plot in about 140 ms as SVG and 90 ms with `renderer: "canvas"` in our tests, but a canvas has no labels for screen readers, and phones are slower. For millions of points, do what PheWeb does: draw the strong signals one by one and summarise the rest.
- **Data that do not load.** With `data: { url: … }` inside a specification, a failed download leaves empty axes, and the only sign is a warning in the browser's console. Fetch the data yourself, as these examples do, and say on the page when it fails.
- **Zenodo addresses.** Zenodo's `?download=1` links do not allow use from other websites, but its API addresses (`api/records/…/files/…/content`) do; the volcano example's code has one. Zenodo does not compress files, and it limits the requests it accepts from one address (its replies gave a limit of 133 when we tested). Two of our requests failed and showed in the browser as CORS errors before a third worked. For a class, store a copy next to the page, as the volcano and heatmap examples do, if the licence allows it.
- **Opening a downloaded example.** A page opened from your disk cannot read files beside it. Run `python3 -m http.server` in the folder and open `http://localhost:8000/`, or point the address at a published copy. The basic, FinnGen, simulated and UCSC examples work straight from disk.
- **Thresholds hidden in code.** Keep each cut-off in one named place (`THRESHOLD`, or a parameter), draw it on the chart, and say whether the p-values were adjusted. Vega expressions have no `log10`: write `-log(p) / LN10`. A p-value stored as 0 gives an infinite height; replace it with the smallest value the tool can report, and say so.
- **Versions.** Each example names exact versions. Vega-Lite 6.5.0 came out on 8 October 2026 and Plotly.js 4.1.2 on 5 October 2026, and we have not tested them yet. When you update, read the release notes and test the page again.

## Licences and credits

Vega, Vega-Lite and vega-embed are under the BSD 3-Clause licence, Plotly.js is under MIT, and Observable Plot and d3 are under ISC. If you publish teaching material built on Vega-Lite, cite its paper [1].

<div class="table-wrap" markdown="1">

| Data | Terms | Cite |
|---|---|---|
| FinnGen R13 | Free to download. FinnGen asks you to acknowledge "the participants and investigators of the FinnGen study". We found no licence for copying the data, so the examples read them from FinnGen's server. | [2] |
| Galaxy Training Network files on Zenodo | CC BY 4.0: you may copy and adapt them if you give credit and say what you changed, as `data/README.txt` does | [7, 9, 10] |
| gnomAD sequencing depth | Released "without restriction on use", according to gnomAD's entry in the Registry of Open Data on AWS. We could not open gnomAD's own terms page when we tested, so check it before you store a copy. | [11, 12] |
| UCSC Genome Browser data | Free for any use, with restrictions on some tracks noted on their description pages. UCSC asks to be cited. | [13] |

</div>

## References

{: .references}
1. Satyanarayan A, Moritz D, Wongsuphasawat K, Heer J (2017). Vega-Lite: a grammar of interactive graphics. *IEEE Transactions on Visualization and Computer Graphics* 23(1): 341–350. [doi:10.1109/TVCG.2016.2599030](https://doi.org/10.1109/TVCG.2016.2599030)
2. Kurki MI, Karjalainen J, Palta P, et al. (2023). FinnGen provides genetic insights from a well-phenotyped isolated population. *Nature* 613: 508–518. [doi:10.1038/s41586-022-05473-8](https://doi.org/10.1038/s41586-022-05473-8)
3. Gagliano Taliun SA, VandeHaar P, Boughton AP, et al. (2020). Exploring and visualizing large-scale genetic associations by using PheWeb. *Nature Genetics* 52: 550–552. [doi:10.1038/s41588-020-0622-5](https://doi.org/10.1038/s41588-020-0622-5)
4. Pe'er I, Yelensky R, Altshuler D, Daly MJ (2008). Estimation of the multiple testing burden for genomewide association studies of nearly all common variants. *Genetic Epidemiology* 32(4): 381–385. [doi:10.1002/gepi.20303](https://doi.org/10.1002/gepi.20303)
5. Law CW, Chen Y, Shi W, Smyth GK (2014). voom: precision weights unlock linear model analysis tools for RNA-seq read counts. *Genome Biology* 15: R29. [doi:10.1186/gb-2014-15-2-r29](https://doi.org/10.1186/gb-2014-15-2-r29)
6. Ritchie ME, Phipson B, Wu D, et al. (2015). limma powers differential expression analyses for RNA-sequencing and microarray studies. *Nucleic Acids Research* 43(7): e47. [doi:10.1093/nar/gkv007](https://doi.org/10.1093/nar/gkv007)
7. Fu NY, Rios AC, Pal B, et al. (2015). EGF-mediated induction of Mcl-1 at the switch to lactation is essential for alveolar cell survival. *Nature Cell Biology* 17(4): 365–375. [doi:10.1038/ncb3117](https://doi.org/10.1038/ncb3117)
8. Hiltemann S, Rasche H, Gladman S, et al. (2023). Galaxy Training: a powerful framework for teaching! *PLOS Computational Biology* 19(1): e1010752. [doi:10.1371/journal.pcbi.1010752](https://doi.org/10.1371/journal.pcbi.1010752)
9. Doyle M (2018). RNA-seq genes to pathways (training data). Zenodo. [doi:10.5281/zenodo.2596382](https://doi.org/10.5281/zenodo.2596382)
10. Doyle M (2018). Heatmap2 (training data). Zenodo. [doi:10.5281/zenodo.2529926](https://doi.org/10.5281/zenodo.2529926)
11. Karczewski KJ, Francioli LC, Tiao G, et al. (2020). The mutational constraint spectrum quantified from variation in 141,456 humans. *Nature* 581: 434–443. [doi:10.1038/s41586-020-2308-7](https://doi.org/10.1038/s41586-020-2308-7)
12. Chen S, Francioli LC, Goodrich JK, et al. (2024). A genomic mutational constraint map using variation in 76,156 human genomes. *Nature* 625: 92–100. [doi:10.1038/s41586-023-06045-0](https://doi.org/10.1038/s41586-023-06045-0)
13. Nassar LR, Barber GP, Benet-Pagès A, et al. (2023). The UCSC Genome Browser database: 2023 update. *Nucleic Acids Research* 51(D1): D1188–D1195. [doi:10.1093/nar/gkac1072](https://doi.org/10.1093/nar/gkac1072)
14. Birch J (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A* 29(3): 313–320. [doi:10.1364/JOSAA.29.000313](https://doi.org/10.1364/JOSAA.29.000313)
15. Crameri F, Shephard GE, Heron PJ (2020). The misuse of colour in science communication. *Nature Communications* 11: 5444. [doi:10.1038/s41467-020-19160-7](https://doi.org/10.1038/s41467-020-19160-7)
16. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
