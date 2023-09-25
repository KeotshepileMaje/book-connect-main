import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";
import { htmlDataset } from "./htmlDataset.js";

//Change the theme settings
htmlDataset.settings.cancel.addEventListener('click', function(e) {
    htmlDataset.settings.overlay.close()
})
htmlDataset.header.settings.addEventListener('click', function(e) { 
    htmlDataset.settings.overlay.show()
})

htmlDataset.settings.overlay.addEventListener('submit', function(e) {
    e.preventDefault();
    const theme = {
        night: {
            dark: '10, 10, 20',
            light: '255, 255, 255',
        },
        day: {
            dark: '255, 255, 255',
            light: '10, 10, 20',
        },
    }
    const themePreference = htmlDataset.settings.theme.value
    if (themePreference === 'day') {
        document.documentElement.style.setProperty('--color-dark',theme.day.light)
        document.documentElement.style.setProperty('--color-light',theme.day.dark )
    }
    if (themePreference === 'night') {
        document.documentElement.style.setProperty('--color-dark', theme.night.light)
        document.documentElement.style.setProperty('--color-light', theme.night.dark );
    } 
    htmlDataset.settings.overlay.close()
})


//Displays the books on html
const fragment = document.createDocumentFragment()

const createPreview = ({ author, image, title, id, description, published }) => {
    const previewElement = document.createElement('div')
    previewElement.classList.add('preview')

    const displayHtml = /* html */
    `
        <img class="preview__image" data-image-${id} id= "${id}" src="${image}"/>
        <div class="preview__info" data-info-${id} id= "${id}">
            <h2 class="preview__title" data-title-${id} id= "${id}">${title}</h2>
            <div class="preview__author" data-author-${id} id= "${id}">${authors[author]}</div>
            <dialog>
                <div data-description-${id} id= "${id}">${description}</div>
                <div data-subtitle-${id} id= "${id}">${published}</div>
            </dialog>
        </div>
    `
    previewElement.innerHTML = displayHtml
    fragment.appendChild(previewElement)
    return previewElement
}

const moreAboutBoook = (event) => {
    htmlDataset.list.active.show()
    const picture = document.querySelector(`[data-image-${event.target.id}]`).getAttribute('src')

    htmlDataset.list.image.setAttribute('src', picture)
    htmlDataset.list.blur.setAttribute('src', picture)
    htmlDataset.list.title.innerHTML = document.querySelector(`[data-title-${event.target.id}]`).innerHTML
    htmlDataset.list.description.innerHTML = document.querySelector(`[data-description-${event.target.id}]`).innerHTML
    const year = new Date(document.querySelector(`[data-subtitle-${event.target.id}]`).innerHTML).getFullYear()
    const name = document.querySelector(`[data-author-${event.target.id}]`).innerHTML
    htmlDataset.list.subtitle.innerHTML = `${name}(${year})`
}

let extracted = books.slice(0, 36)
for (const { author, image, title, id, description, published} of extracted) {
    const preview = createPreview({
                                    author,
                                    id,
                                    image,
                                    title,
                                    description,
                                    published,
                                })
preview.addEventListener('click', moreAboutBoook)
fragment.appendChild(preview)

}
document.querySelector('[data-list-items]').appendChild(fragment)

//Close the more about the function
htmlDataset.list.close.addEventListener('click', function() {
    htmlDataset.list.active.close()
})

//More books
const matches = books
let page = 1;
let booksRemaining = matches.length - [page * BOOKS_PER_PAGE]

/**
 * Only 36 books are shown so the below code helps add 36 more books every time the button is pressed and show more books options to choose from.
 */


const showMore = document.querySelector('[data-list-button]')
const divOFShowMore = document.createElement('div')

const showMoreText = /*html*/
`
<span>Show more</span>
<span class="list__remaining"> (${booksRemaining})</span>
`
divOFShowMore.innerHTML = showMoreText;
showMore.appendChild(divOFShowMore);

