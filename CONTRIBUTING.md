# Writing for genomics.tel

This guide is for anyone adding or changing pages, including people who are not web developers. The site is built by GitHub Pages with Jekyll: pages are Markdown files, and every push to `main` rebuilds the site.

## How the site fits together

| Where | What |
|---|---|
| `_data/topics.yml` | The eight topics. Each has an educator page and a developer page. The home page, overview pages and side menus are built from this list. |
| `_data/nav.yml` | Pages that apply to every topic, listed above the topics in each side's menu. |
| `_data/sites.yml` | Our sites, for the "Our sites" page and the home page. |
| `educators/<topic>.md` | How to teach with the tool. |
| `developers/<topic>/index.md` | How to build the tool into a page, with live examples. |
| `developers/<topic>/examples/*.html` | Live examples: one standalone HTML file each. |
| `developers/<topic>/examples/data/` | Small data files the examples use, with a `README.txt` saying where they came from. |
| `_includes/example.html` | Shows an example running, with its code underneath. |
| `_includes/ad.html` | An ad unit (see "Ads" below). |
| `_config.yml` | Site settings, including the AdSense IDs. |
| `tools/` | Scripts for checking and testing. Not part of the published site. |

## How we write

The readers are lecturers, demonstrators, learning technologists and research software engineers. Many read English as a second language. Write for them.

- **British English**: colour, organise, centre, licence (noun) and license (verb), programme (a course) and program (software).
- **Plain words and short sentences.** Say what something does, in the reader's terms. Explain a technical term the first time it appears on a page.
- **Active voice, and "you"** for the reader. "Load the track when students ask for it", not "Tracks may be loaded on demand".
- **No selling.** Avoid words such as powerful, seamless, robust, cutting-edge, unlock, leverage, empower, journey, delve and game-changer. Describe what a tool does and what it costs in time, size or effort, and let the reader judge.
- **No exclamation marks**, and keep dashes for ranges in tables. In sentences, use commas, colons, brackets or a new sentence.
- **Numbers**: words for one to nine in prose, figures for measurements, versions, sizes and times (7 MB, 15 seconds). Dates as 15 October 2026.
- **Be specific and honest.** Give sizes, versions and the date something was tested. Say what does not work, and where the evidence is thin.
- **Headings** are in sentence case and say what the section does ("Let students open their own files"), not just a noun.
- **Asterisks in names.** Write the name Mol\* as `Mol\*` in Markdown. A bare asterisk starts italics, and two of them in one paragraph turn the text between them italic.

## Accuracy

- Every claim about how a tool behaves should be something we tested, or something its documentation says, with a link.
- Every claim about teaching or learning should cite a source. Only cite papers whose DOI you have checked and whose abstract supports the claim. If you cannot check it, leave it out.
- Name the version of every library and the date the page was tested.
- Teaching data must be public, consented for open use, or synthetic, and labelled as such. Never use identifiable patient data.

## Topic pages for educators

Front matter:

```yaml
---
title: Teaching with genome browsers
topic: genome-browsers
lede: One or two sentences on what the tool teaches.
description: A sentence for search engines.
---
```

Sections, in this order:

1. **What … teaches well**: a short paragraph, then a list starting "After a well-designed session, students should be able to:".
2. **Activities**: one `###` heading per activity. Under it, an italic line with level, time and grouping (*First year. 50 minutes, in pairs.*), numbered steps, and what students produce. Link to the live examples on the developers' page where there is one.
3. `{% include ad.html slot="in_article" %}` (see "Ads").
4. **Assessing what students learned**.
5. **Where students go wrong**: the common misconceptions, each in a bold-led paragraph.
6. **Practical tips**: devices, accounts, network, timing, accessibility.
7. **The evidence**: what the research shows, and what it does not.
8. **References**: an ordered list after `{: .references}`, cited in the text as [1], [2].

## Topic pages for developers

Front matter as above, with a `title` such as "Embedding genome browsers".

