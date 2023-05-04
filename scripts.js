import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";
import { htmlDataset } from "./htmlSelector.js";

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
//-------------------------------------------------------------------

//Search buttons
htmlDataset.header.search.addEventListener('click', function(){
    htmlDataset.search.overlay.show();
}
)
htmlDataset.search.cancel.addEventListener('click', function(){
    htmlDataset.search.overlay.close();
    }
)

//------------------------------------------------------------------

//Displays the books on html
const fragment = document.createDocumentFragment()

const createPreview = ({ author, image, title, id }) => {
    const preview = document.createElement('div')
    preview.classList.add('preview')
    //preview.setAttribute('data-preview-id', id)

    const displayHtml = /* html */
    `
        <img class="preview__image" src="${image}"/>
        <div class="preview__info">
        <h2 class="preview__title">${title}</h2>
        <div class="preview__author">${authors[author]}</div>
        </div>
    `
    preview.innerHTML = displayHtml
    fragment.appendChild(preview)
    return preview
}

const matches = books
let page = 1;

let booksRemaining = matches.length - [page * BOOKS_PER_PAGE]
const showMore = document.querySelector('[data-list-button]')
const divOFShowMore = document.createElement('div')

const showMoreText = /*html*/
    `
    <span>Show more</span>
    <span class="list__remaining"> (${booksRemaining})</span>
    `
divOFShowMore.innerHTML = showMoreText;
showMore.appendChild(divOFShowMore);

let extracted = books.slice(0, 36)
for (const { author, image, title, id } of extracted) {

    createPreview({
                                    author,
                                    id,
                                    image,
                                    title
                                })
}
const showBooks = document.querySelector('[data-list-items]').appendChild(fragment)

htmlDataset.list.button.addEventListener('click', function (event) {
    event.preventDefault();   
        page += 1;
        let rangeLast = page * BOOKS_PER_PAGE
        let rangeFirst = rangeLast - 36
        extracted = books.slice(rangeFirst, rangeLast)
        console.log(page)
        console.log(rangeLast)
    
    for (const { author, image, title, id } of extracted) {

        createPreview({
                    author,
                    id,
                    image,
                    title
                })
    }
    document.querySelector('[data-list-items]').appendChild(fragment)

}
)


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


