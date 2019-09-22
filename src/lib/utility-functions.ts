import { Book, LibMgrCallback } from '../interfaces';
import { Category } from '../enums';

export function purge<T>(inventory: Array<T>): Array<T> {
  inventory.splice(0, 2);

  return inventory;
}

export function getAllBooks(): Array<Book> {
  return [
    {
      id: 1,
      title: 'Refactoring JavaScript',
      author: 'Evan Burchard',
      available: true,
      category: Category.JavaScript
    },
    {
      id: 2,
      title: 'JavaScript Testing',
      author: 'Liang Yuxian Eugene',
      available: false,
      category: Category.JavaScript
    },
    {
      id: 3,
      title: 'CSS Secrets',
      author: 'Lea Verou',
      available: true,
      category: Category.CSS
    },
    {
      id: 4,
      title: 'Mastering JavaScript Object-Oriented Programming',
      author: 'Andrea Chiarelli',
      available: true,
      category: Category.JavaScript
    }
  ];
}

export function logFirstAvailable(books: Array<any> = getAllBooks()): void {
  const numberOfBooks: number = books.length;
  let firstBookAvailable: string;

  for (const book of books) {
    if (book.available) {
      firstBookAvailable = book.title;
      break;
    }
  }

  console.log(`Books In Total: ${numberOfBooks}`);
  console.log(`First Available Book: ${firstBookAvailable}`);
}

export function logBookTitles(titles: Array<string>): void {
  titles.forEach((title) => console.log(title));
}

export function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
  const books = getAllBooks();
  const titles: Array<string> = [];

  console.log(`Category Key: ${category}`);
  console.log(`Category: ${Category[category]}`);

  for (const book of books) {
    if (book.category === category) {
      titles.push(book.title);
    }
  }

  logBookTitles(titles);

  return titles;
}

export function logCategorySearch(err: Error, data: Array<string>): void {
  if (err) {
    console.log(err.message);
  } else {
    logBookTitles(data);
  }
}

export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
  setTimeout(() => {
    try {
      const searchResults = getBookTitlesByCategory(category);
      if (searchResults.length) {
        callback(null, searchResults);
      } else {
        throw new Error('No books found.');
      }
    } catch (err) {
      callback(err, null);
    }
  }, 2000);
}

export function getBooksByCategoryPromise(category: Category): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const searchResults = getBookTitlesByCategory(category);

      if (searchResults.length) {
        resolve(searchResults);
      } else {
        reject('No books found.')
      }
    }, 2000)
  });
}

export function getBookByID(id: number): Book | undefined {
  return getAllBooks().find(({id: bookId}) => bookId === id);
}

export function createCustomerID(name: string, id: number): string {
  return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Customer Name: ${name}`);

  if (age) {
    console.log(`Customer Age: ${age}`);
  }

  if (city) {
    console.log(`Customer City: ${city}`);
  }
}

export function сheckoutBooks(customer: string, ...bookIDs: Array<number>): Array<string> {
  const titles: Array<string> = [];

  bookIDs.forEach((bookID) => {
    const book = getBookByID(bookID);

    if (book && book.available) {
      titles.push(book.title);
    }
  });

  console.log(`Customer Name: ${customer}`);

  return titles;
}

export function getTitles(author: string): Array<string>;
export function getTitles(available: boolean): Array<string>;
export function getTitles(bookProperty: string | boolean): Array<string> {
  const books = getAllBooks();
  let titles: Array<string> = [];

  if (typeof bookProperty === 'string') {
    titles = books
      .filter(({author}) => author === bookProperty)
      .map(({title}) => title);
  } else {
    titles = books
      .filter(({available}) => available === bookProperty)
      .map(({title}) => title);
  }

  return titles;
}

export function printBook(book: Book): void {
  const {title, author} = book;

  console.log(`${title} by ${author}`);
}

export async function logSearchResults(category: Category) {
  let foundBooks = await getBooksByCategoryPromise(category);
  logBookTitles(foundBooks);
}

