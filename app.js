//create a booklist constructor
function Booklist(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn; 
}

//universal constructor that will have different prototypes
function UI() { };
// add a new book method
UI.prototype.addNewBooktolist = function (book) {
  //get the tbody element
  const tbody = document.querySelector('.tbody')
  //create row element
  const row = document.createElement('tr');
  //add items from the book to the row innerHTML
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`
  tbody.appendChild(row)
}

//clear book fields value method
UI.prototype.clearBookField = function () {
  document.querySelector('#book-title').value= ''
  document.querySelector('#author').value = ''
  document.querySelector('#isbn').value = ''
}
//show alert method
UI.prototype.showAlert = function (msgAlert, className) {
  const form = document.querySelector('#book-list');
  const body = document.querySelector('.container');
  const div = document.createElement('div')

  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msgAlert))
  body.insertBefore(div,form)

  setTimeout(()=> {document.querySelector('.alert').remove()},3000)
}

//add to local storage

UI.prototype.addToLs = function (book) {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));  
  }
  books.push(book);
  
  localStorage.setItem('books', JSON.stringify(books))
}

//getting and displaying books from the local storage
UI.prototype.getBook = function () {
  // const ui = new UI;
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));  
  }

  books.forEach(function (book) {
    const ui = new UI
    ui.addNewBooktolist(book);

     //get the tbody element
  // const tbody = document.querySelector('.tbody')
  // //create row element
  // const row = document.createElement('tr');
  // //add items from the book to the row innerHTML
  // row.innerHTML = `
  // <td>${book.title}</td>
  // <td>${book.author}</td>
  // <td>${book.isbn}</td>
  // <td><a href="#" class="delete">X</a></td>`
  // tbody.appendChild(row)
    })
  localStorage.setItem('books', JSON.stringify(books))
}

//delete books from local storage
UI.prototype.removeFromLs = function (e) {
  const ui = new UI;
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));  
  }
  books.forEach(function (book, index) {
    if (e.target.className === 'delete') {
      books.splice(index,1);
    }
  })
  localStorage.setItem('books', JSON.stringify(books));
}


//DOM content loade listener
document.addEventListener('DOMContentLoaded', function (e) {
  const ui = new UI;
  ui.getBook();
})
//add form event listener and extract from DOM
document.querySelector('#book-list').addEventListener('submit', function (e) {
  const title = document.querySelector('#book-title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  const book = new Booklist(title, author, isbn)

  const ui = new UI();
  if (title === '' || author === '' || isbn === '') {
   ui.showAlert('Please fill-in the required fields');
  } else {
    //add book
    ui.addNewBooktolist(book);
    ui.addToLs(book);
  // //show success alert when div has been appended to the Dom
   ui.showAlert(`${book.title} by ${book.author} has been added to your book list.`, 'success');
  // //clear the input values
   ui.clearBookField();
  }
  e.preventDefault();
})


//delete book from list Event listener
document.querySelector('.container').addEventListener('click', deleteBook);

//delete book function
function deleteBook(e) {
  const ui = new UI
  if (e.target.className === 'delete') {
    e.target.parentElement.parentElement.remove();   
  ui.showAlert('Book deleted from the list.', 'success');
  }
  ui.removeFromLs(e);
}








