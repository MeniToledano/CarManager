import {EmployeeResponseModel} from '../server-models/employee-response.model';

export class Employee {
  constructor(FirstName: string, LastName: string, EmployeeIdentifier: number) {
    this.firstName = FirstName;
    this.lastName = LastName;
    this.employeeIdentifier = EmployeeIdentifier;
  }

  public employeeId: number;
  public firstName: string;
  public lastName: string;
  public employeeIdentifier: number;

  static plainToClass(response: EmployeeResponseModel): Employee {
    const employee = new Employee(
      response.firstName,
      response.lastName,
      response.employeeIdentifier
    );
    employee.employeeId = response.employeeId;
    return employee;
  }

  static arrPlainToClass(employeesJson: EmployeeResponseModel[]): Employee[] {
    return employeesJson.map(employee => (Employee.plainToClass(employee)));
  }
  public toString = (): string => {
    return `${this.firstName + ' ' + this.lastName} `;
  }
  public getId(): number{
    return this.employeeId;
  }
}
