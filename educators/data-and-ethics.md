---
title: Genomic data and ethics
lede: Every human genome belongs to someone. Teach with data that were shared for open use, or with synthetic data, and keep identifiable and patient data off public servers.
description: Which genomic data to use in university teaching, why genomes are hard to anonymise, what UK GDPR guidance says about genetic data, why public servers such as Galaxy are no place for patient data, and how to approach students' own genomes, with a checklist.
---

Real data make genomics teaching convincing, and a great deal of it was collected and released for open use. This page explains why a genome is never quite anonymous, which datasets suit teaching, what UK data protection guidance says about genetic data, and where identifiable data must not go. It describes published guidance and is not legal advice: for your own course, ask your institution's data protection officer.

## Treat every human genome as identifiable

Removing names from genomic data does not make it anonymous. Researchers recovered surnames from personal genomes by profiling short tandem repeats on the Y chromosome and searching public genealogy databases. Combined with age and place, the surnames let them trace several participants in public sequencing projects [1]. Summary statistics give people away too: the allele frequencies of a study cohort do not hide whether a particular person took part [2]. In a study of the genetic data of 1.28 million people tested by consumer genomics companies, about 60% of searches for a person of European descent would find a third cousin or closer, which in principle is enough to identify them [3]. Erlich and Narayanan review these and other routes to re-identification, and the ways of protecting against them [4].

Data protection law takes this seriously. Shabani and Marelli argue that the realistic risk of re-identification gives the GDPR wide-ranging implications even for research on anonymised genomic data [5]. The UK's Information Commissioner's Office (ICO) says that genetic analysis with enough markers to be unique to a person is personal data, even when names and other identifiers have been removed [6]. A good habit for students comes from Zook and colleagues: start from the assumption that data are people, until proven otherwise [7].

## Use data that were shared for open use

Choose data whose consent covers open use, and tell students why these data may be used. That is part of the lesson.

<div class="table-wrap" markdown="1">

