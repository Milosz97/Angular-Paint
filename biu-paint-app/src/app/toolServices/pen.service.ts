import { Injectable } from '@angular/core';
import { ITool } from '../ToolsInterface/itool';
import { Point } from '../model/point';



@Injectable({
  providedIn: 'root'
})
export class PenService implements ITool {



  constructor() { }


  draw(ctx: CanvasRenderingContext2D, mouseLocation: Point) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(mouseLocation.x, mouseLocation.y);
    ctx.stroke();

  }
}
