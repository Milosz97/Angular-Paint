import { Injectable, ElementRef } from '@angular/core';
import { Observable, fromEvent, merge, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanvasSize } from '../model/canvas-size';
import { ImportFile } from '../model/importfile';

@Injectable({
  providedIn: 'root'
})
export class ToolbarEventsService {

  private penClicked: Observable<string>;
  private lineClicked: Observable<string>;
  private eraserClicked: Observable<string>;
  private fillClicked: Observable<string>;
  private colorPickerClicked: Observable<string>;
  private squareClicked: Observable<string>;
  private circleClicked: Observable<string>;
  private triangleClicked: Observable<string>;
  private clearAllClicked: Observable<string>;
  private selectionClicked: Observable<string>;

  private forcedToolSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Pen');
  private textToDrawSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private newCanvasSize: CanvasSize = new CanvasSize(100, 100);
  private changeCanvasSize: BehaviorSubject<CanvasSize> = new BehaviorSubject<CanvasSize>(this.newCanvasSize);
  private changeToolSize: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private toolColorInputSubject: BehaviorSubject<ElementRef> = new BehaviorSubject<ElementRef>(undefined);
  private importFileSubject: BehaviorSubject<ImportFile> = new BehaviorSubject<ImportFile>(null);

  public toolClicked: Observable<string>;

  constructor() { }

  get forcedTool(): Observable<string> {
    return this.forcedToolSubject.asObservable();
  }

  get textToDraw(): Observable<string> {
    return this.textToDrawSubject.asObservable();

  }

  get canvasSize(): Observable<CanvasSize> {
    return this.changeCanvasSize.asObservable();
  }

  get toolSize(): Observable<number> {
    return this.changeToolSize.asObservable();
  }

  get toolColorInput(): Observable<ElementRef> {
    return this.toolColorInputSubject.asObservable();
  }

  get importFile(): Observable<ImportFile> {
    return this.importFileSubject.asObservable();
  }

  setEventsFromQueryList(queryList) {
    this.penClicked = fromEvent(queryList._results[0].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.lineClicked = fromEvent(queryList._results[1].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.eraserClicked = fromEvent(queryList._results[2].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.fillClicked = fromEvent(queryList._results[3].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.colorPickerClicked = fromEvent(queryList._results[4].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.squareClicked = fromEvent(queryList._results[5].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.circleClicked = fromEvent(queryList._results[6].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.triangleClicked = fromEvent(queryList._results[7].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.clearAllClicked = fromEvent(queryList._results[8].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));
    this.selectionClicked = fromEvent(queryList._results[9].nativeElement, 'click').pipe(map((data: MouseEvent) => (<HTMLElement>data.target).id));


  }

  mergeListiners() {
    this.toolClicked = merge(this.penClicked, this.lineClicked, this.eraserClicked, this.fillClicked, this.colorPickerClicked, this.squareClicked, this.circleClicked, this.triangleClicked, this.clearAllClicked, this.selectionClicked, this.forcedTool);
  }

  setCanvasSize(width: number, height: number) {
    this.newCanvasSize.height = height;
    this.newCanvasSize.width = width;
    this.changeCanvasSize.next(this.newCanvasSize);
  }

  setToolSize(toolSize: number) {
    this.changeToolSize.next(toolSize);
  }

  setColorInputElement(input: ElementRef) {
    this.toolColorInputSubject.next(input);
  }

  setTextToDraw(text: string) {
    this.textToDrawSubject.next(text);
  }

  setImportFile(image: ImportFile) {
    this.importFileSubject.next(image);
  }

  setForcedTool(tool: string) {
    this.forcedToolSubject.next(tool);
  }



}
