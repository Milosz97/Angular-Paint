import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private canvas: HTMLCanvasElement;

  constructor() { }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  convertCanvasToURL(): string {
    return this.canvas.toDataURL();
  }

  downloadImage(name: string) {
    let anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.href = this.canvas.toDataURL();
    anchor.download = name;
    anchor.click();
    document.body.removeChild(anchor);

  }

}
