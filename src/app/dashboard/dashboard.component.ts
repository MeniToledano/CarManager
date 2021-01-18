import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../services/client-models/car';
import {CarService} from '../services/car.service';
import {CarType} from '../services/client-models/car-type';
import {CarTypeService} from '../services/car-type.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  cars: Car[] = [];
  carTypes: CarType[] = [];
  chosenType: number;
  isFourOnFour: boolean;
  plateNumberBoxMsg: string;
  onlyDigitsAllowedErrorMSG: boolean;
  tempString: string;
  firstParamAdded: boolean;
  subscription: Subscription[] = [];

  constructor(private carService: CarService,
              private carTypesService: CarTypeService) {
    this.isFourOnFour = false;
    this.plateNumberBoxMsg = 'None';
    this.onlyDigitsAllowedErrorMSG = false;
    this.firstParamAdded = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.carService.getCars();
    const sub1 = this.carService.allCarsResponse.subscribe((data: Car[]) => {
      this.cars = data;
    });
    this.carTypesService.getCarTypes();
    const sub2 = this.carTypesService.allCarTypesResponse.subscribe((data: CarType[]) => {
      this.carTypes = data;
    });
    const sub3 = this.carService.returnedCarByPlate.subscribe((data: Car[]) => {
      this.cars = data;
    });
    const sub4 = this.carService.carDeleted.subscribe((res: boolean) => {
      alert('car deleted successfully');
    });

    // release all subscriptions
    this.subscription.push(sub1);
    this.subscription.push(sub2);
    this.subscription.push(sub3);
    this.subscription.push(sub4);

  }

  onInsertValues(value: string): void {
    this.plateNumberBoxMsg = value;
    this.onlyDigitsAllowedErrorMSG = !this.plateNumberBoxMsg.match(/^[0-9]*$/);
  }

  onClickGetCarByCarPlateNumber(): void {
    this.tempString = '';
    this.firstParamAdded = false;
    if (this.plateNumberBoxMsg) {
      this.addParam('platenumber=' + this.plateNumberBoxMsg);
    }
    console.log('urlParams= ' + this.tempString);
    this.carService.getCarByCarPlate(this.tempString);
  }

  onGetCarsByFilters(): void {
    this.tempString = '';
    this.firstParamAdded = false;
    if (this.isFourOnFour) {
      this.addParam('fouronfour=' + this.isFourOnFour);
    }
    if (this.chosenType != null) {
      this.addParam('cartype=' + this.chosenType);
    }
    console.log('urlParams= ' + this.tempString);
    this.carService.getCarsByFilters(this.tempString);
  }

  private addParam(param: string): void {
    if (this.firstParamAdded) {
      this.tempString += '&';
    } else {
      this.tempString += '?';
    }

    this.tempString += param;
    this.firstParamAdded = true;
  }


}
