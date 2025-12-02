// Example of how to add SVG images to documents
//
// SVG images require Word 2019 or later / Microsoft 365 for native rendering.
// A raster fallback (PNG/JPEG/GIF/BMP) is required for compatibility with
// older Word versions or alternative viewers like LibreOffice.

import * as fs from "fs";
import {
    Document,
    HeadingLevel,
    HorizontalPositionAlign,
    HorizontalPositionRelativeFrom,
    ImageRun,
    Packer,
    Paragraph,
    TextRun,
    VerticalPositionAlign,
    VerticalPositionRelativeFrom,
} from "docx";

// A simple inline SVG for demonstration
const simpleSvgCircle = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#4285f4" stroke="#1a73e8" stroke-width="2"/>
  <text x="50" y="55" text-anchor="middle" fill="white" font-size="14" font-family="Arial">SVG</text>
</svg>`;

// A more complex SVG resembling a simple diagram
const diagramSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <rect x="10" y="50" width="80" height="50" rx="5" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
  <text x="50" y="80" text-anchor="middle" font-size="12" font-family="Arial">Input</text>
  <line x1="90" y1="75" x2="120" y2="75" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <rect x="120" y="50" width="80" height="50" rx="5" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
  <text x="160" y="80" text-anchor="middle" font-size="12" font-family="Arial">Process</text>
  <line x1="200" y1="75" x2="230" y2="75" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <rect x="230" y="50" width="60" height="50" rx="5" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
  <text x="260" y="80" text-anchor="middle" font-size="12" font-family="Arial">Output</text>
</svg>`;

// Load the existing Linux SVG and PNG from demo assets
const linuxSvg = fs.readFileSync("./demo/images/linux-svg.svg");
const linuxPng = fs.readFileSync("./demo/images/linux-png.png");

// Create a simple 1x1 transparent PNG as fallback for inline SVGs
// In production, you would generate proper rasterized fallbacks
const transparentPng = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "base64",
);

