import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpRequestsService} from './http-requests.service';
import {Car} from './client-models/car';
import {Employee} from './client-models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  @Output() allEmployeesResponse: EventEmitter<Employee[]> = new EventEmitter<Employee[]>();
  @Output() employeeByIdResponse: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(private httpRequestService: HttpRequestsService) {
  }
  getEmployees(): void {
    this.httpRequestService.getAllEmployees().subscribe(
      (response: Employee[]) => {
        this.allEmployeesResponse.emit(response);
      },
      (error) => {
        console.log(error);
      });
  }

  getEmployeeById(employeeIdentifier: number): void {
    this.httpRequestService.getEmployeeById(employeeIdentifier).subscribe(
      (response: Employee) => {
        this.employeeByIdResponse.emit(response);
      },
      (error) => {
        console.log(error);
      });
  }
}
