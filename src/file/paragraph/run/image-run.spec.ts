import { describe, expect, it, vi } from "vitest";

import { Formatter } from "@export/formatter";
import { IViewWrapper } from "@file/document-wrapper";
import { File } from "@file/file";

import { ImageRun } from "./image-run";

describe("ImageRun", () => {
    describe("#constructor()", () => {
        it("should create with Buffer", () => {
            const currentImageRun = new ImageRun({
                type: "png",
                data: Buffer.from(""),
                transformation: {
                    width: 200,
                    height: 200,
                    rotation: 45,
                },
                floating: {
                    zIndex: 10,
                    horizontalPosition: {
                        offset: 1014400,
                    },
                    verticalPosition: {
                        offset: 1014400,
                    },
                },
            });

            const tree = new Formatter().format(currentImageRun, {
                file: {
                    Media: {
                        addImage: vi.fn(),
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });
            expect(tree).to.deep.equal({
                "w:r": [
                    {
                        "w:drawing": [
                            {
                                "wp:anchor": [
                                    {
                                        _attr: {
                                            allowOverlap: "1",
                                            behindDoc: "0",
                                            distB: 0,
                                            distL: 0,
                                            distR: 0,
                                            distT: 0,
                                            layoutInCell: "1",
                                            locked: "0",
                                            relativeHeight: 10,
                                            simplePos: "0",
                                        },
                                    },
                                    {
                                        "wp:simplePos": {
                                            _attr: {
                                                x: 0,
                                                y: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:positionH": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:positionV": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:extent": {
                                            _attr: {
                                                cx: 1905000,
                                                cy: 1905000,
                                            },
                                        },
                                    },
                                    {
                                        "wp:effectExtent": {
                                            _attr: {
                                                b: 0,
                                                l: 0,
                                                r: 0,
                                                t: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:wrapNone": {},
                                    },
                                    {
                                        "wp:docPr": {
                                            _attr: {
                                                descr: "",
                                                id: 1,
                                                name: "",
                                                title: "",
                                            },
                                        },
                                    },
                                    {
                                        "wp:cNvGraphicFramePr": [
                                            {
                                                "a:graphicFrameLocks": {
                                                    _attr: {
                                                        noChangeAspect: 1,
                                                        "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "a:graphic": [
                                            {
                                                _attr: {
                                                    "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                },
                                            },
                                            {
                                                "a:graphicData": [
                                                    {
                                                        _attr: {
                                                            uri: "http://schemas.openxmlformats.org/drawingml/2006/picture",
                                                        },
                                                    },
                                                    {
                                                        "pic:pic": [
                                                            {
                                                                _attr: {
                                                                    "xmlns:pic": "http://schemas.openxmlformats.org/drawingml/2006/picture",
                                                                },
                                                            },
                                                            {
                                                                "pic:nvPicPr": [
                                                                    {
                                                                        "pic:cNvPr": {
                                                                            _attr: {
                                                                                descr: "",
                                                                                id: 0,
                                                                                name: "",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        "pic:cNvPicPr": [
                                                                            {
                                                                                "a:picLocks": {
                                                                                    _attr: {
                                                                                        noChangeArrowheads: 1,
                                                                                        noChangeAspect: 1,
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "pic:blipFill": [
                                                                    {
                                                                        "a:blip": {
                                                                            _attr: {
                                                                                cstate: "none",
                                                                                "r:embed":
                                                                                    "rId{da39a3ee5e6b4b0d3255bfef95601890afd80709.png}",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        "a:srcRect": {},
                                                                    },
                                                                    {
                                                                        "a:stretch": [
                                                                            {
                                                                                "a:fillRect": {},
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "pic:spPr": [
                                                                    {
                                                                        _attr: {
                                                                            bwMode: "auto",
                                                                        },
                                                                    },
                                                                    {
                                                                        "a:xfrm": [
                                                                            {
                                                                                _attr: {
                                                                                    rot: 2700000,
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:off": {
                                                                                    _attr: {
                                                                                        x: 0,
                                                                                        y: 0,
                                                                                    },
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:ext": {
                                                                                    _attr: {
                                                                                        cx: 1905000,
                                                                                        cy: 1905000,
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                    {
                                                                        "a:prstGeom": [
                                                                            {
                                                                                _attr: {
                                                                                    prst: "rect",
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:avLst": {},
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });

        it("should create with string", () => {
            const currentImageRun = new ImageRun({
                type: "png",
                data: "",
                transformation: {
                    width: 200,
                    height: 200,
                    rotation: 45,
                },
                floating: {
                    zIndex: 10,
                    horizontalPosition: {
                        offset: 1014400,
                    },
                    verticalPosition: {
                        offset: 1014400,
                    },
                },
            });

            const tree = new Formatter().format(currentImageRun, {
                file: {
                    Media: {
                        addImage: vi.fn(),
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });
            expect(tree).to.deep.equal({
                "w:r": [
                    {
                        "w:drawing": [
                            {
                                "wp:anchor": [
                                    {
                                        _attr: {
                                            allowOverlap: "1",
                                            behindDoc: "0",
                                            distB: 0,
                                            distL: 0,
                                            distR: 0,
                                            distT: 0,
                                            layoutInCell: "1",
                                            locked: "0",
                                            relativeHeight: 10,
                                            simplePos: "0",
                                        },
                                    },
                                    {
                                        "wp:simplePos": {
                                            _attr: {
                                                x: 0,
                                                y: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:positionH": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:positionV": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:extent": {
                                            _attr: {
                                                cx: 1905000,
                                                cy: 1905000,
                                            },
                                        },
                                    },
                                    {
                                        "wp:effectExtent": {
                                            _attr: {
                                                b: 0,
                                                l: 0,
                                                r: 0,
                                                t: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:wrapNone": {},
                                    },
                                    {
                                        "wp:docPr": {
                                            _attr: {
                                                descr: "",
                                                id: 1,
                                                name: "",
                                                title: "",
                                            },
                                        },
                                    },
                                    {
                                        "wp:cNvGraphicFramePr": [
                                            {
                                                "a:graphicFrameLocks": {
                                                    _attr: {
                                                        noChangeAspect: 1,
                                                        "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "a:graphic": [
                                            {
                                                _attr: {
                                                    "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                },
                                            },
                                            {
                                                "a:graphicData": [
                                                    {
                                                        _attr: {
                                                            uri: "http://schemas.openxmlformats.org/drawingml/2006/picture",
                                                        },
                                                    },
                                                    {
                                                        "pic:pic": [
                                                            {
                                                                _attr: {
                                                                    "xmlns:pic": "http://schemas.openxmlformats.org/drawingml/2006/picture",
                                                                },
                                                            },
                                                            {
                                                                "pic:nvPicPr": [
                                                                    {
                                                                        "pic:cNvPr": {
                                                                            _attr: {
                                                                                descr: "",
                                                                                id: 0,
                                                                                name: "",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        "pic:cNvPicPr": [
                                                                            {
                                                                                "a:picLocks": {
                                                                                    _attr: {
                                                                                        noChangeArrowheads: 1,
                                                                                        noChangeAspect: 1,
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "pic:blipFill": [
                                                                    {
                                                                        "a:blip": {
                                                                            _attr: {
                                                                                cstate: "none",
                                                                                "r:embed":
                                                                                    "rId{da39a3ee5e6b4b0d3255bfef95601890afd80709.png}",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        "a:srcRect": {},
                                                                    },
                                                                    {
                                                                        "a:stretch": [
                                                                            {
                                                                                "a:fillRect": {},
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "pic:spPr": [
                                                                    {
                                                                        _attr: {
                                                                            bwMode: "auto",
                                                                        },
                                                                    },
                                                                    {
                                                                        "a:xfrm": [
                                                                            {
                                                                                _attr: {
                                                                                    rot: 2700000,
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:off": {
                                                                                    _attr: {
                                                                                        x: 0,
                                                                                        y: 0,
                                                                                    },
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:ext": {
                                                                                    _attr: {
                                                                                        cx: 1905000,
                                                                                        cy: 1905000,
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                    {
                                                                        "a:prstGeom": [
                                                                            {
                                                                                _attr: {
                                                                                    prst: "rect",
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:avLst": {},
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });

        it("should return UInt8Array if atob is present", () => {
            vi.spyOn(global, "atob").mockReturnValue("atob result");

            const currentImageRun = new ImageRun({
                type: "png",
                data: "",
                transformation: {
                    width: 200,
                    height: 200,
                    rotation: 45,
                },
                floating: {
                    zIndex: 10,
                    horizontalPosition: {
                        offset: 1014400,
                    },
                    verticalPosition: {
                        offset: 1014400,
                    },
                },
            });

            const tree = new Formatter().format(currentImageRun, {
                file: {
                    Media: {
                        addImage: vi.fn(),
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });

            expect(tree).to.deep.equal({
                "w:r": [
                    {
                        "w:drawing": [
                            {
                                "wp:anchor": [
                                    {
                                        _attr: {
                                            allowOverlap: "1",
                                            behindDoc: "0",
                                            distB: 0,
                                            distL: 0,
                                            distR: 0,
                                            distT: 0,
                                            layoutInCell: "1",
                                            locked: "0",
                                            relativeHeight: 10,
                                            simplePos: "0",
                                        },
                                    },
                                    {
                                        "wp:simplePos": {
                                            _attr: {
                                                x: 0,
                                                y: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:positionH": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:positionV": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:extent": {
                                            _attr: {
                                                cx: 1905000,
                                                cy: 1905000,
                                            },
                                        },
                                    },
                                    {
                                        "wp:effectExtent": {
                                            _attr: {
                                                b: 0,
                                                l: 0,
                                                r: 0,
                                                t: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:wrapNone": {},
                                    },
                                    {
                                        "wp:docPr": {
                                            _attr: {
                                                descr: "",
                                                id: 1,
                                                name: "",
                                                title: "",
                                            },
                                        },
                                    },
                                    {
                                        "wp:cNvGraphicFramePr": [
                                            {
                                                "a:graphicFrameLocks": {
                                                    _attr: {
                                                        noChangeAspect: 1,
                                                        "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "a:graphic": [
                                            {
                                                _attr: {
                                                    "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                },
                                            },
                                            {
                                                "a:graphicData": [
                                                    {
                                                        _attr: {
                                                            uri: "http://schemas.openxmlformats.org/drawingml/2006/picture",
                                                        },
                                                    },
                                                    {
                                                        "pic:pic": [
                                                            {
                                                                _attr: {
                                                                    "xmlns:pic": "http://schemas.openxmlformats.org/drawingml/2006/picture",
                                                                },
                                                            },
                                                            {
                                                                "pic:nvPicPr": [
                                                                    {
                                                                        "pic:cNvPr": {
                                                                            _attr: {
                                                                                descr: "",
                                                                                id: 0,
                                                                                name: "",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        "pic:cNvPicPr": [
                                                                            {
                                                                                "a:picLocks": {
                                                                                    _attr: {
                                                                                        noChangeArrowheads: 1,
                                                                                        noChangeAspect: 1,
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "pic:blipFill": [
                                                                    {
                                                                        "a:blip": {
                                                                            _attr: {
                                                                                cstate: "none",
                                                                                "r:embed":
                                                                                    "rId{da39a3ee5e6b4b0d3255bfef95601890afd80709.png}",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        "a:srcRect": {},
                                                                    },
                                                                    {
                                                                        "a:stretch": [
                                                                            {
                                                                                "a:fillRect": {},
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "pic:spPr": [
                                                                    {
                                                                        _attr: {
                                                                            bwMode: "auto",
                                                                        },
                                                                    },
                                                                    {
                                                                        "a:xfrm": [
                                                                            {
                                                                                _attr: {
                                                                                    rot: 2700000,
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:off": {
                                                                                    _attr: {
                                                                                        x: 0,
                                                                                        y: 0,
                                                                                    },
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:ext": {
                                                                                    _attr: {
                                                                                        cx: 1905000,
                                                                                        cy: 1905000,
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                    {
                                                                        "a:prstGeom": [
                                                                            {
                                                                                _attr: {
                                                                                    prst: "rect",
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:avLst": {},
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });

        it("should use data as is if its not a string", () => {
            vi.spyOn(global, "atob").mockReturnValue("atob result");

            const currentImageRun = new ImageRun({
                type: "png",
                data: "",
                transformation: {
                    width: 200,
                    height: 200,
                    rotation: 45,
                },
                floating: {
                    zIndex: 10,
                    horizontalPosition: {
                        offset: 1014400,
                    },
                    verticalPosition: {
                        offset: 1014400,
                    },
                },
            });

            const tree = new Formatter().format(currentImageRun, {
                file: {
                    Media: {
                        addImage: vi.fn(),
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });

            expect(tree).to.deep.equal({
                "w:r": [
                    {
                        "w:drawing": [
                            {
                                "wp:anchor": [
                                    {
                                        _attr: {
                                            allowOverlap: "1",
                                            behindDoc: "0",
                                            distB: 0,
                                            distL: 0,
                                            distR: 0,
                                            distT: 0,
                                            layoutInCell: "1",
                                            locked: "0",
                                            relativeHeight: 10,
                                            simplePos: "0",
                                        },
                                    },
                                    {
                                        "wp:simplePos": {
                                            _attr: {
                                                x: 0,
                                                y: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:positionH": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:positionV": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:extent": {
                                            _attr: {
                                                cx: 1905000,
                                                cy: 1905000,
                                            },
                                        },
                                    },
                                    {
                                        "wp:effectExtent": {
                                            _attr: {
                                                b: 0,
                                                l: 0,
                                                r: 0,
                                                t: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:wrapNone": {},
                                    },
                                    {
                                        "wp:docPr": {
                                            _attr: {
                                                descr: "",
                                                id: 1,
                                                name: "",
                                                title: "",
                                            },
                                        },
                                    },
                                    {
                                        "wp:cNvGraphicFramePr": [
                                            {
                                                "a:graphicFrameLocks": {
                                                    _attr: {
                                                        noChangeAspect: 1,
                                                        "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "a:graphic": [
                                            {
                                                _attr: {
                                                    "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                },
                                            },
                                            {
                                                "a:graphicData": [
                                                    {
                                                        _attr: {
                                                            uri: "http://schemas.openxmlformats.org/drawingml/2006/picture",
                                                        },
                                                    },
                                                    {
                                                        "pic:pic": [
                                                            {
                                                                _attr: {
                                                                    "xmlns:pic": "http://schemas.openxmlformats.org/drawingml/2006/picture",
                                                                },
                                                            },
                                                            {
                                                                "pic:nvPicPr": [
                                                                    {
                                                                        "pic:cNvPr": {
                                                                            _attr: {
                                                                                descr: "",
                                                                                id: 0,
                                                                                name: "",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        "pic:cNvPicPr": [
                                                                            {
                                                                                "a:picLocks": {
                                                                                    _attr: {
                                                                                        noChangeArrowheads: 1,
                                                                                        noChangeAspect: 1,
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "pic:blipFill": [
                                                                    {
                                                                        "a:blip": {
                                                                            _attr: {
                                                                                cstate: "none",
                                                                                "r:embed":
                                                                                    "rId{da39a3ee5e6b4b0d3255bfef95601890afd80709.png}",
                                                                            },
                                                                        },
                                                                    },
                                                                    {
                                                                        "a:srcRect": {},
                                                                    },
                                                                    {
                                                                        "a:stretch": [
                                                                            {
                                                                                "a:fillRect": {},
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "pic:spPr": [
                                                                    {
                                                                        _attr: {
                                                                            bwMode: "auto",
                                                                        },
                                                                    },
                                                                    {
                                                                        "a:xfrm": [
                                                                            {
                                                                                _attr: {
                                                                                    rot: 2700000,
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:off": {
                                                                                    _attr: {
                                                                                        x: 0,
                                                                                        y: 0,
                                                                                    },
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:ext": {
                                                                                    _attr: {
                                                                                        cx: 1905000,
                                                                                        cy: 1905000,
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                    {
                                                                        "a:prstGeom": [
                                                                            {
                                                                                _attr: {
                                                                                    prst: "rect",
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:avLst": {},
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });

        it("should strip base64 marker", () => {
            const spy = vi.spyOn(global, "atob").mockReturnValue("atob result");

            new ImageRun({
                type: "png",
                data: ";base64,",
                transformation: {
                    width: 200,
                    height: 200,
                    rotation: 45,
                },
            });

            expect(spy).toBeCalledWith("");
        });

        it("should work with svgs", () => {
            const currentImageRun = new ImageRun({
                type: "svg",
                data: Buffer.from(""),
                transformation: {
                    width: 200,
                    height: 200,
                },
                fallback: {
                    type: "png",
                    data: Buffer.from(""),
                },
            });

            const tree = new Formatter().format(currentImageRun, {
                file: {
                    Media: {
                        addImage: vi.fn(),
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });

            expect(tree).toStrictEqual({
                "w:r": [
                    {
                        "w:drawing": [
                            {
                                "wp:inline": expect.arrayContaining([
                                    {
                                        "a:graphic": expect.arrayContaining([
                                            {
                                                "a:graphicData": expect.arrayContaining([
                                                    {
                                                        "pic:pic": expect.arrayContaining([
                                                            {
                                                                "pic:blipFill": expect.arrayContaining([
                                                                    {
                                                                        "a:blip": [
                                                                            {
                                                                                _attr: {
                                                                                    cstate: "none",
                                                                                    "r:embed":
                                                                                        "rId{da39a3ee5e6b4b0d3255bfef95601890afd80709.png}",
                                                                                },
                                                                            },
                                                                            {
                                                                                "a:extLst": [
                                                                                    {
                                                                                        "a:ext": [
                                                                                            {
                                                                                                _attr: {
                                                                                                    uri: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}",
                                                                                                },
                                                                                            },
                                                                                            {
                                                                                                "asvg:svgBlip": {
                                                                                                    _attr: expect.objectContaining({
                                                                                                        "r:embed":
                                                                                                            "rId{da39a3ee5e6b4b0d3255bfef95601890afd80709.svg}",
                                                                                                    }),
                                                                                                },
                                                                                            },
                                                                                        ],
                                                                                    },
                                                                                ],
                                                                            },
                                                                        ],
                                                                    },
                                                                ]),
                                                            },
                                                        ]),
                                                    },
                                                ]),
                                            },
                                        ]),
                                    },
                                ]),
                            },
                        ],
                    },
                ],
            });
        });

        it("using same data twice should use same media key", () => {
            const imageRunStringData = new ImageRun({
                type: "png",
                data: "DATA",
                transformation: {
                    width: 100,
                    height: 100,
                    rotation: 42,
                },
            });

            const imageRunBufferData = new ImageRun({
                type: "png",
                data: Buffer.from("DATA"),
                transformation: {
                    width: 200,
                    height: 200,
                    rotation: 45,
                },
            });

            const addImageSpy = vi.fn();
            const context = {
                file: {
                    Media: {
                        addImage: addImageSpy,
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            };

            new Formatter().format(imageRunStringData, context);
            new Formatter().format(imageRunBufferData, context);

            const expectedHash = "580393f5a94fb469585f5dd2a6859a4aab899f37";

            expect(addImageSpy).toHaveBeenCalledTimes(2);
            expect(addImageSpy).toHaveBeenNthCalledWith(
                1,
                `${expectedHash}.png`,
                expect.objectContaining({ fileName: `${expectedHash}.png` }),
            );
            expect(addImageSpy).toHaveBeenNthCalledWith(
                2,
                `${expectedHash}.png`,
                expect.objectContaining({ fileName: `${expectedHash}.png` }),
            );
        });
    });

    describe("#fromSvg()", () => {
        it("should create an SVG ImageRun with PNG fallback", () => {
            const svgData = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/></svg>');
            const pngFallback = Buffer.from("PNG_DATA");

            const imageRun = ImageRun.fromSvg(svgData, { type: "png", data: pngFallback }, { width: 100, height: 100 });

            const addImageSpy = vi.fn();
            const tree = new Formatter().format(imageRun, {
                file: {
                    Media: {
                        addImage: addImageSpy,
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });

            // Should register both SVG and fallback images
            expect(addImageSpy).toHaveBeenCalledTimes(2);

            // Verify the tree structure contains SVG blip extension
            expect(tree).toStrictEqual({
                "w:r": [
                    {
                        "w:drawing": [
                            {
                                "wp:inline": expect.arrayContaining([
                                    {
                                        "a:graphic": expect.arrayContaining([
                                            {
                                                "a:graphicData": expect.arrayContaining([
                                                    {
                                                        "pic:pic": expect.arrayContaining([
                                                            {
                                                                "pic:blipFill": expect.arrayContaining([
                                                                    {
                                                                        "a:blip": expect.arrayContaining([
                                                                            {
                                                                                "a:extLst": expect.arrayContaining([
                                                                                    {
                                                                                        "a:ext": expect.arrayContaining([
                                                                                            {
                                                                                                "asvg:svgBlip": expect.objectContaining({
                                                                                                    _attr: expect.objectContaining({
                                                                                                        "xmlns:asvg":
                                                                                                            "http://schemas.microsoft.com/office/drawing/2016/SVG/main",
                                                                                                    }),
                                                                                                }),
                                                                                            },
                                                                                        ]),
                                                                                    },
                                                                                ]),
                                                                            },
                                                                        ]),
                                                                    },
                                                                ]),
                                                            },
                                                        ]),
                                                    },
                                                ]),
                                            },
                                        ]),
                                    },
                                ]),
                            },
                        ],
                    },
                ],
            });
        });

        it("should create an SVG ImageRun with JPEG fallback", () => {
            const svgData = Buffer.from("<svg></svg>");
            const jpegFallback = Buffer.from("JPEG_DATA");

            const imageRun = ImageRun.fromSvg(svgData, { type: "jpg", data: jpegFallback }, { width: 200, height: 150 });

            const addImageSpy = vi.fn();
            new Formatter().format(imageRun, {
                file: {
                    Media: {
                        addImage: addImageSpy,
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });

            // Should register both SVG and fallback images
            expect(addImageSpy).toHaveBeenCalledTimes(2);

            // First call should be for SVG
            expect(addImageSpy).toHaveBeenNthCalledWith(1, expect.stringMatching(/\.svg$/), expect.objectContaining({ type: "svg" }));

            // Second call should be for JPEG fallback
            expect(addImageSpy).toHaveBeenNthCalledWith(2, expect.stringMatching(/\.jpg$/), expect.objectContaining({ type: "jpg" }));
        });

        it("should pass through transformation options", () => {
            const svgData = Buffer.from("<svg></svg>");
            const pngFallback = Buffer.from("PNG_DATA");

            const imageRun = ImageRun.fromSvg(
                svgData,
                { type: "png", data: pngFallback },
                {
                    width: 300,
                    height: 200,
                    rotation: 90,
                    flip: { horizontal: true, vertical: false },
                },
            );

            const addImageSpy = vi.fn();
            new Formatter().format(imageRun, {
                file: {
                    Media: {
                        addImage: addImageSpy,
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });

            // Verify transformation is applied to the SVG media data
            const svgMediaData = addImageSpy.mock.calls[0][1];
            expect(svgMediaData.transformation.pixels).toEqual({ x: 300, y: 200 });
            expect(svgMediaData.transformation.rotation).toBe(90 * 60000);
            expect(svgMediaData.transformation.flip).toEqual({ horizontal: true, vertical: false });
        });

        it("should accept string SVG data", () => {
            const svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="red"/></svg>';
            const pngFallback = Buffer.from("PNG_DATA");

            const imageRun = ImageRun.fromSvg(svgString, { type: "png", data: pngFallback }, { width: 100, height: 100 });

            const addImageSpy = vi.fn();
            new Formatter().format(imageRun, {
                file: {
                    Media: {
                        addImage: addImageSpy,
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });

            expect(addImageSpy).toHaveBeenCalledTimes(2);
            expect(addImageSpy).toHaveBeenNthCalledWith(1, expect.stringMatching(/\.svg$/), expect.objectContaining({ type: "svg" }));
        });

        it("should accept Uint8Array SVG data", () => {
            const svgUint8 = new Uint8Array([60, 115, 118, 103, 62, 60, 47, 115, 118, 103, 62]); // "<svg></svg>"
            const pngFallback = new Uint8Array([80, 78, 71]); // "PNG"

            const imageRun = ImageRun.fromSvg(svgUint8, { type: "png", data: pngFallback }, { width: 50, height: 50 });

            const addImageSpy = vi.fn();
            new Formatter().format(imageRun, {
                file: {
                    Media: {
                        addImage: addImageSpy,
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });

            expect(addImageSpy).toHaveBeenCalledTimes(2);
        });
    });
});
