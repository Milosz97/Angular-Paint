import { Component, OnInit, ElementRef } from '@angular/core';
import { ShapeBoundingBox } from '../model/shapeboundingbox';
import { fromEvent, Observable } from 'rxjs';
import { ToolbarEventsService } from '../toolbarEventsServices/toolbar-events.service';
import { HelperMethodsService } from '../helperServices/helper-methods.service';
import { PenService } from '../toolServices/pen.service';
import { CanvasSize } from '../model/canvas-size';
import { FillService } from '../toolServices/fill.service';
import { ColorPickerService } from '../toolServices/color-picker.service';
import { EraserService } from '../toolServices/eraser.service';
import { ClearAllService } from '../toolServices/clear-all.service';
import { TextService } from '../toolServices/text.service';
import { SelectionToolService } from '../toolServices/selection-tool.service';
import { ImportFile } from '../model/importfile';
import { ExportService } from '../toolServices/export.service';
import { Point } from '../model/point';

@Component({
  selector: 'app-canvas-controller',
  templateUrl: './canvas-controller.component.html',
  styleUrls: ['./canvas-controller.component.scss']
})
export class CanvasControllerComponent implements OnInit {

  private shapeBoundingBox: ShapeBoundingBox = new ShapeBoundingBox(0, 0, 0, 0);
  private mouseClicked: Point = new Point(0, 0);
  private mouseLocation: Point = new Point(0, 0);
  private savedImageData: ImageData;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private mouseDown: Observable<Event>;
  private mouseMove: Observable<Event>;
  private mouseUp: Observable<Event>;

  private currentTool: string;
  private dragging: boolean;

  

  private colorInput: ElementRef;
  private toolColor: string = '#000000';

  private textToDraw: string;

  constructor(private toolbarEventsService: ToolbarEventsService, private helperMethodsService: HelperMethodsService, private penService: PenService, private fillService: FillService, private colorPickerService: ColorPickerService, private eraserService: EraserService, private clearAllService: ClearAllService, private textService: TextService, private selectionToolService: SelectionToolService, private exportService: ExportService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.exportService.setCanvas(this.canvas);
    this.toolbarEventsService.mergeListiners();
    this.selectionToolService.registerListeners(this.ctx);

    this.toolbarEventsService.textToDraw.subscribe((data) => this.textToDraw = data);

    this.toolbarEventsService.toolClicked.subscribe((data: string) => {
      this.currentTool = data;
      this.helperMethodsService.changeStyleClass(data);
      this.selectionToolService.cancelOperation();
    });

    this.toolbarEventsService.canvasSize.subscribe((data: CanvasSize) => {
      this.helperMethodsService.scaleCanvasToSize(this.ctx, this.canvas, data);
    });

    this.toolbarEventsService.toolSize.subscribe((data: number) => {
      this.helperMethodsService.setToolSize(this.ctx, data);
    });

    this.toolbarEventsService.toolColorInput.subscribe((data: ElementRef) => {
      if (data) {
        this.colorInput = data;
        this.toolColor = data.nativeElement.value;
      }
      this.helperMethodsService.setToolColor(this.ctx, this.toolColor);
    });

    this.toolbarEventsService.importFile.subscribe((data: ImportFile) => {
      if (data) {
        let imageBoundingBox = new ShapeBoundingBox(0, 0, data.heightToDraw, data.widthToDraw);
        this.selectionToolService.actOnSelection('import', false, imageBoundingBox, data);
      }
    });




    this.mouseDown.subscribe((data) => {
      this.dragging = true;
      this.mouseLocation = this.helperMethodsService.getMousePosition(this.canvas, this.mouseLocation, (<MouseEvent>data).clientX, (<MouseEvent>data).clientY);
      this.mouseClicked.x = this.mouseLocation.x;
      this.mouseClicked.y = this.mouseLocation.y;
      this.savedImageData = this.helperMethodsService.saveCanvasImage(this.ctx, this.canvas);
      if (this.currentTool == 'Pen') {
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouseClicked.x, this.mouseClicked.y);
        this.penService.draw(this.ctx, this.mouseLocation);
      } else if (this.currentTool == 'Fill') {
        this.savedImageData = this.fillService.setupNRunFloodFill(this.ctx, this.canvas, this.mouseClicked);
      } else if (this.currentTool == 'Color Picker') {
        this.colorPickerService.selectColor(this.ctx, this.savedImageData, this.mouseClicked, this.colorInput);
      } else if (this.currentTool == 'Eraser') {
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouseClicked.x, this.mouseClicked.y);
        this.eraserService.draw(this.ctx, this.mouseLocation);
      } else if (this.currentTool == 'Clear All') {
        this.savedImageData = this.clearAllService.clearAll(this.ctx, this.canvas);
      } else if (this.currentTool == 'Text') {
        this.savedImageData = this.textService.draw(this.ctx, this.canvas, this.mouseClicked, this.textToDraw);
      }
    });

    this.mouseMove.subscribe((data) => {
      this.mouseLocation = this.helperMethodsService.getMousePosition(this.canvas, this.mouseLocation, (<MouseEvent>data).clientX, (<MouseEvent>data).clientY);
      if (this.dragging && this.currentTool == 'Pen') {
        this.helperMethodsService.drawSavedImage(this.ctx, this.savedImageData);
        this.penService.draw(this.ctx, this.mouseLocation);
      } else if (this.dragging && this.currentTool == 'Eraser') {
        this.helperMethodsService.drawSavedImage(this.ctx, this.savedImageData);
        this.eraserService.draw(this.ctx, this.mouseLocation);
      } else {
        if (this.dragging) {
          this.helperMethodsService.drawSavedImage(this.ctx, this.savedImageData);
          this.helperMethodsService.updateShapeBox(this.mouseLocation, this.mouseClicked, this.shapeBoundingBox, this.ctx, this.currentTool);
        }
      }
    });

    this.mouseUp.subscribe((data) => {
      this.mouseLocation = this.helperMethodsService.getMousePosition(this.canvas, this.mouseLocation, (<MouseEvent>data).clientX, (<MouseEvent>data).clientY);
      this.helperMethodsService.drawSavedImage(this.ctx, this.savedImageData);
      this.helperMethodsService.updateShapeBox(this.mouseLocation, this.mouseClicked, this.shapeBoundingBox, this.ctx, this.currentTool);
      this.dragging = false;
      this.ctx.lineCap = "butt";
      this.ctx.lineJoin = "miter";
    });

  }

  ngOnDestroy() {
    this.selectionToolService.cancelOperation();
  }



  onCanvasElement(canvas: ElementRef) {
    this.canvas = canvas.nativeElement;
    this.setupCanvas();
  }
  setupCanvas() {
    this.ctx = this.canvas.getContext('2d');

    this.mouseDown = fromEvent(this.canvas, 'mousedown');
    this.mouseMove = fromEvent(this.canvas, 'mousemove');
    this.mouseUp = fromEvent(this.canvas, 'mouseup');
  }






}
