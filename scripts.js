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
}
)
//------------------------------------------------------------------

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
const showBooks = document.querySelector('[data-list-items]').appendChild(fragment)


const preview = document.querySelector('.preview')


htmlDataset.list.close.addEventListener('click', function() {
    htmlDataset.list.active.close()
})

//More books
const matches = books
let page = 1;
let booksRemaining = matches.length - [page * BOOKS_PER_PAGE]
const bookNotSeen = () => {
const showMore = document.querySelector('[data-list-button]')
const divOFShowMore = document.createElement('div')

const showMoreText = /*html*/
    `
    <span>Show more</span>
    <span class="list__remaining"> (${booksRemaining})</span>
    `
divOFShowMore.innerHTML = showMoreText;
showMore.appendChild(divOFShowMore);
return booksRemaining
}

bookNotSeen()
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
    bookNotSeen()
}
)
const searchPreview = document.querySelector('.preview')

//-------------------------------------------------------------------

//Search buttons to open and close the search form
htmlDataset.header.search.addEventListener('click', function(){
    htmlDataset.search.overlay.show();
}
)
htmlDataset.search.cancel.addEventListener('click', function(){
    htmlDataset.search.overlay.close();
    }
)
//Inside the search form
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
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

//-----------------------------------------------------------------------

// if (!books && !Array.isArray(books)) throw new Error('Source required') 
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// htmlDataset.search.genres.appendChild(genres)

// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// htmlDataset.search.authors.appendChild(authors)




// htmlDataset.list.close.addEventListener('click', function(){
//     htmlDataset.list.active.close()
// })


// htmlDataset.search.form.addEventListener(click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []
// }
// )
//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if (display.length < 1) {
//     data.list.message.class.add('list__message_show')
//     } else {
//         data.list.message.class.remove('list__message_show')
//     }
    

//     htmlDataset.list.items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

    
//     htmlDataset.list.items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     htmlDataset.list.button.disabled = initial > 0

//     htmlDataset.list.button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `//more

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     htmlDataset.search.overlay.open = false//more
// }

// htmlDataset.list.items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     htmlDataset-list-active.open === true
//     htmlDataset.list.blur + htmlDataset.list.image === active.image
//     htmlDataset.list.title === active.title
    
//     htmlDataset.list.subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     htmlDataset.list.description === active.description
// }


