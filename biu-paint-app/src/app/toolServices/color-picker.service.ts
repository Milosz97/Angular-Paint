import { Injectable, ElementRef } from '@angular/core';
import { HelperMethodsService } from '../helperServices/helper-methods.service';
import { RgbaColor } from '../model/rgbacolor';
import { Point } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {


  constructor(private helperMethodsService: HelperMethodsService) { }

  selectColor(ctx: CanvasRenderingContext2D, imageData: ImageData, mouseClicked: Point, colorInput: ElementRef) {
    let newColor = this.helperMethodsService.getPixelColor(mouseClicked, imageData);
    let newToolColor = this.rgbaToHex(newColor);
    colorInput.nativeElement.value = newToolColor;
    this.helperMethodsService.setToolColor(ctx, newToolColor);
  }

  rgbaToHex(color: RgbaColor): string {
    let red = parseInt(color.red.toString(), 10).toString(16).toUpperCase();
    let green = parseInt(color.green.toString(), 10).toString(16).toUpperCase();
    let blue = parseInt(color.blue.toString(), 10).toString(16).toUpperCase();
    let newColor: string;

    if (red.length <= 1) {
      red = '0' + red;
    }
    if (green.length <= 1) {
      green = '0' + green;
    }
    if (blue.length <= 1) {
      blue = '0' + blue;
    }

    if (red == '00' && green == '00' && blue == '00') {
      if (color.alpha == 255) {
        newColor = '#000000'
      } else {
        newColor = '#FFFFFF'
      }
    } else {
      newColor = '#' + red + green + blue;
    }
    return newColor;
  }
}
