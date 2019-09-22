import { Category } from './enums';

interface DamageLogger {
  (param: string): void;
}

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category: Category;
  pages?: number;
  markDamaged?: DamageLogger;
}

interface Magazine {
  title: string;
  publisher: string;
}

interface ShelfItem {
  title: string
}

interface Person {
  name: string;
  email: string;
}

interface Author extends Person {
  numBooksPublished: number;
}

interface Librarian extends Person {
  department: string;
  assistCustomer: (custName: string) => void;
}

interface LibMgrCallback {
  (err: Error, titles: Array<string>): void;
}

export { DamageLogger as Logger, Book, LibMgrCallback, Magazine, Author, Librarian, ShelfItem };
