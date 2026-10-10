"""Generate the one-page resume from editable JSON.

Install dependencies: python -m pip install -r requirements.txt
Run: python generate_resume.py [--source resume.json] [--output Sahil_Khan_Resume.pdf]
Fails if the result is not one page or required links/text are missing.
No fonts, services, credentials, or network connection needed at generation time.
"""
import argparse
import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from pypdf import PdfReader


def generate(source: Path, output: Path):
    data = json.loads(source.read_text(encoding="utf-8"))
    output.parent.mkdir(parents=True, exist_ok=True)
    ink = colors.HexColor("#17202b")
    blue = colors.HexColor("#214d72")
    styles = {
        "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23, leading=26, textColor=ink, spaceAfter=3),
        "headline": ParagraphStyle("headline", fontName="Helvetica", fontSize=10.5, leading=13, textColor=blue, spaceAfter=5),
        "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9, leading=12, textColor=ink),
        "summary": ParagraphStyle("summary", fontName="Helvetica", fontSize=9.5, leading=12.4, textColor=ink, spaceBefore=7, spaceAfter=1),
        "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=blue, spaceBefore=10, spaceAfter=4),
        "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=10, leading=12.5, textColor=ink, spaceBefore=5, spaceAfter=2, keepWithNext=True),
        "stack": ParagraphStyle("stack", fontName="Helvetica", fontSize=8.7, leading=11.2, textColor=colors.HexColor("#4b5563"), spaceAfter=3, keepWithNext=True),
        "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.2, leading=12, textColor=ink, spaceAfter=2),
        "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.2, leading=12, textColor=ink, leftIndent=9, firstLineIndent=-8, spaceAfter=2),
    }
    def para(text, style="body"):
        return Paragraph(text, styles[style])
    def link(label, url):
        return f'<a href="{escape(url, {chr(34): "&quot;"})}" color="#214d72"><u>{escape(label)}</u></a>'
    story = [para(escape(data["name"]), "name"), para(escape(data["headline"]), "headline")]
    story += [para(link(*data["contacts"][0]), "contact")]
    story += [para(" &nbsp;|&nbsp; ".join(link(*c) for c in data["contacts"][1:]), "contact")]
    story += [para(escape(data["summary"]), "summary")]
    def section(title):
        story.extend([para(title, "section"), HRFlowable(width="100%", thickness=.5, color=colors.HexColor("#b9c6d2"), spaceAfter=3)])
    section("PROJECTS")
    for project in data["projects"]:
        story += [para(escape(project["name"])+" &nbsp;|&nbsp; "+link("GitHub", "https://github.com/sahyl/"+project["repo"]), "title"), para(escape(project["stack"]), "stack")]
        story += [para("- "+escape(b), "bullet") for b in project["bullets"]]
    section("ADDITIONAL PROJECTS")
    for project in data.get("additional_projects", []):
        story += [para(link(project["name"], "https://github.com/sahyl/"+project["repo"])+" - "+escape(project["text"]))]
    section("OPEN-SOURCE CONTRIBUTIONS")
    for item in data["contributions"]:
        story += [para(escape(item["title"])+" &nbsp;|&nbsp; "+link(item["label"],item["url"]), "title"), para(escape(item["text"]))]
    section("TECHNICAL SKILLS")
    story += [para(f"<b>{escape(label)}:</b> {escape(value)}") for label,value in data["skills"]]
    section("EDUCATION")
    edu=data["education"]
    story += [para(f'<b>{escape(edu["degree"])}</b> | {escape(edu["period"])}'),para(escape(edu["institution"]))]
    doc=SimpleDocTemplate(str(output),pagesize=A4,rightMargin=37,leftMargin=37,topMargin=30,bottomMargin=30,title="Sahil Khan - Software Developer Resume",author="Sahil Khan",pageCompression=1,invariant=1)
    doc.build(story)
    reader=PdfReader(output)
    if len(reader.pages)!=1:
        raise ValueError(f"Expected one page, got {len(reader.pages)}. Shorten content before distributing.")
    text=reader.pages[0].extract_text()
    for required in [data['name'], 'PROJECTS','OPEN-SOURCE CONTRIBUTIONS','TECHNICAL SKILLS','EDUCATION']+[p['name'] for p in data['projects']]:
        assert required in text, f"Missing extracted text: {required}"
    urls=[a.get_object().get('/A',{}).get('/URI') for a in reader.pages[0].get('/Annots',[])]
    expected=[c[1] for c in data['contacts']]+['https://github.com/sahyl/'+p['repo'] for p in data['projects']]+[p['url'] for p in data['contributions']]
    expected += ['https://github.com/sahyl/'+p['repo'] for p in data.get('additional_projects',[])]
    assert set(expected)<=set(urls), "Missing PDF links"
    print(f"Verified one page, selectable text, and {len(urls)} clickable links: {output}")


if __name__=="__main__":
    base=Path(__file__).resolve().parent
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source',type=Path,default=base/'resume.json')
    parser.add_argument('--output',type=Path,default=base/'Sahil_Khan_Resume.pdf')
    args=parser.parse_args()
    generate(args.source,args.output)
