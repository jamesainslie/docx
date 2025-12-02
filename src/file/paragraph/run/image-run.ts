import { DocPropertiesOptions } from "@file/drawing/doc-properties/doc-properties";
import { IContext, IXmlableObject } from "@file/xml-components";
import { hashedId } from "@util/convenience-functions";

import { Drawing, IFloating } from "../../drawing";
import { OutlineOptions } from "../../drawing/inline/graphic/graphic-data/pic/shape-properties/outline/outline";
import { IMediaTransformation } from "../../media";
import { IMediaData } from "../../media/data";
import { Run } from "../run";

type CoreImageOptions = {
    readonly transformation: IMediaTransformation;
    readonly floating?: IFloating;
    readonly altText?: DocPropertiesOptions;
    readonly outline?: OutlineOptions;
};

type RegularImageOptions = {
    readonly type: "jpg" | "png" | "gif" | "bmp";
    readonly data: Buffer | string | Uint8Array | ArrayBuffer;
};

/**
 * Options for SVG images. SVG images require a raster fallback for
 * compatibility with Word processors that do not support SVG rendering.
 */
type SvgMediaOptions = {
    readonly type: "svg";
    readonly data: Buffer | string | Uint8Array | ArrayBuffer;
    /**
     * Required raster fallback image for Word processors that do not support SVG.
     * This image will be displayed in older versions of Word or alternative viewers.
     */
    readonly fallback: RegularImageOptions;
};

/**
 * Options for the `ImageRun.fromSvg()` helper method.
 */
export type FromSvgOptions = {
    /** Width of the image in pixels. */
    readonly width: number;
    /** Height of the image in pixels. */
    readonly height: number;
    /** Optional flip transformation. */
    readonly flip?: {
        readonly vertical?: boolean;
        readonly horizontal?: boolean;
    };
    /** Optional rotation in degrees. */
    readonly rotation?: number;
    /** Optional floating positioning options. */
    readonly floating?: IFloating;
    /** Optional alt text and document properties. */
    readonly altText?: DocPropertiesOptions;
    /** Optional outline/border options. */
    readonly outline?: OutlineOptions;
};

export type IImageOptions = (RegularImageOptions | SvgMediaOptions) & CoreImageOptions;

const convertDataURIToBinary = (dataURI: string): Uint8Array => {
    if (typeof atob === "function") {
        // https://gist.github.com/borismus/1032746
        // https://github.com/mafintosh/base64-to-uint8array
        const BASE64_MARKER = ";base64,";
        const base64Index = dataURI.indexOf(BASE64_MARKER);

        const base64IndexWithOffset = base64Index === -1 ? 0 : base64Index + BASE64_MARKER.length;

        return new Uint8Array(
            atob(dataURI.substring(base64IndexWithOffset))
                .split("")
                .map((c) => c.charCodeAt(0)),
        );
        /* c8 ignore next 6 */
    } else {
        // Not possible to test this branch in NodeJS
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        const b = require("buf" + "fer");
        return new b.Buffer(dataURI, "base64");
    }
};

const standardizeData = (data: string | Buffer | Uint8Array | ArrayBuffer): Buffer | Uint8Array | ArrayBuffer =>
    typeof data === "string" ? convertDataURIToBinary(data) : data;

const createImageData = (options: IImageOptions, key: string): Pick<IMediaData, "data" | "fileName" | "transformation"> => ({
    data: standardizeData(options.data),
    fileName: key,
    transformation: {
        pixels: {
            x: Math.round(options.transformation.width),
            y: Math.round(options.transformation.height),
        },
        emus: {
            x: Math.round(options.transformation.width * 9525),
            y: Math.round(options.transformation.height * 9525),
        },
        flip: options.transformation.flip,
        rotation: options.transformation.rotation ? options.transformation.rotation * 60000 : undefined,
    },
});

export class ImageRun extends Run {
    private readonly imageData: IMediaData;

    /**
     * Creates an ImageRun from SVG data with a required raster fallback.
     *
     * This is a convenience method for creating SVG images. SVG support requires
     * Word 2019 or later / Microsoft 365. The fallback image will be displayed
     * in older Word versions or alternative viewers (e.g., LibreOffice).
     *
     * @param svg - The SVG image data as a string, Uint8Array, ArrayBuffer, or data URI.
     * @param fallback - The raster fallback image with its type and data.
     * @param options - Transformation and positioning options for the image.
     * @returns A new ImageRun instance configured for SVG with fallback.
     *
     * @example
     * ```ts
     * const svgContent = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue"/></svg>';
     * const pngFallback = fs.readFileSync("fallback.png");
     *
     * const image = ImageRun.fromSvg(
     *   svgContent,
     *   { type: "png", data: pngFallback },
     *   { width: 100, height: 100 }
     * );
     * ```
     */
    public static fromSvg(
        svg: string | Uint8Array | ArrayBuffer,
        fallback: { readonly data: string | Uint8Array | ArrayBuffer; readonly type: "png" | "jpg" | "gif" | "bmp" },
        options: FromSvgOptions,
    ): ImageRun {
        return new ImageRun({
            type: "svg",
            data: svg,
            fallback: {
                type: fallback.type,
                data: fallback.data,
            },
            transformation: {
                width: options.width,
                height: options.height,
                flip: options.flip,
                rotation: options.rotation,
            },
            floating: options.floating,
            altText: options.altText,
            outline: options.outline,
        });
    }

    public constructor(options: IImageOptions) {
        super({});

        const hash = hashedId(options.data);
        const key = `${hash}.${options.type}`;

        this.imageData =
            options.type === "svg"
                ? {
                      type: options.type,
                      ...createImageData(options, key),
                      fallback: {
                          type: options.fallback.type,
                          ...createImageData(
                              {
                                  ...options.fallback,
                                  transformation: options.transformation,
                              },
                              `${hashedId(options.fallback.data)}.${options.fallback.type}`,
                          ),
                      },
                  }
                : {
                      type: options.type,
                      ...createImageData(options, key),
                  };
        const drawing = new Drawing(this.imageData, {
            floating: options.floating,
            docProperties: options.altText,
            outline: options.outline,
        });

        this.root.push(drawing);
    }

    public prepForXml(context: IContext): IXmlableObject | undefined {
        context.file.Media.addImage(this.imageData.fileName, this.imageData);

        if (this.imageData.type === "svg") {
            context.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback);
        }

        return super.prepForXml(context);
    }
}
