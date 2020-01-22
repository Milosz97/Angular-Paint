import { Injectable } from '@angular/core';
import { ITool } from '../ToolsInterface/itool';
import { ShapeBoundingBox } from '../model/shapeboundingbox';
import { Point } from '../model/point';


@Injectable({
  providedIn: 'root'
})
export class SquareService implements ITool {


  constructor() { }

  draw(ctx: CanvasRenderingContext2D, _mouseLocation?: Point, _mouseClicked?: Point, shapeBoundingBox?: ShapeBoundingBox) {
    ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
  }

}
