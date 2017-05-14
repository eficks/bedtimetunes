import { Component } from "@angular/core";
import { VgAPI } from 'videogular2/core';
import { TunesComponent } from './../tunes/tunes.component';
import { SOURCES } from './../tunes/tunes';
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

    sources: Array<IMedia> = SOURCES;
    master: string = 'Master';

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

        this.currentItem = this.sources[this.currentIndex];
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(item: IMedia, index: number) {
        this.currentIndex = index;
        this.currentItem = item;
        this.api.play();

    }
}
