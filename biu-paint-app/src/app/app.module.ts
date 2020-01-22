import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasControllerComponent } from './canvas-controller/canvas-controller.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TextToolModalComponent } from './text-tool-modal/text-tool-modal.component';
import { ImportFileModalComponent } from './import-file-modal/import-file-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { LoginComponent } from './auth/login/login.component';
import { DownloadImageComponent } from './download-image/download-image.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PaintWorkspaceComponent } from './paint-workspace/paint-workspace.component';
import { ToolbarEventsService } from './toolbarEventsServices/toolbar-events.service';
import { HelperMethodsService } from './helperServices/helper-methods.service';
import { CircleService } from './toolServices/circle.service';
import { ClearAllService } from './toolServices/clear-all.service';
import { ColorPickerService } from './toolServices/color-picker.service';
import { EraserService } from './toolServices/eraser.service';
import { ExportService } from './toolServices/export.service';
import { FillService } from './toolServices/fill.service';
import { LineService } from './toolServices/line.service';
import { PenService } from './toolServices/pen.service';
import { SelectionToolService } from './toolServices/selection-tool.service';
import { SquareService } from './toolServices/square.service';
import { TextService } from './toolServices/text.service';
import { TriangleService } from './toolServices/triangle.service';
import { CanvasSizeModalComponent } from './canvas-size-modal/canvas-size-modal.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    CanvasControllerComponent,
    CanvasComponent,
    ToolbarComponent,
    TextToolModalComponent,
    ImportFileModalComponent,
    UserGuideComponent,
    LoginComponent,
    DownloadImageComponent,
    NotFoundPageComponent,
    HomePageComponent,
    PaintWorkspaceComponent,
    CanvasSizeModalComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ToolbarEventsService, HelperMethodsService, CircleService, ClearAllService, ColorPickerService, EraserService, ExportService, FillService, LineService, PenService, SelectionToolService, SquareService, TextService, TriangleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
