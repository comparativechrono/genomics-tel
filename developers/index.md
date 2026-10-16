---
title: For developers
lede: How to put genomic tools into a teaching web page, with live examples you can open, read, download and change.
description: How to embed genome browsers, alignment viewers, 3D structures, Cytoscape.js networks, Galaxy, R and Python, phylogenetic trees and charts in teaching pages, with live examples and code to copy.
ads: false
---

These pages are for anyone who builds teaching pages: lecturers who write their own course sites, learning technologists, and research software engineers. They cover a genome browser open at the right gene, a protein structure with a variant picked out, a network that students can click through, and R or Python that runs with nothing to install.

## Topics

{% include topic-list.html side="developers" %}

## How the examples work

Every example is a single HTML file. It loads its libraries from a public CDN at a fixed version, so it keeps working when a library changes, and most check the file's integrity hash so that a tampered copy will not run. Each guide shows the example running, then its full code, with links to open it on its own or download it. Copy the file to your own site, or open it straight from your computer, and change it for your course.

The data come from public services that allow other websites to use them, such as the UCSC Genome Browser, the RCSB Protein Data Bank, AlphaFold DB and STRING, or from small files that sit next to the examples. Each guide says which, so you know what your page depends on.

We test every example in a current Chromium browser before we publish it, and we date the versions we use. If an example stops working, [tell us on GitHub](https://github.com/comparativechrono/genomics-tel/issues).

## Before you build

[Getting started](getting-started/)
: Hosting a teaching page on GitHub Pages, fixing library versions, serving data files that other sites can read, and planning for classroom networks.

[Accessibility](accessibility/)
: Keyboard use, screen readers, colour and motion in interactive genomics views, and text alternatives that teach.
