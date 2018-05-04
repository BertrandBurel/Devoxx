import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  membre = 1;
  registerForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*'),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  membre1 = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern('[a-zA-Z0-9_-\\s]*'),
  ]);
  membre2 = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern('[a-zA-Z0-9_-\\s]*'),
  ]);
  membre3 = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern('[a-zA-Z0-9_-\\s]*'),
  ]);
  membre4 = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern('[a-zA-Z0-9_-\\s]*'),
  ]);
  role = new FormControl('', [
    Validators.required,
  ]);
  img = new FormControl('', [
    Validators.required,
  ]);
  note = {};
  stats = [];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      membre1: this.membre1,
      membre2: this.membre2,
      membre3: this.membre3,
      membre4: this.membre4,
      img: this.img,
      role: this.role,
      note: this.note = { elimine: -1, round1: { index: 1, uxdesign: -1, fonctionnalites: -1, pitch: -1 },
        round2: { index: 2, uxdesign: -1, fonctionnalites: -1, pitch: -1 },
        round3: { index: 3, uxdesign: -1, fonctionnalites: -1, pitch: -1 } },
      stats: this.stats,

    });
  }

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }
  premiermembre() {
    return { 'has-danger': !this.membre1.pristine && !this.membre1.valid };
  }
  deuxiememembre() {
    return { 'has-danger': !this.membre2.pristine && !this.membre2.valid };
  }
  troisiememembre() {
    return { 'has-danger': !this.membre3.pristine && !this.membre3.valid };
  }
  quatriememembre() {
    return { 'has-danger': !this.membre4.pristine && !this.membre4.valid };
  }
  imagemembre() {
    return { 'has-danger': !this.img.pristine && !this.img.valid };
  }


  register() {
    this.userService.register(this.registerForm.value).subscribe(
      (res) => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('email already exists', 'danger'),
    );
  }
  addmember() {
    if (this.membre < 4) {
      this.membre = this.membre + 1;
    }
  }
  retirmember() {
    if (this.membre > 0) {
      this.membre = this.membre - 1;
    }
  }
}
