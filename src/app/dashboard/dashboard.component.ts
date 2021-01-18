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
  radioButton: number;

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
      this.carTypes.push(new CarType(-1, 'None'));
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

  onClickFilter(): void {
    if (this.radioButton === 1) {
      this.onGetCarByPlateNum();
    } else if (this.radioButton === 2) {
      this.onGetCarsByFourOnFourVal();
    } else if (this.radioButton === 3) {
      this.onGetCarsByCarType();
    } else {
      this.carService.getCars();
    }
  }

  onGetCarByPlateNum(): void {
    this.tempString = '';
    this.tempString += '?platenumber=' + this.plateNumberBoxMsg;
    this.carService.getCarByCarPlate(this.tempString);
  }

  onGetCarsByCarType(): void {
    this.tempString = '';
    this.tempString += '?cartype=' + this.chosenType;
    this.carService.getCarsByFilters(this.tempString);
  }

  private onGetCarsByFourOnFourVal(): void {
    this.tempString = '';
    this.tempString += '?fouronfour=' + this.isFourOnFour;
    this.carService.getCarsByFilters(this.tempString);
  }
}
