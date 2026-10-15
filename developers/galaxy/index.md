---
title: Working with Galaxy
topic: galaxy
lede: Galaxy runs on its own servers, so your pages work with it from outside. List training tutorials live, give students links that open Galaxy at the right tool, file or workflow, show published workflows in a frame, and set up a whole class with BioBlend scripts.
description: How to list Galaxy Training Network tutorials live, build links into Galaxy for tools, data and workflows, embed published workflows, and set up a class with BioBlend 1.9.0 or Galaxy's REST API, with live examples.
---

## Which way in to use

<div class="table-wrap" markdown="1">

| | GTN API | Links into Galaxy | Published items in a frame | BioBlend or the REST API |
|---|---|---|---|---|
| What it does | Lists training tutorials, with their level, time, workflows and the servers that have their tools | Opens Galaxy at a tool, a file to import or a workflow to run | Shows a published workflow or Galaxy Page inside your page | Makes histories, loads data, runs workflows and shares the results, for a whole class |
| Where it runs | JavaScript in your page | Plain links | An iframe | Python or curl on your own computer |
| Needs | Nothing | A Galaxy account for each student | Nothing, to look | Your API key, which must never go in a web page |
| Limits | The GTN calls the API unstable | Workflow links fail for students who are logged out; file links need a one-off request | Only `/published/` addresses with `embed=true` | Cannot be called from JavaScript on another website |

</div>

One fact shapes everything here. Galaxy servers do not send the headers (CORS headers) that let JavaScript on another website read their answers: in our tests in Chromium, a page on another site could not even read `/api/version` from usegalaxy.eu, usegalaxy.org or usegalaxy.org.au. The two exceptions are the GTN's API and Galaxy's landing requests, both described below. Everything else happens on Galaxy's own pages or in scripts on your computer.

Galaxy is free software for running analyses through a web browser, on public servers such as usegalaxy.eu [1]. The Galaxy Training Network (GTN) is its collection of teaching material [2, 3]. Everything on this page was tested on 15 October 2026 against usegalaxy.eu, usegalaxy.org and usegalaxy.org.au, which ran Galaxy 26.1, and usegalaxy.fr, which ran 26.0, with BioBlend 1.9.0.

## List training tutorials live

The GTN publishes its whole catalogue as JSON files that any website may read. This example lists one topic's tutorials, grouped as the GTN groups them, and checks which ones have all their tools on the server you will teach on.

{% include example.html file="examples/gtn-tutorials.html" title="Galaxy Training Network tutorials for one topic" height="640" caption="Choose a topic and a server. To start on another topic, add `?topic=variant-analysis` (or any topic's ID) to the example's address." %}

