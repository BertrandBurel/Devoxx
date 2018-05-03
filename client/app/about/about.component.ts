import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { TweenMax, TimelineMax, TimelineLite } from 'gsap';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {


  @ViewChild('animeObject') animeObject: ElementRef;

  constructor() { }

  ngOnInit() {
    this.layerAnimation();

  }
  layerAnimation() {
    const anime: TimelineMax = new TimelineMax();

    anime.from(this.animeObject.nativeElement, 1, { x: -200 });

    return anime;
  }

}