| Data | What it contains | Consent and terms |
|---|---|---|
| [1000 Genomes Project](https://www.internationalgenome.org/) | Genomes of 2,504 people from 26 populations, with over 88 million variants [8]. A later high-coverage panel on the same site covers 3,202 people. | Every consent form had to say that extensive individual data, but no identifiers or medical information, would be made public on the internet. The data are available without embargo; cite the project [9]. |
| [Genome in a Bottle](https://www.nist.gov/programs-projects/genome-bottle) | Seven genomes sequenced with 12 technologies [10], with benchmark variant calls for GRCh37 and GRCh38 and the regions where the calls are reliable. Files are in [NIST's release folder](https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/). | The pilot genome, NA12878, comes from the HapMap project. Two family trios from the Personal Genome Project were chosen because they are consented for commercial redistribution. Most sequencing data are public without a publication embargo [11]. |
| [Personal Genome Project UK](https://www.personalgenomes.org.uk/data) | Genomes, methylomes, transcriptomes and reports from volunteers [12]. | Participants joined under open consent [12], and the project shares data that could identify them, on purpose. Use it with respect, and never try to identify anyone. |
| [ClinVar](https://www.ncbi.nlm.nih.gov/clinvar/) | Variant records and their clinical classifications, not the genomes of individual people. | Public. This site's genome browser examples use its files. |
| Galaxy Training Network data on Zenodo | Small, sub-sampled datasets made for tutorials [13]. | Made for teaching, and linked from each tutorial. Each Zenodo record shows its licence. |
| Synthetic data | Genomes simulated with a known history, for example with [msprime](https://tskit.dev/msprime/docs/stable/), so students can check their inferences against the truth [14]. Artificial genomes made by generative models trained on real ones reproduce allele frequencies, linkage and population structure [15]. | Simulated genomes describe no real person. Artificial genomes showed little or no loss of privacy [15]. |
| This site's HBB dataset | Seven real ClinVar variants in the β-globin gene, with four invented people ([developers' page](../../developers/genome-browsers/#host-a-small-dataset-next-to-the-page)). | The people and their genotypes are made up. |

</div>

Data from controlled-access archives come with an agreement that says who may use them and for what. Do not use them in teaching unless the agreement covers it. Whatever the source, small slices of a dataset load faster in class and are easier to check, and the developers' [getting started](../../developers/getting-started/) page explains how to host them next to a teaching page.

## Know what UK data protection law says about genetic data

UK GDPR gives extra protection to some kinds of personal data, called special category data, and genetic data is one of them. Article 4(13) defines genetic data as "personal data relating to the inherited or acquired genetic characteristics of a natural person which give unique information about the physiology or the health of that natural person and which result, in particular, from an analysis of a biological sample", and Recital 34 says this includes chromosomal, DNA or RNA analysis [6].

Whether genetic information counts depends on whether it can be linked to a person. According to the ICO, a sample is not personal data until it is analysed, and the results are personal data only if they can be linked back to an identifiable individual. Genetic analysis with enough markers to be unique to one person is personal data even without a name. Anonymised or aggregated partial sequences or test results that can no longer be linked back to a genetic identity, sample, profile, patient record or other identifier are not identifiable personal data [6].

To use special category data at all, an organisation needs both a lawful basis under Article 6 and one of the conditions in Article 9. A data protection impact assessment (DPIA) is required for processing that is likely to be high risk, including special category data processed on a large scale, and genetic data when other risk factors apply. The ICO recommends a DPIA whenever you are in doubt [16]. The ICO marks this guidance as under review following the Data (Use and Access) Act, so check it again before each academic year [6].

How this applies to your course is a question for your institution. If students will handle genetic data about identifiable people, including their own, talk to your data protection officer before the course starts.

{% include ad.html slot="in_article" %}

## Keep identifiable data off public servers

A public analysis server is a shared computer run by another organisation, under its own terms. The terms of the large public Galaxy servers forbid identifiable data, or warn against it:

- **usegalaxy.org** strictly prohibits the storage or processing of personally identifiable information and of data covered by the US laws HIPAA and FISMA, "including but not limited to potentially personally identifying medical data" [17].
- **Galaxy Australia** prohibits "Personal or Sensitive data, including but not limited to personally identifying genetic, genomic or Health data" [18].
- **usegalaxy.eu**, in terms effective from 7 September 2026, says that "Data storage is not encrypted". It asks users whose data carry restrictions to consult their institutional review board or the project's principal investigator before uploading to any public site, encourages a local Galaxy for protected data, and warns that published histories, datasets and workflows "become publicly accessible and may be indexed or cached by third parties" [19].

The same caution applies to other public services, such as an online BLAST search, a cloud notebook like Google Colab, which runs code in the cloud [20], or an AI chat assistant. Treat anything you upload or paste as out of your control.

Some tools keep data on the student's own computer. igv.js runs entirely in the web browser, with no server behind it [21], and the [own-files example](../../developers/genome-browsers/#let-students-open-their-own-files) opens files without uploading them. JupyterLite keeps notebooks and files in the browser's own storage, and nothing leaves the browser unless an installed extension or the notebook's own code sends it [22]. Such pages still download their software from the internet, so check what a page sends before you rely on it. For real clinical cases, use the secure environment your institution has approved for patient data, never a teaching page or a public server.

## Think twice before students analyse their own genomes

Testing students' own genomes in class is engaging, but it brings risks that public data do not. In an interview study of ten medical and graduate students who chose personal genotyping in an elective genetics course [23]:

- students said that testing made them more engaged with the course;
- they were most interested in results such as drug response and carrier status, but few followed results up with a healthcare provider, and none reported using genetic counselling;
- in follow-up interviews, they recalled the details of the consent and biobanking agreements poorly;
- they explored their raw data on their own, and wanted more support with what they found.

The authors conclude that students need support of a different kind from traditional genetic counselling, and that institutions should discuss the ethical, legal and social issues across disciplines before adding personal genotyping to a course [23]. This was one small study, but its warnings are specific. Do not make personal genotyping a default activity. If you offer it, make it optional, with an equally good alternative that uses public genomes, and keep each student's results private. Plan support for unexpected findings before the course starts, and involve your ethics committee and data protection officer.

## Teach the ethics, not only the rules

Data ethics is a competency in its own right. The NIBLSE framework lists "the ethical, legal, medical, and social implications of biological data" (C9) [24], and the ISCB framework includes professional, ethical, legal, security and social issues (M) [25]. The [planning page](../planning/#check-the-course-against-the-competency-frameworks) describes both frameworks.

These issues fit naturally into tool sessions:

- **Re-identification.** Give pairs a summary of the surname study [1], and ask what a public genome, a first name and a year of birth might reveal, and who besides the participant could be affected.
- **Consent.** Put the 1000 Genomes consent statement next to PGP-UK's open consent, and ask what each allows, and why the projects chose differently.
- **Synthetic data.** Simulate a population and ask what students can and cannot learn from data about no one.

## A checklist before you give students genomic data

1. The data are public with consent for open use, or synthetic, and you have read the reuse terms.
2. There are no patient data, and no data from a controlled-access archive unless its agreement covers teaching.
3. Students know where the data came from and why they may use them.
4. Nothing identifiable will be uploaded to a public server, including Galaxy, online BLAST, cloud notebooks and AI assistants.
5. Files are small slices that load quickly in class, hosted where you control them.
6. If students' own genomes are involved, taking part is optional, results stay private, an equal alternative exists, support is planned, and your data protection officer and ethics committee have been consulted.
7. You have read the ICO guidance again this academic year.
8. Students' work cites the datasets, as their providers ask.

## References

{: .references}
1. Gymrek M, McGuire AL, Golan D, Halperin E, Erlich Y (2013). Identifying personal genomes by surname inference. *Science* 339(6117): 321–324. [doi:10.1126/science.1229566](https://doi.org/10.1126/science.1229566)
2. Homer N, Szelinger S, Redman M, et al. (2008). Resolving individuals contributing trace amounts of DNA to highly complex mixtures using high-density SNP genotyping microarrays. *PLoS Genetics* 4(8): e1000167. [doi:10.1371/journal.pgen.1000167](https://doi.org/10.1371/journal.pgen.1000167)
3. Erlich Y, Shor T, Pe'er I, Carmi S (2018). Identity inference of genomic data using long-range familial searches. *Science* 362(6415): 690–694. [doi:10.1126/science.aau4832](https://doi.org/10.1126/science.aau4832)
4. Erlich Y, Narayanan A (2014). Routes for breaching and protecting genetic privacy. *Nature Reviews Genetics* 15(6): 409–421. [doi:10.1038/nrg3723](https://doi.org/10.1038/nrg3723)
5. Shabani M, Marelli L (2019). Re-identifiability of genomic data and the GDPR. *EMBO Reports* 20(6): e48316. [doi:10.15252/embr.201948316](https://doi.org/10.15252/embr.201948316)
6. Information Commissioner's Office. *What is special category data?* Latest update 9 April 2024; marked as under review. Read 15 October 2026. [ico.org.uk](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/what-is-special-category-data/)
7. Zook M, Barocas S, boyd d, et al. (2017). Ten simple rules for responsible big data research. *PLOS Computational Biology* 13(3): e1005399. [doi:10.1371/journal.pcbi.1005399](https://doi.org/10.1371/journal.pcbi.1005399)
8. 1000 Genomes Project Consortium (2015). A global reference for human genetic variation. *Nature* 526(7571): 68–74. [doi:10.1038/nature15393](https://doi.org/10.1038/nature15393)
9. International Genome Sample Resource. [Sample collection principles](https://www.internationalgenome.org/sample_collection_principles) and [disclaimer](https://www.internationalgenome.org/IGSR_disclaimer). Read 15 October 2026.
10. Zook JM, Catoe D, McDaniel J, et al. (2016). Extensive sequencing of seven human genomes to characterize benchmark reference materials. *Scientific Data* 3: 160025. [doi:10.1038/sdata.2016.25](https://doi.org/10.1038/sdata.2016.25)
11. National Institute of Standards and Technology. *Genome in a Bottle*. Read 15 October 2026. [nist.gov](https://www.nist.gov/programs-projects/genome-bottle)
12. PGP-UK Consortium (2018). Personal Genome Project UK (PGP-UK): a research and citizen science hybrid project in support of personalized medicine. *BMC Medical Genomics* 11(1): 108. [doi:10.1186/s12920-018-0423-1](https://doi.org/10.1186/s12920-018-0423-1)
13. Hiltemann S, Rasche H, Gladman S, et al. (2023). Galaxy Training: a powerful framework for teaching! *PLOS Computational Biology* 19(1): e1010752. [doi:10.1371/journal.pcbi.1010752](https://doi.org/10.1371/journal.pcbi.1010752)
14. Baumdicker F, Bisschop G, Goldstein D, et al. (2022). Efficient ancestry and mutation simulation with msprime 1.0. *Genetics* 220(3): iyab229. [doi:10.1093/genetics/iyab229](https://doi.org/10.1093/genetics/iyab229)
15. Yelmen B, Decelle A, Ongaro L, et al. (2021). Creating artificial human genomes using generative neural networks. *PLoS Genetics* 17(2): e1009303. [doi:10.1371/journal.pgen.1009303](https://doi.org/10.1371/journal.pgen.1009303)
16. Information Commissioner's Office. *What are the rules on special category data?* Marked as under review. Read 15 October 2026. [ico.org.uk](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/what-are-the-rules-on-special-category-data/)
17. Galaxy Project. *usegalaxy.org terms of service*. Read 15 October 2026. [usegalaxy.org](https://usegalaxy.org/static/terms.html)
18. Galaxy Australia. *About Galaxy Australia*, including its terms of use. Read 15 October 2026. [site.usegalaxy.org.au](https://site.usegalaxy.org.au/about)
19. Freiburg Galaxy Team. *usegalaxy.eu terms of service*, effective 7 September 2026. Read 15 October 2026. [usegalaxy-eu.github.io](https://usegalaxy-eu.github.io/gdpr/tos.html)
20. Berndsen CE, Shenk KE, Young A, Scanlan SE, Sardelli AM, Kayll AJ (2026). Breaking barriers in large classes: using cloud computing and computational biology to implement research-inspired curricula in Biochemistry I. *Biochemistry and Molecular Biology Education* 54(5): 442–449. [doi:10.1002/bmb.70069](https://doi.org/10.1002/bmb.70069)
21. Robinson JT, Thorvaldsdóttir H, Turner D, Mesirov JP (2023). igv.js: an embeddable JavaScript implementation of the Integrative Genomics Viewer (IGV). *Bioinformatics* 39(1): btac830. [doi:10.1093/bioinformatics/btac830](https://doi.org/10.1093/bioinformatics/btac830)
22. JupyterLite documentation. *Using an existing JupyterLite deployment*. Read 15 October 2026. [jupyterlite.readthedocs.io](https://jupyterlite.readthedocs.io/en/stable/quickstart/using.html)
23. Vernez SL, Salari K, Ormond KE, Lee SS-J (2013). Personal genome testing in medical education: student experiences with genotyping in the classroom. *Genome Medicine* 5(3): 24. [doi:10.1186/gm428](https://doi.org/10.1186/gm428)
24. Wilson Sayres MA, Hauser C, Sierk M, et al. (2018). Bioinformatics core competencies for undergraduate life sciences education. *PLOS ONE* 13(6): e0196878. [doi:10.1371/journal.pone.0196878](https://doi.org/10.1371/journal.pone.0196878)
25. Mulder N, Schwartz R, Brazas MD, et al. (2018). The development and application of bioinformatics core competencies to improve bioinformatics training and education. *PLOS Computational Biology* 14(2): e1005772. [doi:10.1371/journal.pcbi.1005772](https://doi.org/10.1371/journal.pcbi.1005772)
