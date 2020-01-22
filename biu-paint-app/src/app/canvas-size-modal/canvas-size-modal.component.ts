import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToolbarEventsService } from '../toolbarEventsServices/toolbar-events.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-canvas-size-modal',
  templateUrl: './canvas-size-modal.component.html',
  styleUrls: ['./canvas-size-modal.component.scss']
})
export class CanvasSizeModalComponent implements OnInit {

  private defaultCanvasWidth: number = Math.round(window.innerWidth * 0.95);
  private defaultCanvasHeight: number = Math.round(window.innerHeight * 0.85);

  private canvasSizeForm = this.fb.group({
    width: ['', [Validators.min(1), Validators.max(4000), Validators.required]],
    height: ['', [Validators.min(1), Validators.max(4000), Validators.required]],
  });

  constructor(private fb: FormBuilder, private toolbarEventsService: ToolbarEventsService, private modalService: NgbModal) { }



  ngOnInit() {
    this.toolbarEventsService.setCanvasSize(this.defaultCanvasWidth, this.defaultCanvasHeight);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'canvas-size-modal' }).result.then((result) => {
      let width: number = this.canvasSizeForm.get('width').value;
      let height: number = this.canvasSizeForm.get('height').value;
      this.toolbarEventsService.setCanvasSize(width, height);

    }, (reason) => {
      return;
    });
  }

}
