import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  isEditing = false;
  isLoading = true;
  user;
  note;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

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
    console.log(i);
    const test = 'round' + (i + 1);
    console.log(user.note[test].pitch);
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
      uxdesign1: user.note.round1.uxdesign, fonctionnalites1: user.note.round1.fonctionnalites}]);
    user.stats[user.stats.length - 1].push(test);
    if (user.note.round2.pitch !== -1) {
      const test2 = ([{
        moy2: ((user.note.round2.pitch + user.note.round2.uxdesign + user.note.round2.fonctionnalites) / 3),
        pitch2: user.note.round2.pitch,
        uxdesign2: user.note.round2.uxdesign, fonctionnalites2: user.note.round2.fonctionnalites}]);
      user.stats[user.stats.length - 1].push(test2);
    }
    if (user.note.round3.pitch !== -1) {
      const test3 = ([{ moy3: ((user.note.round3.pitch + user.note.round3.uxdesign + user.note.round3.fonctionnalites) / 3),
        pitch3: user.note.round3.pitch,
        uxdesign3: user.note.round3.uxdesign, fonctionnalites3: user.note.round3.fonctionnalites }]);
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
}
