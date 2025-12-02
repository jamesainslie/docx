import JSZip from "jszip";
import { describe, expect, it } from "vitest";

import { Document, ImageRun, Packer, Paragraph } from "../../../index";

describe("ImageRun SVG Integration", () => {
    const simpleSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue"/></svg>';
    const pngFallbackData = Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        "base64",
    );

    describe("DOCX package structure", () => {
        it("should include SVG and fallback media files in the package", async () => {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(simpleSvg),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const fileNames = Object.keys(zip.files);

            // Should have at least one .svg file in word/media/
            const svgFiles = fileNames.filter((name) => name.startsWith("word/media/") && name.endsWith(".svg"));
            expect(svgFiles.length).toBeGreaterThanOrEqual(1);

            // Should have at least one .png file in word/media/ (the fallback)
            const pngFiles = fileNames.filter((name) => name.startsWith("word/media/") && name.endsWith(".png"));
            expect(pngFiles.length).toBeGreaterThanOrEqual(1);
        });

        it("should include image/svg+xml content type in [Content_Types].xml", async () => {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(simpleSvg),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const contentTypesXml = await zip.file("[Content_Types].xml")?.async("string");
            expect(contentTypesXml).toBeDefined();
            expect(contentTypesXml).toContain('Extension="svg"');
            expect(contentTypesXml).toContain('ContentType="image/svg+xml"');
        });

        it("should generate valid SVG media content", async () => {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(simpleSvg),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const fileNames = Object.keys(zip.files);
            const svgFile = fileNames.find((name) => name.startsWith("word/media/") && name.endsWith(".svg"));
            expect(svgFile).toBeDefined();

            const svgContent = await zip.file(svgFile!)?.async("string");
            expect(svgContent).toContain("<svg");
            expect(svgContent).toContain("circle");
        });
    });

    describe("mixed image types", () => {
        it("should handle documents with both SVG and raster images", async () => {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    // Raster PNG image
                                    new ImageRun({
                                        type: "png",
                                        data: pngFallbackData,
                                        transformation: { width: 50, height: 50 },
                                    }),
                                    // SVG image with fallback
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(simpleSvg),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const fileNames = Object.keys(zip.files);

            // Should have SVG file
            const svgFiles = fileNames.filter((name) => name.startsWith("word/media/") && name.endsWith(".svg"));
            expect(svgFiles.length).toBeGreaterThanOrEqual(1);

            // Should have PNG files (raster image + SVG fallback)
            const pngFiles = fileNames.filter((name) => name.startsWith("word/media/") && name.endsWith(".png"));
            expect(pngFiles.length).toBeGreaterThanOrEqual(1);
        });

        it("should handle multiple SVG images in the same document", async () => {
            const svg1 = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="red"/></svg>';
            const svg2 = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="blue"/></svg>';

            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(svg1),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(svg2),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const fileNames = Object.keys(zip.files);

            // Should have 2 distinct SVG files (different content = different hashes)
            const svgFiles = fileNames.filter((name) => name.startsWith("word/media/") && name.endsWith(".svg"));
            expect(svgFiles.length).toBe(2);
        });
    });

    describe("ImageRun.fromSvg() integration", () => {
        it("should generate valid DOCX using fromSvg helper", async () => {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    // Use Buffer.from() since fromSvg expects binary data, not raw strings
                                    ImageRun.fromSvg(
                                        Buffer.from(simpleSvg),
                                        { type: "png", data: pngFallbackData },
                                        { width: 100, height: 100 },
                                    ),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const fileNames = Object.keys(zip.files);

            // Should have SVG and PNG files
            const svgFiles = fileNames.filter((name) => name.startsWith("word/media/") && name.endsWith(".svg"));
            const pngFiles = fileNames.filter((name) => name.startsWith("word/media/") && name.endsWith(".png"));

            expect(svgFiles.length).toBeGreaterThanOrEqual(1);
            expect(pngFiles.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("document.xml structure", () => {
        it("should include asvg:svgBlip element for SVG images", async () => {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(simpleSvg),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const documentXml = await zip.file("word/document.xml")?.async("string");
            expect(documentXml).toBeDefined();

            // Should contain the SVG blip extension
            expect(documentXml).toContain("asvg:svgBlip");
            expect(documentXml).toContain("http://schemas.microsoft.com/office/drawing/2016/SVG/main");
        });

        it("should reference fallback image in a:blip r:embed", async () => {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(simpleSvg),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const documentXml = await zip.file("word/document.xml")?.async("string");
            expect(documentXml).toBeDefined();

            // Should contain a:blip element with r:embed attribute
            expect(documentXml).toContain("a:blip");
            expect(documentXml).toContain("r:embed");
        });
    });

    describe("relationships", () => {
        it("should create relationships for both SVG and fallback images", async () => {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        type: "svg",
                                        data: Buffer.from(simpleSvg),
                                        transformation: { width: 100, height: 100 },
                                        fallback: { type: "png", data: pngFallbackData },
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const zip = await JSZip.loadAsync(buffer);

            const relsXml = await zip.file("word/_rels/document.xml.rels")?.async("string");
            expect(relsXml).toBeDefined();

            // Should contain relationships to image files
            expect(relsXml).toContain("relationships/image");
            expect(relsXml).toContain("media/");
        });
    });
});
