---
title: Accessible teaching with interactive tools
lede: Genome browsers, structure viewers and network diagrams rely on dragging, colour and pictures. Plan a second route through every task, so that students who use a keyboard, a screen reader or magnification, or who see colour differently, can do the same work.
description: What WCAG 2.2 asks of interactive teaching tools, where genome browsers, structure viewers, networks, Galaxy, notebooks, trees and charts fall short, and practical alternatives that let every student do the task.
---

Students who cannot drag, who cannot tell some colours apart, or who use a screen reader meet the same tools as everyone else in a genomics class. This page sets out what the accessibility standard asks for, where each kind of tool falls short, and what to give students instead. The [developers' accessibility page](../../developers/accessibility/) shows how to build teaching pages that avoid the problems.

## Expect barriers in most tools

Most of the data resources that genomics teaching relies on were not built with accessibility in mind. An evaluation of 3,112 life-science data portals and 5,099 journal websites found severe accessibility problems on 74.8% of the portals and 69.1% of the journal sites. In a preliminary in-depth test of three portals, a blind user completed 53.3% of common tasks, and the authors concluded that following accessibility standards does not by itself make a resource usable in practice [1]. Smits and colleagues give ten rules for doing better, from measuring accessibility to designing with disabled users [2].

Interactive tools add barriers of their own. Most of the viewers on this site draw their content as a picture, which a screen reader cannot read. Many expect a mouse for dragging, and many use colour to carry meaning.

## Check tasks against WCAG 2.2

The Web Content Accessibility Guidelines (WCAG) 2.2 became a W3C Recommendation on 5 October 2023 [3]. Each success criterion has a level, from A, the minimum, to AAA, and UK universities work to level AA [4]. These are the criteria that matter most for interactive tools in class:

<div class="table-wrap" markdown="1">

| Criterion (level) | What it asks | In class |
|---|---|---|
| 2.1.1 Keyboard (A) | Everything works from a keyboard | Students can move, zoom, select and answer without a mouse |
| 2.1.2 No Keyboard Trap (A) | Keyboard focus can always move away from a component | A viewer that takes over the arrow keys must still let Tab move on |
| 2.5.7 Dragging Movements (AA, new in 2.2) | Anything done by dragging can be done with a single pointer without dragging | A search box and zoom buttons as well as drag-to-move; click to select rather than drag a node |
| 2.5.8 Target Size (Minimum) (AA, new in 2.2) | Pointer targets are at least 24 by 24 CSS pixels, or spaced apart | Small toolbar buttons are hard to hit on tablets and phones |
| 1.4.1 Use of Color (A) | Colour is not the only way information is shown | "Click the red variant" fails; label it, or give it a shape as well |
| 1.4.3 Contrast (Minimum) and 1.4.11 Non-text Contrast (AA) | Text has a contrast ratio of at least 4.5:1 with its background, and graphics and controls at least 3:1 | Labels on coloured tracks and nodes stay readable |
| 1.1.1 Non-text Content (A) | Every image has a text alternative that serves the same purpose | Say what a figure shows and why it matters, not "screenshot of IGV" |
| 1.3.1 Info and Relationships (A) | Structure shown by layout is also available as text | Real tables of features, edges or residues |
| 2.2.1 Timing Adjustable (A) | Time limits can be turned off, adjusted or extended | Timed quizzes, and sessions that expire while students work |
| 2.2.2 Pause, Stop, Hide (A) | Movement that starts by itself and lasts more than five seconds can be paused | Spinning molecules and animated trees need a pause control |
| 2.4.7 Focus Visible and 2.4.11 Focus Not Obscured (Minimum) (AA; 2.4.11 new in 2.2) | Keyboard users can see where they are, and toolbars do not hide it | A visible outline on the control that has focus |
| 3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2) | Logging in does not depend on remembering or solving something, unless there is help such as a password manager | Accounts for Galaxy, Colab and similar services |

</div>

## Meet the UK rules for universities

Jisc's guidance for colleges and universities says that the baseline for UK public sector bodies is WCAG 2.2 level AA, under the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018. The baseline covers content you produce yourself, and third-party content and systems you have paid for, including the virtual learning environment, and organisations must publish an accessibility statement. The regulations reinforced the duty to make reasonable adjustments to digital content that the Equality Act 2010 established. Jisc notes that you must still make reasonable adjustments for disabled people when they are needed, for example by providing information in a more accessible format [4].

