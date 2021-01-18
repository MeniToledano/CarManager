import {Component, OnInit} from '@angular/core';
import {CarService} from './services/car.service';
import {Car} from './services/client-models/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  viewCar: Car;
  viewPage = 1;
  title = 'CarManager';
  addCar = false;

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.viewCar.subscribe((car: Car) => {
      this.viewPage = 3;
      this.viewCar = car;
    });
  }

}
