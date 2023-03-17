let films = JSON.parse(localStorage.getItem('films'));

const root = document.getElementById("root");
root.className = 'container';
let filmsContainer = document.createElement('div');
filmsContainer.className = 'container__film-list';
let filmList = document.createElement('div');
filmList.className = 'container__film-list__container';
let addButton = document.createElement('div');
addButton.className = 'container__film-list__button-container';
addButton.innerHTML = `<a class="container__film-list__button-container--link" href="#/add">Add new film</a>`;
filmsContainer.appendChild(filmList);
filmsContainer.appendChild(addButton);


let filmPreview = document.createElement('div');
filmPreview.className = 'container__film-preview';


root.appendChild(filmsContainer);
root.appendChild(filmPreview);
createList();

function createList() {
    let storageFilm = JSON.parse(localStorage.getItem('films'));
    clearChild('.container__film-list__container');
    for (let item of storageFilm) {
        let itemContainer = document.createElement('div');
        itemContainer.className = 'container__film-list__container__item';
        itemContainer.innerHTML = `
        <a class="container__film-list__container__item--title" href="#/preview?id=${item.id}">${item.title}</a>
        <a class="container__film-list__container__item--edit" href="#/edit?id=${item.id}">edit</a>
    `;
        filmList.appendChild(itemContainer);
    }
}

function showPreview() {
    let film = getFilm(window.location.hash);
    filmPreview.className = "container__film-preview";
    filmPreview.innerHTML = `
        <img src="${film.imageUrl}" class="container__film-preview--img" />
        <h2 class="container__film-preview--title">${film.title}</h2>
        <p class="container__film-preview--category">${film.category}</p>
        <p class="container__film-preview--plot">${film.plot}</p>
    `;
}

function showAdd() {
    let title;
    let category;
    let imageUrl;
    let plot;
    filmPreview.className = "add-new";
    filmPreview.innerHTML = `
        <h1 class="add-new--title">Add new film</h1>
        <p class="add-new--describe">New title:</p>
        <input id="newFilmTitle" type="text" class="add-new--input"/>
        <p class="add-new--describe">New image link:</p>
        <input id="newFilmImage" type="url" class="add-new--input"/>
        <p class="add-new--describe">New categories:</p>
        <input id="newFilmCategory" type="text" class="add-new--input"/>
        <p class="add-new--describe">New description:</p>
        <textarea id="newFilmPlot" class="add-new--input-plot"></textarea>
        <div class="add-new__button-container">
            <button id="cancelNewFilm" class="add-new__button-container--cancel">Cancel</button>
            <button id="saveNewFilm" class="add-new__button-container--save">Add new Film</button>
        </div>
    `;
    let createTitle = document.getElementById('newFilmTitle');
    createTitle.addEventListener('change', (event) => {
        title = event.target.value;
    });

    let createImage = document.getElementById('newFilmImage');
    createImage.addEventListener('change', (event) => {
        imageUrl = event.target.value;
    });

    let createCategory = document.getElementById('newFilmCategory');
    createCategory.addEventListener('change', (event) => {
        category = event.target.value;
    });

    let createPlot = document.getElementById('newFilmPlot');
    createPlot.addEventListener('change', (event) => {
        plot = event.target.value;
    });

    let cancel = document.getElementById('cancelNewFilm');
    cancel.addEventListener('click', () => {
        let userQuestion = confirm('Do you want remove change?');
        if (userQuestion) {
            history.back();
        }
    });
    let addNewFilm = document.getElementById('saveNewFilm');
    addNewFilm.addEventListener('click', () => {
        let checkField = true;
        const checkValue = () => {
            checkField = false;
        }
        let newFilm = {
            id: `${films.length + 1}`,
            title: title || checkValue(),
            category: category || checkValue(),
            imageUrl: imageUrl || checkValue(),
            plot: plot || checkValue()
        };
        if (checkField) {
            films.push(newFilm);
            localStorage.setItem('films', JSON.stringify(films));
            createList();
            window.location.hash = `#/preview?id=${newFilm.id}`;
        } else {
            alert('Please fill in all fields!');
        }
    });
}

function showEdit() {
    let film = getFilm(window.location.hash);
    let changeFilm = {
        id: film.id,
        title: null,
        category: null,
        imageUrl: null,
        plot: null
    };
    filmPreview.className = "container__film-edit";
    filmPreview.innerHTML = `
        <h1 class="container__film-edit--title">Change film: ${film.title}</h1>
        <p class="container__film-edit--describe">New image link:</p>
        <input id="inputLink" type="url" value="${film.imageUrl}" class="container__film-edit--input"/>
        <p class="container__film-edit--describe">New title:</p>
        <input id="inputTitle" type="text" value="${film.title}" class="container__film-edit--input"/>
        <p class="container__film-edit--describe">New categories:</p>
        <input id="inputCategory" type="text" value="${film.category}" class="container__film-edit--input"/>
        <p class="container__film-edit--describe">New description:</p>
        <textarea id="inputPlot" class="container__film-edit--input-plot">${film.plot}</textarea>
        <div class="container__film-edit__button-container">
            <button id="cancelButton" class="container__film-edit__button-container--cancel">Cancel</button>
            <button id="saveButton" class="container__film-edit__button-container--save">Save</button>
        </div>
    `;
    let inputLink = document.getElementById('inputLink');
    inputLink.addEventListener('change', (event) => {
        changeFilm.imageUrl = event.target.value;
    });
    let inputTitle = document.getElementById('inputTitle');
    inputTitle.addEventListener('change', (event) => {
        changeFilm.title = event.target.value;
    });
    let inputCategory = document.getElementById('inputCategory');
    inputCategory.addEventListener('change', (event) => {
        changeFilm.category = event.target.value;
    });
    let inputPlot = document.getElementById('inputPlot');
    inputPlot.addEventListener('change', (event) => {
        changeFilm.plot = event.target.value;
    });
    let buttonCancel = document.getElementById('cancelButton');
    buttonCancel.addEventListener('click', () => {
        let userQuestion = confirm('Do you want cancel change?');
        if (userQuestion) {
            window.location.hash = `#/preview?id=${film.id}`;
        };
    })
    let buttonSave = document.getElementById('saveButton');
    buttonSave.addEventListener('click', () => {
        let userQuestion = confirm('Do You want save change?');
        if (userQuestion) {
            let result = {
                id: film.id,
                title: changeFilm.title || film.title,
                category: changeFilm.category || film.category,
                imageUrl: changeFilm.imageUrl || film.imageUrl,
                plot: changeFilm.plot || film.plot
            }
            for (let i = 0; i < films.length; i++) {
            if (films[i].id === film.id) {
                films[i] = result;
            }
        };
        localStorage.setItem('films', JSON.stringify(films));
        createList();
        window.location.hash = `#/preview?id=${film.id}`;
        }
    });
}

function showHome() {
    filmPreview.innerHTML = "<div></div>";
}

function onRouteChange() {
    let path = window.location.hash;
    path = path.split('?')[0];
    switch (path) {
        case "#/preview":
            showPreview();
            break;
        case "#/edit":
            showEdit();
            break;
        case "#/add":
            showAdd();
            break;
        default:
            showHome();
            break;
    }
}

window.onhashchange = onRouteChange;

onRouteChange();

function getFilm (hash) {
    let filmId = hash.split('=')[1];
    for (let film of films) {
        if (film.id === filmId) {
            return film;
        }
    }
}

function clearChild(selector) {
    let container = document.querySelector(selector);
    if (!container.firstChild) {
        return;
    };
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    };
}

