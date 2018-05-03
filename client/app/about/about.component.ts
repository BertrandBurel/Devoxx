import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { TweenMax, TimelineMax, TimelineLite } from 'gsap';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {


  // @ViewChild('animeObject') animationObject: ElementRef;

  constructor() {
    // this.layerAnimation();
  }

  // layerAnimation() {
  //   const anime: TimelineMax = new TimelineMax();

  //   anime.from(this.animationObject.nativeElement, 1, { x: -200 });

  //   return anime;
  // }

}
