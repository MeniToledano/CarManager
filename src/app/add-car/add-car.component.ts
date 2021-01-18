import {Component, OnInit} from '@angular/core';
import {CarService} from '../services/car.service';
import {Car} from '../services/client-models/car';
import {CarRequest} from '../services/client-models/car-request';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
  }

  addNewCar(car: CarRequest): void {
    this.carService.addNewCar(car);
  }
}
