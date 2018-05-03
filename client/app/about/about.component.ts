import { Component, Directive, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TweenMax, TimelineMax, TimelineLite, TweenLite } from 'gsap';
import * as $ from 'jquery';
import * as AOS from 'aos';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {

  @ViewChild('animeObject') animeObject: ElementRef;
  @ViewChild('animeTitle') animeTitle: ElementRef;
  @ViewChild('animeSousTitle') animeSousTitle: ElementRef;
  @ViewChild('animeAxeL') animeAxeL: ElementRef;
  @ViewChild('animeAxeR') animeAxeR: ElementRef;

  constructor() { }

  ngOnInit() {
    this.layerAnimation();
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out-back',
    });
  }
  layerAnimation() {
    const anime: TimelineMax = new TimelineMax();

    anime.from(this.animeTitle.nativeElement, 1, { x: -2000 });
    anime.from(this.animeSousTitle.nativeElement, 1, { x: 2000 });
    anime.from(this.animeAxeL.nativeElement, 1, { x: -2000 }, 3)
      .from(this.animeAxeR.nativeElement, 1, { x: 2000 }, 3);
    return anime;
  }
}
