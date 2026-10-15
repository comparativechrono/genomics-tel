#!/usr/bin/env python3
"""Serve the built site locally, with HTTP Range support.

igv.js and JBrowse read indexed files (.vcf.gz + .tbi, .bam + .bai, bigWig) in
pieces using Range requests. GitHub Pages supports them, but Python's built-in
`http.server` does not, so use this server to test those examples locally.

usage:
  bundle exec jekyll build --baseurl ""      # build into _site
  python3 tools/serve.py 8800 _site          # then open http://127.0.0.1:8800/
"""
import os
import re
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class RangeHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".mjs": "text/javascript",
        ".json": "application/json",
        ".fa": "text/plain",
        ".fai": "text/plain",
        ".gff3": "text/plain",
        ".vcf": "text/plain",
        ".bed": "text/plain",
        ".aln": "text/plain",
        ".fasta": "text/plain",
    }

    def end_headers(self):
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Expose-Headers", "Content-Length, Content-Range")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_head(self):
        rng = self.headers.get("Range")
        path = self.translate_path(self.path)
        if not rng or os.path.isdir(path) or not os.path.exists(path):
            return super().send_head()
        m = re.match(r"bytes=(\d*)-(\d*)$", rng.strip())
        if not m:
            return super().send_head()
        size = os.path.getsize(path)
        start_s, end_s = m.groups()
        if start_s == "":
            length = int(end_s)
            start, end = max(0, size - length), size - 1
        else:
            start = int(start_s)
            end = int(end_s) if end_s else size - 1
        end = min(end, size - 1)
        if start > end or start >= size:
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{size}")
            self.end_headers()
            return None
        f = open(path, "rb")
        f.seek(start)
        self._range_remaining = end - start + 1
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()
        return f

    def copyfile(self, source, outputfile):
        remaining = getattr(self, "_range_remaining", None)
        if remaining is None:
            return super().copyfile(source, outputfile)
        while remaining > 0:
            chunk = source.read(min(65536, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)
        self._range_remaining = None

    def log_message(self, fmt, *args):
        sys.stderr.write("[srv] " + (fmt % args) + "\n")


if __name__ == "__main__":
    port = int(sys.argv[1])
    directory = sys.argv[2]
    handler = partial(RangeHandler, directory=directory)
    ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
