const books = [];
const RENDER_EVENT = 'render-books';
const SAVED_EVENT = 'saved-bookshelf';
const STORAGE_KEY = 'BOOKSHELF_APPS';

  const search = document.getElementById('search-form');
  search.addEventListener('click', function(){
    alert('Sorry. This function is not yet available');
  });

  document.addEventListener('DOMContentLoaded', function () {

    const bookForm = document.getElementById('form');
    bookForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
      }
  });

  function addBook() {
    const generatedID = generateId();
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const bookYear = document.getElementById('year').value;
    const isComplete = document.getElementById('status').checked;
    
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, isComplete);
    books.push(bookObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function generateId() {
    return +new Date();
  }
   
  function generateBookObject(id, title, author, year, isComplete) {
    return {
      id,
      title,
      author,
      year,
      isComplete
    }
  }

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBOOKList = document.getElementById('books');
    uncompletedBOOKList.innerHTML = '';

    const completedBOOKList = document.getElementById('completed-books');
    completedBOOKList.innerHTML = '';
   
    for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isComplete)
        uncompletedBOOKList.append(bookElement);
    else
        completedBOOKList.append(bookElement);
      }
  });

  function makeBook(bookObject) {
    const bookTitle = document.createElement('h4');
    bookTitle.innerText = bookObject.title;
   
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = 'Penulis: ' + bookObject.author;

    const bookYear = document.createElement('p');
    bookYear.innerText = 'Tahun: ' + bookObject.year;

    const buttonArea = document.createElement('div');
    buttonArea.classList.add('book-button');
   
    if (bookObject.isComplete) {
        const undoButton = document.createElement('button');
        undoButton.innerText = 'Read Back';
     
        undoButton.addEventListener('click', function () {
          undoBookFromCompleted(bookObject.id);
        });
     
        const trashButton = document.createElement('button');
        trashButton.innerText = 'Clear Book Data';

        trashButton.addEventListener('click', function () {
            if(confirm('Clear Book ' + bookObject.title + ' ?')){
                removeBookFromCompleted(bookObject.id);
            }
        });
     
        buttonArea.append(undoButton, trashButton);
        
      } else {
        const checkButton = document.createElement('button');
        checkButton.innerText = 'Finished Reading the Book';
        
        checkButton.addEventListener('click', function () {
          addBookToCompleted(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.innerText = 'Clear Book Data';

        trashButton.addEventListener('click', function () {
            if(confirm('Clear Book ' + bookObject.title + ' ?')){
                removeBookFromCompleted(bookObject.id);
            }
        });
        
        buttonArea.append(checkButton, trashButton);
      }

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book');
    bookContainer.append(bookTitle, bookAuthor, bookYear, buttonArea);
    bookContainer.setAttribute('id', `book-${bookObject.id}`);

    return bookContainer;
  }

  function addBookToCompleted (bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function findBook(bookId) {
    for (const bookItem of books) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }

  function removeBookFromCompleted(BookId) {
    const bookTarget = findBookIndex(BookId);
   
    if (bookTarget === -1) return;
   
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
   
   
  function undoBookFromCompleted(BookId) {
    const bookTarget = findBook(BookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function findBookIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }
   
    return -1;
  }

  function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(books);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  function isStorageExist() {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }

  document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
  });

  function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const book of data) {
        books.push(book);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }