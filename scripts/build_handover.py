"""Rebuild or verify the expanded handover while preserving the uploaded bytes."""
from pathlib import Path
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
original = (ROOT / "reference/HANDOVER.original.md").read_bytes()
manifest = json.loads((ROOT / "reference/manifest.json").read_text())
if len(original) != manifest["bytes"] or hashlib.sha256(original).hexdigest() != manifest["sha256"]:
    raise SystemExit("Original handover no longer matches its provenance manifest.")
separator = b"\n\n---\n\n<!-- NEW ADDITIONS BEGIN: 2026-09-13; original bytes above preserved -->\n\n"
expected = original + separator + (ROOT / "docs/RESEARCH-ADDITIONS.md").read_bytes()
target = ROOT / "HANDOVER.md"
if sys.argv[1:] == ["--check"]:
    if not target.exists() or target.read_bytes() != expected:
        raise SystemExit("Expanded handover differs; run scripts/build_handover.py.")
    print("PASS: original SHA-256, original prefix, and synchronized additions.")
elif not sys.argv[1:]:
    target.write_bytes(expected)
    print(f"Built HANDOVER.md: {len(original)} original bytes + additions.")
else:
    raise SystemExit("Usage: python3 scripts/build_handover.py [--check]")
