import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';
import { Dog } from '../dog';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {
  dogs: any[];
  title: string;
  selectedDog: Dog = new Dog();
  error: string;
  constructor(private dogService: DogService) { }

  ngOnInit() {
    this.title = "Our dogs";
    this.refreshDogs();
   }

  refreshDogs() {
    this.dogService.getDogs().subscribe(
      dogs => this.dogs = dogs,
      error => {
        console.error(error);
        this.error = error;
      });
  }

  editDog(dog: Dog) {
    this.selectedDog = Object.assign({}, dog);
  }

  deleteDog(dog: Dog) {
    this.dogService.deleteDog(dog.id)
      .subscribe(data => {
        this.refreshDogs();
      });
  }

}
