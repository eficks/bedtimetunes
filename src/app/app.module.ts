import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TunesComponent } from './components/tunes/tunes.component';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { VideoBgComponent } from './components/videobg/videobg.component';
import { TunesService } from './components/tunes/tunes.service';

const routes: Routes = [
  { path: '', redirectTo: '/tunes', pathMatch: 'full' },
  { path: 'tunes',  component: TunesComponent },
  { path: 'contributors', component: ContributorsComponent, outlet: 'popup' },
  { path: 'pagenotfound', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'pagenotfound' }
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TunesComponent,
    PageNotFoundComponent,
    VideoBgComponent,
    ContributorsComponent
    ],
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
      TunesService
  ],
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
