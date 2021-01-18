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
  employee: Employee;
  carType: CarType;
  subscription: Subscription[] = [];

  constructor(private carService: CarService,
              private employeeService: EmployeeService,
              private carTypeService: CarTypeService) {
  }

  ngOnInit(): void {
    const sub1 = this.carTypeService.carTypeByIdRes.subscribe((res: CarType) => this.carType = res);
    const sub2 = this.employeeService.employeeByIdResponse.subscribe((res: Employee) => this.employee = res);
    this.subscription.push(sub1);
    this.subscription.push(sub2);
  }

  onClickViewCar(): void {
    this.carService.viewCar.emit(this.car);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.car !== undefined && this.performOnce) {
      this.carTypeService.getCarTypeById(this.car.carTypeId);
      this.employeeService.getEmployeeById(this.car.employeeIdentifier);
      this.performOnce = false;
    }
  }

  verifyUserResponse(response: string): void {
    if (response === 'yes'){
      this.carService.onDeleteCar(this.car.carId);    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
