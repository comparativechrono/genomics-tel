---
title: Embedding genome browsers
topic: genome-browsers
lede: Put a genome browser in a teaching page, open at the gene you are teaching, showing the tracks you choose. igv.js suits most pages. Use JBrowse 2 when students need richer detail, and link out to UCSC and Ensembl for everything else.
description: How to embed igv.js and JBrowse 2 in a teaching web page, load public and self-hosted tracks, build activities from browser events, and link to UCSC and Ensembl, with live examples.
---

## Which browser to use

<div class="table-wrap" markdown="1">

| | igv.js | JBrowse 2 linear genome view | Links to UCSC or Ensembl |
|---|---|---|---|
| What it is | The web version of IGV, as one script | JBrowse's track view, as one script | The full browsers, opened in a new tab |
| Download | 1.5 MB | 5.7 MB (1.4 MB compressed) | Nothing |
| Best for | Most teaching pages, and exercises that react to what students click | Rich detail, such as every field of a VCF record in a table | Every track and tool the big browsers offer |
| Limits | Its toolbar needs about 750 pixels of width | Heavier, and no simple events to build exercises from | Neither site can be shown inside your page |
| Licence | MIT | Apache 2.0 (the view package is labelled MIT on npm) | Free to link to |

</div>

The examples below use the human β-globin gene, *HBB*, and the sickle-cell variant rs334, so that you can compare the tools on the same view. All of them were tested on 15 October 2026, with igv.js 3.8.9 and JBrowse 2 version 4.3.0.

## A browser in a few lines

One script tag and one call to `igv.createBrowser` give you a working browser. The second argument says which genome to use and where to start.

{% include example.html file="examples/igv-basic.html" title="igv.js open at HBB" height="430" %}

`genome: "hg38"` asks the IGV team's servers for the GRCh38 sequence, chromosome bands and RefSeq genes. That is convenient, but the first view downloads about 8 MB from igv.org and the page stops working if that service is down. For a class, define the genome yourself from UCSC's files, as the next example does. It then downloads about 2 MB, and nothing depends on IGV's list of genomes.

## Choose the tracks, add buttons, mark the variant

A teaching page usually needs three things: a starting view, a few tracks that make the point, and buttons that take students to the places that matter. This example adds all three, plus a shaded region on the sickle-cell base.

{% include example.html file="examples/igv-tracks.html" title="Public tracks, navigation buttons and a highlighted variant" height="660" caption="The tracks come from UCSC's public files. The ENCODE and 1000 Genomes tracks load only when asked, because the 1000 Genomes panel takes 15 to 20 seconds to draw 3,202 people." %}

How it works:

- **The reference** is built from UCSC's `hg38.2bit`, chromosome sizes and bands. The two MANE files make gene names such as HBD searchable. `loadDefaultGenomes: false` stops igv.js fetching its genome list.
- **Tracks** are listed in `tracks`. igv.js works out the format from the file name, but saying `format: "bigBed"` or `"bigWig"` avoids surprises. `visibilityWindow` stops a track loading data until the view is narrower than that many bases.
- **Navigation** uses `browser.search()`, which takes a gene name or a position such as `chr11:5,226,930-5,227,071`.
- **Events**: `browser.on("locuschange", …)` runs whenever the view moves. Here it keeps the line above the browser up to date.
- **More tracks** can be added later with `browser.loadTrack()`, which returns a promise.
- **The highlight** is a region of interest (`roi`). Its `start` counts from 0, so the base at position 5,227,002 is `start: 5227001, end: 5227002`.

These public files answered range requests and allowed use from other websites when we tested them:

<div class="table-wrap" markdown="1">

