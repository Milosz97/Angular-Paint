import { Injectable } from '@angular/core';
import { ITool } from '../ToolsInterface/itool';
import { ShapeBoundingBox } from '../model/shapeboundingbox';
import { Point } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class CircleService implements ITool {

  constructor() { }

  draw(ctx: CanvasRenderingContext2D, _mouseLocation: Point = undefined, mouseClicked: Point, shapeBoundingBox: ShapeBoundingBox) {
    let radiusX = shapeBoundingBox.width / 2;
    let radiusY = shapeBoundingBox.height / 2;
    ctx.beginPath();
    ctx.ellipse(mouseClicked.x, mouseClicked.y, radiusX, radiusY, Math.PI / 4, 0, Math.PI * 2);
    ctx.stroke();
  }
}
