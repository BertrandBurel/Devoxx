import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { TweenMax, TimelineMax, TimelineLite } from 'gsap';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {


  @ViewChild('animeObject') animeObject: ElementRef;
  @ViewChild('animeTitle') animeTitle: ElementRef;
  @ViewChild('animeSousTitle') animeSousTitle: ElementRef;

  constructor() { }

  ngOnInit() {
    this.layerAnimation();

  }
  layerAnimation() {
    const anime: TimelineMax = new TimelineMax();

    anime.from(this.animeObject.nativeElement, 1, { x: -200 });
    anime.from(this.animeTitle.nativeElement, 1, { x: -2000 });
    anime.from(this.animeSousTitle.nativeElement, 1, { x: 2000 });

    return anime;
  }

}
