import {HttpRequestsService} from './http-requests.service';
import {Car} from './client-models/car';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {CarRequest} from './client-models/car-request';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  @Output() allCarsResponse: EventEmitter<Car[]> = new EventEmitter<Car[]>();
  @Output() returnedCarByPlate: EventEmitter<Car[]> = new EventEmitter<Car[]>();
  @Output() carAddedSuccessfully: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() viewCar: EventEmitter<Car> = new EventEmitter<Car>();
  @Output() carModifiedSuccessfully: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() carDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private httpRequestService: HttpRequestsService) {
  }

  getCars(): void {
    this.httpRequestService.getAllCars().subscribe(
      (response: Car[]) => {
        this.allCarsResponse.emit(response);
      },
      (error) => {
        console.log(error);
      });
  }

  getCarsByFilters(params: string): void {
    this.httpRequestService.getFilteredCars(params).subscribe(
      (response: Car[]) => {
        this.allCarsResponse.emit(response);
      },
      (error) => {
        console.log(error);
      });
  }

  getCarByCarPlate(carTemplate: string): void {
    this.httpRequestService.getFilteredCars(carTemplate).subscribe(
      (response: Car[]) => {
        this.returnedCarByPlate.emit(response);
      },
      (error) => {
        // console.log(error);
        if (error.status === 404){
          this.returnedCarByPlate.emit([]);
        }
      });
  }

  onDeleteCar(carId: number): void {
    this.httpRequestService.deleteCarById(carId).subscribe(
      (response: Car[]) => {
        this.allCarsResponse.emit(response);
        this.carDeleted.emit(true);
      },
      (error) => {
        console.log(error);
      });
  }

  addNewCar(car: CarRequest): void {
    this.httpRequestService.onAddingNewCar(car).subscribe(
      (response: Car[]) => {
        this.carAddedSuccessfully.emit(true);
        this.allCarsResponse.emit(response);
      },
      (error) => {
        console.log(error);
      });
  }

  onModifyCar(car: Car): void {
    this.httpRequestService.onModifyingCar(car).subscribe(
      (response: Car[]) => {
        this.carModifiedSuccessfully.emit(true);
        this.allCarsResponse.emit(response);
      },
      (error) => {
        console.log(error);
      });
  }
}

