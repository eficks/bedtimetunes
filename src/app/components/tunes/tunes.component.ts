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
  currentTime: number  = 0;
  duration: number = 0;
  percentPlayed: number  = 0;
  currentIndex = 0;
  previousIndex = 0;
  nowPlaying = 0;
  firstLoad = 0;
  state = 'paused';
  previousItem: IMedia = this.sources[ this.currentIndex ];
  currentItem: IMedia = this.sources[ this.currentIndex ];
  api: VgAPI;
  constructor() {
  }

  onPlayerReady(api: VgAPI) {
      this.api = api;
      this.currentItem = this.sources[this.currentIndex];

      this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
      this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
      this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
        () => {

          this.currentTime = this.api.currentTime;
          this.duration = this.api.duration;
          this.percentPlayed = this.currentTime / this.duration * 100;
          let progressbar_style = <HTMLElement> document.querySelector("#progress_item_" + this.currentItem.id);
          progressbar_style.innerHTML = '<div class="progressbar_time" style="height: 100%; position: relative; background: rgba(255,255,255,.25); width: ' + this.percentPlayed + '%;"></div>';
        }
      );
      this.api.getDefaultMedia().subscriptions.pause.subscribe(
        () => {
          this.currentItem = this.sources[this.currentIndex];
          console.log("pause" + this.currentItem.id);
          let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
          pauseState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
          }
        );
      this.api.getDefaultMedia().subscriptions.playing.subscribe(
        () => {
          this.currentItem = this.sources[this.currentIndex];
          console.log("playing" + this.currentItem.id);
          let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
          playState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
          }
        );
      };

  nextVideo() {
      this.previousIndex = this.currentIndex;

      this.currentIndex++;

      if (this.currentIndex === this.sources.length) {
          this.currentIndex = 0;
      }

      this.currentItem = this.sources[this.currentIndex];
      this.previousItem = this.sources[this.previousIndex];

      /*let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
      pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
      let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previousItem.id);
      playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      let progressbar_style = <HTMLElement> document.querySelector("#progress_item_" + this.previousItem.id);
      progressbar_style.innerHTML = '<div class="progressbar_time" style="height: 100%; position: relative; background: rgba(255, 255, 255,0.25); width: 0%"></div>';
      */
  }

  playVideo() {
      this.nowPlaying = this.currentIndex;
      console.log("firstLoad" + this.firstLoad); 

      if (this.firstLoad == 0) {

      } else {
        this.api.play()
      }
      this.firstLoad++;

  }

  onClickPlaylistItem(item: IMedia, index: number, previousIndex: number) {
      this.currentIndex = index;
      this.currentItem = item;
      this.previousIndex = previousIndex;
      this.previousItem = this.sources[this.previousIndex];

      if (this.currentItem != this.previousItem) {
        let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
        pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        this.currentItem = this.sources[this.currentIndex];
        let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previousItem.id);
        playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      } else {
        if (this.state=='paused') {
          let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentItem.id);
          pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
          this.api.play();
          this.state = 'playing';


        } else if (this.state=='playing'){
          let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previousItem.id);
          playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
          this.api.pause();
          this.state = 'paused';


        }
      }
      let progressbar_style = <HTMLElement> document.querySelector("#progress_item_" + this.previousItem.id);
      progressbar_style.innerHTML = '<div class="progressbar_time" style="height: 100%; position: relative; background: rgba(255, 255, 255,0.25); width: 0%"></div>';
      }
}
