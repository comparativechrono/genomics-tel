---
title: Running R and Python in a page
topic: r-and-python
lede: Put code that students can edit and run into a teaching page, with nothing to install and no server to run it. webR and Pyodide suit a few code boxes on a page, JupyterLite suits practicals taught as notebooks, and Quarto Live suits exercises with feedback.
description: How to run R with webR and Python with Pyodide in a teaching web page, install CRAN, Bioconductor and PyPI packages, open code in a JupyterLite console, publish a JupyterLite site and stop runaway code, with live examples.
---

## Which option to use

<div class="table-wrap" markdown="1">

| <span class="visually-hidden">Feature</span> | webR | Pyodide | JupyterLite | Quarto Live | PyScript |
|---|---|---|---|---|---|
| What it is | R compiled to WebAssembly, driven by your page's JavaScript | Python compiled to WebAssembly, driven the same way | JupyterLab and Jupyter Notebook as a static website, with Python or R running in the browser | A Quarto extension that turns code cells into boxes run by webR or Pyodide | Python written into a page's HTML, run by Pyodide |
| First load, measured | 14 MB, 4–6 s; with ggplot2, 51 MB and 16–23 s | 6 MB, 3–6 s; with numpy, matplotlib and Biopython, 22 MB | A console: 14 MB, 16–21 s. A notebook with Biopython and a plot: 33 MB, 18–20 s | A page with R and Python: 50 MB, 20 s | 6 MB, 4–12 s |
| Offline after a visit | No | Only while the page is in the browser's cache | Not tested | No | Not tested |
| Packages | 24,638 CRAN and 2,402 Bioconductor packages, but not DESeq2 or edgeR | About 350 built for Pyodide, and pure-Python packages from PyPI | Pyodide's, or a fixed set chosen when you build the site | webR's, and those of an older Pyodide | Pyodide's |
| Keeps students' work | No | No | Yes, in the browser, and as downloaded notebooks | Not by default | No |
| Build step | None | None | A GitHub Actions workflow | `quarto render` when you write the page | None |
| Licence | MIT, and GPL for R itself | MPL 2.0 | BSD 3-Clause | MIT | Apache 2.0 |

</div>

webR and Pyodide suit a few code boxes on an otherwise ordinary page, as in the first two examples below. JupyterLite suits practicals taught as notebooks, and Quarto Live suits course pages written in Quarto, with exercises that check answers. PyScript lets you write Python straight into a page's HTML. It suits small demonstrations, but it adds a layer, with its own releases, on top of Pyodide. None of them needs a server that runs code, accounts or keys, or special headers from your web host, so they work on a plain static host such as GitHub Pages.

We tested everything on 15 October 2026 in Chromium, with webR 0.6.0 (R 4.6.0), Pyodide 314.0.7 (Python 3.14.2), JupyterLite 0.8.5, Quarto 1.10.18 with Quarto Live 0.2.0, and PyScript 2026.7.3. Times were measured on a fast connection: on a 20 Mbit/s connection, add about 4 seconds for every 10 MB. We did not test Firefox, Safari, or real tablets and phones.

## Put R code boxes in a page with webR

The core of webR is a few lines. It starts R in a Web Worker, a background thread, so the page keeps responding while R works:

```js
import { WebR } from 'https://webr.r-wasm.org/v0.6.0/webr.mjs';

const webR = new WebR();                   // R runs in a Web Worker
await webR.init();                         // downloads about 14 MB the first time
const shelter = await new webR.Shelter();  // keeps track of the R objects made below
const result = await shelter.captureR('gc <- c(0.41, 0.70, 0.39)\nmean(gc)', {
  withAutoprint: true,                     // print values, as R's console does
  captureStreams: true
});
console.log(result.output.map((line) => line.data).join('\n'));   // [1] 0.5
shelter.purge();                           // free those R objects
```

The example builds code boxes on that. Each box is a labelled text area with Run and Reset buttons, and all the boxes on a page share one R session. Students simulate a DNA sequence with a GC-rich stretch, plot its GC content in sliding windows and find where the stretch lies. Because the data are simulated, students can check their answer against the truth.