The GTN's description of its API says that the API is unstable and may change without warning, and asks anyone who builds on it to contact the GTN first. Do that before a course depends on it, and keep an error message ready, as the example does. The [API's documentation page](https://training.galaxyproject.org/training-material/api/) lists every file.
{: .note}

How it works:

- **Two files.** `api/topics.json` (82 kB) lists the 35 topics. `api/topics/<topic>.json` holds every material in one topic: 0.5 to 3.5 MB, or 60 to 410 kB when compressed for sending. Browsers may reuse both for 10 minutes (`max-age=600`).
- **Links.** Each material's `url` is relative to the GTN's home address, so put that in front, as the example's `GTN` constant does. `short_id` gives a permanent link, such as `https://gxy.io/GTN:T00190`.
- **Drafts.** Leave out materials with `draft: true`. Three of the 16 materials in the Introduction topic were drafts.
- **Which servers have the tools.** `supported_servers.exact` lists the servers that have every tool at the version the tutorial uses, and `inexact` those that have every tool but some at other versions. A material with no tools lists all the big servers under `inexact`, so look at `tools` first.
- **Catch-up and workflows.** `answer_histories` link to finished histories on named servers. `workflows[].trs_endpoint` is the address Galaxy needs to import the tutorial's workflow, as in the next section.
- **Two fields to ignore.** `tours` is always `false`, because of a mismatch in the GTN's code, and `urls.slides` points at the tutorial's JSON file rather than its slides.

If you want news rather than a full list, each topic's feed of new material has a version made for frames: replace `.xml` with `.w.html` in the feed's address, as in the [Introduction topic's feed for frames](https://training.galaxyproject.org/training-material/topics/introduction/feed.w.html).

## Send students to the right place in Galaxy

Galaxy reads its own address to decide what to show, so a link can open a tool's form, start importing a workflow, or offer a file to import. Each student needs an account on the server, and the links work best when students have logged in before they click.

{% include example.html file="examples/galaxy-links.html" title="Links into Galaxy for a tool, a workflow and a file" height="880" %}

These paths work on any Galaxy server. Put the server's address, such as `https://usegalaxy.eu`, in front of them:

<div class="table-wrap" markdown="1">

| To do this | Use |
|---|---|
| Open a tool's form | `/?tool_id=<tool ID>&version=<version>`, with `/` in the ID written as `%2F` and `+` as `%2B` |
| Open the upload window | `/?tool_id=upload1`. It cannot fill in a file's address. |
| Import a file from a web address | `/tool_landings/<uuid>?public=true`, after one request to `/api/file_landings` (below) |
| Import a workflow and open its run form | `/workflows/trs_import?trs_url=<encoded TRS address>&run_form=true` |
| Import a history someone has published | `/u/<user>/h/<name>`, then **Import this history** |
| Start a guided tour | `/tours/core.galaxy_ui` (see [tours](#guide-students-round-galaxy-with-tours)) |
| Let each student use their own server | `https://my.galaxy.training/?path=` followed by any path above, encoded |

</div>

How it works:

- **Tool IDs** come from the GTN API (`tools`, in each tutorial) or from a server's tool search: `/api/tools?q=fastqc` on [usegalaxy.eu](https://usegalaxy.eu/api/tools?q=fastqc) lists matching IDs, best first. IDs from the Galaxy Tool Shed end in the tool's version.
- **Versions differ between servers.** On 15 October 2026, FastQC 0.74+galaxy1 was on all four big servers, but fastp was version 1.3.7 on three of them and 1.4.0 on usegalaxy.org.au. A server answers 200 at `/api/tools/` followed by the encoded ID if it has that exact version.
- **Workflows by TRS address.** A Tool Registry Service (TRS) address names one version of a workflow in a public registry. Galaxy accepts any address that contains `/ga4gh/trs/v2/tools/`, then the workflow's ID, `/versions/` and a version. The GTN API gives one for each tutorial workflow, and the "run in Galaxy" buttons of WorkflowHub and Dockstore send people to the same import page.
- **Students who are logged out lose workflow links.** In our test, Galaxy sent a logged-out visitor to its login page with nothing to bring them back to the import. Ask students to log in first, then click.
- **my.galaxy.training** is a GTN service. The first time, it asks each student to choose a server, then sends them to the same path there. The GTN says the choice stays in the student's browser and is never sent to the GTN.

A plain link cannot carry a file's address, so Galaxy has **landing requests**: you send the file's details to the server once and get back an ID for the link. The request needs no account, and Galaxy accepts it from other websites. In a terminal on macOS or Linux:

```bash
# Run once. It needs no account, and the request cannot be deleted afterwards.
curl -s -X POST https://usegalaxy.eu/api/file_landings \
  -H 'Content-Type: application/json' \
  -d '{"public": true, "request_state": [{"class": "File", "ext": "fastqsanger", "name": "mutant_R1.fastq",
       "location": "https://zenodo.org/records/582600/files/mutant_R1.fastq"}]}'
# The reply includes "uuid":"...". Share https://usegalaxy.eu/tool_landings/<uuid>?public=true
```

- **One link for a whole class.** With `"public": true` in the request and `?public=true` in the link, Galaxy reads the request without claiming it, so everyone can use the same link.
- **Logging in.** A student who is logged out goes to the login page and comes back to the import afterwards (tested). Galaxy's source shows that they then see an Import Data form with the file listed and an **Import** button; we could not test that step without an account.
- **Make each one once.** Landing requests cannot be deleted, and anyone with the link can see the file's address. Create them by hand and keep the links. Do not put a button on a public page that makes a new one at every click. We made one on usegalaxy.eu for the GTN's practice FASTQ file, and the example links to it.
- **Workflows too.** `POST /api/workflow_landings` names a workflow and fills in its inputs, for a link that opens a ready-to-run form. We have not tested it.

## Show a published workflow in your page

Galaxy's default settings stop its pages from appearing in a frame on another website, with one exception: published workflows and Galaxy Pages, when the address includes `embed=true`. This example frames a variant-calling workflow that the Intergalactic Workflow Commission (IWC) published on usegalaxy.eu.

{% include example.html file="examples/galaxy-embed.html" title="A published workflow from usegalaxy.eu, in a frame" height="630" load="click" note="This example loads Galaxy's own interface from usegalaxy.eu, about 3.5 MB, so it waits for you." %}

How it works:

- **Galaxy writes the code for you.** Once a workflow or Page is shared by link or published, its sharing page offers the iframe code. For workflows the options are `buttons`, `about`, `heading`, `minimap`, `zoom_controls`, `initialX`, `initialY` and `zoom`. We tested only the settings that Galaxy writes by default.
- **Why only these addresses.** By default Galaxy sends `X-Frame-Options: SAMEORIGIN`, which tells browsers to refuse frames on other sites, and leaves it out only for `/published/` addresses whose query includes `embed=true`. usegalaxy.org, usegalaxy.org.au and usegalaxy.fr send the header on every other page, and Chromium refused to frame them.
- **usegalaxy.eu is different.** It sends no such header, so its other pages do appear in a frame. We did not test logging in inside one, and browsers limit the [cookies that a framed site can use](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Third-party_cookies), so open Galaxy in a new tab instead.
- **Speed.** The frame downloads Galaxy's interface before it draws anything. usegalaxy.eu drew this workflow in 7 to 10 seconds in our tests, and usegalaxy.org took about 16 seconds for a similar one. Load it on a click, as this page does.
- **A text version.** A screen reader cannot follow the diagram, so list the steps as text as well, as the example does under the frame.

The framed page is Galaxy's own, served by usegalaxy.eu under that server's privacy policy, and it counts visits as the rest of usegalaxy.eu does. GTN tutorial pages can be framed too, because they send no `X-Frame-Options` header, but a tutorial needs room next to Galaxy, so a link that opens a new tab works better for students.

{% include ad.html slot="in_article" %}

## Set up a class with BioBlend

Some jobs are tedious by hand for a class of 60: a history for each student with the data loaded, a workflow run in each, and each history shared with its student. BioBlend, the Python library for Galaxy's API [4], does them in a loop. Version 1.9.0 was released on 14 April 2026 and needs Python 3.10 or later (`pip install bioblend==1.9.0`).

Run these scripts on your own computer, never in a web page. In a script, anything that changes data needs an API key, which gives full control of your Galaxy account. Make one in Galaxy under **User Preferences**, then **Manage API Key**, and keep it in an environment variable rather than in the script.

We ran the first snippet against usegalaxy.eu and usegalaxy.org on 15 October 2026. The other two need an API key and registered student accounts, so we did not run them against Galaxy. Instead we checked every BioBlend call against the functions in BioBlend 1.9.0, checked each REST route in Galaxy 26.1's API description or source code, and ran both scripts against a stand-in server to check that they send well-formed requests.
{: .note}

Look things up without an account (run on 15 October 2026):

```python
from bioblend.galaxy import GalaxyInstance

gi = GalaxyInstance(url="https://usegalaxy.eu")    # no key: anonymous and read-only
print(gi.config.get_version())                      # {'version_major': '26.1', ...}

# Galaxy's tool search has no BioBlend wrapper, so call GET /api/tools?q= directly
r = gi.make_get_request(gi.url + "/tools", params={"q": "fastqc"})
r.raise_for_status()
tool = gi.tools.show_tool(r.json()[0])             # the best match comes first
print(tool["id"])                                   # toolshed.g2.bx.psu.edu/repos/devteam/fastqc/fastqc/0.74+galaxy1

workflows = gi.workflows.get_workflows(published=True)   # every published workflow on the server
print(len(workflows))                               # 2407 on usegalaxy.eu, 2559 on usegalaxy.org
```

A teacher cannot make histories inside students' accounts without administrator rights on the server. So the next script makes one history per student in your own account, loads the GTN's practice FASTQ file, runs the workflow from the GTN's short introduction to Galaxy, and shares the history with the student's account. Students find it under **Histories Shared with Me** and import a copy.

Set up the class (not run: needs an API key):

```python
import os
from bioblend.galaxy import GalaxyInstance

gi = GalaxyInstance(url="https://usegalaxy.eu", key=os.environ["GALAXY_API_KEY"])   # keep keys out of code

COURSE = "BIOL2001 Practical 3"
FASTQ = "https://zenodo.org/records/582600/files/mutant_R1.fastq"     # GTN training data, CC BY 4.0
TRS = ("https://training.galaxyproject.org/training-material/api/ga4gh/trs/v2/tools/"
       "introduction-galaxy-intro-short/versions/galaxy-workflowlaxy-intro-short")
students = [line.strip() for line in open("students.txt") if line.strip()]   # their Galaxy email addresses

# Import the GTN workflow once. BioBlend has no TRS helper, so call POST /api/workflows.
workflow = gi.make_post_request(gi.url + "/workflows", payload={"archive_source": "trs_tool", "trs_url": TRS})

for email in students:
    history = gi.histories.create_history(name=COURSE + " - " + email)      # one history per student
    upload = gi.tools.put_url(FASTQ, history["id"], file_name="mutant_R1.fastq", file_type="fastqsanger")
    dataset_id = upload["outputs"][0]["id"]
    gi.datasets.wait_for_dataset(dataset_id, maxwait=1800)
    invocation = gi.workflows.invoke_workflow(
        workflow["id"], history_id=history["id"], inputs_by="name",
        inputs={"mutant_R1": {"src": "hda", "id": dataset_id}})            # "mutant_R1" is the input's label
    # No sharing helper either: PUT /api/histories/<id>/share_with_users takes email addresses
    shared = gi.make_put_request(gi.url + "/histories/" + history["id"] + "/share_with_users",
                                 payload={"user_ids": [email], "share_option": "make_accessible_to_shared"})
    print(email, history["id"], invocation["id"], shared.get("errors") or "shared")
```

Follow the class (not run: needs an API key):

```python
# Uses gi and COURSE from the script above.
# 1. Job states in the histories the script made
for h in gi.histories.get_histories():
    if h["name"].startswith(COURSE):
        states = [job["state"] for job in gi.jobs.get_jobs(history_id=h["id"])]
        print(h["name"], sorted(states))                     # e.g. ['ok', 'ok', 'ok', 'running']

# 2. Histories students have shared with you. No wrapper: GET /api/histories/shared_with_me
for h in gi.make_get_request(gi.url + "/histories/shared_with_me").json():
    status = gi.histories.get_status(h["id"])
    print(h["name"], status["state"], status.get("percent_complete"))

# 3. Workflow runs in your account, with the report Galaxy writes for each, in Markdown
for inv in gi.invocations.get_invocations(limit=50):
    report = gi.invocations.get_invocation_report(inv["id"])
    print(inv["id"], inv["state"], report["markdown"][:80])
```

Things to know:

- **Gaps in BioBlend 1.9.0.** It has no functions for tool search, importing a workflow by TRS address, sharing a history with users, or listing histories shared with you. The scripts call those routes with `gi.make_get_request`, `make_post_request` and `make_put_request`, which add your key.
- **Slow search.** `gi.tools.get_tools(name=...)` downloads the whole tool list and matches exact names only. Use the search route, as above.
- **Exact tool versions.** `invoke_workflow` stops if the server lacks a tool at the workflow's version, unless you set `require_exact_tool_versions` to `False`. Both FastQC 0.72 and the quality filter in this workflow were on usegalaxy.eu and usegalaxy.org.
- **PDF reports.** BioBlend's `get_invocation_report_pdf()` saves a run's report as a PDF on servers that allow it. usegalaxy.eu and usegalaxy.org did; usegalaxy.org.au and usegalaxy.fr did not.
- **More.** The GTN's [slides on BioBlend and the Galaxy API](https://training.galaxyproject.org/training-material/topics/dev/tutorials/bioblend-api/slides.html) go further.

## The same calls with curl

The same steps as plain HTTP requests, for shell scripts or other languages. Each needs your key in an `x-api-key` header. This needs `curl` and `jq`, and was not run against Galaxy, for the same reason as above.

```bash
G=https://usegalaxy.eu
K=(-H "x-api-key: $GALAXY_API_KEY")
J=(-H "Content-Type: application/json")
TRS=https://training.galaxyproject.org/training-material/api/ga4gh/trs/v2/tools/introduction-galaxy-intro-short/versions/galaxy-workflowlaxy-intro-short

# A history for one student
HID=$(curl -sf -X POST $G/api/histories "${K[@]}" "${J[@]}" -d '{"name": "BIOL2001 Practical 3 - student01"}' | jq -r .id)

# A file from a web address, then wait until Galaxy has it
DID=$(curl -sf -X POST $G/api/tools/fetch "${K[@]}" "${J[@]}" -d '{"history_id": "'$HID'",
  "targets": [{"destination": {"type": "hdas"}, "elements": [{"src": "url", "ext": "fastqsanger",
    "url": "https://zenodo.org/records/582600/files/mutant_R1.fastq", "name": "mutant_R1.fastq"}]}]}' | jq -r '.outputs[0].id')
until [ "$(curl -sf $G/api/datasets/$DID "${K[@]}" | jq -r .state)" = ok ]; do sleep 10; done

# Import the GTN workflow, then run it on the file
WID=$(curl -sf -X POST $G/api/workflows "${K[@]}" "${J[@]}" -d '{"archive_source": "trs_tool", "trs_url": "'$TRS'"}' | jq -r .id)
INV=$(curl -sf -X POST $G/api/workflows/$WID/invocations "${K[@]}" "${J[@]}" -d '{"history_id": "'$HID'",
  "inputs_by": "name", "inputs": {"mutant_R1": {"src": "hda", "id": "'$DID'"}}}' | jq -r .id)

# Share the history with the student, by the email address of their Galaxy account
curl -sf -X PUT $G/api/histories/$HID/share_with_users "${K[@]}" "${J[@]}" \
  -d '{"user_ids": ["student01@example.ac.uk"], "share_option": "make_accessible_to_shared"}' | jq .errors

# Check on things: jobs in the history, the run and its report, and histories students have shared with you
curl -sf "$G/api/jobs?history_id=$HID" "${K[@]}" | jq -r '.[] | [.tool_id, .state] | @tsv'
curl -sf $G/api/invocations/$INV "${K[@]}" | jq -r .state
curl -sf $G/api/invocations/$INV/report "${K[@]}" | jq -r .markdown
curl -sf $G/api/histories/shared_with_me "${K[@]}" | jq -r '.[].name'
```

The waiting loop runs until the upload succeeds, so stop it by hand if the dataset goes into the `error` state. Galaxy's own [API description](https://usegalaxy.eu/api/docs) lists every route, and `/openapi.json` gives the same as a file.

## Guide students round Galaxy with tours

Galaxy Tours are short guided walks through the interface: a series of pop-ups, each pointing at one part of the screen, with buttons to go forward and back. Each tour is a YAML file on the server.

- **Only server administrators can add tours.** Tour files go in the server's tour folder, and reloading them needs administrator rights. On 15 October 2026, usegalaxy.org, usegalaxy.org.au and usegalaxy.fr had only Galaxy's five core tours, such as `core.galaxy_ui` and `core.history`. usegalaxy.eu had 12 more, for RNA analysis.
- **Start a tour from a link** ending in `/tours/` and the tour's name, such as [the interface tour on usegalaxy.eu](https://usegalaxy.eu/tours/core.galaxy_ui) (tested). `/api/tours` lists a server's tours.
- **Tours made from a tool's tests work for anyone.** For a tool that has tests, **Generate Tour** in the tool form's options menu builds a tour from them, after copying the test files into the current history. The API gives the same tour at `/api/tours/generate`, with the tool's ID and version as `tool_id` and `tool_version`. We generated one for the Cut tool on usegalaxy.eu: six steps that fill in the form with the test's values and end at the run button.
- **Writing your own is a dead end for most teachers.** Your tour reaches students only if a server's administrators install it, and the GTN's guide to writing tours relies on the Tour Builder browser extension, which was last changed in November 2018. For teaching material, GTN tutorials with Galaxy's Tutorial mode are the maintained route; the [educators' page](../../educators/galaxy/#activities) explains it.

## Things that catch people out

- **No Galaxy API from a web page.** Galaxy sends no CORS headers, so `fetch()` from your site fails. Use links, landing requests, the GTN API or scripts on your own computer.
- **API keys.** A key can do anything its owner can. Keep it out of web pages, shared notebooks and code repositories, and give each teaching assistant their own.
- **Students who are not logged in.** Workflow import links are lost at the login page; file landing links survive it. Ask students to log in before they click anything.
- **Records you cannot delete.** Landing requests are permanent and public to anyone with the link. Make them by hand, once.
- **Servers differ.** usegalaxy.org.au lets people sign in only through Australian BioCommons Access, with no Galaxy username and password. Tool versions differ, and on 15 October 2026 usegalaxy.fr ran Galaxy 26.0 while the others ran 26.1. Test every link on the server you will use.
- **Things change.** The GTN API may change without warning, and Galaxy's screens change between releases. Check your links and examples before each course, and put a date on your instructions.
- **Accessibility.** The GTN aims for WCAG 2.0 level AA and is tested with a screen reader. Galaxy has reduced the number of tasks that need a mouse and improved keyboard navigation [1], but we found no accessibility statement for Galaxy itself. Give a text version of every workflow diagram, and see [accessibility](../accessibility/).

## Licences and credits

Galaxy's code has been under the MIT licence since 25 February 2026, and BioBlend is also under MIT. GTN tutorials are under CC BY 4.0 and the GTN's code under MIT. The framed workflow is by Anton Nekrutenko for the IWC, under MIT. The practice FASTQ file is from the GTN's bacterial training dataset on Zenodo (Gladman, Seemann and Bulach, [doi:10.5281/zenodo.582600](https://doi.org/10.5281/zenodo.582600)), under CC BY 4.0. If you publish teaching material built on Galaxy or the GTN, cite the papers below.

## References

{: .references}
1. The Galaxy Community (2024). The Galaxy platform for accessible, reproducible, and collaborative data analyses: 2024 update. *Nucleic Acids Research* 52(W1): W83–W94. [doi:10.1093/nar/gkae410](https://doi.org/10.1093/nar/gkae410)
2. Batut B, Hiltemann S, Bagnacani A, et al. (2018). Community-driven data analysis training for biology. *Cell Systems* 6(6): 752–758.e1. [doi:10.1016/j.cels.2018.05.012](https://doi.org/10.1016/j.cels.2018.05.012)
3. Hiltemann S, Rasche H, Gladman S, et al. (2023). Galaxy Training: a powerful framework for teaching! *PLOS Computational Biology* 19(1): e1010752. [doi:10.1371/journal.pcbi.1010752](https://doi.org/10.1371/journal.pcbi.1010752)
4. Sloggett C, Goonasekera N, Afgan E (2013). BioBlend: automating pipeline analyses within Galaxy and CloudMan. *Bioinformatics* 29(13): 1685–1686. [doi:10.1093/bioinformatics/btt199](https://doi.org/10.1093/bioinformatics/btt199)