Many of the tools on this site are free public services that your university does not control. Plan the alternative route for each activity before the session, and ask your institution's disability or accessibility team how the rules apply to the tools you use.

{% include ad.html slot="in_article" %}

## See where each kind of tool falls short

This is what we found while building the examples on this site, and what helps. The [developers' page](../../developers/accessibility/#know-what-each-library-does) gives the details for each library.

<div class="table-wrap" markdown="1">

| Tool | Main barriers | What helps |
|---|---|---|
| Genome browsers | Tracks are drawn as pictures that screen readers cannot read. Moving around relies on dragging. Colours such as ClinVar's red and green carry meaning, and IGV's default colours are not always easy to tell apart [2]. | The search box and zoom buttons; a table of the features in view; a written description of each track |
| Sequence and alignment viewers | Residues are coloured by type; views are wide; the web viewers we tested draw a picture | Conservation scores as numbers; letters kept visible; a text read-out of the column in question |
| 3D structure viewers | Rotating by dragging; molecules that spin on their own; labels hidden behind nearer atoms; the whole view is a picture | Buttons for preset views, a pause control, annotated images whose alt text states the point, a table of residues |
| Networks | The diagram is a picture; position invites people to read meaning into the layout; edges coded by colour | The edge list as a table, a button for each node, line styles as well as colours |
| Galaxy | Accounts and logins; long forms | Galaxy has cut the number of mouse-only steps and improved keyboard navigation [5]. Galaxy Training Network tutorials aim for WCAG 2.0 AA, with plain-text slides, captioned videos and transcripts [6]. |
| R and Python in the browser | Plots are pictures; notebook interfaces vary; Colab needs a Google account | Code and printed output are text, which screen readers can read; give each plot alt text and a table |
| Phylogenetic trees | The tree is a picture; menus in some tree viewers work only with a mouse; clades shown by colour | The Newick text or a nested list, tactile prints, and clade names written on the tree |
| Charts of genomic data | Values appear only when the pointer hovers; colour scales; dense points | A summary sentence and a table of key values; a colour-blind-safe palette |

</div>

## Give every task a second route

The most reliable fix is in the task, not the tool. For every step that needs a picture, a mouse or colour, plan another way to the same answer:

- **Ask questions that can be answered in text.** "What is the reference base at chr11:5,227,002?" can be answered with a search box, a table or an API, as well as by looking.
- **Give tables alongside pictures.** List the features in view, the edges of a network or the residues around a site. Keep tables short, or let students filter them: a table of 100 rows and 100 columns takes 10,000 keystrokes to read [2].
- **Give text versions of trees and structures.** A Newick string or a nested list for a tree, a list of residues and their contacts for a structure, and tactile prints where your institution can make them.
- **Describe what to look for, not where or what colour it is.** Write "the variant in the seventh codon", not "the red mark on the left".
- **Use the keyboard features the tools have.** In igv.js, the search box works from the keyboard. On a selected track, the F and B keys jump to the next and previous feature, but selecting a track needs a pointer: click **Select Tracks** in igv.js's toolbar, then tick the box beside the track. Set this up before handing over to a student who uses only a keyboard.
- **Let students use their own set-up**, with their own screen reader, magnifier, colours and devices.
- **Allow extra time**, and avoid timed tasks inside a tool. If time matters, let students extend it.
- **Ask early.** Your institution's disability service can tell you before the session what each student needs.

## Plan for colour vision deficiency

Red-green colour vision deficiency affects about 8% of men and 0.4% of women of European ancestry, and 4 to 6.5% of men of Chinese and Japanese ancestry [7]. In a class of 200 with equal numbers of men and women of European ancestry, expect about eight students to have it.

- **Avoid rainbow and red-green colour maps.** They distort data, and can be unreadable for people with colour vision deficiency [8].
- **Get the figure right in greyscale first** [9], then check it with a simulator such as Coblis or Viz Palette [10].
- **Use palettes made for the purpose.** For continuous data, cividis was designed so that people with and without red-green colour vision deficiency read it almost identically [11]. For categories, Okabe and Ito's palette and ColorBrewer's are good starting points [2].
- **Change tools' default colours** before you export figures for teaching. IGV is one tool whose defaults need it [2].
- **Label things directly**, and use shape, pattern or position as well as colour [2].

## Test the activity before the class

- Do the whole task with the keyboard alone, using Tab, Shift+Tab, Enter, Space and the arrow keys.
- Try it with a screen reader. NVDA on Windows and VoiceOver on macOS are free [2].
- Zoom the browser to 200%. WCAG asks that text can be enlarged this far without losing content or function [3].
- Look at every figure in greyscale, or in a colour-blindness simulator.
- Better still, test with disabled students or colleagues, and build the alternatives with them. "Design with people, not for them" is one of the ten rules [2].

## Watch for new aids

The genome browsers and 3D viewers tested for this site draw their content as pictures that screen readers cannot read, and purpose-built aids are at an early stage. AltGosling writes text descriptions of genomics visualisations made with the Gosling toolkit. It was designed with a blind screen-reader user, and described these visualisations better than large language models did [12]. VIJB shows the output of the JBrowse genome browser on a Braille display [13]. Both are early tools, so the second routes above remain the practical answer. Schmidt and colleagues also point out that research projects in bioinformatics may be more accessible for students with disabilities [14].

## References

{: .references}
1. L'Yi S, Zhang HG, Mar AP, et al. (2025). A comprehensive evaluation of life sciences data resources reveals significant accessibility barriers. *Scientific Reports* 15: 23676. [doi:10.1038/s41598-025-08731-7](https://doi.org/10.1038/s41598-025-08731-7)
2. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
3. W3C (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation, 5 October 2023; current version 12 December 2024. [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/), and [What's new in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
4. Jisc. *Practical steps to meeting accessibility regulations*. Read 15 October 2026. [jisc.ac.uk](https://jisc.ac.uk/guides/practical-steps-to-meeting-accessibility-regulations)
5. The Galaxy Community (2024). The Galaxy platform for accessible, reproducible, and collaborative data analyses: 2024 update. *Nucleic Acids Research* 52(W1): W83–W94. [doi:10.1093/nar/gkae410](https://doi.org/10.1093/nar/gkae410)
6. Galaxy Training Network. *Accessibility*. Read 15 October 2026. [training.galaxyproject.org](https://training.galaxyproject.org/training-material/accessibility.html)
7. Birch J (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A* 29(3): 313–320. [doi:10.1364/JOSAA.29.000313](https://doi.org/10.1364/JOSAA.29.000313)
8. Crameri F, Shephard GE, Heron PJ (2020). The misuse of colour in science communication. *Nature Communications* 11: 5444. [doi:10.1038/s41467-020-19160-7](https://doi.org/10.1038/s41467-020-19160-7)
9. Marai GE, Pinaud B, Bühler K, Lex A, Morris JH (2019). Ten simple rules to create biological network figures for communication. *PLOS Computational Biology* 15(9): e1007244. [doi:10.1371/journal.pcbi.1007244](https://doi.org/10.1371/journal.pcbi.1007244)
10. Hattab G, Rhyne TM, Heider D (2020). Ten simple rules to colorize biological data visualization. *PLOS Computational Biology* 16(10): e1008259. [doi:10.1371/journal.pcbi.1008259](https://doi.org/10.1371/journal.pcbi.1008259)
11. Nuñez JR, Anderton CR, Renslow RS (2018). Optimizing colormaps with consideration for color vision deficiency to enable accurate interpretation of scientific data. *PLOS ONE* 13(7): e0199239. [doi:10.1371/journal.pone.0199239](https://doi.org/10.1371/journal.pone.0199239)
12. Smits TC, L'Yi S, Mar AP, Gehlenborg N (2024). AltGosling: automatic generation of text descriptions for accessible genomics data visualization. *Bioinformatics* 40(12): btae670. [doi:10.1093/bioinformatics/btae670](https://doi.org/10.1093/bioinformatics/btae670)
13. Nashed S, Uguen P, Sachs LM, Buisine N (2026). VIJB: a companion of the JBROWSE genome browser for the visually impaired people. *Bioinformatics* 42(7): btag396. [doi:10.1093/bioinformatics/btag396](https://doi.org/10.1093/bioinformatics/btag396)
14. Schmidt CA, Hodkinson LJ, Comstra HS, et al. (2023). A cost-free CURE: using bioinformatics to identify DNA-binding factors at a specific genomic locus. *Journal of Microbiology & Biology Education* 24(3): e00120-23. [doi:10.1128/jmbe.00120-23](https://doi.org/10.1128/jmbe.00120-23)
