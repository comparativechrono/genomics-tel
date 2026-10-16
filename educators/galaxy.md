---
title: Teaching with Galaxy
topic: galaxy
lede: Galaxy lets students run real analyses in a web browser, with nothing to install, and records every step they take. Students can see what each step of an analysis does, and why a record of those steps matters.
description: How to teach with Galaxy and the Galaxy Training Network in university courses, with activities, training queues (TIaaS), catch-up histories, assessment, accounts, data privacy, common misconceptions and references.
---

## What Galaxy teaches well

Galaxy puts command-line bioinformatics tools behind web forms, on free public servers such as usegalaxy.eu and usegalaxy.org. Every result lands in a **history**, which records each dataset with the tool, version and settings that made it [1]. Because nobody has to install software or learn the command line first, class time goes on the analysis itself: what each step does to the data, how data types fit the tools, and why tool versions matter [2].

That makes Galaxy good for teaching the shape of an analysis, from raw reads to a result, and the habits of reproducible work. It does not teach programming; for that, see [R and Python in the browser](../r-and-python/).

Most Galaxy teaching builds on the **Galaxy Training Network (GTN)**. On 15 October 2026 it had 534 tutorials in 35 topics, with slides, captioned videos, short answers to common questions and 28 learning pathways, all free to reuse under CC BY 4.0. Each tutorial pairs a hands-on guide with data on Zenodo, so that students run the analysis themselves in a browser [3]. Each starts with learning objectives, prerequisites and a time estimate, and uses a small subset of real data so that tools finish quickly. Many include questions with hidden answers that students can check themselves [2]. The [live list of tutorials](../../developers/galaxy/examples/gtn-tutorials.html) on the developers' page shows each topic's tutorials, with their level, time and whether your server has all their tools.

After a well-designed session, students should be able to:

- import data, run a tool and read its output, and say which tool, version and settings produced each result;
- run a standard analysis, such as quality control, read mapping and variant calling, and explain what each step does;
- change one setting or input, run the analysis again, and explain how and why the result changed;
- turn a history into a workflow, run it on new data and share it;
- say which data may go on a public server and which may not.

The first two suit a first-year practical. The others suit later years and project work.

## Activities

### A first analysis with nothing to install

*First year. 50 minutes, alone or in pairs.*

