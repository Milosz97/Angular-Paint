import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Tools } from '../model/tools.enum'
import { ToolbarEventsService } from '../toolbarEventsServices/toolbar-events.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @ViewChildren('toolsButtons') private toolsButtons: HTMLCollection;
  @ViewChild('toolSize', { static: false }) private toolSize: ElementRef;
  @ViewChild('toolColor', { static: false }) private toolColor: ElementRef;

  private tools: string[] = Object.values(Tools).filter((tool) => typeof (tool) === 'string'); //template
  private defaultToolSize: number = 1;

  constructor(private toolbarEventsService: ToolbarEventsService) { }

  ngOnInit() {

    this.toolbarEventsService.setToolSize(this.defaultToolSize);
  }

  ngAfterViewInit() {
    this.toolbarEventsService.setEventsFromQueryList(this.toolsButtons);
    this.changeToolColor();
  }



  changeToolSize() {
    let toolSize: number = this.toolSize.nativeElement.value;
    if (toolSize == null || toolSize < 1) {
      toolSize = 1;
    }

    this.toolbarEventsService.setToolSize(toolSize);
  }

  changeToolColor() {
    this.toolbarEventsService.setColorInputElement(this.toolColor);
  }




}
