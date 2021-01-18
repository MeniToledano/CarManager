import {CarTypeResponseModel} from '../server-models/car-type-response.model';

export class CarType {
  constructor(TypeId: number, TypeName: string) {
    this.typeId = TypeId;
    this.typeName = TypeName;
  }
  public typeId: number;
  public typeName: string;

  static plainToClass(response: CarTypeResponseModel): CarType {
    const carType = new CarType(response.typeId, response.typeName);
    return carType;
  }

  static arrPlainToClass(carTypesJson: CarTypeResponseModel[]): CarType[] {
    return carTypesJson.map(carType => (CarType.plainToClass(carType)));
  }
  public toString(): string{
    return String(this.typeName);
  }
  public getId(): number{
    return this.typeId;
  }
}
