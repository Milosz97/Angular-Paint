import { Component, OnInit, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvas', { read: ElementRef, static: true }) private HTMLcanvas: ElementRef;
  @Output() canvasElement: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  constructor() {

  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.sendRef(this.HTMLcanvas);
  }

  sendRef(HTMLcanvas: ElementRef) {
    this.canvasElement.emit(HTMLcanvas);
  }


}