{% include example.html file="examples/webr-code-boxes.html" title="R code boxes: GC content in sliding windows" height="760" load="click" note="This example runs R in your browser. It downloads about 14 MB when you first click in a box or press Run." %}

How it works:

- **Starting R.** The page imports webR only when a box is first used, and if the download fails it says so, rather than leaving buttons that do nothing. R starts as soon as someone clicks in a box, so it is usually ready when they press Run. The first Run took 4 to 6 seconds, and later runs about a second or less.
- **Running a box.** `captureR()` returns what the code printed, in order, and its plots. With `captureConditions: false`, errors, warnings and messages arrive as text, and the page shows them in red.
- **Plots** arrive as images drawn at twice their size, so lines stay sharp. A box's `data-plot-alt` describes its plot for screen readers, and the code prints the same values as text with `summary()`.
- **Runaway code.** The page cannot interrupt R (see [stopping runaway code](#stop-runaway-code-without-losing-the-session)), so every run has a time limit, set with R's `setTimeLimit()`: 30 seconds, or what the box's `data-time-limit` says. An endless loop stops with "reached elapsed time limit", and R carries on with its variables intact.
- **Packages.** `webr::shim_install()` lets `install.packages()` and `library()` fetch packages built for webR. List the packages every box needs in `<body data-r-packages="ape seqinr">`, so that they install while R starts rather than during a timed run.

The [educators' page](../../educators/r-and-python/#predict-the-gc-content-plot-then-run-the-code) turns these boxes into an activity.

## Run Python in the background with Pyodide

Pyodide's core is just as short. These lines run Python on the page's own thread, which freezes the page while Python works, so keep them for a line or two of code:

```js
import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs';

const pyodide = await loadPyodide();       // downloads about 6 MB the first time
pyodide.setStdout({ batched: (line) => console.log(line) });
await pyodide.runPythonAsync('seq = "ATGGTGCAT"\nprint(seq[::-1].translate(str.maketrans("ACGT", "TGCA")))');   // ATGCACCAT
```

The example runs Python in a Web Worker instead, behind the same kind of code boxes. It uses the coding sequence of the human β-globin gene, *HBB*, from RefSeq (NM_000518.5) [1]: its GC content, its reverse complement, its translation with the genetic code, and the sickle-cell change c.20A>T, which turns codon 7 from GAG (glutamate) into GTG (valine). The last box checks the translation with Biopython [2] and draws a chart with matplotlib.

{% include example.html file="examples/pyodide-code-boxes.html" title="Python code boxes: the HBB coding sequence" height="760" load="click" note="This example runs Python in your browser. It downloads about 6 MB when you first click in a box or press Run, and about 15 MB more for Biopython and matplotlib when box 4 first runs." %}

How the code works:

- **A module worker.** Since version 314.0.0 (June 2026), a worker that runs Pyodide must be a module worker: `new Worker(url, { type: 'module' })`, with `import { loadPyodide } from '…/pyodide.mjs'` inside it. Classic workers that use `importScripts()` no longer load it.
- **One file.** The worker's code sits in the page, in a `<script type="text/plain">` element, and starts from a Blob address, so the example is a single file. Opened from a computer's disk, Chromium refuses a module worker from a Blob, so there the page uses a `data:` address instead.
- **Packages on demand.** `loadPackagesFromImports()` reads the code's `import` lines and downloads what it needs, such as Biopython and matplotlib, before the code runs.
- **Charts** come back as SVG, with text kept as text, so they stay sharp at any size.
- **Errors** show only the lines of the student's own code, not Pyodide's.
- **Stop.** The page cannot interrupt Python either, so Stop, or the 60-second time limit, ends the worker and starts a new Python. Variables are lost, and the page says so. Downloads do not count towards the limit.
- **`input()`** cannot wait for typing in a worker, so the boxes make it raise an error. Put the values in the code instead.

## Install the packages a class needs

Packages have to be built for WebAssembly before webR or Pyodide can use them, so check before the class that every package you need exists, loads and runs.

webR installs CRAN packages from its own repository, `repo.r-wasm.org`, which had 24,638 packages for R 4.6 on 15 October 2026. Bioconductor packages [3] come from R-universe, `bioc.r-universe.dev`, which had 2,402:

```js
// CRAN packages, from the webR repository (the default)
await webR.installPackages(['ggplot2', 'ape'], { quiet: true });

// Bioconductor packages from R-universe, with their CRAN dependencies from the webR repository
await webR.installPackages(['Biostrings'], {
  repos: ['https://bioc.r-universe.dev', 'https://repo.r-wasm.org'],
  quiet: true
});
```

Both repositories change without notice, and R-universe builds Bioconductor's development versions, so a package can change between your test and your class. This example checks whether a package, and every package it depends on, has a webR build. It then installs Biostrings and runs it on the *HBB* sequence.

{% include example.html file="examples/webr-packages.html" title="Check R packages for webR builds, and run Biostrings" height="700" load="click" note="This example runs R in your browser. Checking packages downloads about 20 MB, and installing Biostrings about 18 MB more." caption="The check follows each package's Depends and Imports through both repositories' lists. A package that passes can still fail for other reasons, so run your own code once before the class." %}

What we found on 15 October 2026:

- **These worked:** ggplot2, dplyr, ape, seqinr, Biostrings, GenomicRanges, limma and ggtree.
- **DESeq2 does not.** It installs from R-universe, but `library(DESeq2)` fails because locfit, which it needs, has no WebAssembly build in either repository. edgeR needs locfit too. msa and rtracklayer have no build at all.
- **Size and time add up.** Biostrings and the packages it needs download 18 MB, and loading Biostrings took about 7 seconds of computing at every visit. ggtree brought 76 MB of dependencies. Keep a class's packages few and light.
- **For a course that must not change,** webR's [rwasm tools](https://r-wasm.github.io/rwasm/) can build a fixed set of packages for you to host yourself. We have not tested this.

Pyodide 314.0.7 comes with about 350 packages built for it, including numpy, pandas, matplotlib, scipy, scikit-learn, Biopython, pysam and msprime. `micropip` installs other packages from PyPI, but only those written purely in Python:

```js
// packages built for Pyodide: one call loads them and everything they need
await pyodide.loadPackage(['numpy', 'pandas', 'biopython', 'micropip']);

// pure-Python packages from PyPI
const micropip = pyodide.pyimport('micropip');
await micropip.install('seaborn');
```

seaborn and pyfaidx installed this way; scikit-bio did not, because it is not pure Python. pysam's `FastaFile` and `AlignmentFile` work, but its samtools commands, such as `pysam.faidx()`, crash Pyodide.

Neither webR nor Pyodide can call command-line programs such as BLAST or samtools, and neither suits large data. For those jobs, and for DESeq2, students need a server, such as [Galaxy](../galaxy/) or a university JupyterHub. Some command-line programs have been compiled to run in the browser on their own, as in our [Bioinformatics workbench](https://comparativechrono.github.io/bioinformatics-workbench/).

{% include ad.html slot="in_article" %}

## Send code to a JupyterLite console or the webR editor

Code boxes suit one step at a time. When students need a console where they can keep typing, or an editor with files and plots, send them to one. JupyterLite's console and webR's own editor both take code in their address, so a link or an iframe can open them with your code already running.

{% include example.html file="examples/jupyterlite-console.html" title="A JupyterLite console with the code in its address" height="680" load="click" note="This example opens a console from the JupyterLite project's demo site, which downloads about 14 MB when you press Run in the console." %}

Points to note:

- **The address** is the site's `repl/index.html`, with `kernel=python` and the code in `code=`, which `URLSearchParams` encodes. `toolbar=1` shows buttons to restart and clear, `showBanner=0` hides the welcome text, and, according to JupyterLite's documentation, `execute=0` puts the code at the prompt without running it.
- **Time.** The first result took 16 to 21 seconds, while the console downloaded JupyterLite and Pyodide.
- **The demo site changes** when its maintainers update it. For a class, use the same path on your own JupyterLite site (next section).
- **It needs PyPI.** As the console starts, its Python kernel fetches a small package, `comm`, from pypi.org. When pypi.org could not be reached, the console never answered. On your own site you can bundle that package, as shown below.
- **Separate storage.** In Chromium, files saved in a console embedded in another site are kept apart from those of the same site opened directly.
- **One harmless error.** The demo logs an error of its own in the browser's console, from a part of JupyterLab that fails to start. The console works despite it.

webR's own app has an editor, a console, a plot pane and a file browser. It opens the files listed after `#code=` in its address, which makes an "Open in webR" link for a handout or a slide:

```js
// An R script, and the address that opens it in webR's own editor and runs it
const script = [
  'hbb <- "ATGGTGCATCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAG"',
  'bases <- strsplit(hbb, "")[[1]]',
  'cat("GC content:", round(mean(bases %in% c("G", "C")), 3), "\\n")',
  'barplot(table(bases), main = "Bases in the coding part of HBB exon 1")'
].join('\n');
const files = [{ name: 'hbb.R', path: '/home/web_user/hbb.R', text: script }];
const json = new TextEncoder().encode(JSON.stringify(files));   // UTF-8, so that any character survives
const address = 'https://webr.r-wasm.org/v0.6.0/#code=' +
  encodeURIComponent(btoa(String.fromCharCode(...json))) +
  '&jua';                       // j: the code is JSON, u: not compressed, a: run R scripts straight away
document.getElementById('open-in-webr').href = address;
```

The page needs a link with that id, such as `<a id="open-in-webr">Open in webR</a>`. The link opened the script in webR 0.6.0's editor, ran it and drew the plot in 7 seconds.

## Publish a JupyterLite site with your notebooks

For a practical taught as notebooks, publish your own JupyterLite site. Students open a notebook from a link, with the data files it reads, and their changes are saved in their browser. You choose the versions, and nothing runs on a server.

1. On GitHub, open the `jupyterlite/demo` repository and choose *Use this template*. In your new repository, set *Settings → Pages → Source* to *GitHub Actions*.
2. Replace `requirements.txt` with exact versions:

   ```text
   jupyterlite-core==0.8.5
   jupyterlite-pyodide-kernel==0.8.6
   jupyter-server==2.21.1
   ```

3. Put your notebooks and data files in the `content` folder.
4. In `.github/workflows/deploy.yml`, change the build step to the lines below. They leave out source maps, which cuts the site from 70 MB to 21 MB, and they bundle `comm`, the package that the Python kernel otherwise fetches from PyPI every time it starts.

   ```yaml
         - name: Build the JupyterLite site
           run: |
             pip download --no-deps --only-binary=:all: --dest wheels comm==0.2.3
             jupyter lite build --contents content --output-dir dist --no-sourcemaps \
               --piplite-wheels wheels/comm-0.2.3-py3-none-any.whl
   ```

5. Push to `main`. GitHub builds the site and publishes it at the address shown under *Settings → Pages*.

We built a site with these versions and commands on 15 October 2026 and tested it in Chromium, but could not run the GitHub workflow itself. With pypi.org out of reach, its console started in 12 to 17 seconds and its notebook ran in 18. Without the bundled `comm`, the console never started.

Students then open links such as these, with your own GitHub account and repository in place of `owner` and `repository`:

```text
https://owner.github.io/repository/notebooks/index.html?path=gc-content.ipynb
https://owner.github.io/repository/lab/index.html?path=gc-content.ipynb
https://owner.github.io/repository/repl/index.html?kernel=python&code=print(1)
```

The first opens a notebook in the Notebook interface, which is the simplest for students and the easiest to use on a small screen. The second opens the same notebook in JupyterLab, and the third opens a console, as in the example above.

Our test notebook read a FASTA file with Biopython and drew a bar chart. Opening it and running every cell took 18 to 20 seconds and 33 MB on a first visit. Before you rely on a site like this, know where students' work goes:

- **It stays in the browser.** JupyterLite saves notebooks in the browser's own storage, on that computer and in that browser. Nothing reaches you, and nothing follows the student to another computer. A private window, clearing the browser's data, a shared computer that wipes its profiles, or Safari, which [deletes a site's storage](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/) after seven days of use without a visit, all lose it. Ask students to download their notebooks (*File → Download*).
- **Their copy wins.** Once a student has saved a notebook, their copy is used instead of the site's, even after you publish a correction. They have to delete their copy (right-click it, then *Delete*), or you publish the correction under a new name.
- **For R notebooks,** use the xeus-r kernel, built with the `jupyterlite/xeus-lite-demo` template. It serves R and its packages from your own site: the public xeus-r demo downloaded 78 MB and answered in 14 seconds.

## Write exercises with feedback in Quarto Live

If you write course pages in Quarto, the Quarto Live extension turns code cells into boxes that webR or Pyodide runs, with exercises, hints, solutions and code that checks answers. You need Quarto to write the page; students need only a browser. This page has an R box, a Python box and an R exercise:

````markdown
---
title: "GC content in R and Python"
format: live-html
engine: markdown
webr:
  packages:
    - ape
pyodide:
  packages:
    - numpy
---

```{webr}
#| autorun: true
seq <- "ATGCGCGATATTAGCGCGCTAA"
bases <- strsplit(seq, "")[[1]]
gc <- mean(bases %in% c("G", "C"))
cat("GC content (R):", gc, "\n")
ape::as.DNAbin(list(s = bases))
```

```{pyodide}
#| autorun: true
import numpy as np
seq = "ATGCGCGATATTAGCGCGCTAA"
is_gc = np.array([b in "GC" for b in seq])
print("GC content (Python):", is_gc.mean())
```

Write a function that returns the GC content of a sequence.

```{webr}
#| exercise: gc_fun
gc_content <- function(seq) {
  ______
}
gc_content("GGCCAT")
```

::: {.solution exercise="gc_fun"}
```{webr}
#| exercise: gc_fun
#| solution: true
gc_content <- function(seq) {
  bases <- strsplit(seq, "")[[1]]
  mean(bases %in% c("G", "C"))
}
gc_content("GGCCAT")
```
:::

```{webr}
#| exercise: gc_fun
#| check: true
if (isTRUE(all.equal(.result, 4 / 6))) {
  list(correct = TRUE, message = "Correct: 4 of the 6 bases are G or C.")
} else {
  list(correct = FALSE, message = "Not yet: GGCCAT has 4 G or C out of 6 bases.")
}
```
````

Add the extension to your project, then render the page:

```bash
quarto add r-wasm/quarto-live   # the extension, version 0.2.0 when we tested
quarto render genomics.qmd      # with engine: markdown, you need neither R nor Python installed
```

`engine: markdown` is not in Quarto Live's documentation, which uses the knitr or Jupyter engines, but it rendered and ran in our tests, so test it again after you update Quarto or the extension. With Quarto 1.10.18, both boxes printed their results, and a correct answer to the exercise showed "Correct: 4 of the 6 bases are G or C." The first visit downloaded 50 MB and took 20 seconds. The rendered page comes with a folder of 2.3 MB of files and has Quarto's own look, not your site's, so publish it as a separate page. Quarto Live 0.2.0 loads webR 0.6.0 but an older Pyodide, 0.28.1 (Python 3.13); a newer Pyodide needs a new release of the extension.

## Stop runaway code without losing the session

None of the examples on this page need cross-origin isolation, a mode in which a page may share memory with its workers (`SharedArrayBuffer`). Without it, three things are lost: interrupting R or Python while keeping their variables, `readline()` and `input()` that wait for typing, and webR's nested R consoles. The examples replace the first with time limits and a fresh Python, and avoid the other two.

A page is isolated when it arrives with two headers, `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`. GitHub Pages cannot send them, but a service worker, a script that the browser runs between the page and the network, can add them. These two files do that. Put them in one folder with the pages that need isolation, and make `<script src="isolate.js"></script>` the first script of each of those pages.

```js
/* isolate.js: the first script of a page that needs cross-origin isolation (SharedArrayBuffer: interrupting R or
   Python, readline()). Registers isolate-sw.js (in the same folder) and loads the page once more when that service
   worker has taken control. Never reloads more than once per tab; without service workers the page simply stays
   un-isolated, and the code on it should then fall back (webR's PostMessage channel, worker.terminate()). */
(() => {
  const KEY = 'isolate-reloaded';
  const store = (() => { try { return window.sessionStorage; } catch (e) { return null; } })();
  if (self.crossOriginIsolated) { if (store) store.removeItem(KEY); return; }
  if (!self.isSecureContext || !navigator.serviceWorker || !store) return;
  const reload = () => {
    if (store.getItem(KEY)) return;
    store.setItem(KEY, '1');
    location.reload();
  };
  const sw = navigator.serviceWorker;
  sw.register(new URL('isolate-sw.js', document.currentScript.src)).then(() => {
    if (sw.controller) reload();                          // controlled already, but this load had no headers
    else sw.addEventListener('controllerchange', reload, { once: true });
  }).catch((e) => console.warn('isolate.js: no service worker:', e));
})();
```

```js
/* isolate-sw.js: makes the pages of this folder cross-origin isolated on hosts that cannot send the headers
   themselves (GitHub Pages). Register it with isolate.js. It stores nothing. Adapted from the R workbench's
   isolation-sw.js and coi-serviceworker (MIT). */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const r = event.request;
  if (r.cache === 'only-if-cached' && r.mode !== 'same-origin') return;
  const url = new URL(r.url);
  if (url.origin === self.location.origin) {
    // pages and workers of this site get the headers; its other files need nothing
    if (r.mode === 'navigate' || r.destination === 'worker') {
      event.respondWith(fetch(r).then((res) => {
        if (res.status === 0 || res.type === 'opaqueredirect') return res;
        const headers = new Headers(res.headers);
        headers.set('Cross-Origin-Opener-Policy', 'same-origin');
        headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
        return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
      }));
    }
    return;
  }
  // another site's file asked for without CORS (an <img>): ask with CORS, so that require-corp lets it in
  if (r.mode === 'no-cors' && url.protocol === 'https:') {
    event.respondWith(fetch(r.url, { mode: 'cors', credentials: 'omit' }).then((res) => {
      const headers = new Headers(res.headers);
      headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
    }).catch(() => fetch(r)));
  }
});
```

In our tests these isolated a page on its first visit every time (13 times), after one automatic reload. In an isolated page, `webR.interrupt()` stopped an endless loop with R's variables intact, and the Stop button of the Python boxes raised `KeyboardInterrupt` and kept Python's variables. In such a page, choose webR's channel from what the browser reports, so that the page still works where isolation fails:

```js
import { WebR, ChannelType } from 'https://webr.r-wasm.org/v0.6.0/webr.mjs';

const webR = new WebR({
  // shared memory only where the page really is isolated; messages everywhere else
  channelType: self.crossOriginIsolated ? ChannelType.SharedArrayBuffer : ChannelType.PostMessage
});
```

Two cautions. `require-corp` blocks anything from another site that does not allow it, which includes many images, videos and ad frames; the worker asks for images again with CORS, but keep isolated pages in a folder of their own, without ads. And where service workers are turned off, as in some managed browsers, the page stays un-isolated, so its code must fall back as these examples do. The R workbench (below) has a fuller version of these files, and [coi-serviceworker](https://github.com/gzuidhof/coi-serviceworker) 0.1.7 does the same job in a single file: it isolated the page in nine of our 10 tests, and once stayed un-isolated until the page was reloaded by hand.

## See two whole practicals built this way

Two of our own sites run complete practicals in the browser. They are fuller examples of everything on this page:

- **[R workbench](https://comparativechrono.github.io/R-workbench/)** runs webR 0.6.0 behind the R console, an RStudio-style editor (with R Markdown, Quarto and Shiny), Jupyter-style notebooks and a terminal, next to the instructions of a practical that takes about 1¾ hours. A service worker makes it cross-origin isolated on GitHub Pages, its `install.packages()` warns when a package has no webR build, and its [repository](https://github.com/comparativechrono/R-workbench) has Playwright tests with more than 300 checks.
- **[Bioinformatics algorithms in Python](https://comparativechrono.github.io/bioinformatics-algorithms-python/)** runs Pyodide behind a notebook of cells in the page, for a three-hour practical with exercises that check themselves and plain-English hints for beginners' errors. It loads later chapters' packages in the background, and students can download their answers, and all their code as one Jupyter notebook. It uses Pyodide 0.29.5 in a classic worker, so moving it to Pyodide 314 means switching to a module worker.

## Things that catch people out

- **A class downloading at once.** Thirty students who each download 15 to 50 MB at the start of a session pull 0.5 to 1.5 GB through the room's network. Ask them to open the page beforehand: browsers keep webR's files for 7 days and Pyodide's for a year.
- **Memory.** An R session took about 180 MB of the browser's memory, and about 500 MB with ggplot2 or Biostrings; Python took 130 to 610 MB. Use one session per page, as the examples do. A phone or Chromebook may reload the tab when memory runs short.
- **Blocked addresses.** R needs `webr.r-wasm.org` and `repo.r-wasm.org`, Bioconductor packages need `bioc.r-universe.dev` and `r2.ropensci.org`, and Python needs `cdn.jsdelivr.net`. JupyterLite also needs `pypi.org` and `files.pythonhosted.org` unless you bundle `comm`. Try your page from the teaching room's network before the class.
- **Offline.** webR does not start without a network, even after a visit, because it asks its server for a file at every start, in a kind of request (`HEAD`) that Chromium did not answer from its cache in our tests. Pyodide starts offline only while the page itself is still in the cache, which is 10 minutes for a page on GitHub Pages. Working offline needs your own copies of the runtimes behind a caching service worker, which we have not tested.
- **Packages that change.** The webR and R-universe repositories change without notice. Run your pages again shortly before you teach.
- **Updating old pages.** Pyodide 314 does not load in a classic worker, so a page built for Pyodide 0.29 or earlier needs a module worker before it can move to 314.
- **Screen readers.** The code boxes are plain labelled text areas, without syntax colours. The Tab key moves on as usual, results arrive as text, status messages are announced, and plots have descriptions, but we have not tested the boxes with a screen reader. See [accessibility](../accessibility/).
- **Phones.** At phone width the boxes fit the screen, because code and output scroll inside them, but typing code on a phone is slow.
- **Privacy.** Code and data stay in the browser unless the code sends them somewhere, but every visit fetches R or Python from other websites, which see the visitor's IP address. Say so in your site's privacy notice.
- **Versions.** Every example names exact versions. When you update one, read the release notes and test the page again.

## Licences and credits

webR's own code is under the MIT licence. The R it runs is under the GPL, and webR's builds of R are distributed under GPL version 3. Pyodide is under the Mozilla Public License 2.0, JupyterLite and its Python kernel under the BSD 3-Clause licence, Quarto and Quarto Live under MIT, PyScript under Apache 2.0, and coi-serviceworker under MIT. Loading them from their own servers copies nothing into your site; if you host copies, keep their licence files with them. R and Python packages keep their own licences. If you publish teaching material that uses Biopython or Bioconductor, cite their papers [2, 3]. The *HBB* sequence comes from NCBI's RefSeq database [1].

## References

{: .references}
1. O'Leary NA, Wright MW, Brister JR, et al. (2016). Reference sequence (RefSeq) database at NCBI: current status, taxonomic expansion, and functional annotation. *Nucleic Acids Research* 44(D1): D733–D745. [doi:10.1093/nar/gkv1189](https://doi.org/10.1093/nar/gkv1189)
2. Cock PJA, Antao T, Chang JT, et al. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. *Bioinformatics* 25(11): 1422–1423. [doi:10.1093/bioinformatics/btp163](https://doi.org/10.1093/bioinformatics/btp163)
3. Huber W, Carey VJ, Gentleman R, et al. (2015). Orchestrating high-throughput genomic analysis with Bioconductor. *Nature Methods* 12(2): 115–121. [doi:10.1038/nmeth.3252](https://doi.org/10.1038/nmeth.3252)
