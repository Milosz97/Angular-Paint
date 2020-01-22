import { Injectable } from '@angular/core';
import { ITool } from '../ToolsInterface/itool';
import { Point } from '../model/point';


@Injectable({
  providedIn: 'root'
})
export class LineService implements ITool {


  constructor() { }

  draw(ctx: CanvasRenderingContext2D, mouseLocation: Point, mouseClicked: Point) {
    ctx.beginPath();
    ctx.moveTo(mouseClicked.x, mouseClicked.y);
    ctx.lineTo(mouseLocation.x, mouseLocation.y);
    ctx.stroke();
  }

}
