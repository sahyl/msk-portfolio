# Resume source

Edit `resume.json`, then regenerate the PDF using Python 3.10 or newer:

```sh
python -m pip install -r resume/requirements.txt
python resume/generate_resume.py --output public/Sahil_Khan_Resume.pdf
```

Copy the generated file to `public/Resume_26.pdf` to keep the old download URL current.
The script enforces one page and checks text extraction and all resume links.
Render with `pdftoppm -png -singlefile public/Sahil_Khan_Resume.pdf resume-preview`
and inspect the result after changing content. Do not distribute an overflowing PDF.

Project descriptions were checked against public source code on 2026-10-10.
No project dates, performance metrics, employment, or deployment scale are asserted.
The three featured projects are followed by four earlier projects retained at the owner's request.
The education naming and contact links follow the owner's confirmation.