| Data | Address |
|---|---|
| GRCh38 sequence, sizes and bands | `https://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.2bit`, `hg38.chrom.sizes`, and `…/hg38/database/cytoBandIdeo.txt.gz` |
| MANE Select transcripts | `https://hgdownload.soe.ucsc.edu/gbdb/hg38/mane/mane.1.0.bb` |
| ClinVar, updated weekly | `https://hgdownload.soe.ucsc.edu/gbdb/hg38/bbi/clinvar/clinvarMain.bb` |
| Conservation (phyloP, 100 vertebrates) | `https://hgdownload.soe.ucsc.edu/goldenPath/hg38/phyloP100way/hg38.phyloP100way.bw` |
| ENCODE candidate regulatory elements | `https://hgdownload.soe.ucsc.edu/gbdb/hg38/encode3/ccre/encodeCcreCombined.bb` |
| 1000 Genomes 30x panel, chromosome 11 | The `1kGP_high_coverage_Illumina.chr11…vcf.gz` file and its `.tbi` index on `ftp.1000genomes.ebi.ac.uk` (full address in the example) |

</div>

ClinVar's own VCF works too, but its large deletions fill every row in igv.js, so UCSC's ClinVar bigBed is easier to read in class. Files on the ENCODE portal need their public Amazon S3 address (the `cloud_metadata.url` in the portal's data), because the portal's download links refuse requests from other websites.

{% include ad.html slot="in_article" %}

## Turn the browser into an activity

igv.js tells your page what students are doing. `locuschange` reports every move, and `trackclick` reports every click on a feature, with the feature's fields. With those two events a page can check each step of a task and answer straight away, which is hard to do with a worksheet.

{% include example.html file="examples/igv-find-the-variant.html" title="Activity: find the sickle-cell variant" height="760" caption="The variants are real ClinVar records, stored next to the page. The four people and their genotypes are made up for teaching." %}

The parts to reuse:

- **Checking where students are.** `locuschange` receives a list of frames, one for each region on screen. Each frame has `chr`, `start` (counted from 0) and `end`. Step 1 is done when the frame overlaps *HBB*; step 2 when it is narrower than 150 bases.
- **Checking what they clicked.** `trackclick` receives the track, the clicked feature's fields as a list of `{ name, value }` pairs, and the position. For a genotype, the fields include `Sample`, `Genotype` and `Zygosity`; for a variant, `ID` and the VCF's INFO fields.
- **Controlling the pop-up.** Return `false` to hide igv.js's own pop-up, a string of HTML to show your own, or `undefined` to keep the default.
- **Feedback** goes into an element with `aria-live="polite"`, so screen readers announce it.

To use the activity with another variant, change `HBB`, `HBS` and the wording, and point the track at your own VCF.

## Let students open their own files

A file input can hand files from the student's computer straight to igv.js. The browser reads them in place, so nothing is uploaded. This suits practicals where students produce their own VCF or BAM files in an earlier step.

{% include example.html file="examples/igv-own-files.html" title="Open files from your own computer" height="600" caption="Try it with the files in this guide's [data folder on GitHub](https://github.com/comparativechrono/genomics-tel/tree/main/developers/genome-browsers/examples/data): download `hbb-region.fa`, `hbb-region.fa.fai`, `hbb-variants.vcf.gz` and `hbb-variants.vcf.gz.tbi`, then choose them here." %}

A `File` object works wherever igv.js expects a URL. Index files (`.tbi`, `.bai`, `.fai`) have to be chosen at the same time as the data, and the example pairs them up by name. Small files without an index can be read whole with `indexed: false`.

The page itself still loads igv.js from the internet. For sensitive files, save `igv.min.js` next to the page and point the script tag at that copy, so that the page works with no connection at all.

## Host a small dataset next to the page

For a class, the most reliable data are files you host yourself: they cannot move, change or go offline when a public server does. This example uses a 20 kb slice of chromosome 11 around *HBB*, about 26 kB in all, stored in a `data` folder next to the examples ([see it on GitHub](https://github.com/comparativechrono/genomics-tel/tree/main/developers/genome-browsers/examples/data)).

{% include example.html file="examples/igv-self-hosted.html" title="A 20 kb region around HBB, hosted with the page" height="520" %}

The folder holds:

<div class="table-wrap" markdown="1">

| File | Contents |
|---|---|
| `hbb-region.fa` and `.fai` | GRCh38 chr11:5,217,001–5,237,000 from UCSC, as one sequence called `HBB_region`. Position 1 here is chr11:5,217,001. |
| `hbb-region.gff3` and `.bed` | *HBB* (NM_000518.5) and *HBD* (NM_000519.4) from RefSeq Select: genes, transcripts, exons and coding sequence. |
| `hbb-variants.vcf.gz` and `.tbi` | Seven ClinVar variants, including HbS (rs334), HbC, HbE and β-thalassaemia variants, with four fictional people. |
| `hbb-variants.grch38.vcf.gz` and `.tbi` | The same variants at their real chromosome 11 positions, for use over the full GRCh38 genome. |

</div>

Index files come from the standard command-line tools. FASTA lines must all be the same length, and VCF files must be sorted and compressed with `bgzip`, not ordinary `gzip`:

```bash
samtools faidx hbb-region.fa                       # makes hbb-region.fa.fai
bgzip -c hbb-variants.vcf > hbb-variants.vcf.gz    # block-compressed, so it can be read in pieces
tabix -p vcf hbb-variants.vcf.gz                   # makes hbb-variants.vcf.gz.tbi
bedToBigBed genes.bed hg38.chrom.sizes genes.bb    # UCSC tool, for large annotation files
```

GitHub Pages answers the range requests these files need, and allows other websites to read them. Python's built-in test server does not handle range requests, so to try indexed files on your own computer use a server that does; this site's repository has one in `tools/serve.py`.

In a self-hosted page, start the view with coordinates rather than a gene name, because names in your own tracks become searchable only once the track has loaded. `search: false` stops igv.js sending unknown names to IGV's search service.

## JBrowse 2 when students need more detail

JBrowse 2 is heavier than igv.js, but clicking a feature opens a full table of its details, and clicking a VCF record shows every field with a genotype count. It also has six-frame translation and its own gene search. The linear genome view comes as a single script that includes React.

{% include example.html file="examples/jbrowse-basic.html" title="JBrowse 2 open at HBB" height="480" load="click" note="This example downloads JBrowse 2 (1.4 MB compressed) when it starts." %}

Two details matter:

- **Chromosome names.** The JBrowse project's GRCh38 sequence calls chromosome 11 `11`, while UCSC's files call it `chr11`. Without the `refNameAliases` table, the view quietly shows the assembly picker instead of *HBB*.
- **Reacting to students.** JBrowse has no `trackclick` event. Instead, `createViewState` accepts an `onChange` function that receives a description of every change. A change to `/session/view/offsetPx` means the view moved, and a change under `/session/widgets/…/featureData` means a feature was clicked.

If you would rather not write code, the whole of JBrowse Web can sit in an iframe. The project's own copy (`https://jbrowse.org/code/jb2/v4.3.0/`) allows this and takes its settings from the address. Or unzip the release from GitHub (24 MB) into your own site.

## Link to UCSC and Ensembl

The UCSC Genome Browser and Ensembl have far more tracks than any page you build, but neither can be shown inside your page: UCSC puts a check for automated visitors in front of its browser, and Ensembl tells browsers not to show it in a frame. Link to them in a new tab instead, show a picture of the view, or take data from their APIs.

{% include example.html file="examples/ucsc-ensembl-links.html" title="Links into UCSC and Ensembl, a picture of the view, and live data" height="660" %}

UCSC builds the view from parameters in the address:

<div class="table-wrap" markdown="1">

| To do this | Add |
|---|---|
| Choose the assembly and position | `db=hg38&position=chr11:5225464-5229395` |
| Start with no tracks showing | `hideTracks=1` (this also hides any tracks you add) |
| Show tracks | `mane=pack&clinvar=pack&cons100way=full` (or `dense`, `squish`, `hide`) |
| Turn off part of a track | `clinvarCnv_sel=0`, or `cons100wayViewalign=hide` for one of a track's views |
| Highlight a region | `highlight=hg38.chr11:5227002-5227002%23FFA50080` (positions count from 1) |
| Add a track from a file | `hgt.customText=` followed by an encoded track line pointing at your file |
| Load a track hub | `hubUrl=https://…/hub.txt` |

</div>

Track names for these parameters are listed by `https://api.genome.ucsc.edu/list/tracks?genome=hg38`. The same parameters on `hgRenderTracks` return a PNG image, which is handy for slides and handouts; save a copy into your site rather than relying on UCSC to draw it every time.

Ensembl moved to a new website in August 2026. Its addresses now name the assembly by accession (`GCA_000001405.29` is GRCh38), as in `https://www.ensembl.org/genome-browser/GCA_000001405.29?focus=gene:ENSG00000244734`. Older addresses redirect.

Both APIs work from a web page. The UCSC API returns sequence and track data. The Ensembl REST API returns gene records and variant effect predictions, and allows 55,000 requests an hour, but it was slow and often failed while we tested it. The example therefore waits, retries twice, and says so if there is still no answer.

## Things that catch people out

- **Phones.** igv.js's toolbar needs about 750 pixels. Turning off the optional buttons (`showChromosomeWidget`, `showCursorTrackingGuideButton`, `showCenterGuideButton`, `showTrackLabelButton`, `showSVGButton` and `showMultiSelectButton`, all `false`) brings that down to about 470, which is still wider than most phones. For phone users, add a picture of the view and a text summary.
- **Counting from 0 or 1.** Regions of interest and the positions igv.js passes to your code count from 0. VCF positions and the search box count from 1. The educators' page has a [table of the conventions](../../educators/genome-browsers/#where-students-go-wrong).
- **`chr11` or `11`.** UCSC names chromosomes `chr11`, while Ensembl and many VCF files say `11`. igv.js and JBrowse can match the two, but only if they are told how; JBrowse needs an alias table.
- **Big files.** The 1000 Genomes panel downloads only 0.4 MB for one view, but drawing 3,202 genotype rows takes 15 to 20 seconds. Load large tracks on request, and set `visibilityWindow`.
- **Screen readers.** Tracks are drawn as images on a canvas, so screen readers cannot read them. Give every task a text version, and do not rely on ClinVar's red and green alone. See [accessibility](../accessibility/).
- **Versions.** Each example names an exact version of its library. When you update, read the release notes and test the page again.

## Licences and credits

igv.js is under the MIT licence. JBrowse 2 is under Apache 2.0, although its linear genome view package is labelled MIT on npm. If you publish teaching material built on them, cite their papers (below). The UCSC, ClinVar, ENCODE and 1000 Genomes data are free to use, each under its provider's terms; check those before you redistribute copies of the files.

## References

{: .references}
1. Robinson JT, Thorvaldsdóttir H, Turner D, Mesirov JP (2023). igv.js: an embeddable JavaScript implementation of the Integrative Genomics Viewer (IGV). *Bioinformatics* 39(1): btac830. [doi:10.1093/bioinformatics/btac830](https://doi.org/10.1093/bioinformatics/btac830)
2. Diesh C, Stevens GJ, Xie P, et al. (2023). JBrowse 2: a modular genome browser with views of synteny and structural variation. *Genome Biology* 24: 74. [doi:10.1186/s13059-023-02914-z](https://doi.org/10.1186/s13059-023-02914-z)
3. Nassar LR, Barber GP, Benet-Pagès A, et al. (2023). The UCSC Genome Browser database: 2023 update. *Nucleic Acids Research* 51(D1): D1188–D1195. [doi:10.1093/nar/gkac1072](https://doi.org/10.1093/nar/gkac1072)
4. Yates AD, Austine-Orimoloye O, Azov AG, et al. (2026). Ensembl 2026. *Nucleic Acids Research* 54(D1): D1053–D1060. [doi:10.1093/nar/gkaf1239](https://doi.org/10.1093/nar/gkaf1239)
