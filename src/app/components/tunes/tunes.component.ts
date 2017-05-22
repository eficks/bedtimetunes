import { Component, OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { TunesService } from './tunes.service';
import { SOURCES } from './tunes';
import { Object } from './tunes';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Component({
  moduleId: module.id,
  selector: 'tunes',
  templateUrl: './tunes.component.html',
  styleUrls:  ['./tunes.component.css'],
})

export class TunesComponent implements OnInit {
  heroes: Array<Object>;
  constructor(http: Http, private tunesService: TunesService) {
    this.tunesService.getTunes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }


  currentTime: number  = 0;
  duration: number = 0;
  percentPlayed: number  = 0;
  currentIndex = 0;
  previousIndex = 0;
  nowPlaying = 0;
  firstLoad = 0;
  state = 'paused';
  previousItem: Object;
  currentItem: Object;
  api: VgAPI;

  ngOnInit(){
  }

  onPlayerReady(api: VgAPI) {
      this.api = api;
      this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
      this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
      this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
        () => {

          this.currentTime = this.api.currentTime;
          this.duration = this.api.duration;
          this.percentPlayed = this.currentTime / this.duration * 100;
          let progressbar_style = <HTMLElement> document.querySelector("#progress_item_" + this.currentIndex);
          progressbar_style.innerHTML = '<div class="progressbar_time" style="height: 100%; position: relative; background: rgba(255,255,255,.25); width: ' + this.percentPlayed + '%;"></div>';
        }
      );
      this.api.getDefaultMedia().subscriptions.pause.subscribe(
        () => {
          console.log("paused: " + this.currentItem.artist + ' ' + this.currentItem.title);
          let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentIndex);
          pauseState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
          }
        );
      this.api.getDefaultMedia().subscriptions.playing.subscribe(
        () => {
        console.log("playing: " + this.currentItem.artist + ' ' + this.currentItem.title);
          let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentIndex);
          playState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
          }
        );
      };

  nextVideo() {
      this.previousIndex = this.currentIndex;
      this.currentIndex++;
      this.currentItem = this.heroes[this.currentIndex];

      if (this.currentIndex === this.heroes.length) {
          this.currentIndex = 0;
      }
      /*let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentIndex);
      pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
      let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previoustIndex);
      playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      let progressbar_style = <HTMLElement> document.querySelector("#progress_item_" + this.previoustIndex);
      progressbar_style.innerHTML = '<div class="progressbar_time" style="height: 100%; position: relative; background: rgba(255, 255, 255,0.25); width: 0%"></div>';
      */
      this.api.play()
  }

  playVideo() {
      this.nowPlaying = this.currentIndex;
        this.api.play()
      this.firstLoad++;
  }

  onClickPlaylistItem(item: Object, index: number, previousIndex: number) {
      this.currentIndex = index;
      this.currentItem = item;
      this.previousIndex = previousIndex;
      console.log("Current index: " + this.currentIndex);
      console.log("Previous index: " + this.previousIndex);

      if (this.currentIndex != this.previousIndex) {
        let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentIndex);
        pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previousIndex);
        playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      }

        if (this.state=='paused') {
          let pauseState = <HTMLElement> document.querySelector("#playlist_item_" + this.currentIndex);
          pauseState.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
          this.api.play();
          this.state = 'playing';


        } else if (this.state=='playing'){
          let playState = <HTMLElement> document.querySelector("#playlist_item_" + this.previousIndex);
          playState.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
          this.api.pause();
          this.state = 'paused';


        }

      let progressbar_style = <HTMLElement> document.querySelector("#progress_item_" + this.previousIndex);
      progressbar_style.innerHTML = '<div class="progressbar_time" style="height: 100%; position: relative; background: rgba(255, 255, 255,0.25); width: 0%"></div>';
      }
}
