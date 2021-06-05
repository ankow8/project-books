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
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      const generatedHTML = template(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(generatedDOM);
    }
  }
  render();

  const favoriteBooks = [];
  const filters = [];
  const filtersSection = document.querySelector('.filters');
  //console.log(filtersSection);

  function initActions(clickedObject){
    booksList.addEventListener('dblclick', function(event){
      //console.log('książka się kliknęła');
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      console.log('clickedElement', clickedElement);
      if(clickedElement.classList.contains('book__image')){ //raz jest z kropka a raz bez
        if(clickedElement.classList.contains('favorite')){
          clickedElement.classList.remove('favorite');
          const removedBookId = favoriteBooks.indexOf(clickedObject);  //mam wrazenie ze nie usuwa to id co trzeba
          favoriteBooks.splice(removedBookId, 1);
        } else {
          clickedElement.classList.add('favorite');
          const bookId = clickedElement.getAttribute('data-id');
          favoriteBooks.push(bookId);
        }
      }
    });
    filtersSection.addEventListener('click', function(event){
      const clickedElement = event.target;
      if(/*clickedElement.tagName == 'input' && */clickedElement.type == 'checkbox' && clickedElement.name == 'filter'){
        const value = clickedElement.value;
        console.log('Spelnia warunki', value);
        filterBooks();
        //console.log(clickedElement);
        if(clickedElement.checked == true){
          filters.push(value);
        } else {
          const removeValue = filters.indexOf(value);
          filters.splice(removeValue, 1);
        }

      }
      //console.log('Kliknął się formularz', clickedElement);
      console.log('filters', filters);
    });
  }
  initActions();
  //console.log(favoriteBooks);
  //console.log(booksList);
  //console.log(filters);
  function filterBooks(){
    let shouldBeHidden = false;
    for(let book of dataSource.books){
      console.log('book', book);
      for(let filter of filters){
        console.log('filter', filter);
        if(book.details[filter] != true){
          shouldBeHidden = true;
          break;
        }
      }
      const bookId = book.id;
      console.log('bookId', bookId);
      let bookImage = document.querySelector('.book__image[data-id="' + bookId + '"]');
      console.log('bookImage', bookImage);
      if(shouldBeHidden == true){
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }
  function determineRatingBgc(rating){
    let ratingBgc = '';
    if (rating<6) ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    else if (rating > 6 && rating <= 8) ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    else if (rating > 8 && rating <= 9) ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    else if (rating > 9) ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    return ratingBgc;
  }
}
