import {HttpRequestsService} from './http-requests.service';
import {Car} from './client-models/car';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {CarType} from './client-models/car-type';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {

  @Output() allCarTypesResponse: EventEmitter<CarType[]> = new EventEmitter<CarType[]>();
  @Output() carTypeByIdRes: EventEmitter<CarType> = new EventEmitter<CarType>();

  constructor(private httpRequestService: HttpRequestsService) {
  }
  getCarTypes(): void {
    this.httpRequestService.getAllCarTypes().subscribe(
      (response: CarType[]) => {
        this.allCarTypesResponse.emit(response);
      },
      (error) => {
        console.log(error);
      });
  }

  getCarTypeById(carTypeId: number): void {
    this.httpRequestService.getCarTypesById(carTypeId).subscribe(
      (response: CarType) => {
        this.carTypeByIdRes.emit(response);
      },
      (error) => {
        console.log(error);
      });
  }
}