const doc = new Document({
    sections: [
        {
            children: [
                // Title
                new Paragraph({
                    text: "SVG Images in Word Documents",
                    heading: HeadingLevel.HEADING_1,
                }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: "This document demonstrates SVG image support in docx. SVG images require Word 2019+ or Microsoft 365 for native rendering. A raster fallback is always included for compatibility.",
                        }),
                    ],
                }),

                new Paragraph({ text: "" }), // Spacer

                // Section 1: Basic inline SVG using constructor
                new Paragraph({
                    text: "1. Basic Inline SVG (Constructor)",
                    heading: HeadingLevel.HEADING_2,
                }),

                new Paragraph({
                    children: [
                        new TextRun("A simple SVG circle with text: "),
                        new ImageRun({
                            type: "svg",
                            data: Buffer.from(simpleSvgCircle, "utf-8"),
                            transformation: {
                                width: 50,
                                height: 50,
                            },
                            fallback: {
                                type: "png",
                                data: transparentPng,
                            },
                        }),
                        new TextRun(" (inline with text)"),
                    ],
                }),

                new Paragraph({ text: "" }), // Spacer

                // Section 2: Using the fromSvg() helper
                new Paragraph({
                    text: "2. SVG Using fromSvg() Helper",
                    heading: HeadingLevel.HEADING_2,
                }),

                new Paragraph({
                    children: [
                        new TextRun("The same circle using the convenience method: "),
                        // Note: fromSvg expects binary data (Buffer/Uint8Array), not raw strings
                        ImageRun.fromSvg(
                            Buffer.from(simpleSvgCircle, "utf-8"),
                            { type: "png", data: transparentPng },
                            { width: 50, height: 50 },
                        ),
                    ],
                }),

                new Paragraph({ text: "" }), // Spacer

                // Section 3: Diagram-style SVG
                new Paragraph({
                    text: "3. Diagram-Style SVG",
                    heading: HeadingLevel.HEADING_2,
                }),

                new Paragraph({
                    text: "A simple flowchart diagram rendered as SVG:",
                }),

                new Paragraph({
                    children: [
                        new ImageRun({
                            type: "svg",
                            data: Buffer.from(diagramSvg, "utf-8"),
                            transformation: {
                                width: 400,
                                height: 200,
                            },
                            fallback: {
                                type: "png",
                                data: transparentPng,
                            },
                            altText: {
                                title: "Process Flow Diagram",
                                description: "A simple input-process-output flowchart",
                                name: "Flowchart",
                            },
                        }),
                    ],
                }),

                new Paragraph({ text: "" }), // Spacer

                // Section 4: File-based SVG with proper fallback
                new Paragraph({
                    text: "4. File-Based SVG with PNG Fallback",
                    heading: HeadingLevel.HEADING_2,
                }),

                new Paragraph({
                    text: "The Linux penguin loaded from SVG file with matching PNG fallback:",
                }),

                new Paragraph({
                    children: [
                        new ImageRun({
                            type: "svg",
                            data: linuxSvg,
                            transformation: {
                                width: 150,
                                height: 150,
                            },
                            fallback: {
                                type: "png",
                                data: linuxPng,
                            },
                        }),
                    ],
                }),

                new Paragraph({ text: "" }), // Spacer

                // Section 5: Floating SVG
                new Paragraph({
                    text: "5. Floating SVG Image",
                    heading: HeadingLevel.HEADING_2,
                }),

                new Paragraph({
                    text: "SVG images can also be positioned as floating elements. Look at the bottom-right corner of this page.",
                }),

                new Paragraph({
                    children: [
                        ImageRun.fromSvg(
                            Buffer.from(simpleSvgCircle, "utf-8"),
                            { type: "png", data: transparentPng },
                            {
                                width: 80,
                                height: 80,
                                floating: {
                                    zIndex: 10,
                                    horizontalPosition: {
                                        relative: HorizontalPositionRelativeFrom.PAGE,
                                        align: HorizontalPositionAlign.RIGHT,
                                    },
                                    verticalPosition: {
                                        relative: VerticalPositionRelativeFrom.PAGE,
                                        align: VerticalPositionAlign.BOTTOM,
                                    },
                                },
                            },
                        ),
                    ],
                }),

                new Paragraph({ text: "" }), // Spacer

                // Section 6: SVG with transformations
                new Paragraph({
                    text: "6. SVG with Transformations",
                    heading: HeadingLevel.HEADING_2,
                }),

                new Paragraph({
                    text: "SVG images support the same transformations as raster images:",
                }),

                new Paragraph({
                    children: [
                        new TextRun("Normal: "),
                        new ImageRun({
                            type: "svg",
                            data: linuxSvg,
                            transformation: {
                                width: 80,
                                height: 80,
                            },
                            fallback: {
                                type: "png",
                                data: linuxPng,
                            },
                        }),
                        new TextRun("  Flipped: "),
                        new ImageRun({
                            type: "svg",
                            data: linuxSvg,
                            transformation: {
                                width: 80,
                                height: 80,
                                flip: {
                                    horizontal: true,
                                },
                            },
                            fallback: {
                                type: "png",
                                data: linuxPng,
                            },
                        }),
                        new TextRun("  Rotated: "),
                        new ImageRun({
                            type: "svg",
                            data: linuxSvg,
                            transformation: {
                                width: 80,
                                height: 80,
                                rotation: 45,
                            },
                            fallback: {
                                type: "png",
                                data: linuxPng,
                            },
                        }),
                    ],
                }),

                new Paragraph({ text: "" }), // Spacer

                // Notes section
                new Paragraph({
                    text: "Notes",
                    heading: HeadingLevel.HEADING_2,
                }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Important: ",
                            bold: true,
                        }),
                        new TextRun(
                            "SVG support requires Word 2019 or Microsoft 365. In older versions or alternative viewers (LibreOffice, Google Docs), the PNG/JPEG fallback image will be displayed instead.",
                        ),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
