import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarEventsService } from '../toolbarEventsServices/toolbar-events.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ImportFile } from '../model/importfile';

@Component({
  selector: 'app-import-file-modal',
  templateUrl: './import-file-modal.component.html',
  styleUrls: ['./import-file-modal.component.scss']
})
export class ImportFileModalComponent implements OnInit {


  private inputImage: HTMLImageElement;
  private fileName: string;

  private importForm = this.fb.group({
    width: ['', [Validators.min(1), Validators.max(4000), Validators.required]],
    height: ['', [Validators.min(1), Validators.max(4000), Validators.required]],
  });

  constructor(private fb: FormBuilder, private modalService: NgbModal, private toolbarEventsService: ToolbarEventsService) { }


  ngOnInit() {
  }

  inputFile($e) {
    let reader: FileReader = new FileReader();
    reader.onload = () => {
      let img: HTMLImageElement = new Image();
      img.onload = () => {
        this.inputImage = img;
        this.fileName = $e.target.files[0].name;
      }
      img.src = <string>reader.result;

    };
    if ($e.target.files[0]) {
      reader.readAsDataURL($e.target.files[0]);
    } else {
      this.inputImage = null;
      this.fileName = null;
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'import-tool-modal' }).result.then((result) => {
      let width = this.importForm.get('width').value;
      let height = this.importForm.get('height').value;
      let imageToDraw = new ImportFile(this.inputImage, width, height);
      this.toolbarEventsService.setImportFile(imageToDraw);

      this.inputImage = null;
      this.fileName = null;
    }, (reason) => {
      this.inputImage = null;
      this.fileName = null;
      return;
    });
  }



}
