import { Injectable } from '@angular/core';
import { ITool } from '../ToolsInterface/itool';
import { ShapeBoundingBox } from '../model/shapeboundingbox';
import { Point } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class TriangleService implements ITool {


  constructor() { }

  draw(ctx: CanvasRenderingContext2D, mouseLocation: Point, mouseClicked: Point, shapeBoundingBox: ShapeBoundingBox) {
    ctx.beginPath();
    ctx.moveTo(mouseLocation.x + shapeBoundingBox.width / 2, mouseClicked.y);
    ctx.lineTo(mouseClicked.x, mouseLocation.y);
    ctx.lineTo(mouseLocation.x, mouseLocation.y);
    ctx.closePath();
    ctx.stroke();
  }

}
