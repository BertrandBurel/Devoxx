import { Component, Directive, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TweenMax, TimelineMax, TimelineLite, TweenLite } from 'gsap';
import * as $ from 'jquery';
import * as AOS from 'aos';
import { CatService } from '../services/cat.service';
import { Cat } from '../shared/models/cat.model';
import { interval } from 'rxjs/observable/interval';

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

  constructor(private catService: CatService) { }

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  sec;
  h;
  mn;
  j;

  ngOnInit() {
    this.getCats();
    this.layerAnimation();
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out-back',
    });
  }

  getCats() {
    this.catService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        this.rebour();
      },
    );
  }

  rebour() {
    // tslint:disable-next-line:variable-name
    const date1: any = new Date();
    const date2: any = new Date(this.cats[0].date);
    this.sec = (date2 - date1) / 1000;
    const n = 24 * 3600;
    if (this.sec > 0) {
      this.j = Math.floor(this.sec / n);
      this.h = Math.floor((this.sec - (this.j * n)) / 3600);
      this.mn = Math.floor((this.sec - ((this.j * n + this.h * 3600))) / 60);
      this.sec = Math.floor(this.sec - ((this.j * n + this.h * 3600 + this.mn * 60)));

    }
    const source = interval(1000);
    const subscribe = source.subscribe(val => this.rebour());
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
