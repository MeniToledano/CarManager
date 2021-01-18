import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from './client-models/car';
import {CarResponseModel} from './server-models/car-response.model';
import {map} from 'rxjs/operators';
import {CarType} from './client-models/car-type';
import {CarTypeResponseModel} from './server-models/car-type-response.model';
import {CarRequest} from './client-models/car-request';
import {Employee} from './client-models/employee';
import {EmployeeResponseModel} from './server-models/employee-response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  BASE_URL = 'https://localhost:44333/';
  tempUrlString: string;

  constructor(private http: HttpClient) {
  }

  getAllCars(): Observable<Car[]> {
    this.tempUrlString = this.BASE_URL + 'car';
    return this.http.get<CarResponseModel[]>(this.tempUrlString).pipe(
      map((response: CarResponseModel[]) => {

        if (response === undefined) {
          return [];
        }
        if (response.length > 0) {
          return Car.arrPlainToClass(response);
        }
        return [];
      })
    );
  }

  getFilteredCars(params: string): Observable<Car[]> {
    this.tempUrlString = this.BASE_URL + 'car' + params;
    console.log(this.tempUrlString);
    return this.http.get<CarResponseModel[]>(this.tempUrlString).pipe(
      map((response: CarResponseModel[]) => {

        if (response === undefined) {
          return [];
        }
        if (response.length > 0) {
          return Car.arrPlainToClass(response);
        }
        return [];
      })
    );
  }

  getAllCarTypes(): Observable<CarType[]> {
    this.tempUrlString = this.BASE_URL + 'cartype';
    return this.http.get<CarTypeResponseModel[]>(this.tempUrlString).pipe(
      map((response: CarTypeResponseModel[]) => {

        if (response === undefined) {
          return [];
        }
        if (response.length > 0) {
          return CarType.arrPlainToClass(response);
        }
        return [];
      })
    );
  }

  deleteCarById(carId: number): Observable<Car[]> {
    this.tempUrlString = this.BASE_URL + 'car/' + carId;
    return this.http.delete<CarResponseModel[]>(this.tempUrlString).pipe(
      map((response: CarResponseModel[]) => {
        if (response === undefined) {
          return [];
        }
        if (response.length > 0) {
          return Car.arrPlainToClass(response);
        }
        return [];
      })
    );
  }

  onAddingNewCar(car: CarRequest): Observable<Car[]> {
    this.tempUrlString = this.BASE_URL + 'car';
    console.log(car);
    return this.http.post<CarResponseModel[]>(this.tempUrlString, car).pipe(
      map((response: CarResponseModel[]) => {
        if (response === undefined) {
          return [];
        }
        if (response.length > 0) {
          return Car.arrPlainToClass(response);
        }
        return [];
      })
    );
  }

  onModifyingCar(car: Car): Observable<Car[]> {
    this.tempUrlString = this.BASE_URL + 'car/' + car.carId;
    console.log(car);
    return this.http.put<CarResponseModel[]>(this.tempUrlString, car).pipe(
      map((response: CarResponseModel[]) => {
        if (response === undefined) {
          return [];
        }
        if (response.length > 0) {
          return Car.arrPlainToClass(response);
        }
        return [];
      })
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    this.tempUrlString = this.BASE_URL + 'employee';
    return this.http.get<EmployeeResponseModel[]>(this.tempUrlString).pipe(
      map((response: EmployeeResponseModel[]) => {
        if (response === undefined) {
          return [];
        }
        if (response.length > 0) {
          return Employee.arrPlainToClass(response);
        }
        return [];
      })
    );
  }

  getCarTypesById(carTypeId: number): Observable<CarType> {
    this.tempUrlString = this.BASE_URL + 'cartype/' + carTypeId;
    return this.http.get<CarTypeResponseModel>(this.tempUrlString).pipe(
      map((response: CarTypeResponseModel) => {

        if (response === undefined) {
          return undefined;
        }
        return CarType.plainToClass(response);
      })
    );
  }

  getEmployeeById(employeeIdentifier: number): Observable<Employee> {
    this.tempUrlString = this.BASE_URL + 'employee/' + employeeIdentifier;
    return this.http.get<EmployeeResponseModel>(this.tempUrlString).pipe(
      map((response: EmployeeResponseModel) => {

        if (response === undefined) {
          return undefined;
        }
        return Employee.plainToClass(response);
      })
    );
  }
}
