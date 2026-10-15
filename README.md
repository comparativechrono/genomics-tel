# genomics.tel

The source of [www.genomics.tel](https://www.genomics.tel/), a free site about teaching genomics with interactive tools. It has two sides:

- **For educators**: what each tool is good for in class, activities to run with it, how to assess them, and the evidence behind them.
- **For developers**: how to put each tool into a teaching web page, with live examples you can open, read, download and change.

The eight topics are genome browsers, sequences and alignments, 3D structures, networks, Galaxy, R and Python in the browser, phylogenetic trees, and charts of genomic data. There are also general pages on planning a session, genomic data and ethics, accessibility, and getting started.

GitHub Pages builds the site with Jekyll whenever `main` changes. To add or change pages, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Folders

| Path | What it holds |
|---|---|
| `index.html` | The home page |
| `educators/` | Pages for educators, one per topic plus the general pages |
| `developers/<topic>/` | Pages for developers, each with an `examples/` folder of live examples |
| `_data/` | The topic list, the side menus, and the list of our sites |
| `_layouts/`, `_includes/` | Page templates, the example viewer and the ad slots |
| `assets/` | Styles, the small site script, fonts and icons |
| `tools/` | Scripts to check links and run every example in Chromium (not published) |

## Publishing the site

### 1. Switch on GitHub Pages (once)

In this repository, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then branch **main** and folder **/ (root)**, and save. After a minute or two the site appears at <https://comparativechrono.github.io/genomics-tel/>.

### 2. Move www.genomics.tel to this site

At the moment `www.genomics.tel` points to the old Google Sites page, and `genomics.tel` is a redirect set up at Namecheap. To move both:

1. In **Settings → Pages → Custom domain**, enter `www.genomics.tel` and save. GitHub adds a `CNAME` file to the repository.
2. In Namecheap's DNS settings for genomics.tel:
   - change the `www` record to a **CNAME** pointing to `comparativechrono.github.io` (it now points to `ghs.googlehosted.com`);
   - replace the redirect on the bare domain (`@`) with four **A** records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. If you want IPv6 as well, add four **AAAA** records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` and `2606:50c0:8003::153`.
3. Wait for GitHub to issue the certificate (minutes to an hour), then tick **Enforce HTTPS**.
4. Check that <https://www.genomics.tel/> shows the new site and that <http://genomics.tel/> redirects to it.
5. Recommended: verify the domain in your GitHub account settings (**Settings → Pages → Add a domain**), which stops anyone else from claiming it.

Links inside the site adapt by themselves: there is nothing to change in the files when the domain moves.

### 3. Turn on the ads

The ads use Google AdSense. Until a publisher ID is set, no ad code is loaded anywhere, and grey boxes marked "Ad space" show where the ads will go.

1. Sign up at [adsense.google.com](https://adsense.google.com/) (you must be 18 or over) and add the site as **genomics.tel**, without `www`. Do this after step 2, because Google checks the live domain.
2. Copy your publisher ID (it looks like `ca-pub-1234567890123456`) into `_config.yml` under `adsense: publisher_id:` and push. Every page then carries the AdSense code and the `google-adsense-account` tag, and `ads.txt` gets the line Google needs. In AdSense, click **Verify**, then **Request review**. The review usually takes a few days and can take up to four weeks.
3. When AdSense asks about consent for the UK, the EEA and Switzerland, choose **Google's own consent message** and its **three-button** version (Consent, Do not consent, Manage options). The site already has the "Privacy and cookie settings" link that Google requires.
4. Once the site is approved, create two **display** ad units in AdSense (responsive). Copy each one's `data-ad-slot` number into `_config.yml`: one under `slots: in_article`, the other under `slots: end_of_article`. Set `show_placeholders: false`, and push.
5. We suggest leaving **Auto ads** off. If you turn them on, switch off vignettes and the formats that place ad links inside text, and exclude the developer pages, whose live examples must not have ads next to them.

Ads appear only on guide pages: at most two on a page, between sections of text, never next to an example. The footer and the About page explain that the ads pay for the domain. Google forbids asking readers to click ads or to "support us", so keep any new wording informational.

## Checking changes locally

```bash
bundle install                                  # once; needs Ruby
bundle exec jekyll build --baseurl ""           # build into _site
python3 tools/check.py                          # broken links, unpinned libraries, template braces in examples
python3 tools/serve.py 8800 _site               # serve at http://127.0.0.1:8800/
python3 tools/test_examples.py http://127.0.0.1:8800   # run every live example in Chromium
```

## Licences

Text is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), and code, including every example, under the MIT licence. See [LICENSE.md](LICENSE.md). The fonts are under the SIL Open Font Licence, and libraries and data used by the examples keep their own licences.
