---
title: Getting started
lede: Publish a teaching page on GitHub Pages, load its libraries at fixed versions, use data that other websites allow you to read, and test it on a laptop and a phone before students do.
description: How to host interactive genomics teaching pages on GitHub Pages, with one-file examples, exact library versions and integrity hashes, local copies for blocked networks, CORS and range requests for data, local testing, phones, when to link out, and licences, plus a live checker for data addresses.
---

Every example on this site is a single HTML file that runs in the reader's browser, with no server program behind it. This page covers what the examples have in common: where to publish them, how to load libraries so that they keep working, which data a page can read, how to test, and when a link serves students better than an embedded tool. Everything here was checked on 15 October 2026.

## Publish a page with GitHub Pages

GitHub Pages turns the files in a GitHub repository into a website, free of charge. It serves files as they are and cannot run PHP, Ruby or Python on the server ([GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)), so everything must run in the browser. That suits teaching pages, and this site is published the same way.

1. **Create a repository.** On GitHub, choose **New repository**, give it a name and make it public. On GitHub's free plan, Pages works only with public repositories.
2. **Add the first page.** Put a file called `index.html` (or `index.md`) at the top of the repository, or in a folder called `docs`.
3. **Switch Pages on.** In the repository, open **Settings**, then **Pages**. Under "Build and deployment", set **Source** to **Deploy from a branch**, choose the branch (usually `main`) and the folder (`/ (root)` or `/docs`), and click **Save** ([GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)).
4. **Wait, then visit.** Changes can take up to 10 minutes to appear. **Visit site**, on the same settings page, opens the site. Its address has the form `<user>.github.io/<repository>/`.
5. **Add more files.** Each file is published at the same path as in the repository, so `examples/data/genes.bed` appears at `…/examples/data/genes.bed`.

GitHub's documentation lists the limits ([GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)) and a warning:

- **A Pages site is public, even if the repository is private.** Never put student data, or anything else you would not publish, in the repository.
- **A published site may be no larger than 1 GB**, with a soft bandwidth limit of 100 GB a month. Leave whole genomes on the data servers, and keep small slices in your site.
- **Publishing from a branch runs Jekyll**, which builds this site. Jekyll copies files without front matter unchanged. If you do not use Jekyll, add an empty file called `.nojekyll` at the top of the site.

How GitHub Pages serves files matters for genomics. When we checked with `curl`, it answered range requests with `206 Partial Content`, so genome browsers can read indexed files from it; it sent `Access-Control-Allow-Origin: *`, so pages on other sites can read your files; and it sent `Cache-Control: max-age=600`, so browsers may show the old version of a page for up to 10 minutes after you change it. It does not let you add headers of your own, so features that need them, such as cross-origin isolation for interrupting R or Python code, need a workaround with a service worker.

## Keep each example in one file

Each example on this site is one HTML file that works on its own. A reader can open it, download it and change it, and you can copy it into another site. The skeleton of such a file is short:

```html
<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HBB in a genome browser</title>
  <!-- One script per library, at an exact version, with its integrity hash -->
  <script src="https://cdn.jsdelivr.net/npm/igv@3.8.9/dist/igv.min.js"
          integrity="sha384-J2SJJANecDBpqn++zIO/AJY/Fpk64lYDp43ibq7bmQONxd9b80ZpvLKBrKdCtYIu"
          crossorigin="anonymous"></script>
  <style>
    body { font: 15px/1.5 system-ui, sans-serif; margin: 0; padding: 12px 16px; background: #fff; }
  </style>
</head>
<body>
  <h1>The human β-globin gene, HBB</h1>
  <p id="feedback" role="status" aria-live="polite"></p>
  <div id="igv"></div>
  <script>
    // Comments say why, for the next person who changes this file
    igv.createBrowser(document.getElementById("igv"), { genome: "hg38", locus: "HBB" });
  </script>
</body>
</html>
```

What each part does:

- **`lang` and the viewport line.** Screen readers use the language, and phones need the viewport line to lay the page out at their own width.
- **Exact versions and hashes**, explained in the next section.
- **Labelled controls and a live message.** Every input has a label, every button is `<button type="button">`, and feedback goes into an element with `aria-live="polite"`. The [accessibility page](../accessibility/) explains why.
- **Data next to the file.** Small data files go in a `data` folder beside the example, with a `README.txt` that says where each came from.

