---
title: About this site
description: Who makes genomics.tel, how the live examples are checked, why the site will carry a few ads, and how you may reuse its text and code.
lede: A free site about teaching genomics with interactive tools, written for the people who teach it and the people who build teaching websites.
---
{% include ads-flags.html %}

## What the site is for

Students learn more when they do something with the material than when they only listen (the [planning page]({{ '/educators/planning/' | relative_url }}) has the evidence). Genomics gives them plenty to do: finding a variant in a genome browser, turning a protein to see where a mutation sits, running an analysis and looking hard at the result. The tools that make this possible were built for research, and they are free. The hard part is fitting them into a course. This site collects what we have learned about that, from both sides: how to teach with these tools, and how to put them into a web page.

The name comes from TEL, short for technology-enhanced learning.

## Who makes it

genomics.tel is written by [Tim Hearn and the Chronomic Medicine Group]({{ site.owner.website }}). We teach genomics, bioinformatics and data science, and we build browser-based teaching tools, which are listed on [Our sites]({{ '/sites/' | relative_url }}).

## How we check the examples

Every live example is a standalone page that we run in a current Chromium browser before publishing. Library versions are fixed in each example, so an example keeps working when a library changes. Data come from public services that allow other websites to use them, or from small files we host next to the examples. If something has stopped working, or you spot a mistake, please [open an issue on GitHub](https://github.com/{{ site.repository }}/issues) or email [{{ site.owner.email }}](mailto:{{ site.owner.email }}).

## Why there are ads {#ads}

{% if ads_live -%}
genomics.tel shows a small number of Google ads. The money they bring in pays for the genomics.tel web domain.
{%- else -%}
genomics.tel is going to show a small number of Google ads, to pay for the genomics.tel web domain. There are no ads on the site yet.
{%- endif %}

- Ads appear only on guide pages: at most two on a page, between sections of text, and never inside or next to a live example or its code.
- Advertisers have no say in what we write, and nobody pays us to recommend a tool.
- Google chooses the ads. In the UK, the European Economic Area and Switzerland, you are asked whether Google may use cookies and personal data for ads. You can change your answer at any time from the "Privacy and cookie settings" link at the bottom of each page{% unless ads_live %}, which will appear with the ads{% endunless %}.

Our [privacy page]({{ '/privacy/' | relative_url }}) explains what Google collects and how to opt out of personalised ads.

## Reusing our material

- **Text** is licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). You may copy and adapt it for any purpose, including your own teaching, if you credit genomics.tel.
- **Code**, including every example file, is under the [MIT licence](https://github.com/{{ site.repository }}/blob/main/LICENSE.md), so you can copy it into your own pages, commercial or not.
- **Libraries and data** used by the examples keep their own licences, which each guide names.
- **Fonts** are Atkinson Hyperlegible Next and Mono from the Braille Institute, under the [SIL Open Font Licence]({{ '/assets/fonts/OFL-atkinson-hyperlegible-next.txt' | relative_url }}). They were designed to be easy to read for people with low vision.

## Contributing

The whole site is in a [public GitHub repository](https://github.com/{{ site.repository }}). Pages are written in Markdown, and each example is one HTML file, so a correction or a new example can be a small pull request. The repository's README explains how the pages fit together.
