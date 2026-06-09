#!/usr/bin/env python3
"""
Validate that an HTML slide file has balanced tags.
Exits non-zero and names the offending tag on any unclosed or mismatched tag.

Usage:
    python scripts/validate-html.py <input.html>
"""

import sys
from html.parser import HTMLParser

# Void elements never carry a closing tag, so they must not push onto the stack.
VOID_ELEMENTS = frozenset(
    [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
    ]
)


class TagBalanceParser(HTMLParser):
    """Track a stack of opened non-void tags and record the first imbalance."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.error = None

    def handle_starttag(self, tag, attrs):
        if self.error is not None:
            return
        if tag not in VOID_ELEMENTS:
            self.stack.append((tag, self.getpos()))

    def handle_startendtag(self, tag, attrs):
        # Self-closing syntax (<tag />) opens and closes in one token, so skip it.
        return

    def handle_endtag(self, tag):
        if self.error is not None:
            return
        if tag in VOID_ELEMENTS:
            return
        if not self.stack:
            line, _ = self.getpos()
            self.error = f"unexpected closing tag </{tag}> at line {line} with no open tag"
            return
        open_tag, (open_line, _) = self.stack[-1]
        if open_tag != tag:
            line, _ = self.getpos()
            self.error = (
                f"mismatched closing tag </{tag}> at line {line}, "
                f"expected </{open_tag}> opened at line {open_line}"
            )
            return
        self.stack.pop()


def validate(file_path):
    """Return an error message string, or None when every tag balances."""
    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    parser = TagBalanceParser()
    parser.feed(html)
    parser.close()

    if parser.error is not None:
        return parser.error
    if parser.stack:
        tag, (line, _) = parser.stack[0]
        return f"unclosed tag <{tag}> opened at line {line}"
    return None


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/validate-html.py <input.html>")
        sys.exit(1)

    input_file = sys.argv[1]
    error = validate(input_file)

    if error is not None:
        print(f"FAIL: {input_file}: {error}")
        sys.exit(1)

    print(f"OK: {input_file}: all tags balanced")
    sys.exit(0)
