import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatService } from '../services/cat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css'],
})
export class CatsComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  sec = 0;
  test;

  addCatForm: FormGroup;
  date = new FormControl('', Validators.required);
  nbrP = new FormControl('', Validators.required);
  theme = new FormControl('', Validators.required);

  constructor(private catService: CatService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getCats();

    this.addCatForm = this.formBuilder.group({
      date: this.date,
      nbrP: this.nbrP,
      theme: this.theme,
    });
  }

  // tslint:disable-next-line:member-ordering
  affiche = document.getElementById('Compte');

  rebour() {
    // tslint:disable-next-line:variable-name
    const date1: any = new Date();
    const date2: any = new Date(this.cats[0].date);
    this.sec = (date2 - date1) / 1000;
    const n = 24 * 3600;
    if (this.sec > 0) {
      const j = Math.floor(this.sec / n);
      const h = Math.floor((this.sec - (j * n)) / 3600);
      const mn = Math.floor((this.sec - ((j * n + h * 3600))) / 60);
      this.sec = Math.floor(this.sec - ((j * n + h * 3600 + mn * 60)));
      this.test = '' + j + ' j ' + h + ' h ' + mn + ' min ' + this.sec + ' s ';

    }


    const source = interval(1000);
    const subscribe = source.subscribe(val => this.rebour());
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

  enableEditing(cat: Cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = new Cat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat) {
    // window.location.reload();
    console.log(cat);
    this.catService.editCat(cat).subscribe(
      () => {
        console.log('ici');

        this.isEditing = false;
      },
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
