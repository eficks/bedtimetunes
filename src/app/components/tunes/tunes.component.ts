import { Component } from '@angular/core';
import { PlaybarComponent } from './../playbar/playbar.component';
import { VgAPI } from 'videogular2/core';
@Component({
  moduleId: module.id,
  selector: 'tunes',
  templateUrl: './tunes.component.html',
  styleUrls:  ['./tunes.component.css'],
})

export class TunesComponent {
  sources = this.sources;
}