//Function to add more books
htmlDataset.list.button.addEventListener('click', function (event) {
    event.preventDefault();   
        page += 1;
        booksRemaining = matches.length - [page * BOOKS_PER_PAGE]
        let rangeLast = page * BOOKS_PER_PAGE
        let rangeFirst = rangeLast - 36
        extracted = books.slice(rangeFirst, rangeLast)
    
    for (const { author, image, title, id, description, published} of extracted) {
        const preview =  createPreview({
            author,
            id,
            image,
            title,
            description, 
            published,
        })
        preview.addEventListener('click', moreAboutBoook)
        fragment.appendChild(preview)
    }
    document.querySelector('[data-list-items]').appendChild(fragment)
    const showMoreText = /*html*/
    `
    <span>Show more</span>
    <span class="list__remaining"> (${booksRemaining})</span>
    `
divOFShowMore.innerHTML = showMoreText;
showMore.appendChild(divOFShowMore);

}
)

//Search buttons to open and close the search form

htmlDataset.header.search.addEventListener('click', function(){
    htmlDataset.search.overlay.show();
})
htmlDataset.search.cancel.addEventListener('click', function(){
    htmlDataset.search.overlay.close();
})

/*
* Inside the  search form.
* The option to search for genre.
* The option to search for Authors.
*/

const genresFragment = document.createDocumentFragment();
let genresList = document.createElement('option');
genresList.value = 'any';
genresList.innerText = 'All genre';
genresFragment.appendChild(genresList)

for (const [id, nameOfGenre] of Object.entries(genres)) {
    const genresList = document.createElement('option');
    genresList.value = id;
    genresList.innerText = nameOfGenre;
    genresFragment.appendChild(genresList)
}
htmlDataset.search.genres.appendChild(genresFragment);

const authorsFragment = document.createDocumentFragment()
let authorsList = document.createElement('option')
authorsList.value = 'any'
authorsList.innerText = 'All Authors'
authorsFragment.appendChild(authorsList)

for (const [id, nameOfAuthor] of Object.entries(authors)) {
    authorsList = document.createElement('option')
    authorsList.value = id
    authorsList.innerText = nameOfAuthor
    authorsFragment.appendChild(authorsList)
}
htmlDataset.search.authors.appendChild(authorsFragment);

//Search Functionality


//Search Functionality
htmlDataset.search.form.addEventListener('submit', (event)=>{
    event.preventDefault();
    htmlDataset.search.overlay.style.display = 'none'
    document.querySelector('[data-list-items]').innerHTML = ''
    const formData = new FormData(event.target)
    const titleSearch = formData.get('title').toLowerCase();
    const genreSearch = formData.get('genre').toLowerCase();
    const authorSearch = formData.get('author').toLowerCase();
const filteredBooks = [];
for (let i = 0; i < books.length; i++) {
  const book = books[i];
    if (genreSearch === 'any' && authorSearch === 'any') {
        if (book.title.toLowerCase().includes(titleSearch)){
        filteredBooks.push(book);
        }
    }
    if (genreSearch === 'any') {
        if (book.title.toLowerCase().includes(titleSearch) && book.author === authorSearch){
            filteredBooks.push(book);
        }
    }

    if (titleSearch === '') {
        if (book.author === authorSearch && book.genres.includes(genreSearch)){
            filteredBooks.push(book);
        }
    }
    if (titleSearch === '' && authorSearch === 'any' ) {
        if (book.genres.includes(genreSearch)){
            filteredBooks.push(book);
        }
   }
    if (filteredBooks.length > 0){
        htmlDataset.list.items.style.display = 'block'
        htmlDataset.list.message.style.display = 'none'
        document.querySelector('[data-list-button]').disabled = true
    } else{
        htmlDataset.list.items.style.display = 'none'
        htmlDataset.list.message.style.display = 'block'
        document.querySelector('[data-list-button]').disabled = true
    }

}
document.querySelector('[data-list-button]').innerHTML =  `Show result (${filteredBooks.length})`

const fragment2 = document.createDocumentFragment()
    for (const {author ,image, title, id , description, published} of filteredBooks) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'>  ${authors[author]}</dt>
        </div>`
        fragment2.appendChild(preview)
        }
    const booklist2 = document.querySelector('[data-list-items]')
    booklist2.append(fragment2)
        document.querySelector('[data-search-form]').reset()
        document.querySelector('[class="backdrop"]').style.display = "none";

        
    })
   

    
