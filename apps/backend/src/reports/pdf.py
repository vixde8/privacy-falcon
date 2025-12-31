"""
PDF Report Generator.

Produces an audit-safe, neutral compliance report.
"""

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO
from datetime import datetime


def generate_scan_report(scan: dict, results: dict) -> bytes:
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)

    width, height = A4
    y = height - 50

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "Privacy & Compliance Scan Report")

    y -= 30
    pdf.setFont("Helvetica", 10)
    pdf.drawString(50, y, f"Scan ID: {scan['scan_id']}")
    y -= 15
    pdf.drawString(50, y, f"Scanned URL: {scan['meta']['url']}")
    y -= 15
    pdf.drawString(50, y, f"Generated at: {datetime.utcnow().isoformat()}")

    y -= 30
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Summary")

    y -= 20
    pdf.setFont("Helvetica", 10)
    pdf.drawString(50, y, f"Score: {results['score']}")
    y -= 15
    pdf.drawString(50, y, f"Grade: {results['grade']}")
    y -= 15
    pdf.drawString(50, y, f"Confidence: {int(results['confidence'] * 100)}%")

    y -= 30
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Detected Signals")

    y -= 20
    pdf.setFont("Helvetica", 10)

    if not results.get("findings"):
        pdf.drawString(50, y, "No detectable tracking signals found.")
    else:
        for f in results["findings"]:
            pdf.drawString(
                50,
                y,
                f"- {f['id']} ({f['category']}, severity: {f['severity']})",
            )
            y -= 14

    pdf.showPage()
    pdf.save()

    buffer.seek(0)
    return buffer.read()
