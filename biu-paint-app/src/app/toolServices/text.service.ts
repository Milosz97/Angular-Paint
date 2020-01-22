import { Injectable } from '@angular/core';
import { HelperMethodsService } from '../helperServices/helper-methods.service';
import { Point } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class TextService {



  constructor(private helperMethodsService: HelperMethodsService) { }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, mouseClicked: Point, textToDraw: string): ImageData {

    ctx.fillText(textToDraw, mouseClicked.x, mouseClicked.y);


    return this.helperMethodsService.saveCanvasImage(ctx, canvas);
  }
}
