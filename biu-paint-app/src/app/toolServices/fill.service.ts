import { Injectable } from '@angular/core';
import { HelperMethodsService } from '../helperServices/helper-methods.service';
import { RgbaColor } from '../model/rgbacolor';
import { Point } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class FillService {

  private context: CanvasRenderingContext2D;
  private imageData: ImageData;
  private targetColor: RgbaColor;
  private fillColor: RgbaColor;
  private fillStack: Point[] = [];




  constructor(private helperMethodsService: HelperMethodsService) { }

  setupNRunFloodFill(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, mouseClicked: Point): ImageData {
    this.context = ctx;
    this.imageData = this.helperMethodsService.saveCanvasImage(ctx, canvas);
    let clickTargetColor = this.helperMethodsService.getPixelColor(mouseClicked, this.imageData);
    this.targetColor = new RgbaColor(clickTargetColor.red, clickTargetColor.green, clickTargetColor.blue, clickTargetColor.alpha);
    this.fillColor = this.helperMethodsService.hexToRgb(<string>ctx.strokeStyle);

    this.floodFill(mouseClicked, this.targetColor, this.fillColor);
    this.fillPixelsFromStack(this.targetColor);

    return this.imageData;
  }
  floodFill(point: Point, targetColor: RgbaColor, fillColor: RgbaColor) {

    if (this.colorsMatch(targetColor, fillColor)) {
      return;
    }
    let currentColor: RgbaColor = this.helperMethodsService.getPixelColor(point, this.imageData);


    if (this.colorsMatch(currentColor, targetColor)) {

      if (point.x < this.imageData.width && point.x >= 0 && point.y < this.imageData.height && point.y >= 0) {
        this.setPixelColor(point, fillColor);
        this.fillStack.push(new Point(point.x + 1, point.y));
        this.fillStack.push(new Point(point.x - 1, point.y));
        this.fillStack.push(new Point(point.x, point.y + 1));
        this.fillStack.push(new Point(point.x, point.y - 1));
      }
    }
  }

  fillPixelsFromStack(targetColor: RgbaColor) {
    if (this.fillStack.length) {
      let range = this.fillStack.length;
      for (let i = 0; i < range; i++) {

        this.floodFill(this.fillStack[i], targetColor, this.fillColor);

      }
      this.fillStack.splice(0, range);
      this.fillPixelsFromStack(targetColor);
    } else {
      this.helperMethodsService.drawSavedImage(this.context, this.imageData);
      this.fillStack = [];
    }
  }

  colorsMatch(color1: RgbaColor, color2: RgbaColor) {
    return color1.red == color2.red && color1.green == color2.green && color1.blue == color2.blue && color1.alpha == color2.alpha;
  }

  setPixelColor(point: Point, fillColor: RgbaColor) {
    let offset: number = (point.y * this.imageData.width + point.x) * 4;

    this.imageData.data[offset + 0] = fillColor.red;
    this.imageData.data[offset + 1] = fillColor.green;
    this.imageData.data[offset + 2] = fillColor.blue;
    this.imageData.data[offset + 3] = fillColor.alpha;
  }

}
