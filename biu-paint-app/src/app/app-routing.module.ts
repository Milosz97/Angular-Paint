import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PaintWorkspaceComponent } from './paint-workspace/paint-workspace.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { LoginComponent } from './auth/login/login.component';
import { DownloadImageComponent } from './download-image/download-image.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'homepage', component: HomePageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'paint', component: PaintWorkspaceComponent },
  { path: 'guide', component: UserGuideComponent },
  { path: 'login', component: LoginComponent },
  { path: 'download-image', component: DownloadImageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
