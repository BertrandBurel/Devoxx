import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { Cat } from '../shared/models/cat.model';
import { CatService } from '../services/cat.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  isEditing = false;
  isCreate = false;
  isLoading = true;
  user;
  note;
  cat = new Cat();
  cats: Cat[] = [];
  addCatForm: FormGroup;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService,
              private catService: CatService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        data => this.toast.setMessage('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers(),
      );
    }
  }

  enableEditing(i, user) {
    const test = 'round' + (i + 1);
    this.isEditing = true;
    this.user = user;
    this.note = user.note[test];
  }

  cancelEditing() {
    this.isEditing = false;
  }
  editUser(user) {
    // window.location.reload();
    console.log(user);
    this.userService.editUser(user).subscribe(
      () => {
        console.log('ici');

        this.isEditing = false;
      },
    );
  }
  saveUser(user) {
    user.stats.push([]);
    const test = ([{
      moy1: ((user.note.round1.pitch + user.note.round1.uxdesign + user.note.round1.fonctionnalites) / 3),
      pitch1: user.note.round1.pitch,
      uxdesign1: user.note.round1.uxdesign, fonctionnalites1: user.note.round1.fonctionnalites,
    }]);
    user.stats[user.stats.length - 1].push(test);
    if (user.note.round2.pitch !== -1) {
      const test2 = ([{
        moy2: ((user.note.round2.pitch + user.note.round2.uxdesign + user.note.round2.fonctionnalites) / 3),
        pitch2: user.note.round2.pitch,
        uxdesign2: user.note.round2.uxdesign, fonctionnalites2: user.note.round2.fonctionnalites,
      }]);
      user.stats[user.stats.length - 1].push(test2);
    }
    if (user.note.round3.pitch !== -1) {
      const test3 = ([{
        moy3: ((user.note.round3.pitch + user.note.round3.uxdesign + user.note.round3.fonctionnalites) / 3),
        pitch3: user.note.round3.pitch,
        uxdesign3: user.note.round3.uxdesign, fonctionnalites3: user.note.round3.fonctionnalites,
      }]);
      user.stats.push(test3);
    }
    user.stats.push({ manch: user.note.elimine });
    user.note.round1.pitch = -1;
    user.note.round2.pitch = -1;
    user.note.round3.pitch = -1;
    user.note.round1.uxdesign = -1;
    user.note.round2.uxdesign = -1;
    user.note.round3.uxdesign = -1;
    user.note.round1.fonctionnalites = -1;
    user.note.round2.fonctionnalites = -1;
    user.note.round3.fonctionnalites = -1;
    user.note.elimine = false;
    this.userService.editUser(user).subscribe(
      () => {
        console.log('test');
      },
    );
  }

  elimine(user) {
    if (window.confirm('Are you sure you want to elimine this personne ?') === true) {
      if (user.note.round3.pitch === -1 && user.note.round2.pitch !== -1) {
        this.user.note.elimine = 2;
      } else if (user.note.round2.pitch === -1) {
        this.user.note.elimine = 1;
      }
      this.userService.editUser(this.user).subscribe(
        () => {
          this.isEditing = false;
        },
      );
    }
  }

  createevent() {
    this.isCreate = true;
  }
  closecreateevent() {
    this.isCreate = false;
  }







  getCats() {
    this.catService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addCat() {
    this.catService.addCat(this.addCatForm.value).subscribe(
      (res) => {
        this.cats.push(res);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing2(cat: Cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing2() {
    this.isEditing = false;
    this.cat = new Cat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat: Cat) {
    this.catService.editCat(cat).subscribe(
      () => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteCat(cat: Cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        () => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }
}
