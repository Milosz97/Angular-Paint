import { Injectable } from '@angular/core';
import { ShapeBoundingBox } from '../model/shapeboundingbox';
import { fromEvent, Observable } from 'rxjs';
import { ImportFile } from '../model/importfile';
import { ToolbarEventsService } from '../toolbarEventsServices/toolbar-events.service';

@Injectable({
  providedIn: 'root'
})
export class SelectionToolService {

  private ctx: CanvasRenderingContext2D;
  private toolActive: boolean;
  private confirmed: boolean = false;
  private originalCanvas: ImageData;
  private selectedArea: ImageData;
  private selectedAreaData: ShapeBoundingBox;
  private shapeBoundingBox: ShapeBoundingBox;
  private storedCopyOfSelectedArea: ImageData;
  private toolColor: string;
  private toolSize: number;
  private arrowKeyPressed: Observable<Event> = null;
  private actionKeyPressed: Observable<Event> = null;


  private copyImage: boolean = false;

  constructor(private toolbarEventsService: ToolbarEventsService) {
    this.originalCanvas = null;

  }

  registerListeners(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.toolbarEventsService.setImportFile(null);

    this.arrowKeyPressed = fromEvent(window, 'keydown');
    this.actionKeyPressed = fromEvent(window, 'keydown');

    this.arrowKeyPressed.subscribe((data) => {
      this.moveSelection(data, (<KeyboardEvent>data).key, this.shapeBoundingBox);
    });

    this.actionKeyPressed.subscribe((data) => {

      this.actOnSelection((<KeyboardEvent>data).key, (<KeyboardEvent>data).ctrlKey, this.shapeBoundingBox, undefined, data);
    });
  }



  selectArea(shapeBoundingBox: ShapeBoundingBox) {
    this.toolColor = <string>this.ctx.strokeStyle;
    this.toolSize = this.ctx.lineWidth;

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);

    this.ctx.strokeStyle = '#000000';
    this.ctx.setLineDash([4, 2]);
    this.ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);

    this.ctx.strokeStyle = this.toolColor;
    this.ctx.lineWidth = this.toolSize;
    this.ctx.setLineDash([0, 0]);

  }




  setupNRunSelectionTool(shapeBoundingBox: ShapeBoundingBox) {
    if (this.originalCanvas == null) {
      this.originalCanvas = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    } else
      if (this.toolActive) {
        this.ctx.putImageData(this.originalCanvas, 0, 0);
      }

    if (shapeBoundingBox.width > 0 && shapeBoundingBox.height > 0) {
      this.shapeBoundingBox = shapeBoundingBox;


      this.toolActive = true;
      this.confirmed = false;
      this.selectedArea = this.ctx.getImageData(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
      this.selectedAreaData = new ShapeBoundingBox(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.height, shapeBoundingBox.width);



      this.selectArea(shapeBoundingBox);



    }

  }

  moveSelection($event: Event, arrowKey: string, shapeBoundingBox: ShapeBoundingBox) {
    if (this.toolActive == true) {
      switch (arrowKey) {
        case 'ArrowLeft': this.moveDirection(shapeBoundingBox, 'left', 1); break;
        case 'ArrowRight': this.moveDirection(shapeBoundingBox, 'right', 1); break;
        case 'ArrowUp': this.moveDirection(shapeBoundingBox, 'up', 1); break;
        case 'ArrowDown': this.moveDirection(shapeBoundingBox, 'down', 1); break;
        default: return;
      }
      $event.preventDefault();
      $event.stopImmediatePropagation();
    }

  }

  actOnSelection(key: string, ctrlKey: boolean, shapeBoundingBox: ShapeBoundingBox, importImage?: ImportFile, $event?: Event) {
    if (importImage) {

    }
    if (key == 'c' && ctrlKey) {
      this.copySelectedArea();
    } else if (key == 'v' && ctrlKey) {

      if (this.storedCopyOfSelectedArea) {
        this.pasteStoredCopy(shapeBoundingBox);
      }
    } else if (key == 'Escape') {
      this.cancelOperation();
    } else if (key == 'Enter') {
      this.confirmOperation(shapeBoundingBox);
    } else if (key == 'import') {
      this.drawImportFile(importImage, shapeBoundingBox);

    }

    if ($event) {
      $event.stopPropagation();
      $event.stopImmediatePropagation();
    }
  }


  moveDirection(shapeBoundingBox: ShapeBoundingBox, direction: string, value: number) {
    if (this.originalCanvas == null) {
      return;
    }
    this.ctx.putImageData(this.originalCanvas, 0, 0);
    if (this.copyImage == false) {
      this.ctx.clearRect(this.selectedAreaData.left, this.selectedAreaData.top, this.selectedAreaData.width, this.selectedAreaData.height);
    }
    switch (direction) {
      case 'left': shapeBoundingBox.left -= value; break;
      case 'right': shapeBoundingBox.left += value; break;
      case 'up': shapeBoundingBox.top -= value; break;
      case 'down': shapeBoundingBox.top += value; break;
      default: return;
    }

    this.ctx.putImageData(this.selectedArea, shapeBoundingBox.left, shapeBoundingBox.top);
    this.selectArea(shapeBoundingBox);

  }

  copySelectedArea() {
    this.storedCopyOfSelectedArea = this.selectedArea;
  }

  pasteStoredCopy(shapeBoundingBox: ShapeBoundingBox) {
    this.toolbarEventsService.setForcedTool('Selection');
    this.cancelOperation();

    this.copyImage = true;
    this.originalCanvas = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    shapeBoundingBox.left = 0;
    shapeBoundingBox.top = 0;
    shapeBoundingBox.width = this.storedCopyOfSelectedArea.width;
    shapeBoundingBox.height = this.storedCopyOfSelectedArea.height;

    this.ctx.putImageData(this.storedCopyOfSelectedArea, 0, 0);
    this.setupNRunSelectionTool(shapeBoundingBox);
  }

  cancelOperation() {
    if (this.originalCanvas == null) {
      return;
    }
    if (this.confirmed == false) {
      this.toolActive = false;

      this.ctx.putImageData(this.originalCanvas, 0, 0);
      this.originalCanvas = null;
      this.copyImage = false;
    }

  }

  confirmOperation(shapeBoundingBox: ShapeBoundingBox) {
    if (this.originalCanvas == null) {
      return;
    }
    this.toolActive = false;
    this.confirmed = true;

    this.ctx.putImageData(this.originalCanvas, 0, 0);
    if (this.copyImage == false) {
      this.ctx.clearRect(this.selectedAreaData.left, this.selectedAreaData.top, this.selectedAreaData.width, this.selectedAreaData.height);
    }
    this.ctx.putImageData(this.selectedArea, shapeBoundingBox.left, shapeBoundingBox.top);

    this.originalCanvas = null;
    this.copyImage = false;
  }

  drawImportFile(importImage: ImportFile, shapeBoundingBox: ShapeBoundingBox) {
    this.toolbarEventsService.setForcedTool('Selection');
    this.cancelOperation();

    this.copyImage = true;
    this.originalCanvas = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.clearRect(0, 0, importImage.widthToDraw, importImage.heightToDraw);
    this.ctx.drawImage(importImage.image, 0, 0, importImage.widthToDraw, importImage.heightToDraw);
    this.setupNRunSelectionTool(shapeBoundingBox);
  }



}
