export class ImportFile {
    image: HTMLImageElement;
    widthToDraw: number;
    heightToDraw: number;

    constructor(image: HTMLImageElement, width: number, height: number) {
        this.image = image;
        this.widthToDraw = width;
        this.heightToDraw = height;
    }
}