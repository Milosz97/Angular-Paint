import { Injectable } from '@angular/core';
import { ShapeBoundingBox } from '../model/shapeboundingbox';
import { PenService } from '../toolServices/pen.service';
import { LineService } from '../toolServices/line.service';
import { SquareService } from '../toolServices/square.service';
import { CircleService } from '../toolServices/circle.service';
import { TriangleService } from '../toolServices/triangle.service';
import { CanvasSize } from '../model/canvas-size';
import { RgbaColor } from '../model/rgbacolor';
import { EraserService } from '../toolServices/eraser.service';
import { SelectionToolService } from '../toolServices/selection-tool.service';
import { Point } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class HelperMethodsService {

  private rgbaColor: RgbaColor = new RgbaColor(255, 255, 255, 255);
  private rgbaFillColor: RgbaColor = new RgbaColor(0, 0, 0, 255);

  constructor(private penService: PenService, private lineService: LineService, private squareService: SquareService, private circleService: CircleService, private triangleService: TriangleService, private eraserService: EraserService, private selectionToolService: SelectionToolService) { }

  getMousePosition(canvas: HTMLCanvasElement, mouseLocation: Point, clientX: number, clientY: number): Point {
    let canvasSizeData: ClientRect = canvas.getBoundingClientRect();
    mouseLocation.x = Math.round((clientX - canvasSizeData.left) * (canvas.width / canvasSizeData.width));
    mouseLocation.y = Math.round((clientY - canvasSizeData.top) * (canvas.height / canvasSizeData.height));
    return mouseLocation;
  }

  saveCanvasImage(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): ImageData {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  drawSavedImage(ctx: CanvasRenderingContext2D, imageData: ImageData) {
    ctx.putImageData(imageData, 0, 0)
  }

  redrawCanvasToNewSize(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, canvasImageData: ImageData) {
    createImageBitmap(canvasImageData).then(function (img) {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    })
  }


  drawShapeBox(mouseLocation: Point, mouseClicked: Point, shapeBoudingBox: ShapeBoundingBox, currentTool: string, ctx: CanvasRenderingContext2D) {
    switch (currentTool) {
      case 'Pen': this.penService.draw(ctx, mouseLocation); break;
      case 'Line': this.lineService.draw(ctx, mouseLocation, mouseClicked); break;
      case 'Eraser': this.eraserService.draw(ctx, mouseLocation); break;
      case 'Square': this.squareService.draw(ctx, undefined, undefined, shapeBoudingBox); break;
      case 'Circle': this.circleService.draw(ctx, undefined, mouseClicked, shapeBoudingBox); break;
      case 'Triangle': this.triangleService.draw(ctx, mouseLocation, mouseClicked, shapeBoudingBox); break;
      case 'Selection': this.selectionToolService.setupNRunSelectionTool(shapeBoudingBox); break;
    }
  }

  updateShapeBox(mouseLocation: Point, mouseClicked: Point, shapeBoudingBox: ShapeBoundingBox, ctx: CanvasRenderingContext2D, currentTool: string) {
    this.updateShapeBoxSize(mouseLocation, mouseClicked, shapeBoudingBox);
    this.drawShapeBox(mouseLocation, mouseClicked, shapeBoudingBox, currentTool, ctx);
  }

  updateShapeBoxSize(mouseLocation: Point, mouseClicked: Point, shapeBoudingBox: ShapeBoundingBox) {
    shapeBoudingBox.width = Math.abs(mouseLocation.x - mouseClicked.x);
    shapeBoudingBox.height = Math.abs(mouseLocation.y - mouseClicked.y);

    if (mouseLocation.x > mouseClicked.x) {
      shapeBoudingBox.left = mouseClicked.x;
    } else {
      shapeBoudingBox.left = mouseLocation.x;
    }

    if (mouseLocation.y > mouseClicked.y) {
      shapeBoudingBox.top = mouseClicked.y;
    } else {
      shapeBoudingBox.top = mouseLocation.y;
    }
  }

  changeStyleClass(id: string) {
    let buttons: HTMLCollection = document.getElementsByClassName('tool');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('selected');
    }
    if (id) {
      let selected = document.getElementById(id);
      selected.classList.add('selected');
    }
  }

  scaleCanvasToSize(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, data: CanvasSize) {
    let canvasImage: ImageData = this.saveCanvasImage(ctx, canvas);
    let toolSize: number = ctx.lineWidth;
    let toolColor: string = <string>ctx.strokeStyle;
    canvas.width = data.width;
    canvas.height = data.height;
    this.redrawCanvasToNewSize(ctx, canvas, canvasImage);
    this.setToolSize(ctx, toolSize);
    this.setToolColor(ctx, toolColor);
  }

  setToolSize(ctx: CanvasRenderingContext2D, toolSize: number) {
    ctx.lineWidth = toolSize;
    ctx.font = toolSize + 'px Arial';
  }

  setToolColor(ctx: CanvasRenderingContext2D, toolColor: string) {
    ctx.fillStyle = toolColor;
    ctx.strokeStyle = toolColor;
  }

  getPixelColor(point: Point, imageData: ImageData): RgbaColor {
    if (point.x < 0 || point.y < 0 || point.x >= imageData.width || point.y >= imageData.height) {
      this.rgbaColor.red = -1;
      this.rgbaColor.green = -1;
      this.rgbaColor.blue = -1;
      this.rgbaColor.alpha = -1;
      return this.rgbaColor;
    } else {
      let offset: number = (point.y * imageData.width + point.x) * 4;
      this.rgbaColor.red = imageData.data[offset + 0];
      this.rgbaColor.green = imageData.data[offset + 1];
      this.rgbaColor.blue = imageData.data[offset + 2];
      this.rgbaColor.alpha = imageData.data[offset + 3];
      return this.rgbaColor;
    }

  }

  hexToRgb(color: string): RgbaColor {
    let fillColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

    this.rgbaFillColor.red = parseInt(fillColor[1], 16);
    this.rgbaFillColor.green = parseInt(fillColor[2], 16);
    this.rgbaFillColor.blue = parseInt(fillColor[3], 16);

    return this.rgbaFillColor;
  }


}
