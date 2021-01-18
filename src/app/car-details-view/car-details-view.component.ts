import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../services/client-models/car';
import {CarService} from '../services/car.service';

@Component({
  selector: 'app-car-details-view',
  templateUrl: './car-details-view.component.html',
  styleUrls: ['./car-details-view.component.css']
})
export class CarDetailsViewComponent implements OnInit {

  @Input() carToView: Car;
  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
  }

  modifyExistingCar(car: Car): void {
    this.carService.onModifyCar(car);
  }
}
