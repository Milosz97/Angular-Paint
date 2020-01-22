import { Component, OnInit } from '@angular/core';
import { ExportService } from '../toolServices/export.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-download-image',
  templateUrl: './download-image.component.html',
  styleUrls: ['./download-image.component.scss']
})
export class DownloadImageComponent implements OnInit {

  private imageSRC: string;

  private downloadForm = this.fb.group({
    fileName: ['', Validators.required],
    extension: ['.png', Validators.required],
  });

  constructor(private exportService: ExportService, private fb: FormBuilder) { }

  ngOnInit() {
    this.imageSRC = this.exportService.convertCanvasToURL();
  }


  download(name: string) {
    this.exportService.downloadImage(name);
  }

  onSubmit() {
    let fileName = this.downloadForm.get('fileName').value;
    let ext = this.downloadForm.get('extension').value;
    let file = fileName + ext;

    this.download(file)
  }

}
