#!/usr/bin/env python3
"""
Tests for validate-html.py.
Run with: python scripts/validate-html.test.py

Stdlib unittest only, no install step, mirroring the script it covers.
"""

import importlib.util
import os
import tempfile
import unittest

_HERE = os.path.dirname(os.path.abspath(__file__))
_SPEC = importlib.util.spec_from_file_location(
    "validate_html", os.path.join(_HERE, "validate-html.py")
)
validate_html = importlib.util.module_from_spec(_SPEC)
_SPEC.loader.exec_module(validate_html)


def write_temp(html):
    """Write HTML to a temp file and return its path for validation."""
    fd, path = tempfile.mkstemp(suffix=".html")
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write(html)
    return path


WELL_FORMED_DECK = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Example Deck</title>
</head>
<body>
<div class="deck" id="deck">
  <div class="slide active" data-slide="0"><h1>Slide One</h1></div>
  <div class="slide" data-slide="1"><h1>Slide Two</h1></div>
</div>
</body>
</html>
"""

UNCLOSED_DIV = """<!DOCTYPE html>
<html>
<body>
<div class="deck">
  <div class="slide">Example bullet
</div>
</body>
</html>
"""

MISMATCHED_CLOSE = """<!DOCTYPE html>
<html>
<body>
<div class="deck"><span>Section Title</div></span>
</body>
</html>
"""

VOID_ELEMENTS_DECK = """<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><link rel="icon" href="x"></head>
<body>
<div class="slide">
  <img src="a.png">
  <br>
  <hr>
  <input type="text">
</div>
</body>
</html>
"""


class ValidateHtmlTest(unittest.TestCase):
    def test_well_formed_deck_passes(self):
        path = write_temp(WELL_FORMED_DECK)
        try:
            self.assertIsNone(validate_html.validate(path))
        finally:
            os.remove(path)

    def test_unclosed_div_fails_and_names_tag(self):
        path = write_temp(UNCLOSED_DIV)
        try:
            error = validate_html.validate(path)
            self.assertIsNotNone(error)
            self.assertIn("div", error)
        finally:
            os.remove(path)

    def test_mismatched_close_is_reported(self):
        path = write_temp(MISMATCHED_CLOSE)
        try:
            error = validate_html.validate(path)
            self.assertIsNotNone(error)
            self.assertIn("mismatched", error)
        finally:
            os.remove(path)

    def test_void_elements_do_not_count_as_unclosed(self):
        path = write_temp(VOID_ELEMENTS_DECK)
        try:
            self.assertIsNone(validate_html.validate(path))
        finally:
            os.remove(path)


if __name__ == "__main__":
    unittest.main()
