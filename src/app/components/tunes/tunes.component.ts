import { Component } from '@angular/core';
import { SOURCES } from './../tunes/tunes';
import { VgAPI } from 'videogular2/core';
export interface IMedia {
    id: number;
    title: string;
    src: string;
    type: string;
}
@Component({
  moduleId: module.id,
  selector: 'tunes',
  templateUrl: './tunes.component.html',
  styleUrls:  ['./tunes.component.css'],
})

export class TunesComponent {
  sources: Array<IMedia> = SOURCES;
  currentIndex = 0;
  previousIndex = 0;
  nowPlaying = 0 ;
  state = 'playing';
  previousItem: IMedia = this.sources[ this.currentIndex ];
  currentItem: IMedia = this.sources[ this.currentIndex ];
  api: VgAPI;
  constructor() {

  }

  onPlayerReady(api: VgAPI) {
      this.api = api;
      this.currentItem = this.sources[this.currentIndex];
      let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
      pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';

      this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
      this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));

  }

  nextVideo() {
      this.previousIndex = this.currentIndex;

      this.currentIndex++;

      if (this.currentIndex === this.sources.length) {
          this.currentIndex = 0;
      }

      this.currentItem = this.sources[this.currentIndex];
      this.previousItem = this.sources[this.previousIndex];

      let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
      pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
      let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previousItem.id);
      playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  }

  playVideo() {
      this.nowPlaying = this.currentIndex;
      this.api.play()

  }

  onClickPlaylistItem(item: IMedia, index: number, previousIndex: number) {
      this.currentIndex = index;
      this.currentItem = item;
      this.previousIndex = previousIndex;
      this.previousItem = this.sources[this.previousIndex];
      this.api.play();
      if (this.currentItem != this.previousItem) {
        let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
        pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        this.currentItem = this.sources[this.currentIndex];
        let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previousItem.id);
        playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      } else {
        if (this.state=='playing') {
              let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previousItem.id);
              playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
              this.api.pause();
              this.state = 'paused';

        } else {
              let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
              pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
              this.api.play();
              this.state = 'playing';
            
        }
      }
      console.log(this.state);
      console.log(this.previousItem.title);

      }
}
