import { Category } from './enums';
import { Author, Book, Librarian, Logger, Magazine } from './interfaces';
import { ReferenceItem, UniversityLibrarian } from './classes';
import Encyclopedia from './classes/encyclopedia';
import RefBook from './classes/encyclopedia';
import Shelf from './classes/shelf';
import {
  сheckoutBooks,
  createCustomer,
  createCustomerID,
  getBookByID,
  getBookTitlesByCategory,
  getTitles,
  logFirstAvailable,
  printBook,
  purge, getBooksByCategory, logCategorySearch, getBooksByCategoryPromise, logBookTitles, logSearchResults
} from './lib/utility-functions';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}
// Task 01 Start
logFirstAvailable();
// Task 01 End

// Task 02 Start
getBookTitlesByCategory();
// Task 02 End

// Task 03 Start
console.log(getBookByID(1));
// Task 03 End

// Task 04 Start
const myID = createCustomerID('Ann', 10);
console.log(`ID: ${myID}`);

let idGenerator: (name: string, id: number) => string;
idGenerator = (name: string, id: number) => `${name}${id}`;
// idGenerator = createCustomerID;
console.log(`ID: ${idGenerator('Boris', 20)}`);
// Task 04 End

// Task 05 Start
createCustomer('Ann');
createCustomer('Boris', 30);
createCustomer('Clara', 45, 'Kyiv');

const titles = сheckoutBooks('Ann', 2, 4, 7);
console.log(titles);
// Task 05 End

// Task 06 Start
const checkedOutBooks = getTitles(false);
checkedOutBooks.forEach((title) => console.log(title));
// Task 06 End


// Task 07 Start
const myBook: Book = {
  id: 5,
  title: 'Colors, Backgrounds, and Gradients',
  author: 'Eric A. Meyer',
  available: true,
  category: Category.CSS,
  pages: 200,
  markDamaged: (reason: string) => console.log(`Damaged: ${reason}.`)
};

printBook(myBook);
myBook.markDamaged('missing back cover');
// Task 07 End

// Task 08 Start
function logger(logMessage: string): void {
  console.log(`Damaged: ${logMessage}.`);
}

const logDamage: Logger = logger;

logDamage('missing pages');
// Task 08 End

// Task 09 Start
const favoriteAuthor: Author = {
  name: 'John Doe',
  email: 'john.doe@test.com',
  numBooksPublished: 3
};

const favoriteLibrarian: Librarian = {
  name: 'John Doe',
  email: 'john.doe@test.com',
  department: 'history',
  assistCustomer: (name: string) => console.log(`May I help you ${name}`)
};
// Task 09 End

// Task 10 Start
const favoriteLibrarian2: Librarian = new UniversityLibrarian();
favoriteLibrarian2.name = 'Ann';
favoriteLibrarian2.assistCustomer('Boris');
// Task 10 End

// Task 11 Start
// const ref = new ReferenceItem('JavaScript', 2019);
// ref.printItem();
// ref.publisher = 'Oxford';
// console.log(ref.publisher);
// Task 11 End

// Task 12 Start
const refBook = new RefBook('Big Encyclopedia', 2018, 3);
refBook.printItem();
// Task 12 End

// Task 13 Start
refBook.printCitation();
// Task 13 End

// Task 18 Start
const inventory: Array<Book> = [
  { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
  { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
  { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
  { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

// console.log(purge(inventory));
// console.log(purge([1, 3, 7, 9]));
// Task 18 End

// Task 19 Start
const bookShelf = new Shelf<Book>();
inventory.forEach((item => bookShelf.add(item)));
console.log(bookShelf.getFirst());

const magazines: Array<Magazine> = [
  { title: 'Programming Language Monthly', publisher: 'Code Mags' },
  { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
  { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new Shelf<Magazine>();
magazines.forEach((item => magazineShelf.add(item)));
console.log(magazineShelf.getFirst());
// Task 19 End

// Task 20 Start
magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));
// Task 20 End

// Task 22 Start
const fLibrarian = new UniversityLibrarian();
fLibrarian.name = 'Ann';
fLibrarian['printLibrarian']();
// Task 22 End

// Task 23 Start
const fLib = new UniversityLibrarian();
// fLib.assistFaculty = null;
// fLib.teachCommunity = () => console.log('Test');
// Task 23 End


// Task 24 Start
const refBook2 = new Encyclopedia('Encyclopedia', 2018, 10);
refBook2.printItem();
// Task 24 End

// Task 25 Start
fLib.name = 'Mary';
fLib.assistCustomer('Boris');
// Task 25 End

// Task 26 Start
console.log(fLib);
console.log(fLib.name);
// Task 26 End

// Task 27 Start
refBook2.copies = 7;
console.log(refBook2.copies);

// refBook2.copies = -7;
// console.log(refBook2.copies);
// Task 27 End

// Task 28 Start
// console.log('Start searching...');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);
// console.log('Finish searching.');
// Task 28 End

// Task 29 Start
console.log('Start searching with promise...');
getBooksByCategoryPromise(Category.JavaScript)
  .then((data) => {
    logBookTitles(data);

    return data.length;
  })
  .then((quantity) => console.log(`${quantity} books found.`))
  .catch((err) => console.log(err));
getBooksByCategoryPromise(Category.Software)
  .then((data) => logBookTitles(data))
  .catch((err) => console.log(err));
console.log('Finish searching with promise.');
// Task 29 End

// Task 30 Start
console.log('Beginning search...');
logSearchResults(Category.JavaScript)
  .catch(reason => console.log(reason));
logSearchResults(Category.Software)
  .catch(reason => console.log(reason));
console.log('Search submitted...');
// Task 30 End

type CategoryNumber = {
  [key in Category]?: number;
}
