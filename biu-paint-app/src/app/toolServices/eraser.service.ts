import { Injectable } from '@angular/core';
import { ITool } from '../ToolsInterface/itool';
import { Point } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class EraserService implements ITool {

  constructor() { }

  draw(ctx: CanvasRenderingContext2D, mouseLocation: Point) {
    let toolColor = ctx.strokeStyle;
    ctx.strokeStyle = "#FFFFFF";
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(mouseLocation.x, mouseLocation.y);
    ctx.stroke();

    ctx.strokeStyle = toolColor;
    ctx.globalCompositeOperation = 'source-over';

  }


}