1. **Which … to use**: a short comparison table of the options.
2. Then one section per job ("A browser in a few lines", "Turn the browser into an activity"…). Each section: a sentence or two on what the reader will get, the example, then a short list of how it works.
3. **Things that catch people out**: phones, performance, accessibility, versions.
4. **Licences and credits**, then **References**.

Put tables inside `<div class="table-wrap" markdown="1">` … `</div>` (with blank lines inside) so wide tables scroll on phones. A paragraph followed by `{: .note}` becomes a highlighted note.

## Live examples

Each example is one HTML file in the topic's `examples/` folder that works on its own: someone can download it, open it, and change it.

- Start from an existing example so the look stays consistent. Every example has the same small `<style>` block: system font, white background, a small `h1`.
- Load libraries from a CDN with an **exact version** (`igv@3.8.9`, never `@latest`), and add an `integrity` hash and `crossorigin="anonymous"` to `<script>` tags where the library is a single file. To make a hash: `curl -s URL | openssl dgst -sha384 -binary | openssl base64 -A`.
- **Do not use two opening curly braces, or a curly brace followed by a percent sign, anywhere in an example.** Jekyll reads the file as a template when it shows the code, and the build breaks. In JavaScript, write `{ {` with a space if you ever need it. `tools/check.py` tests for this.
- Use public data that allow use from other websites (they send `Access-Control-Allow-Origin`), or small files in `examples/data/`. Write down where every data file came from in `data/README.txt`.
- No API keys, no tracking, no ads inside examples.
- Comments in the code explain *why*, in plain English, because readers learn from them.
- Accessibility: label every input, use `<button type="button">`, and put feedback in an element with `aria-live="polite"`. Give a text version of anything that only appears in a picture.

Show an example in a page with:

```liquid
{% include example.html file="examples/igv-basic.html" title="igv.js open at HBB" height="430" %}
```

| Option | Meaning |
|---|---|
| `file` | Path of the example, relative to the page (required) |
| `title` | What the example shows (required) |
| `height` | Height of the live view in pixels; measure it so there is no big empty space |
| `caption` | A sentence or two under the example. Markdown links work. |
| `load="click"` | Wait for a click before loading. Use it for anything that downloads more than about 2 MB, such as webR, Pyodide or JBrowse. |
| `note` | The sentence shown before a `load="click"` example starts |
| `open=false` | Start with the code folded away |

## Links

Write links between pages as relative paths, such as `../../educators/genome-browsers/` from a developer topic page, or `../accessibility/` between pages on the same side. Never start a link with `/` in Markdown: the site lives at `comparativechrono.github.io/genomics-tel/` until the domain is attached, and a leading `/` would point outside it. In HTML templates, use `{{ '/path/' | relative_url }}`.

## Ads

Google allows only the labels "Advertisements" or "Sponsored Links", and ads must not sit next to buttons, navigation or interactive content. So:

- Each topic page has one `{% include ad.html slot="in_article" %}`, placed between two sections of prose. Never put it directly before or after an example, a code block, a list of links or a set of buttons.
- The guide layout adds one more ad at the end of the article.
- Overview pages, the home page, "Our sites" and the 404 page have no ad units (`ads: false`).
- Never ask readers to click ads or to "support us" through them.

Until `adsense.publisher_id` is set in `_config.yml`, ad slots appear as grey placeholders (if `show_placeholders` is true) and no ad code is loaded.

## Checking your work

```bash
bundle install                                  # once
bundle exec jekyll build --baseurl ""           # build into _site
python3 tools/check.py                          # template braces, pinned versions, broken links
python3 tools/serve.py 8800 _site               # serve with range requests, at http://127.0.0.1:8800/
python3 tools/test_examples.py http://127.0.0.1:8800 genome-browsers   # run the examples in Chromium
```

`test_examples.py` needs Python Playwright (`pip install playwright` and `playwright install chromium`). It saves a screenshot of each example in `tools/screenshots/`. Look at them, and look at your page in light and dark mode and at phone width before you push.
