#!/usr/bin/env python3
"""Open every live example in headless Chromium and report errors.

usage: python3 tools/test_examples.py [http://127.0.0.1:8800] [filter]
Start the server first (see serve.py). Needs Python Playwright with Chromium.
Screenshots go to tools/screenshots/ (ignored by git). WebGL examples need the
software renderer flags below.
"""
import asyncio, glob, os, sys
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8800'
FILTER = sys.argv[2] if len(sys.argv) > 2 else ''
SHOTS = os.path.join(ROOT, 'tools', 'screenshots')
WAIT_MS = int(os.environ.get('WAIT_MS', '6000'))

async def main():
    os.makedirs(SHOTS, exist_ok=True)
    pages = sorted(glob.glob(os.path.join(ROOT, 'developers', '*', 'examples', '*.html')))
    pages = [p for p in pages if FILTER in p]
    failed = 0
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(args=['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
        for path in pages:
            rel = os.path.relpath(path, ROOT).replace(os.sep, '/')
            page = await browser.new_page(viewport={'width': 1100, 'height': 760})
            errors = []
            page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
            page.on('pageerror', lambda e: errors.append(f'page error: {e}'))
            page.on('requestfailed', lambda r: errors.append(f'failed: {r.url[:120]} ({r.failure})'))
            page.on('response', lambda r: errors.append(f'HTTP {r.status}: {r.url[:120]}') if r.status >= 400 else None)
            try:
                await page.goto(f'{BASE}/{rel}', wait_until='load', timeout=60000)
                await page.wait_for_timeout(WAIT_MS)
            except Exception as e:
                errors.append(f'load: {e}')
            name = rel.replace('developers/', '').replace('/examples/', '__').replace('.html', '.png')
            await page.screenshot(path=os.path.join(SHOTS, name))
            print(('FAIL ' if errors else 'ok   ') + rel)
            for e in errors[:8]:
                print('     ' + e)
            failed += bool(errors)
            await page.close()
        await browser.close()
    print(f'{len(pages) - failed} of {len(pages)} examples ran without errors.')
    sys.exit(1 if failed else 0)

asyncio.run(main())
