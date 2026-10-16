---
title: Privacy
description: What happens to information about you when you use genomics.tel, including the Google ads and the outside services the live examples use.
lede: What happens to information about you when you use genomics.tel.
last_updated: 16 October 2026
---
{% include ads-flags.html %}

## Who runs this site

genomics.tel is run by Tim Hearn. For any question about privacy, email [{{ site.owner.email }}](mailto:{{ site.owner.email }}).

## What we collect

We do not ask you to sign up, we do not run analytics, and we store nothing on your device ourselves: no cookies and no local storage.

- **Hosting.** The site is hosted by GitHub Pages. Like any web server, GitHub receives your IP address and the pages you request, and may keep logs for security. See [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- **Fonts and site files** are served from this site, not from a font service.

## Ads from Google {#ads}

{% unless ads_live %}
There are no ads on genomics.tel yet. This section describes what will happen once there are.
{: .note}
{% endunless %}

{% if ads_live -%}
genomics.tel shows ads from Google AdSense to pay for the web domain. Every page except the error page loads Google's ad code, so your browser sends Google the address of the page and your IP address, even on pages that show no ads. Google may also read and write cookies or use web beacons to choose ads and measure them.
{%- else -%}
genomics.tel will show ads from Google AdSense to pay for the web domain. Once ads are switched on, every page except the error page will load Google's ad code, so your browser will send Google the address of the page and your IP address, even on pages that show no ads. Google may also read and write cookies or use web beacons to choose ads and measure them.
{%- endif %}

- Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this website or other websites.
- Google's use of advertising cookies lets it and its partners serve ads to you based on your visits to this site and other sites on the internet.
- Other ad companies may also bid, through Google, to show ads here, and may use their own cookies. In the UK, the European Economic Area and Switzerland, Google's consent message lists them, with links to their privacy policies.
- You can opt out of personalised advertising in [Google's Ads Settings](https://adssettings.google.com/). You can also opt out of some other companies' use of cookies for personalised ads at [aboutads.info](https://optout.aboutads.info/) or, in Europe, [youronlinechoices.eu](https://youronlinechoices.eu/).
- Google explains how it uses this information in [How Google uses information from sites or apps that use our services](https://policies.google.com/technologies/partner-sites). Its [business data responsibility](https://business.safety.google/privacy/) site covers how it handles data for advertising.

**In the UK, the European Economic Area and Switzerland**, a message from Google asks for your consent before ads use cookies or personal data, and lets you refuse as easily as you accept. If you refuse, Google may still show limited ads that are not personalised. You can change your choice at any time with the **Privacy and cookie settings** link at the bottom of every page{% unless ads_live %}, which will appear with the ads{% endunless %}.

Ads appear only on guide pages, never inside the live examples.

## Live examples

The live examples on the developer pages run in your browser. To work, they load software and data from other organisations' servers. Those servers receive your IP address and the request, as with any website you visit, and handle them under their own privacy policies.

- **Software** comes from jsDelivr, a public service that hosts open-source code. The R and Python examples also use webR's servers (webr.r-wasm.org), R-universe and the Python Package Index.
- **Data** come from public research services: the IGV team's servers, the UCSC Genome Browser, Ensembl, the 1000 Genomes Project, NCBI, the JBrowse project, the RCSB Protein Data Bank, EMBL-EBI (for PDBe), AlphaFold DB, UniProt, STRING, FinnGen, Zenodo, the Galaxy servers and the Galaxy Training Network.

Three examples show another organisation's app inside the page: Nextstrain, JupyterLite and Galaxy. Those apps follow their own privacy policies, and some of them count visits or report errors: Nextstrain uses Plausible analytics, and Galaxy uses Plausible and Sentry. These examples load only when you click to start them.

Some examples let you open a file from your own computer. Your browser reads the file, and it is not uploaded anywhere.

## Legal basis, storage and transfers

- **Ads.** In the UK, the European Economic Area and Switzerland, ads use cookies or personal data only with your consent, which Google's message asks for. You can withdraw it at any time with the **Privacy and cookie settings** link{% unless ads_live %}, once the ads appear{% endunless %}.
- **How long data are kept.** We keep no personal data ourselves. If you email us, we keep your message only as long as we need it to answer you. GitHub and Google decide how long they keep their logs and ad data, as explained in [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) and [Google's privacy policy](https://policies.google.com/privacy).
- **Transfers.** GitHub and Google may process data outside the UK, for example in the United States, under the safeguards that their privacy policies describe.

## Your rights

Under UK data protection law you can ask what information we hold about you, and ask us to correct or delete it. You can also object to how your data are used, and withdraw your consent to ads at any time, as described above. As we collect nothing ourselves, requests about ads are best sent to Google, but you are welcome to ask us. If you are unhappy with how we handle a request, you can complain to the [Information Commissioner's Office](https://ico.org.uk/make-a-complaint/).

## Changes

We will update this page if anything changes, and give the date here. Last updated {{ page.last_updated }}.
