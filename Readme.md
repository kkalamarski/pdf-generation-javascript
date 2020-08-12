# PDF Generation Javascript

PDF is one of the most commonly chosen document formats to share information. One of its main advantages is portability (hence the name: PDF - Portable Document Format), which means that it will display in the same manner on all the devices, no matter what operating system is running and what program is used to open it. Due to its simplicity of usage, many clients request a feature that will enable users to download some kind of information in PDF format from their web app.

From the technical standpoint though, it’s a little bit more complicated. It can contain almost anything - from simple text to interactive elements like links, inputs and even videos. To make that possible, Adobe (the creator of the format) has used a PostScript language, which is a powerful yet quite intimidating tool. To give you some example, here is a simple Hello World written in PostScript (source: Wikipedia):

```postscript
%!PS
 /Courier             % name the desired font
 20 selectfont        % choose the size in points and establish
                      % the font as the current one
 72 500 moveto        % position the current point at
                      % coordinates 72, 500 (the origin is at the
                      % lower-left corner of the page)
 (Hello world!) show  % stroke the text in parentheses
 showpage             % print all on the page

```

Most of us, web developers, probably don’t know PostScript well enough to be able to quickly generate a simple PDF file, not to mention some more advanced documents.

So, is it even possible to programmatically generate PDF file using web technologies? Spoiler alert - it is. And it’s probably much easier than you thought.

## PDF Generation using Client Side Javascript

As developers, we very often take advantage of already existing solutions. It this case it’s also applicable. We don’t need to reinvent the wheel. We will use two well-established javascript libraries - `html2canvas` and `jsPDF` to get the job done. Let’s start with something basic.

The idea is to “screenshot” the part of the page that we want to print and then insert it into the PDF file.

So, here is the code:

```typescript
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generateBtn = document.querySelector<HTMLButtonElement>("#generatePdf");
const pdfDocument = document.querySelector<HTMLDivElement>("#pdfDoc");

const onButtonClick = async () => {
  const canvas = await html2canvas(pdfDocument);
  const dataURL = canvas.toDataURL("image/png", 100);

  const pdf = new jsPDF();
  const ratio = canvas.height / canvas.width;
  const contentWidth = pdf.internal.pageSize.getWidth(); // make content full-width
  const contentHeight = contentWidth * ratio; // scale height proportionally to width

  pdf.addImage(dataURL, "png", 0, 0, contentWidth, contentHeight);

  pdf.save("generated-pdf.pdf");
};

generateBtn.addEventListener("click", onButtonClick);
```

Yes, that’s it. It’s that simple. Let’s go through the code step by step.

1. First, we need to import our libraries:

```typescript
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
```

They can be installed via npm like this:
`npm install html2canvas jspdf`

2. We are accessing the content of the web page

```typescript
const generateBtn = document.querySelector<HTMLButtonElement>("#generatePdf");
const pdfDocument = document.querySelector<HTMLDivElement>("#pdfDoc");
```

`generateBtn` is a reference to a button that will trigger the generation process
<<<<<<< HEAD

=======

> > > > > > > 24f4623672c156dbd39fc9c5f90bf0ad57bd0f2d
> > > > > > > `pdfDocument` is a reference to div containing the elements that we want to print as PDF

> Tip: you can use Ref objects in react and `this.$refs` in Vue  
>  instead of `document.querySelector`

3. We add a click event listener to the button

```typescript
const onButtonClick = async () => {
  // ...
};

generateBtn.addEventListener("click", onButtonClick);
```

4. Here starts the actual pdf generation:

```typescript
const canvas = await html2canvas(pdfDocument);
const dataURL = canvas.toDataURL("image/png", 100);
```

We are passing a reference to DOM element to `html2canvas` library. As the name suggests, it returns a `HTMLCanvasElement` with a “screenshot” of the passed element. Then we convert this canvas to PNG data url.

> Tip: you can check out more html2canvas options [here](https://html2canvas.hertzen.com/).

5. Then we create a new jsPDF instance and do some math to scale our screenshot so that it takes full width.

```typescript
const pdf = new jsPDF();

const ratio = canvas.height / canvas.width;
const contentWidth = pdf.internal.pageSize.getWidth(); // make content full-width
const contentHeight = contentWidth * ratio; // scale height proportionally to width
```

6. Now we can add the screenshot to PDF document, setting correct coordinates.

```typescript
pdf.addImage(dataURL, "png", 0, 0, contentWidth, contentHeight);
```

7. Finally, save PDF document giving it a name:

```typescript
pdf.save("generated-pdf.pdf");
```

This will start the download of our newly generated PDF document.

You can see the complete code here: [kkalamarski/pdf-generation-javascript · GitHub](https://github.com/kkalamarski/pdf-generation-javascript/tree/master/frontend)

## But… there is a “BUT”

If you tried to run that code you probably have noticed that even though there is some text displayed in the PDF document, you can’t select it. That’s because we actually took a screenshot of the page, and pasted it as an image to PDF document. While this is sufficient for some cases, usually we want the user to be able to interact with the content. Fortunately, we have a few options to accomplish that:

### Insert each element separately to jsPDF.

jsPDF is a robust library capable of inserting much more elements than just images. You could loop over all the DOM elements and insert them manually, specifying all needed parameters.

This, however, will mean that we have to position each element manually, and can’t reuse the CSS that we have written for the application. Again, this can be sufficient, depending on what are we trying to accomplish.

You can read more on jsPDF here: [GitHub - MrRio/jsPDF: Client-side JavaScript PDF generation for everyone.](https://github.com/MrRio/jsPDF)

### Generate PDF in node.js

Both `html2canvas` and `jsPDF` are client side libraries, so on the backend we need to take a different approach. In the next post, we’ll discuss how can we use a headless browser to render HTML on the server and convert it to PDF document. Stay tuned!
