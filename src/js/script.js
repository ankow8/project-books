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
    booksList.addEventListener('dblclick', function(event){
      //console.log('książka się kliknęła');
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      console.log('clickedElement', clickedElement);
      if(clickedElement.classList.contains('book__image')){
        if(clickedElement.classList.contains('favorite')){
          clickedElement.classList.remove('favorite');
          const removedBookId = favoriteBooks.indexOf(clickedImage);  //mam wrazenie ze nie usuwa to id co trzeba
          favoriteBooks.splice(removedBookId, 1);
        } else {
          clickedElement.classList.add('favorite');
          const bookId = clickedElement.getAttribute('data-id');
          favoriteBooks.push(bookId);
        }
      }
    });
  }
  initActions();
  console.log(favoriteBooks);
  //console.log(booksList);

}
