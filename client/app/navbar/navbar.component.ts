import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewChecked {

  constructor(
    public auth: AuthService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  // This fixes: https://github.com/DavideViolante/Angular-Full-Stack/issues/105
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
