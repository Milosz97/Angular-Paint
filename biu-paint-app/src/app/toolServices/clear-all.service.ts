import { Injectable } from '@angular/core';
import { HelperMethodsService } from '../helperServices/helper-methods.service';

@Injectable({
  providedIn: 'root'
})
export class ClearAllService {

  constructor(private helperMethodsService: HelperMethodsService) { }

  clearAll(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): ImageData {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    return this.helperMethodsService.saveCanvasImage(ctx, canvas);
  }
}
