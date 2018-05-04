import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user.model';
import { ParticipeService } from '../services/participe.service';
import { Participe } from '../shared/models/participe.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { CatService } from '../services/cat.service';
import { Cat } from '../shared/models/cat.model';



@Component({
  selector: 'app-concours',
  templateUrl: './concours.component.html',
  styleUrls: ['./concours.component.css'],
})
export class ConcoursComponent implements OnInit {

  user: User;
  isLoading = true;
  particip: Participe[];
  partici: Participe;
  addParticipeFrom: FormGroup;
  cats: Cat[] = [];
  match;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private participeService: ParticipeService,
    public toast: ToastComponent,
    private catService: CatService) { }

  ngOnInit() {

    this.getParticipe();
    this.getUser();
    this.getCats();
    console.log('test', this.particip);

  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  getParticipe() {
    this.participeService.getParticipes().subscribe(
      data => this.particip = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
      },
    );
  }

  participer() {
    this.particip[0].players.push(this.user._id);
    console.log('ceci est un id', this.user._id);
    console.log(this.particip[0].players);
    this.participeService.editParticipe(this.particip[0]).subscribe(
      () => {
      },
    );
  }

  getCats() {
    this.catService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
      },
    );
  }

}
