---
title: Teaching with R and Python in the browser
topic: r-and-python
lede: When R and Python run inside a web page, students can write and run code from the first minute, on any computer with a current browser and nothing to install. That leaves more class time for reading, predicting and explaining code.
description: How to teach genomics with R and Python running in the browser (webR, Pyodide and JupyterLite), with activities, assessment ideas, common mistakes, practical tips and references.
---

## What R and Python in the browser teach well

Code that runs inside a web page takes away the installation step. Students open a link and start, on a university computer, their own laptop or a borrowed one, and one page can hold the instructions, the data and the code. That suits short, focused tasks: reading code and predicting what it does, changing one thing and seeing what happens, and building an analysis one step at a time. It suits sequences, small tables and plots. It does not suit large data, command-line programs such as BLAST, or packages that do not work in the browser, such as DESeq2, which installs in webR but does not load.

After a well-designed session, students should be able to:

- run and change code that analyses a DNA sequence, such as its GC content, reverse complement and translation;
- predict what a change to the code will do, and explain the difference when the prediction is wrong;
- read an error message and use it to find the mistake;
- explain how a choice in an analysis, such as the size of a window, changes the result;
- write a notebook that explains each step and runs from top to bottom in a fresh session;
- judge whether someone else's notebook would give the same results again.

The first four suit a first-year class. The last two suit students who already write some code, and lead into project work.

## Activities

### Predict the GC content plot, then run the code

*First year. 30 minutes, in pairs.*

1. Open the [R code boxes](../../developers/r-and-python/examples/webr-code-boxes.html) on the screen, run boxes 1 and 2, and talk through what each line does.
2. Before anyone changes the code, each pair sketches what the plot will look like with a window of 50 bases, and with one of 1,000. Watching a demonstration teaches little unless students first commit to a prediction, out loud or on paper [1].
3. Pairs change the window, run box 2 again and compare the plot with their sketches. Where a sketch was wrong, they write one sentence on why.
4. Box 3 finds where the GC-rich windows start and end. The sequence is simulated, so the true answer is known (bases 1,501 to 2,500), and pairs explain why the windows blur the edges.
5. Finish with a question that everyone votes on, then discusses in pairs, then votes on again [1]: "Which window would you use to find a GC-rich stretch of about 300 bases: 50, 200 or 1,000?"

