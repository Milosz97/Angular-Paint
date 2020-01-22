import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarEventsService } from '../toolbarEventsServices/toolbar-events.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-text-tool-modal',
  templateUrl: './text-tool-modal.component.html',
  styleUrls: ['./text-tool-modal.component.scss']
})
export class TextToolModalComponent implements OnInit {

  private textToDraw: string = '';

  private textToDrawForm = this.fb.group({
    text: ['', [Validators.required]]
  })

  constructor(private modalService: NgbModal, private fb: FormBuilder, private toolbarEventsService: ToolbarEventsService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {


  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'text-tool-modal' }).result.then((result) => {
      this.textToDraw = this.textToDrawForm.get('text').value;
      this.toolbarEventsService.setForcedTool('Text');
      this.toolbarEventsService.setTextToDraw(this.textToDraw);
    }, (reason) => {
      return;
    });
  }

}
