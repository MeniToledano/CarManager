import {CarResponseModel} from '../server-models/car-response.model';

export class Car {

  constructor(InternalId: string = '',
              PlateNumber: string = '',
              CarTypeId: number = -1,
              FourOnFour: boolean = false,
              EngineVolume: number = 0,
              YearOfManufacture: number = 0,
              CarCareDate: Date = new Date(),
              LastModified: Date = new Date()
  ) {
    this.internalId = InternalId;
    this.plateNumber = PlateNumber;
    this.carTypeId = CarTypeId;
    this.fourOnFour = FourOnFour;
    this.engineVolume = EngineVolume;
    this.yearOfManufacture = YearOfManufacture;
    this.carCareDate = CarCareDate;
    this.lastModified = LastModified;
  }

  public carId: number;
  public internalId: string;
  public plateNumber: string;
  public carTypeId: number;
  public fourOnFour: boolean;
  public engineVolume: number;
  public yearOfManufacture: number;
  public comments: string;
  public employeeIdentifier: number;
  public carCareDate: Date;
  public lastModified: Date;

  static plainToClass(response: CarResponseModel): Car {
    const car = new Car(
      response.internalId,
      response.plateNumber,
      response.carTypeId,
      response.fourOnFour,
      response.engineVolume,
      response.yearOfManufacture,
      response.carCareDate,
      response.lastModified);
    car.carId = response.carId;
    car.employeeIdentifier = response.employeeIdentifier;
    car.comments = response.comments;
    return car;
  }

  static arrPlainToClass(carsJson: CarResponseModel[]): Car[] {
    return carsJson.map(car => (Car.plainToClass(car)));
  }
}