1. Before the session, students register on the server you have chosen and confirm their email address (see [practical tips](#practical-tips)).
2. Students follow the GTN's [A short introduction to Galaxy](https://gxy.io/GTN:T00190), which takes about 40 minutes. They import a FASTQ file of bacterial reads from Zenodo by its web address, run FastQC on it, read the quality report, and filter out low-quality reads. To save typing, give them a link that opens the import directly; the [link builder](../../developers/galaxy/examples/galaxy-links.html) on the developers' page makes one.
3. The tutorial then asks students to rerun the filter with a stricter setting. Before they do, each pair writes down how many reads they expect to lose. People who only watch a result appear learn little from it, which is why Brown and Wilson recommend a recorded prediction first [4].
4. Students share their history by link and paste the link into your virtual learning environment.

Students produce a shared history, their prediction, and two sentences on which filter setting they would keep, and why.

### Tutorial, then tweak

*Second or third year. 2 to 3 hours, in pairs.*

1. Choose a GTN tutorial in your subject that has all its tools on your server, such as "Mapping" (1 hour), or split a longer one, such as "Calling variants in diploid systems" (3 hours), across two sessions. The [live list](../../developers/galaxy/examples/gtn-tutorials.html) shows which ones qualify.
2. Pairs work through it, answering the tutorial's questions as they go.
3. Each pair then changes one thing, such as a mapping setting, the gene annotation or the reference genome, and runs that part again. **Run Job Again** on any dataset reopens its tool with the earlier settings.
4. Pairs compare the two results and explain the differences.

Students produce a shared history and a 300-word comparison.

### Reproduce someone else's analysis

*Master's level. 2 hours, alone.*

1. Give each student a published Galaxy workflow, such as one from the [Intergalactic Workflow Commission](../../developers/galaxy/#show-a-published-workflow-in-your-page), and a second public dataset of the same kind.
2. Students import the workflow, run it on the new data, and record the tool versions, the settings and the reference genome.
3. They judge the analysis against the first three of Sandve and colleagues' ten rules for reproducible research: record how every result was produced, avoid changing data by hand, and keep the exact versions of all programs [5].

Students produce an audit checklist, the history of their rerun and a list of recommendations.

### A semester research project

*Second year. One 50-minute session a week for 14 weeks; each student studies one protein.*

Schmidt and colleagues ran a course-based research project in the weekly discussion period of a second-year genetics course [6]:

1. Weeks 1 to 4: students read and discuss background and research papers.
2. Weeks 5 to 7: instructor-led tutorials in Galaxy and in the IGV genome browser.
3. Weeks 8 to 13: each student finds public ChIP-seq datasets for a protein and maps them, in Galaxy, to a genomic region the instructor chose, to test whether the protein binds there.
4. Week 14: a poster session for the department.

Students produce a poster, a Galaxy history and weekly activity logs. The authors point out that research of this kind is free, safe, works remotely and may be more accessible for students with disabilities than bench work [6]. Two recent courses also had students analyse sequencing data in Galaxy: structural variants in *C. elegans* at the University of Calgary [7], and a transposon screen in *E. coli* in a third-year microbial genetics course [8].

{% include ad.html slot="in_article" %}

## Assessing what students learned

A history records every step, so you can mark how students reached a result as well as the result [1].

- **A shared history.** Students open **Share or Publish** from the history's menu and share it with your account by email address; you find it under **Histories Shared with Me**. Mark it against a checklist: the right inputs, sensible settings, clear dataset names, failed jobs removed. The [scripts on the developers' page](../../developers/galaxy/#set-up-a-class-with-bioblend) list every history shared with you.
- **A workflow invocation report.** Each time a workflow runs (an invocation), Galaxy writes a report of that run. Students can edit it to add their interpretation, which makes an editable copy, a Galaxy Notebook attached to the history, and download it as a PDF on usegalaxy.eu and usegalaxy.org. We took this from Galaxy 26.1's code and release notes, and did not test it with a student account.
- **The workflow itself.** Ask students to extract a workflow from their history and run it on a second dataset. If it runs and gives the same kind of result, they have captured every step.
- **A short reflection** on one decision, such as why they chose a quality cut-off.
- **A short viva.** If marks depend on interpretation, also check it in person, for example with a 5-minute conversation. Since version 26.0, Galaxy has an AI assistant, GalaxyAI, which answers questions about tools, results and errors and points students to GTN tutorials. Version 26.1 added the drafting of workflow invocation reports. On 15 October 2026, usegalaxy.eu and usegalaxy.org had an AI service configured, and usegalaxy.org.au and usegalaxy.fr did not.
- **During class**, a training queue's dashboard shows the state of every student's jobs, so you can see who is stuck [1].

## Where students go wrong

**"It ran, so it's right."** A green dataset means only that the job finished. Ask students what they expect before they look at a result, and to check that their reference genome, annotation and reads belong together. Different sources even name chromosomes differently, such as `chr1` and `1` [9].

**"Galaxy does the thinking."** Students can click through the hands-on boxes without reading the explanation around them, which is where GTN tutorials put the theory [2]. Ask each pair to say, in one sentence, what each tool did to the data.

**Deleting a slow job.** A grey dataset is waiting in the queue. Deleting and rerunning it sends it to the back of the queue, so ask students to wait ([GTN FAQ](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_job_status.html)).

**Using another version of a tool.** Galaxy opens the newest version of a tool by default, which may not be the one in the tutorial, and mixing versions between steps can make later steps fail ([GTN FAQ](https://training.galaxyproject.org/training-material/faqs/galaxy/tutorial_mode.html)). Tutorial mode, or links that name the version, avoid this.

**Editing data outside Galaxy.** Downloading a table, changing it in a spreadsheet and uploading it again breaks the record of how the result was made [5]. Spreadsheets can also change gene names without warning: about one in five genomics papers with gene lists in Excel files had names turned into dates or numbers [10].

**Thinking a shared history is private.** Anyone with the link can view and copy a history shared by link, and published histories are public and may be indexed or copied by other sites ([usegalaxy.eu terms](https://usegalaxy-eu.github.io/gdpr/tos.html)). Explain the difference between sharing with a person, sharing by link and publishing before students share anything.

## Practical tips

- **Devices.** Any up-to-date browser works. Galaxy shows the tools, the main panel and the history side by side, so laptops work better than tablets.
- **Accounts.** Ask students to register and confirm their email address before the first session, and to keep to one account each. usegalaxy.eu's terms ask users to keep to its published quotas, and warn that "attempts to subvert these limits by creating multiple accounts or through any other method may result in termination of all associated accounts" ([terms](https://usegalaxy-eu.github.io/gdpr/tos.html)). usegalaxy.eu also accepts LifeScience Login and other research logins, usegalaxy.org accepts Google accounts, and usegalaxy.org.au accepts only Australian BioCommons Access. The storage each server gives an account is [listed below](#storage-and-limits).
- **Network.** Students import data from Zenodo or from a shared data library straight to the server, so large files never cross the classroom's network [2]. usegalaxy.eu keeps the GTN's data in a [shared library](https://usegalaxy.eu/libraries/folders/Fa21272e5bd712216).
- **Timing.** The GTN asks tutorial authors to choose data on which no tool runs for more than 10 to 15 minutes. No server publishes typical waiting times, although usegalaxy.eu shows its [live queue](https://stats.galaxyproject.eu/d/bdyro3fwl2ccga/queued-jobs-tools). Book a [training queue](#book-a-training-queue-tiaas) for any timetabled class.
- **Accessibility.** The GTN aims for WCAG 2.0 level AA, and one of its developers uses a screen reader regularly. It captions its videos, offers plain-text versions of its slides, and works without JavaScript ([statement](https://training.galaxyproject.org/training-material/accessibility.html)). Adding `?expand-all=true` to a tutorial's address opens every folded box. Galaxy has reduced the number of tasks that need a mouse and improved its keyboard navigation [11], but we found no accessibility statement for Galaxy itself, so try your tutorial's steps with a keyboard before the class. Workflow diagrams and most plots are pictures: give students a text version of anything they must read from one, and see [accessibility](../accessibility/).

### Run a GTN tutorial in class

- **Side by side, or inside Galaxy.** Students open the tutorial in one window and Galaxy in another. Or they use **Tutorial mode**, which opens the GTN inside Galaxy from Galaxy's top menu and turns tool names into buttons that open each tool at the version the tutorial uses. Without it, Galaxy opens the newest version, which may not match the tutorial. The buttons need the server to host a copy of the GTN: on 15 October 2026, usegalaxy.eu and usegalaxy.org did, and usegalaxy.org.au and usegalaxy.fr did not. The GTN warns that Tutorial mode can have problems in Safari.
- **Together or at their own pace.** GTN tutorials work as a demonstration, as self-paced work, or with the class following you step by step [2]. The GTN's guide to [running a workshop](https://training.galaxyproject.org/training-material/topics/teaching/tutorials/running-workshop/tutorial.html) suggests deciding which before you start, and running the tutorial several times on your server and on a backup server. It also suggests asking students to put up sticky notes, so that you can see at a glance who has finished.
- **Planning a course.** The GTN topic [Teaching and Hosting Galaxy Training](https://training.galaxyproject.org/training-material/topics/teaching/) covers organising a workshop, assessment and feedback, and training queues.

### Book a training queue (TIaaS)

On a busy public server, a class's jobs can wait behind everyone else's. **Training Infrastructure as a Service (TIaaS)** gives your class its own queue for the days of your course, free [2]. Your students' jobs run first on machines kept for your training, and other users' jobs avoid those machines; if they are full, jobs fall back to the normal queue. Jobs in a training queue get less memory and time than usual, so use training-sized data.

<div class="table-wrap" markdown="1">

| Request form | Ask at least | Used by 15 October 2026 |
|---|---|---|
| [usegalaxy.eu](https://usegalaxy.eu/tiaas/new/) | 2 weeks ahead | 644 events, 25,011 students, since June 2018 |
| [usegalaxy.org.au](https://usegalaxy.org.au/tiaas/new/) | 2 weeks ahead | 234 events, 13,510 students, since February 2021 |
| [usegalaxy.fr](https://usegalaxy.fr/tiaas/new/) | 7 days ahead | 159 events, 4,470 students, since February 2022 |
| [usegalaxy.be](https://usegalaxy.be/tiaas/new/) | 14 days ahead | 9 events, 98 students, since May 2024 |
| [usegalaxy.cz](https://usegalaxy.cz/tiaas/new/) | 10 days ahead | 5 events, 99 students, since October 2024 |

</div>

Each server's name links to its request form. The GTN also links to a form on usegalaxy.org, but it returned an error every time we tried it on 15 October 2026.

- **Requesting it.** The form asks for your name and email address; the event's title, web page, description, dates and location; a short identifier for your training (lower case, up to 20 characters); the GTN tutorials you will use, or your own workflows or tools; and the number of students. Check the server's TIaaS calendar first, because quiet dates are easier to fit in. The administrators size the machines, then send you a join link and a link to a dashboard.
- **Before the course.** At least 2 weeks ahead, run your tutorials on that server to check that every tool and dataset is there.
- **On the day.** Students log in first, then open the join link, such as `https://usegalaxy.eu/join-training/<identifier>`. A student who is not logged in sees only "Please login to Galaxy first!". Galaxy Europe has a [test training](https://usegalaxy.eu/join-training/test/) to try. usegalaxy.eu also recommends its short-term storage for classes: students choose **Preferred Storage** in the history panel, then the short-term option.
- **The dashboard** is the join link with `/status` added. It shows the jobs your students started in the last 3 hours, by state and by tool, including jobs outside your course, under random names that stay the same for a day.

### Storage and limits

As published on 15 October 2026:

<div class="table-wrap" markdown="1">

| Server | Storage for each account | Other limits |
|---|---|---|
| usegalaxy.eu | 250 GB, plus 2 TB of short-term storage whose data are deleted after 60 days. Quotas are no longer raised. | Accounts unused for 12 months are deactivated after a warning, and their data deleted 6 months later |
| usegalaxy.org | 250 GB, or 5 GB without an account | 6 jobs at a time, or 1 without an account |
| usegalaxy.org.au | 600 GB for verified Australian researchers, 100 GB for others, 5 GB without an account | Data kept for 365 days |

</div>

When an account reaches its quota, Galaxy pauses new jobs, which turn light blue. Ask students to delete and purge old histories before a large practical.

### Help students who fall behind

- **Checkpoint histories.** Before class, run the tutorial yourself and, at each natural break, publish a copy of your history, such as "Start of part 2". A student who falls behind opens its link (`https://usegalaxy.eu/u/<your name>/h/<history name>`), chooses **Import this history** and carries on from there. Sharing histories like this has helped students catch up with the instructor in online courses [1]. When you share, also choose the option that makes every dataset in the history accessible, so that students can open them.
- **Answer histories.** Many GTN tutorials link finished histories on the big servers. The [live list](../../developers/galaxy/examples/gtn-tutorials.html) shows those for your server.
- **The tutorial's workflow.** Most GTN tutorials have a workflow. Running it on the student's data takes them to the end of the analysis in one step.
- **Job cache.** Ask students to switch on "re-use equivalent jobs" under **User Preferences**, then **Manage Information**. When a student then runs a tool with the same inputs and settings as a job in a public history, the result comes back straight away, so publish your own run of the tutorial before class ([GTN FAQ](https://training.galaxyproject.org/training-material/faqs/galaxy/re_use_equivalent_jobs.html)).

### Keep identifiable data off public servers

Public Galaxy servers are for open data, and their terms say so:

- usegalaxy.org strictly prohibits personally identifiable information and data covered by the US laws HIPAA and FISMA, "including but not limited to potentially personally identifying medical data" ([terms](https://usegalaxy.org/static/terms.html)).
- Galaxy Australia prohibits personal and sensitive data, "including but not limited to personally identifying genetic, genomic or Health data" ([terms](https://site.usegalaxy.org.au/about)).
- usegalaxy.eu, hosted at the University of Freiburg under European data protection law, states that "Data storage is not encrypted". It asks anyone whose data carry restrictions to consult their institutional review board before uploading, and suggests a local Galaxy for protected data ([terms](https://usegalaxy-eu.github.io/gdpr/tos.html)).

Teach with the GTN's Zenodo datasets, public sequencing runs from ENA or SRA, or synthetic data. Never use patient data. The [genomic data and ethics](../data-and-ethics/) page has more.

## The evidence

The published evidence on Galaxy in teaching describes rather than compares. The GTN's own papers describe the materials, the training queues and how they are used [2, 3]. Between June 2018 and May 2022, the public servers supported more than 330 training events with more than 17,000 learners [2]. Of more than 1,800 feedback forms on tutorials since September 2018, more than 88% gave a rating of 4 or 5 out of 5 [2]. Those figures measure use and satisfaction, not learning. Course reports describe research projects built on Galaxy [6, 7, 8]; the evidence from the Calgary course comes from a voluntary survey answered by 14% of students [7].

We found no controlled study that compares learning an analysis in Galaxy with learning it at the command line, or with not doing it at all. The case for hands-on analysis rests on broader evidence about active learning, set out on the [planning page](../planning/). The advice on this page about short, structured tasks comes from that evidence, from the GTN's experience and from teaching practice.

## References

{: .references}
1. Serrano-Solano B, Föll MC, Gallardo-Alba C, et al. (2021). Fostering accessible online education using Galaxy as an e-learning platform. *PLOS Computational Biology* 17(5): e1008923. [doi:10.1371/journal.pcbi.1008923](https://doi.org/10.1371/journal.pcbi.1008923)
2. Hiltemann S, Rasche H, Gladman S, et al. (2023). Galaxy Training: a powerful framework for teaching! *PLOS Computational Biology* 19(1): e1010752. [doi:10.1371/journal.pcbi.1010752](https://doi.org/10.1371/journal.pcbi.1010752)
3. Batut B, Hiltemann S, Bagnacani A, et al. (2018). Community-driven data analysis training for biology. *Cell Systems* 6(6): 752–758.e1. [doi:10.1016/j.cels.2018.05.012](https://doi.org/10.1016/j.cels.2018.05.012)
4. Brown NCC, Wilson G (2018). Ten quick tips for teaching programming. *PLOS Computational Biology* 14(4): e1006023. [doi:10.1371/journal.pcbi.1006023](https://doi.org/10.1371/journal.pcbi.1006023)
5. Sandve GK, Nekrutenko A, Taylor J, Hovig E (2013). Ten simple rules for reproducible computational research. *PLoS Computational Biology* 9(10): e1003285. [doi:10.1371/journal.pcbi.1003285](https://doi.org/10.1371/journal.pcbi.1003285)
6. Schmidt CA, Hodkinson LJ, Comstra HS, et al. (2023). A cost-free CURE: using bioinformatics to identify DNA-binding factors at a specific genomic locus. *Journal of Microbiology & Biology Education* 24(3): e00120-23. [doi:10.1128/jmbe.00120-23](https://doi.org/10.1128/jmbe.00120-23)
7. Maroilley T, Barbosa VRA, Mascarenhas R, et al. (2026). A course-undergraduate research experience (CURE) to explore the effect of structural variants on gene expression in *C. elegans* balancers. *PLOS ONE* 21(8): e0342806. [doi:10.1371/journal.pone.0342806](https://doi.org/10.1371/journal.pone.0342806)
8. Ling GC, Jin C, Karadarevic D, et al. (2026). A course-based undergraduate research experience (CURE) using transposon-directed insertion-site sequencing (TraDIS) to identify genes that are essential for bacteriophage P1 propagation in *Escherichia coli*. *Journal of Microbiology & Biology Education*, published online 23 September 2026: e00221-26. [doi:10.1128/jmbe.00221-26](https://doi.org/10.1128/jmbe.00221-26)
9. Nassar LR, Barber GP, Benet-Pagès A, et al. (2023). The UCSC Genome Browser database: 2023 update. *Nucleic Acids Research* 51(D1): D1188–D1195. [doi:10.1093/nar/gkac1072](https://doi.org/10.1093/nar/gkac1072)
10. Ziemann M, Eren Y, El-Osta A (2016). Gene name errors are widespread in the scientific literature. *Genome Biology* 17: 177. [doi:10.1186/s13059-016-1044-7](https://doi.org/10.1186/s13059-016-1044-7)
11. The Galaxy Community (2024). The Galaxy platform for accessible, reproducible, and collaborative data analyses: 2024 update. *Nucleic Acids Research* 52(W1): W83–W94. [doi:10.1093/nar/gkae410](https://doi.org/10.1093/nar/gkae410)
