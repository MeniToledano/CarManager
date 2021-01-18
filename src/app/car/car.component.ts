import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Car} from '../services/client-models/car';
import {CarService} from '../services/car.service';
import {CarTypeService} from '../services/car-type.service';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../services/client-models/employee';
import {CarType} from '../services/client-models/car-type';
import {Subscription} from 'rxjs';

// import {DialogService} from '../services/dialog.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() car: Car;
  deleteCar: boolean;
  performOnce = true;
  employees: Employee[];
  carTypes: CarType[];
  subscription: Subscription[] = [];
  carType: CarType;
  employee: Employee;

  constructor(private carService: CarService,
              private employeeService: EmployeeService,
              private carTypeService: CarTypeService) {
    console.log('in Car');
  }

  ngOnInit(): void {
    const sub1 = this.carTypeService.allCarTypesResponse.subscribe((res: CarType[]) => {
      this.carTypes = res;
      this.carType = this.carTypes.find(element => element.typeId === this.car.carTypeId);

    });
    const sub2 = this.employeeService.allEmployeesResponse.subscribe((res: Employee[]) => {
      this.employees = res;
      this.employee = this.employees.find(element => element.employeeId === this.car.employeeIdentifier);
    });
    this.subscription.push(sub1);
    this.subscription.push(sub2);
  }

  onClickViewCar(): void {
    this.carService.viewCar.emit(this.car);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.car !== undefined && this.performOnce) {
      this.carTypeService.getCarTypes();
      this.employeeService.getEmployees();
      this.performOnce = false;
    }
  }

  verifyUserResponse(response: string): void {
    if (response === 'yes') {
      this.carService.onDeleteCar(this.car.carId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
