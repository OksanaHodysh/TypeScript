import { ReferenceItem } from './reference-item';
import { positiveInteger } from '../decorators';

export default class Encyclopedia extends ReferenceItem {
  private _copies: number;

  constructor(title: string, year: number, public edition: number) {
    super(title, year);
  }

  @positiveInteger
  get copies(): number {
    return this._copies;
  }

  set copies(value: number) {
    this._copies = value;
  }

  printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}
