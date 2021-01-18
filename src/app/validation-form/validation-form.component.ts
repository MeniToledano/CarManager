import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CarService} from '../services/car.service';
import {CarType} from '../services/client-models/car-type';
import {CarRequest} from '../services/client-models/car-request';
import {Car} from '../services/client-models/car';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../services/client-models/employee';
import {CarTypeService} from '../services/car-type.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.css']
})
export class ValidationFormComponent implements OnInit, OnDestroy {

  @Input() buttonName: string;
  @Input() formState: string;
  @Input() viewCar: Car;
  @Output() newCarCreated: EventEmitter<CarRequest> = new EventEmitter<CarRequest>();
  @Output() carModified: EventEmitter<Car> = new EventEmitter<Car>();

  // get from server
  employees: Employee[] = [];
  carTypes: CarType[] = [];

  // form fields, for data manipulations
  employee: Employee;
  plateNumber: string;
  carTypeId: number;
  fourOnFour = false;
  comments: string;
  employeeIdentifier: number;
  dropdownTouch = false;
  lastCarCareDate: Date;
  // release all subscribe
  subscription: Subscription[] = [];
  // flag for response from server
  plateNumberAlreadyExist = false;

  // all validators
  form = new FormGroup({
    internal: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    plate: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    engineVol: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
    yearsOfManu: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
    careDate: new FormControl('', [Validators.required]),
    carTypeId: new FormControl('', [Validators.required]),
  });

  constructor(private carService: CarService,
              private employeeService: EmployeeService,
              private carTypeService: CarTypeService) {
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    if (this.formState === 'modify') {
      this.fillTheTemplate();
    }
    this.employeeService.getEmployees();
    this.carTypeService.getCarTypes();
    const sub1 = this.carTypeService.allCarTypesResponse.subscribe((response: CarType[]) => {
      this.carTypes = response;
    });
    const sub2 = this.carService.returnedCarByPlate.subscribe((data: Car[]) => {
      if (data.length > 0) {
        this.plateNumberAlreadyExist = true;
      } else {
        if (this.formState === 'create') {
          this.createNewCar();
        }
      }
    });
    const sub3 = this.carService.carAddedSuccessfully.subscribe((response: boolean) => {
      if (response){
        alert('Car added successfully!');
      }
    });
    const sub4 = this.carService.carModifiedSuccessfully.subscribe((response: boolean) => {
      if (response){
        alert('Car Modified successfully!');
      }
    });
    const sub5 = this.employeeService.allEmployeesResponse.subscribe((response: Employee[]) => {
      this.employees = response;
    });
    this.subscription.push(sub1);
    this.subscription.push(sub2);
    this.subscription.push(sub3);
    this.subscription.push(sub4);
    this.subscription.push(sub5);
  }

  onClickSubmit(): void {
    if (this.formState === 'create') {
      this.plateNumberAlreadyExist = false;
      this.carService.getCarByCarPlate(this.plateNumber);
    } else if (this.formState === 'modify') {
      // no need to check plate number
      this.mutateOriginalCar();
      this.carModified.emit(this.viewCar);
    }
  }

  // returns new car, add new car case
  private createNewCar(): void {
    const car = new CarRequest();
    car.internalId = this.form.get('internal').value || 'N/A';
    car.plateNumber = this.form.get('plate').value || 'N/A';
    car.carTypeId = Number(this.form.get('carTypeId').value) || -1;
    car.fourOnFour = this.fourOnFour;
    car.engineVolume = Number(this.form.get('engineVol').value) || -1;
    car.yearOfManufacture = Number(this.form.get('yearsOfManu').value) || -1;
    car.comments = this.comments || 'N/A';
    car.employeeIdentifier = Number(this.employeeIdentifier) || -1;
    car.carCareDate = this.form.get('careDate').value || new Date();
    car.lastModified = new Date(Date.now());
    this.newCarCreated.emit(car);
  }

  // Case of viewing existing car
  private fillTheTemplate(): void {
    this.form.get('engineVol').setValue(this.viewCar.engineVolume);
    this.form.get('internal').setValue(this.viewCar.internalId);
    this.form.get('plate').setValue(this.viewCar.plateNumber);
    this.form.get('yearsOfManu').setValue(this.viewCar.yearOfManufacture);
    this.form.get('careDate').setValue(this.viewCar.carCareDate);
    this.form.get('carTypeId').setValue(this.viewCar.carTypeId);
    this.lastCarCareDate = this.viewCar.carCareDate;
    this.carTypeId = this.viewCar.carTypeId;
    this.fourOnFour = this.viewCar.fourOnFour;
    this.comments = this.viewCar.comments;
    this.employeeIdentifier = this.viewCar.employeeIdentifier;
  }

  // returns mutate car, modify case
  private mutateOriginalCar(): void {
    this.viewCar.internalId = this.form.get('internal').value || 'N/A';
    this.viewCar.plateNumber = this.form.get('plate').value || 'N/A';
    this.viewCar.carTypeId = Number(this.form.get('carTypeId').value) || -1;
    this.viewCar.fourOnFour = this.fourOnFour;
    this.viewCar.engineVolume = Number(this.form.get('engineVol').value) || -1;
    this.viewCar.yearOfManufacture = Number(this.form.get('yearsOfManu').value) || -1;
    this.viewCar.comments = this.comments || 'N/A';
    this.viewCar.employeeIdentifier = Number(this.employeeIdentifier) || -1;
    this.viewCar.carCareDate = this.form.get('careDate').value || new Date();
  }

  // private case, in order to let the form know that the value
  // returned from the validation-form component and use the for validators
  setCarType(carTypeId: number): void {
    this.form.get('carTypeId').setValue(carTypeId);
    this.carTypeId = carTypeId;
  }

}
