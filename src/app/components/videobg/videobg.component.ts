import { Component } from '@angular/core';
import {VgAPI} from 'videogular2/core';

export interface IMedia {
    title: string;
    src: string;
    type: string;
}
@Component({
  moduleId: module.id,
  selector: 'videobg',
  templateUrl: './videobg.component.html',
  styleUrls:  ['./videobg.component.css']
})
export class VideoBgComponent {
  playlist: Array<IMedia> = [
      {
          title: 'Background 1',
          src: './assets/backgrounds/c5.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 2',
          src: './assets/backgrounds/c2.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 3',
          src: './assets/backgrounds/c3.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 4',
          src: './assets/backgrounds/c4.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 4',
          src: './assets/backgrounds/c5.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 5',
          src: './assets/backgrounds/background.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 5',
          src: './assets/backgrounds/background2.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 5',
          src: './assets/backgrounds/background3.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 5',
          src: './assets/backgrounds/background4.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 5',
          src: './assets/backgrounds/giphy9.mp4',
          type: 'video/mp4'
      },
      {
          title: 'Background 5',
          src: './assets/backgrounds/c1.mp4',
          type: 'video/mp4'
      },
  ];
  preload:string = 'auto';
  currentIndex = 0;
  currentItem: IMedia = this.playlist[ this.currentIndex ];
  api:VgAPI;
  constructor() {}

  onPlayerReady(api:VgAPI) {
      this.api = api;

      this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
      this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
}
  nextVideo() {
   this.currentIndex++;

   if (this.currentIndex === this.playlist.length) {
       this.currentIndex = 0;
   }

   this.currentItem = this.playlist[ this.currentIndex ];
   }

   playVideo() {
       this.api.play();
   }

   onClickPlaylistItem(item: IMedia, index: number) {
       this.currentIndex = index;
       this.currentItem = item;
   }
}
