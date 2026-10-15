#!/usr/bin/env python3
"""Checks to run before pushing. usage: python3 tools/check.py

1. Example files must not contain two opening curly braces, or a curly brace
   followed by a percent sign: the guides show each example's code through
   Jekyll, which would read those as template tags.
2. Library URLs in examples must name an exact version (no @latest, no bare
   package names on jsDelivr or unpkg).
3. After a build (bundle exec jekyll build --baseurl ""), every internal link
   and every iframe in _site must point to a file that exists.

usage: python3 tools/check.py [path to the built site, default _site]
"""
import os, re, sys, html.parser, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
problems = []

# 1 and 2: example files
for dirpath, _, files in os.walk(os.path.join(ROOT, 'developers')):
    if '/examples' not in dirpath.replace(os.sep, '/'):
        continue
    for f in files:
        if not f.endswith('.html'):
            continue
        path = os.path.join(dirpath, f)
        text = open(path, encoding='utf-8').read()
        rel = os.path.relpath(path, ROOT)
        if '{' + '{' in text or '{' + '%' in text:
            problems.append(f'{rel}: contains template braces; rewrite that code')
        for url in re.findall(r'https://(?:cdn\.jsdelivr\.net/npm|unpkg\.com)/([^"\'\s)]+)', text):
            pkg = url.split('/')[0] if not url.startswith('@') else '/'.join(url.split('/')[:2])
            if '@latest' in url or not re.search(r'@\d', pkg):
                problems.append(f'{rel}: library URL without an exact version: {url}')

# 3: links in the built site
SITE = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.join(ROOT, '_site')
class Links(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(); self.found = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for key in ('href', 'src'):
            if key in a and tag in ('a', 'iframe', 'img', 'script', 'link'):
                self.found.append(a[key])
        if tag == 'button' and 'data-load-example' in a:
            self.found.append(a['data-load-example'])

if os.path.isdir(SITE):
    for dirpath, _, files in os.walk(SITE):
        for f in files:
            if not f.endswith('.html'):
                continue
            page = os.path.join(dirpath, f)
            if '/examples/' in page.replace(os.sep, '/'):
                continue   # examples are checked in the browser by test_examples.py
            parser = Links(); parser.feed(open(page, encoding='utf-8').read())
            for link in parser.found:
                if not link or link.startswith(('http:', 'https:', 'mailto:', 'javascript:', '#', 'data:')):
                    continue
                target = urllib.parse.urlparse(link).path
                if target.startswith('/'):
                    fs = os.path.join(SITE, target.lstrip('/'))
                else:
                    fs = os.path.join(os.path.dirname(page), target)
                if fs.endswith('/') or os.path.isdir(fs):
                    fs = os.path.join(fs, 'index.html')
                if not os.path.exists(os.path.normpath(fs)):
                    problems.append(f'{os.path.relpath(page, SITE)}: broken link {link}')
else:
    print('No _site folder: build the site first to check links.')

if problems:
    print('\n'.join(sorted(set(problems))))
    sys.exit(1)
print('All checks passed.')
