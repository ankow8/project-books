{
  'use strict';

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const bookList = document.querySelector('.books-list');
  //console.log(bookList);

  function render(){
    for(let book of dataSource.books){
      console.log(book);
      const generatedHTML = template(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(generatedDOM);
    }
  }
  render();
}
