# Images

!> Images requires an understanding of [Sections](usage/sections.md) and [Paragraphs](usage/paragraph.md).

To create a `floating` image on top of text:

```ts
const image = new ImageRun({
    type: 'gif',
    data: fs.readFileSync("./demo/images/pizza.gif"),
    transformation: {
        width: 200,
        height: 200,
    }
    floating: {
        horizontalPosition: {
            offset: 1014400,
        },
        verticalPosition: {
            offset: 1014400,
        },
    },
});
```

By default with no arguments, its an `inline` image:

```ts
const image = new ImageRun({
    type: 'gif',
    data: fs.readFileSync("./demo/images/pizza.gif"),
    transformation: {
        width: 100,
        height: 100,
    },
});
```

Add it into the document by adding the image into a paragraph:

```ts
const doc = new Document({
    sections: [{
        children: [
            new Paragraph({
                children: [image],
            }),
        ],
    }];
});
```

## Intro

Adding images can be easily done by creating an instance of `ImageRun`. This can be added in a `Paragraph` or `Hyperlink`:

```ts
const doc = new Document({
    sections: [{
        children: [
            new Paragraph({
                children: [
                    new ImageRun({
                        type: [IMAGE_TYPE],
                        data: [IMAGE_BUFFER],
                        transformation: {
                            width: [IMAGE_SIZE],
                            height: [IMAGE_SIZE],
                        },
                    }),
                ],
            }),
        ],
    }];
});
```

`docx` supports `jpeg`, `jpg`, `bmp`, `gif`, `png`, and `svg`

## SVG Images

SVG (Scalable Vector Graphics) images are supported with a required raster fallback. SVG rendering requires **Word 2019 or later** / **Microsoft 365**. The fallback image is displayed in older Word versions or alternative viewers like LibreOffice.

### Basic SVG Usage

```ts
const image = new ImageRun({
    type: "svg",
    data: fs.readFileSync("./diagram.svg"),
    transformation: {
        width: 200,
        height: 150,
    },
    fallback: {
        type: "png",
        data: fs.readFileSync("./diagram.png"),
    },
});
```

### Using the fromSvg() Helper

For convenience, you can use the static `fromSvg()` method:

```ts
const image = ImageRun.fromSvg(
    Buffer.from(svgContent, "utf-8"),        // SVG as Buffer or Uint8Array
    { type: "png", data: pngFallbackData },  // Required fallback
    { width: 200, height: 150 }              // Dimensions and optional transformations
);
```

?> **Note**: The `fromSvg()` helper expects binary data (`Buffer` or `Uint8Array`), not raw strings. Use `Buffer.from(svgString, "utf-8")` to convert SVG strings.

### Inline SVG Content

You can embed SVG content directly as a string:

```ts
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="blue"/>
</svg>`;

