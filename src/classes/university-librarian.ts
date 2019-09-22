import * as Interfaces from '../interfaces';
import { format, logger, logMethod, logParameter, sealed, writable } from '../decorators';

@sealed('UniversityLibrarian')
@logger
class UniversityLibrarian implements Interfaces.Librarian {
  @format()
  name: string;
  email: string;
  department: string;

  @logMethod
  assistCustomer(@logParameter custName: string): void {
    console.log(`${this.name} is assisting ${custName}`);
  }

  @writable(true)
  assistFaculty(): void {
    console.log('Assisting faculty.');
  }

  @writable(false)
  teachCommunity(): void {
    console.log('Teaching community.');
  }
}

export { UniversityLibrarian };