Students hand in their two sketches, the plots they got, and two or three sentences on what the size of the window does. The [developers' page](../../developers/r-and-python/#put-r-code-boxes-in-a-page-with-webr) shows how the boxes are built.

### Make the sickle-cell change in Python and translate it

*First year. 50 minutes, alone or in pairs.*

1. Students open the [Python code boxes](../../developers/r-and-python/examples/pyodide-code-boxes.html) and run boxes 1 and 2. They note the number of codons, the GC content, the first amino acid and what the `*` at the end stands for.
2. Box 3 makes the sickle-cell change, c.20A>T. Students explain why the code uses `position - 1`, and why base 20 lies in codon 7.
3. They change box 3 to make the HbC variant (c.19G>A) and the HbE variant (c.79G>A), and fill in a table: the change, the codon number, the codon before and after, and the amino acid before and after.
4. Box 4 checks their translation with Biopython and charts the GC content of each position in the codons. Using the genetic code in box 2, students find which position of a codon can most often change without changing the amino acid.

Students produce the completed table and two sentences on how one changed base changes the protein. For a later group, fade the support: give them the same boxes with some lines removed, and leave a comment that names each step. Worked examples split into labelled steps help students learn to program [1], and examples should give way to problems as students gain skill [2].

### Fade the support across three JupyterLite notebooks

*First or second year. Two 50-minute sessions, alone.*

Use a JupyterLite site with your own notebooks, published as the [developers' page](../../developers/r-and-python/#publish-a-jupyterlite-site-with-your-notebooks) describes.

1. Notebook 1 is a worked example in which every step has a heading: read the sequences, count the bases, work out the GC content, plot it [1].
2. Notebook 2 has the same headings, with some lines of code left for students to write.
3. Notebook 3 gives a new set of sequences and only the headings [2].
4. Start with sequences short enough to check by hand, and move to real ones once students can follow the steps [3].
5. Before handing in, students restart the kernel and run every cell, which is a good final test of a notebook [4]. It catches code that worked only because of a cell run earlier.

Students hand in notebook 3, completed and downloaded as an `.ipynb` file.

### A whole practical with nothing to install

*First year or later. About 1¾ hours (R) or 3 hours (Python), alone, with demonstrators.*

Two of our sites run complete practicals in the browser:

- The [R workbench](https://comparativechrono.github.io/R-workbench/) introduces four ways of using R: the R console, an RStudio-style editor, Jupyter-style notebooks and a terminal. The editor also handles R Markdown, Quarto and Shiny. Students work with measurements of 344 penguins, and steps tick themselves when done.
- [Bioinformatics algorithms in Python](https://comparativechrono.github.io/bioinformatics-algorithms-python/) starts with Python for DNA and protein sequences, then uses it to look inside hash tables, graph searches, regular expressions, Smith–Waterman alignment, BLAST, multiple alignments, phylogenetic trees and protein networks. Exercises check themselves, and every error comes with a hint in plain English.

1. Open the site yourself on a classroom computer before the session.
2. Ask students to open it before they arrive, so that R or Python is already in their browser's cache.
3. Students work at their own pace while you and the demonstrators circulate.
4. Before they leave, students download their work: *My answers* in both sites, with *My files* in the R workbench and the whole notebook in the Python practical.

Students produce their downloaded answers or notebook, which you can mark or discuss in the next session.

### Reproduce a figure

*Third year or master's. 3 to 4 hours, alone or in pairs.*

1. Choose a figure from a paper whose data are open, such as a plot of GC content or a simple chart of public data.
2. Students reproduce it in a JupyterLite notebook or with webR, and record where the data came from and every package and version they used.
3. They rerun their work from a fresh session, then swap notebooks with another pair and try to run each other's.
4. Each pair reports what broke and why.

Students hand in the notebook, a short README that names the data and versions, and a reflection on what made the figure hard to reproduce. The section on [where students go wrong](#where-students-go-wrong) gives figures to start the discussion.

{% include ad.html slot="in_article" %}

## Assessing what students learned

- **Predict-the-output questions**, with wrong answers taken from common mistakes. For example: "In Python, what does `'ATGGTG'[1:4]` give?" (Answer: `TGG`, because Python counts from 0 and leaves out the end of a slice.)
- **Parsons problems**: the lines of a short program in the wrong order, for students to put right. Students given labelled steps solve them better, and Parsons problems can be more sensitive to learning than asking students to write code [5].
- **A notebook marked against a checklist**: it explains each step, splits the work into clear cells, records the packages it needs, and runs from top to bottom after a restart [4].
- **A short oral walk-through**: "Show me what this line does." Generative AI used without support risks hiding what a student does not understand [6].

## Where students go wrong

Pointing out common mistakes explicitly helps students avoid them [7].

**Counting from 0 or from 1.** Python counts positions from 0, while R and HGVS names such as c.20A>T count from 1. Base 20 is `hbb[19]` in Python but `substr(hbb, 20, 20)` in R, and a Python slice leaves out its end, so `hbb[18:21]` is bases 19 to 21. File formats disagree in the same way: see the [table on the genome browsers page](../genome-browsers/#where-students-go-wrong).

**Forgetting to keep a result.** R changes an object only when you assign the result to it: `toupper(dna)` prints the result, and `dna <- toupper(dna)` keeps it [7]. Python strings never change in place either, so `seq.replace("T", "U")` gives a new string and leaves `seq` as it was.

**Hidden state.** Code boxes and notebook cells share one session, so code can work only because of something run earlier, or fail when the cells run in another order. Restarting and running everything from the top is the test [4], and published notebooks often fail it: of 10,388 notebooks from biomedical papers whose packages could be installed, 1,203 ran without errors, and 879 gave the same results as their authors' [8].

**"It runs in my browser, so it is private."** webR, Pyodide and JupyterLite run code on the student's own computer. [JupyterLite's documentation](https://jupyterlite.readthedocs.io/en/stable/quickstart/using.html) says that none of your data leaves the browser unless an extension or the notebook's own code sends it. But the page still downloads R or Python from other websites, which see the student's address, and services such as Google Colab run code on Google's computers. Keep patient data out of teaching notebooks: see [genomic data and ethics](../data-and-ethics/).

**"My work is saved."** Code boxes keep nothing when the page closes. JupyterLite saves notebooks in the browser, but only in that browser on that computer. The work disappears when the student clears the browser's data, works in a private window or on a shared computer that wipes its profiles, or, in Safari, after seven days of use without a visit to the site. Make downloading the work part of every task.

**"Every package is there."** Only packages built for the browser work, and DESeq2, for example, installs in webR but does not load. Check every package before the class with the [package checker](../../developers/r-and-python/#install-the-packages-a-class-needs).

**Gene names in spreadsheets.** When gene lists pass through Excel, some gene names turn into dates or numbers. Such errors were found in 30.9% of articles with supplementary Excel gene lists published between 2014 and 2020 [9]. Teach students to read and write files with code.

## Practical tips

- **First load.** The first visit downloads R (about 14 MB) or Python (about 6 MB, and more for packages such as matplotlib), and a JupyterLite notebook with Biopython and a plot downloaded 33 MB. A class of 30 starting at once pulls about 1 GB through the room's network, or 1.5 GB if they open both R and Python. Ask students to open the page before the class: their browser then keeps R for 7 days and Python for a year. On a 20 Mbit/s connection, every 10 MB takes about 4 seconds.
- **Saving work.** Code boxes save nothing, and JupyterLite and the two practicals save only in the browser. Build downloading into the task, and keep the starting files where students can fetch them again.
- **Offline.** R does not start without a network, even after a visit. Python starts offline only for a short time after a visit: 10 minutes for a page on GitHub Pages. Keep screenshots, printed code and the data on local devices, and plan the most important parts of the session so that they work without technology [10].
- **Old and low-memory computers.** Every current browser runs WebAssembly, but memory matters: an R session took 180 to 500 MB of the browser's memory, depending on the packages, and Python 130 to 610 MB. Ask students to close other tabs. Phones, Chromebooks and old laptops may reload the page when memory runs out, which loses the session. We tested in Chromium on a desktop computer, not on old computers, Firefox or Safari, so try your page on the computers students will use.
- **Networks.** Some university and school networks block the sites that R, Python and their packages come from. Test your page from the teaching room; the [developers' page](../../developers/r-and-python/#things-that-catch-people-out) lists the addresses.
- **Accounts.** Students need no account, although Google Colab does need a Google account.
- **Timing.** When you live-code, go slowly, say what you type, and use the same page as your students, so that they do not have to translate between two set-ups [11]. Treat your own mistakes as teaching moments [11], and start from code with the boilerplate already written [1].
- **Accessibility.** The code boxes on this site are plain text areas that work with the keyboard, but we have not yet tested them with a screen reader. Put a table or a printed summary next to every figure: in one evaluation, only 4.5% of notebooks had a table near a figure [12]. See [accessibility](../accessibility/).

## The evidence

The case for this kind of teaching rests on general findings rather than on studies of these tools. The general case for active learning is set out on the [planning page](../planning/). Students in active classes learn more but can feel that they learn less [13], so tell them that the effort is a sign of learning. For novices, worked examples work better than solving problems, but later the reverse is true, so examples should fade into problems as students gain skill [2]. Labelled steps also help students learn to program [1, 5].

Course reports describe Jupyter notebooks for teaching Python with DNA sequences remotely [14], and Google Colab in a large biochemistry class, where more than 250 students took part and their self-assessed confidence rose [15]. Neither compared students' learning with another way of teaching. We know of no published classroom studies of webR, Pyodide or JupyterLite. The advice on this page comes from the general findings above, from how the tools behaved in our tests, and from teaching experience.

## References

{: .references}
1. Brown NCC, Wilson G (2018). Ten quick tips for teaching programming. *PLOS Computational Biology* 14(4): e1006023. [doi:10.1371/journal.pcbi.1006023](https://doi.org/10.1371/journal.pcbi.1006023)
2. Renkl A, Atkinson RK (2003). Structuring the transition from example study to problem solving in cognitive skill acquisition: a cognitive load perspective. *Educational Psychologist* 38(1): 15–22. [doi:10.1207/S15326985EP3801_3](https://doi.org/10.1207/S15326985EP3801_3)
3. Timbers TA, Çetinkaya-Rundel M (2026). Ten simple rules for teaching data science. *PLOS Computational Biology* 22(6): e1014338. [doi:10.1371/journal.pcbi.1014338](https://doi.org/10.1371/journal.pcbi.1014338)
4. Rule A, Birmingham A, Zuniga C, et al. (2019). Ten simple rules for writing and sharing computational analyses in Jupyter Notebooks. *PLOS Computational Biology* 15(7): e1007007. [doi:10.1371/journal.pcbi.1007007](https://doi.org/10.1371/journal.pcbi.1007007)
5. Morrison BB, Margulieux LE, Ericson B, Guzdial M (2016). Subgoals help students solve Parsons problems. In: *Proceedings of the 47th ACM Technical Symposium on Computing Science Education (SIGCSE '16)*, pp. 42–47. [doi:10.1145/2839509.2844617](https://doi.org/10.1145/2839509.2844617)
6. Teufel AI, Liberles DA (2026). Teaching bioinformatics with generative AI: judgment, uncertainty, and responsibility. *Journal of Microbiology & Biology Education* 27(2): e00331-25. [doi:10.1128/jmbe.00331-25](https://doi.org/10.1128/jmbe.00331-25)
7. Hoffman AM, Wright C (2024). Ten simple rules for teaching an introduction to R. *PLOS Computational Biology* 20(5): e1012018. [doi:10.1371/journal.pcbi.1012018](https://doi.org/10.1371/journal.pcbi.1012018)
8. Samuel S, Mietchen D (2024). Computational reproducibility of Jupyter notebooks from biomedical publications. *GigaScience* 13: giad113. [doi:10.1093/gigascience/giad113](https://doi.org/10.1093/gigascience/giad113)
9. Abeysooriya M, Soria M, Kasu MS, Ziemann M (2021). Gene name errors: lessons not learned. *PLOS Computational Biology* 17(7): e1008984. [doi:10.1371/journal.pcbi.1008984](https://doi.org/10.1371/journal.pcbi.1008984)
10. Moore B, Carvajal-López P, Chauke PA, et al. (2021). Ten simple rules for organizing a bioinformatics training course in low- and middle-income countries. *PLOS Computational Biology* 17(8): e1009218. [doi:10.1371/journal.pcbi.1009218](https://doi.org/10.1371/journal.pcbi.1009218)
11. Nederbragt A, Harris RM, Hill AP, Wilson G (2020). Ten quick tips for teaching with participatory live coding. *PLOS Computational Biology* 16(9): e1008090. [doi:10.1371/journal.pcbi.1008090](https://doi.org/10.1371/journal.pcbi.1008090)
12. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
13. Deslauriers L, McCarty LS, Miller K, Callaghan K, Kestin G (2019). Measuring actual learning versus feeling of learning in response to being actively engaged in the classroom. *PNAS* 116(39): 19251–19257. [doi:10.1073/pnas.1821936116](https://doi.org/10.1073/pnas.1821936116)
14. Gupta YM, Kirana SN, Homchan S, Tanasarnpaiboon S (2023). Teaching Python programming for bioinformatics with Jupyter notebook in the post-COVID-19 era. *Biochemistry and Molecular Biology Education* 51(5): 537–539. [doi:10.1002/bmb.21746](https://doi.org/10.1002/bmb.21746)
15. Berndsen CE, Shenk KE, Young A, Scanlan SE, Sardelli AM, Kayll AJ (2026). Breaking barriers in large classes: using cloud computing and computational biology to implement research-inspired curricula in Biochemistry I. *Biochemistry and Molecular Biology Education* 54(5): 442–449. [doi:10.1002/bmb.70069](https://doi.org/10.1002/bmb.70069)
