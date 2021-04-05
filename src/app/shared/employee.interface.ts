/**
 * Title: employee.interface.ts
 * Author: Professor Krasso
 * Date: 30 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Interface for Employee
 */
import { IItem } from './item.interface';

export interface IEmployee {
  empId: string;
  todo: IItem[];
  done: IItem[];
}
