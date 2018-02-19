import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Dog } from '../dog';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-editor',
  templateUrl: './dog-editor.component.html',
  styleUrls: ['./dog-editor.component.css']
})
export class DogEditorComponent implements OnInit {
  @Output() refresh = new EventEmitter();
  @Input() dog: Dog = new Dog();
  constructor(private dogService: DogService) { }

  ngOnInit() {
  }

  isEditMode() {
    return this.dog.hasOwnProperty('id');
  }

  cancelEditMode() {
    this.dog = new Dog();
  }

  updateDog() {
    this.dogService.editDog(this.dog, this.dog.id)
      .subscribe(data => {
        this.refresh.emit();
      });
  }

  addDog() {
    this.dogService.addDog(this.dog)
      .subscribe(data => {
        this.refresh.emit();
      });
  }
}