Opened straight from the disk, with a `file://` address, a page can still load its libraries and read data from servers that allow other websites. It cannot read the files beside it: Chromium refuses with "URL scheme 'file' is not supported". Serve the folder with a local server instead, as described [below](#test-on-your-own-computer).

## Fix the version and check the hash

Libraries keep changing, so an address that does not name a version can give your page different code from one day to the next. An address such as `igv@latest`, or a version range such as `igv@3`, gets updates automatically, and jsDelivr warns that the code behind such an address "can change any time" ([jsDelivr](https://www.jsdelivr.com/using-sri-with-dynamic-files)). Name the exact version instead, as in `igv@3.8.9`. Libraries for teaching move quickly: Mol\* went from version 5.10 to 5.13 in about four months, and react-msaview released three major versions, 7.0, 8.0 and 9.0, between 14 September and 12 October 2026.

Subresource integrity (SRI) adds a second check. The `integrity` attribute holds a hash of the exact file, and the browser refuses to run a download whose hash differs ([MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity)). A file from another site also needs `crossorigin="anonymous"`, because the check works only when that site allows other websites to read the file. To make the hash:

```bash
curl -s https://cdn.jsdelivr.net/npm/igv@3.8.9/dist/igv.min.js | openssl dgst -sha384 -binary | openssl base64 -A
```

A few cautions:

- **Hash only files that never change.** jsDelivr advises SRI only for full links to single files at fixed versions, because the files it minifies or combines on request can change ([jsDelivr](https://www.jsdelivr.com/using-sri-with-dynamic-files)).
- **ES modules** can carry hashes in the `integrity` section of an import map. Chromium enforced them in our tests: a wrong hash blocked the module.
- **Some libraries load more files themselves.** webR and Pyodide download many further files after the first, and a hash covers only the file named in the tag. For these, the exact version in the address is the protection.
- **Update on purpose.** Read the release notes, change the version and the hash together, and test the page again.

## Plan for networks that block a CDN

A content delivery network (CDN) such as jsDelivr serves libraries from servers close to the reader. Most examples on this site use jsDelivr. Many files are also on unpkg or cdnjs, byte for byte the same: igv.js 3.8.9 has the same hash on unpkg as on jsDelivr. But a school, hospital or company network may block a CDN, or a particular site such as the one webR loads R from, so test from the room you will teach in. Some libraries fetch from more than one host: when `hgdownload.soe.ucsc.edu` does not answer, igv.js 3.8.9 quietly fetches the same files from UCSC's mirror at `genome-browser.s3.us-east-1.amazonaws.com`, so ask for both to be allowed.

The reliable answer is a copy of the library next to your page:

```bash
mkdir -p vendor
curl -sL -o vendor/igv.min.js https://cdn.jsdelivr.net/npm/igv@3.8.9/dist/igv.min.js
openssl dgst -sha384 -binary vendor/igv.min.js | openssl base64 -A    # must match the hash in your page
```

Then point the script tag at `vendor/igv.min.js`, keep the `integrity` attribute, and keep the library's licence file beside it. In our tests, an igv.js page and a JBrowse 2 page that loaded their library and data from the same site kept working with every outside request blocked. webR and Pyodide are harder, because they load many megabytes of further files. Pyodide worked offline on a second visit while the page itself was still in the browser's cache. webR did not start offline even after a visit, because at start-up it asks its server for a file in a way that Chromium did not answer from its cache in our tests.

Data need as much care as libraries, because public servers are sometimes slow or down: during our tests, Ensembl's REST API failed 32 of 45 requests over about 40 minutes, and Zenodo failed now and then. Where a dataset's licence allows it, host a small copy next to the page.

{% include ad.html slot="in_article" %}

## Use data that other websites let you read

A page can show an image from any site, but its code can read a file from another site only if that site's answer includes the header `Access-Control-Allow-Origin`. The rule is called cross-origin resource sharing, or CORS ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)). Genome browsers, structure viewers and chart libraries all read their data with code, so the rule applies to every data file a teaching page uses.

Three details often catch people out:

- **Errors look like refusals.** Many servers leave the header off their error messages, so a busy server looks the same to a page as one that never allows other websites: the browser reports only that the request failed. Ensembl's REST API does this ([genome browsers page](../genome-browsers/#link-to-ucsc-and-ensembl)), and so did Zenodo during our tests.
- **Most headers stay hidden.** A page can read only a few headers of another site's answer, such as `Content-Type` and `Content-Length`, unless the server lists more in `Access-Control-Expose-Headers` ([MDN](https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header)). NCBI lists `Content-Range`, which gives a file's full size, but UCSC and GitHub Pages do not.
- **A page served over https cannot read http addresses.** Browsers block the request as mixed content ([MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content)), so data addresses must start with `https://`.

Range requests matter for large indexed files. Formats such as BAM, CRAM, VCF compressed with bgzip, bigWig, bigBed and 2bit are read in pieces: the browser asks for a range of bytes, and a server that supports this answers `206 Partial Content` with just that piece. A server that does not answers `200` and sends the whole file ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests)). A request for a single range of bytes counts as a simple request under CORS, so the browser sends it without asking the server's permission first ([MDN](https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header)).

These sources behaved as follows when we checked them:

<div class="table-wrap" markdown="1">

| Source | Other websites may read it | Answers range requests |
|---|---|---|
| UCSC downloads (`hgdownload.soe.ucsc.edu`) and the UCSC API | Yes | Yes (downloads) |
| 1000 Genomes at EBI (`ftp.1000genomes.ebi.ac.uk`) | Yes | Yes |
| NCBI, including ClinVar (`ftp.ncbi.nlm.nih.gov`) | Yes | Yes |
| UniProt REST API | Yes | FASTA yes; JSON only sometimes |
| RCSB PDB files (`files.rcsb.org`) | Yes | No: it sends the whole file |
| PDBe, the AlphaFold DB API and the STRING API | Yes | Not checked |
| Zenodo, API address (`zenodo.org/api/records/…/content`) | Yes | Yes |
| Zenodo, download address (`…?download=1`) | No | Yes |
| GitHub Pages | Yes | Yes |
| Galaxy servers' API | No, except the new "landing" endpoints | Not checked |
| ENCODE portal download links | Refused in our tests: use the file's public Amazon S3 address | Yes, from S3 |
| TreeBASE downloads and the Microreact API | No | Not checked |

</div>

## Check a data address before class

This checker asks a server for the first 100 bytes of a file, as a genome browser does, and reports whether other websites may read it, whether it answers range requests, how big the file is and what kind of file it appears to be.

{% include example.html file="examples/check-data-url.html" title="Check a data address" height="620" caption="The file next to the page is the first exon of HBB in FASTA format; [its README](https://github.com/comparativechrono/genomics-tel/tree/main/developers/getting-started/examples/data) says where it came from. Zenodo was slow and sometimes failed during our tests, and a failure looks the same as a refusal, so try the Zenodo examples twice." %}

How it works:

- **The request** is `fetch(url, { headers: { Range: "bytes=0-99" } })`. A single range of bytes needs no permission check, as above.
- **Reading the answer.** A `206` answer holds only the bytes asked for. From a `200` answer the page reads one piece of the download and cancels the rest, so a large file is not fetched in full.
- **Telling a refusal from an unreachable server.** When `fetch` fails, the browser does not tell the page why. The checker then sends a `HEAD` request in `no-cors` mode. That answer cannot be read either, but if it arrives, the server is reachable and did not let the page read the file.
- **Recognising formats.** Files compressed with bgzip begin like gzip files but carry an extra field named `BC`, and only these can be read through an index such as a `.tbi`. The checker also recognises 2bit, bigWig and bigBed files from their first four bytes.
- **Files on the same site** are always readable by the page. To check whether other sites can read your own files, paste their address into the checker on this page.

## Test on your own computer

For this site's repository, or any Jekyll site:

```bash
bundle exec jekyll build --baseurl ""                                   # build the site into _site
python3 tools/serve.py 8800 _site                                       # serve it at http://127.0.0.1:8800/
python3 tools/check.py                                                  # template braces, exact versions, broken links
python3 tools/test_examples.py http://127.0.0.1:8800 getting-started    # run the examples in Chromium
```

`tools/serve.py` answers range requests and sends `Access-Control-Allow-Origin: *`, as GitHub Pages does. It also exposes `Content-Range`, which GitHub Pages does not, and tells the browser not to cache anything. Python's built-in server (`python3 -m http.server`) does not answer range requests, so indexed files fail with it. `tools/test_examples.py` opens each example in headless Chromium, reports console errors, failed requests and HTTP errors, and saves a screenshot in `tools/screenshots/`; it needs Python Playwright.

While you work, keep the browser's developer tools open on the Console and Network tabs, where refused requests, missing files and blocked mixed content show up. We test in Chromium only, so try important pages in Firefox and Safari as well, and on the tablets your students use.

## Check the page on a phone

Many students will open your teaching pages on a phone, so include the viewport line, avoid fixed widths, and put wide tables in a box that scrolls sideways. In a CSS grid, use `minmax(0, 1fr)` rather than `1fr` for columns that hold wide content: in our tests, a plain `1fr` column made a network page wider than a 412-pixel phone.

This is what we found at phone width:

<div class="table-wrap" markdown="1">

| Tool | On a phone |
|---|---|
| igv.js 3.8.9 | Its toolbar needs about 745 pixels, or about 473 with the optional buttons hidden, so a 390-pixel phone zooms the whole page out. There is no pinch to zoom. |
| JBrowse 2 linear genome view 4.3.0 | Fits a 390-pixel screen |
| Mol\*, PDBe Mol\*, NGL and 3Dmol.js | Worked at 412 pixels wide; the Mol\* pages needed no sideways scrolling |
| Nightingale and react-msaview | Fit a 390-pixel screen, but the residues become very small |
| Cytoscape.js | Fits once grid columns use `minmax(0, 1fr)` |
| JupyterLab | Crowded; the simpler Notebook interface works better |
| webR and Pyodide code boxes | Built to fit a phone |

</div>

Check with the device emulation in your browser's developer tools, then on a real phone, on the network students will use.

## Link out when embedding does not work

Some services refuse to appear inside another site's page, and some are better used whole. This is what we found when we tested them:

<div class="table-wrap" markdown="1">

| Service | In a frame on your page | Instead |
|---|---|---|
| UCSC Genome Browser | Its check for automated visitors runs inside the frame | Link in a new tab, show a picture from `hgRenderTracks`, or use the UCSC API for data |
| Ensembl | Refused (`X-Frame-Options: SAMEORIGIN`) | Link in a new tab; use the REST API for data |
| Galaxy | Refused by usegalaxy.org and .org.au, except published pages opened with `embed=true`; usegalaxy.fr refused those too on 16 October 2026 | Link to a tool, a workflow or a published history |
| STRING | The website sits behind a check for automated visitors | Draw the network yourself from the STRING API |
| FinnGen | Refused (`X-Frame-Options: SAMEORIGIN`) | Link out; its API answers other websites |
| JBrowse Web | Allowed | Host your own copy with analytics switched off, because the copy at jbrowse.org contacts Google Analytics |
| Nextstrain and Microreact | Allowed | Embed a dated snapshot, and give a direct link too, because their accessibility is out of your hands |
| JupyterLite | Allowed | Files a student saves inside the frame are kept apart from the same site opened directly |

</div>

Link out when a service refuses frames, when students must log in, when the whole tool is the point of the lesson, or when an embedded view would be too small on a phone. The topic pages give working links for [genome browsers](../genome-browsers/#link-to-ucsc-and-ensembl) and the other tools.

## Know the licences of libraries and data

The libraries used on this site all have open-source licences that allow their use in teaching pages. So do the smaller libraries that some of them need, such as underscore for phylotree.js and the layout extensions for Cytoscape.js, which are under MIT. When you save a copy of a library, keep its licence notice with it.

<div class="table-wrap" markdown="1">

| Library | Version we tested | Licence |
|---|---|---|
| igv.js | 3.8.9 | MIT |
| JBrowse 2 | 4.3.0 | Apache 2.0; the linear genome view package itself is labelled MIT |
| Nightingale | 5.11.0 | MIT |
| react-msaview | 8.4.1 | MIT |
| SeqViz | 3.10.25 | MIT |
| Mol\* | 5.12.0 | MIT |
| PDBe Mol\* | 3.12.0 | Apache 2.0 |
| NGL | 2.5.0 | MIT |
| 3Dmol.js | 2.5.5 | BSD 3-clause |
| Cytoscape.js | 3.34.3 | MIT |
| phylotree.js | 2.6.0 | MIT |
| Phylocanvas.gl | 1.64.1 | MIT |
| d3 | 7.9.0 | ISC |
| Vega, Vega-Lite and vega-embed | 6.4.0, 6.4.3 and 7.3.0 | BSD 3-clause |
| Plotly.js | 4.1.1 | MIT |
| Observable Plot | 0.6.17 | ISC |
| webR | 0.6.0 | MIT; the R binaries it loads are GPL |
| Pyodide | 314.0.7 | Mozilla Public License 2.0 |
| JupyterLite | 0.8.5 | BSD 3-clause |

</div>

Data come with terms of use as well. Protein Data Bank files are in the public domain (CC0). AlphaFold DB models and STRING networks are under CC BY 4.0, so credit the source. Data from UCSC, ClinVar, ENCODE and the 1000 Genomes Project are free to use under each provider's terms: cite them, and check the terms before you copy files into your site. FinnGen asks users to acknowledge and cite it, and we found no licence that allows redistribution, so link to its data rather than copying them. TreeBASE files state no licence. For human data, also read [genomic data and ethics](../../educators/data-and-ethics/).

This site's own text is under CC BY 4.0 and its code, including every example, under the MIT licence ([about this site](../../about/)).