const image = new ImageRun({
    type: "svg",
    data: Buffer.from(svgContent),
    transformation: {
        width: 100,
        height: 100,
    },
    fallback: {
        type: "png",
        data: pngFallbackBuffer,
    },
});
```

### SVG with Transformations

SVG images support the same transformations as raster images:

```ts
const image = new ImageRun({
    type: "svg",
    data: svgBuffer,
    transformation: {
        width: 150,
        height: 150,
        rotation: 45,
        flip: {
            horizontal: true,
        },
    },
    fallback: {
        type: "png",
        data: pngFallback,
    },
});
```

### Floating SVG Images

SVG images can be positioned as floating elements:

```ts
const image = ImageRun.fromSvg(
    svgContent,
    { type: "png", data: fallbackPng },
    {
        width: 100,
        height: 100,
        floating: {
            horizontalPosition: {
                relative: HorizontalPositionRelativeFrom.PAGE,
                align: HorizontalPositionAlign.CENTER,
            },
            verticalPosition: {
                relative: VerticalPositionRelativeFrom.PAGE,
                align: VerticalPositionAlign.TOP,
            },
        },
    }
);
```

### SVG Options

| Property       | Type                  | Notes                                                    |
| -------------- | --------------------- | -------------------------------------------------------- |
| type           | `"svg"`               | Required, must be `"svg"`                                |
| data           | `Buffer/Uint8Array/string` | The SVG content                                     |
| transformation | `object`              | Width, height, rotation, flip                            |
| fallback       | `object`              | **Required** - raster image for compatibility            |
| floating       | `object`              | Optional positioning options                             |
| altText        | `object`              | Optional accessibility text                              |
| outline        | `object`              | Optional border/outline                                  |

### Fallback Options

| Property | Type                           | Notes                          |
| -------- | ------------------------------ | ------------------------------ |
| type     | `"png"`, `"jpg"`, `"gif"`, `"bmp"` | Required raster format      |
| data     | `Buffer/Uint8Array/string`     | The fallback image data        |

?> **Tip**: For best results, generate a PNG fallback at the same dimensions as your SVG. Tools like Inkscape, ImageMagick, or browser-based libraries can convert SVG to PNG.

!> **Important**: The fallback image is required. Documents will not render correctly without it in older Word versions

## Positioning

> Positioning is the method on how to place the image on the document

![Word Image Positioning](https://user-images.githubusercontent.com/34742290/41765548-b0946302-7604-11e8-96f9-166a9f0b8f39.png)

Three types of image positioning is supported:

-   Floating
-   Inline

By default, images are exported as `Inline` elements.

### Usage

Pass `options` into the `[POSITION_OPTIONS]` mentioned in the [Intro above](#Intro).

## Floating

To change the position the image to be on top of the text, simply add the `floating` property to the last argument. By default, the offsets are relative to the top left corner of the `page`. Offset units are in [emus](https://startbigthinksmall.wordpress.com/2010/01/04/points-inches-and-emus-measuring-units-in-office-open-xml/):

```ts
const image = new ImageRun({
    type: 'png',
    data: buffer,
    transformation: {
        width: 903,
        height: 1149,
    },
    floating: {
        horizontalPosition: {
            offset: 1014400, // relative: HorizontalPositionRelativeFrom.PAGE by default
        },
        verticalPosition: {
            offset: 1014400, // relative: VerticalPositionRelativeFrom.PAGE by default
        },
    },
});
```

```ts
const image = new ImageRun({
    type: 'png',
    data: buffer,
    transformation: {
        width: 903,
        height: 1149,
    },
    floating: {
        horizontalPosition: {
            relative: HorizontalPositionRelativeFrom.RIGHT_MARGIN,
            offset: 1014400,
        },
        verticalPosition: {
            relative: VerticalPositionRelativeFrom.BOTTOM_MARGIN,
            offset: 1014400,
        },
    },
});
```

### Options

Full options you can pass into `floating` are:

| Property           | Type                        | Notes    |
| ------------------ | --------------------------- | -------- |
| horizontalPosition | `HorizontalPositionOptions` | Required |
| verticalPosition   | `VerticalPositionOptions`   | Required |
| allowOverlap       | `boolean`                   | Optional |
| lockAnchor         | `boolean`                   | Optional |
| behindDocument     | `boolean`                   | Optional |
| layoutInCell       | `boolean`                   | Optional |
| zIndex             | `number`                    | Optional |

`HorizontalPositionOptions` are:

| Property | Type                             | Notes                                             | Possible Values                                                                                           |
| -------- | -------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| relative | `HorizontalPositionRelativeFrom` | Required                                          | `CHARACTER`, `COLUMN`, `INSIDE_MARGIN`, `LEFT_MARGIN`, `MARGIN`, `OUTSIDE_MARGIN`, `PAGE`, `RIGHT_MARGIN` |
| align    | `HorizontalPositionAlign`        | You can either have `align` or `offset`, not both | `CENTER`, `INSIDE`, `LEFT`, `OUTSIDE`, `RIGHT`                                                            |
| offset   | `number`                         | You can either have `align` or `offset`, not both | `0` to `Infinity`                                                                                         |

`VerticalPositionOptions` are:

| Property | Type                           | Notes                                             | Possible Values                                                                                         |
| -------- | ------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| relative | `VerticalPositionRelativeFrom` | Required                                          | `BOTTOM_MARGIN`, `INSIDE_MARGIN`, `LINE`, `MARGIN`, `OUTSIDE_MARGIN`, `PAGE`, `PARAGRAPH`, `TOP_MARGIN` |
| align    | `VerticalPositionAlign`        | You can either have `align` or `offset`, not both | `BOTTOM`, `CENTER`, `INSIDE`, `OUTSIDE`, `TOP`                                                          |
| offset   | `number`                       | You can either have `align` or `offset`, not both | `0` to `Infinity`                                                                                       |

## Wrap text

Wrapping only works for floating elements. Text will "wrap" around the floating `image`.

Add `wrap` options inside the `floating` options:

```ts
wrap: {
    type: [TextWrappingType],
    side: [TextWrappingSide],
},
```

For example:

```ts
const image = new ImageRun({
    type: 'gif',
    data: fs.readFileSync("./demo/images/pizza.gif"),
    transformation: {
        width: 200,
        height: 200,
    },
    floating: {
        horizontalPosition: {
            offset: 2014400,
        },
        verticalPosition: {
            offset: 2014400,
        },
        wrap: {
            type: TextWrappingType.SQUARE,
            side: TextWrappingSide.BOTH_SIDES,
        },
    },
});
```

Wrap options have the following properties are:

| Property | Type               | Notes    | Possible Values                             |
| -------- | ------------------ | -------- | ------------------------------------------- |
| type     | `TextWrappingType` | Optional | `NONE`, `SQUARE`, `TIGHT`, `TOP_AND_BOTTOM` |
| side     | `TextWrappingSide` | Optional | `BOTH_SIDES`, `LEFT`, `RIGHT`, `LARGEST`    |

## Margins

Margins give some space between the text and the image. Margins [only work for floating elements](http://officeopenxml.com/drwPicInline.php). Additionally, the image must also be in wrap mode (see above).

?> Be sure to also set `wrap` in your options!

To use, add the `margins` options inside the `floating` options:

```ts
margins: {
    top: number,
    bottom: number,
    left: number,
    right: number
},
```

For example:

```ts
const image = new ImageRun({
    type: 'gif',
    data: fs.readFileSync("./demo/images/pizza.gif"),
    transformation: {
        width: 200,
        height: 200,
    },
    floating: {
        horizontalPosition: {
            offset: 2014400,
        },
        verticalPosition: {
            offset: 2014400,
        },
        wrap: {
            type: TextWrappingType.SQUARE,
            side: TextWrappingSide.BOTH_SIDES,
        },
        margins: {
            top: 201440,
            bottom: 201440,
        },
    },
});
```

## Alternative Text

Specifies common non-visual DrawingML properties. A name, title and description for a picture can be specified.

```ts
const image = new ImageRun({
    type: 'gif',
    data: fs.readFileSync("./demo/images/pizza.gif"),
    altText: {
        title: "This is an ultimate title",
        description: "This is an ultimate image",
        name: "My Ultimate Image",
    },
});
```

### Options

| Property    | Type     | Notes    | Possible Values                      |
| ----------- | -------- | -------- | ------------------------------------ |
| name        | `string` | Required | `Specimen A`                         |
| title       | `string` | Required | `My awesome title of my image`       |
| description | `string` | Required | `My awesome description of my image` |

## Examples

### Add image to the document

Importing Images from file system path

[Example](https://raw.githubusercontent.com/dolanmiu/docx/master/demo/5-images.ts ":include")

_Source: https://github.com/dolanmiu/docx/blob/master/demo/5-images.ts_

### Add images to header and footer

Example showing how to add image to headers and footers

[Example](https://raw.githubusercontent.com/dolanmiu/docx/master/demo/9-images-in-header-and-footer.ts ":include")

_Source: https://github.com/dolanmiu/docx/blob/master/demo/9-images-in-header-and-footer.ts_

### Floating images

Example showing how to float images on top of text and optimally give a `margin`

[Example](https://raw.githubusercontent.com/dolanmiu/docx/master/demo/38-text-wrapping.ts ":include")

_Source: https://github.com/dolanmiu/docx/blob/master/demo/38-text-wrapping.ts_

### SVG images

Example showing how to add SVG images with fallbacks, including inline SVG content, file-based SVG, floating SVG, and transformations.

[Example](https://raw.githubusercontent.com/dolanmiu/docx/master/demo/97-svg-images.ts ":include")

_Source: https://github.com/dolanmiu/docx/blob/master/demo/97-svg-images.ts_
