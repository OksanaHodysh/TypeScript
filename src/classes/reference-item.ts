import { timeout } from '../decorators';

abstract class ReferenceItem {
  // title: string;
  // year: number;
  //
  // constructor(newTitle: string, newYear: number, ) {
  //   console.log('Creating a new ReferenceItem...');
  //   this.title = newTitle;
  //   this.year = newYear;
  // }
  static department: string = 'Fiction';

  private _publisher: string;

  constructor(public title: string, protected year: number, ) {
    console.log('Creating a new ReferenceItem...');
  }

  get publisher(): string {
    return this._publisher.toUpperCase();
  }

  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  @timeout(1000)
  printItem(): void {
    console.log( `${this.title} was published in ${this.year} by ${ReferenceItem.department} department.`);
  }

  abstract printCitation(): void;
}

export { ReferenceItem };
