import { Component } from "@angular/core";
import {VgAPI} from 'videogular2/core';
export interface IMedia {
    id: number;
    title: string;
    src: string;
    type: string;
}
@Component({
    moduleId: module.id,
    selector: 'playbar',
    templateUrl: './playbar.component.html',
    styleUrls: [ './playbar.component.css' ]
})
export class PlaybarComponent  {

    sources: Array<IMedia> = [
    {
        id: 1,
        title: "song 1",
        src: "/assets/music/test.mp3",
        type: "audio/mp3"
    },
    {
        id: 2,
        title: "song 2",
        src: "http://static.videogular.com/assets/audios/videogular.mp3",
        type: "audio/mp3"
    },
    {
        id: 3,
        title: "song 3",
        src: "/assets/music/test.mp3",
        type: "audio/mp3"
    }
    ];

    currentIndex = 0;
    currentItem: IMedia = this.sources[ this.currentIndex ];
    api: VgAPI;
    constructor() {
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;

        this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
        this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }

    nextVideo() {
        this.currentIndex++;

        if (this.currentIndex === this.sources.length) {
            this.currentIndex = 0;
        }

        this.currentItem = this.sources[ this.currentIndex ];
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(item: IMedia, index: number) {
        this.currentIndex = index;
        this.currentItem = item;
    }
}
