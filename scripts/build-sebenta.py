#!/usr/bin/env python3
"""Gera api/_sebenta.json: o texto da sebenta, uma entrada por página do PDF.

O assistente (api/perguntar.js) pesquisa nestas páginas e só responde com o que lá está.
Correr de novo sempre que o PDF mudar:

    python3 scripts/build-sebenta.py

Precisa do pdftotext (poppler-utils).
"""
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF = ROOT / "Sebenta_Chefe_IPM.pdf"
OUT = ROOT / "api" / "_sebenta.json"

txt = subprocess.run(["pdftotext", "-layout", str(PDF), "-"], capture_output=True, text=True, check=True).stdout
pages = []
for i, raw in enumerate(txt.split("\f"), start=1):
    lines = [re.sub(r"[ \t]{2,}", " ", l).strip() for l in raw.splitlines()]
    t = re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()
    if len(t) >= 40:
        pages.append({"p": i, "t": t})

OUT.write_text(json.dumps(pages, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"{len(pages)} páginas, {OUT.stat().st_size // 1024} KB -> {OUT.relative_to(ROOT)}")
