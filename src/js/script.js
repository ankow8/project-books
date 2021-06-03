{
  'use strict';

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');
  //const booksImage = document.querySelectorAll('.book__image');
  //const booksImage = booksList.querySelectorAll('book__image');
  //console.log(bookList);

  function render(){
    for(let book of dataSource.books){
      //console.log(book);
      const generatedHTML = template(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(generatedDOM);
    }
  }
  render();

  const favoriteBooks = [];

  function initActions(clickedImage){
    const booksImage = booksList.querySelectorAll('.book__image');
    //console.log(booksImage);
    for(let bookImage of booksImage){
      //console.log(bookImage);
      bookImage.addEventListener('dblclick', function(event){
        //console.log('książka się kliknęła');
        event.preventDefault();

        if(bookImage.classList.contains('favorite')){
          bookImage.classList.remove('favorite');
          const removedBookId = favoriteBooks.indexOf(clickedImage);  //mam wrazenie ze nie usuwa to id co trzeba
          favoriteBooks.splice(removedBookId, 1);
        } else {
          bookImage.classList.add('favorite');
          const bookId = bookImage.getAttribute('data-id');
          favoriteBooks.push(bookId);
        }

      });
    }
    //console.log(booksImage);
  }
  initActions();
  console.log(favoriteBooks);

}
