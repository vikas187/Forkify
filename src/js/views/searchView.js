import {elements} from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.resultsUi.innerHTML = "";
    elements.buttonDiv.innerHTML = "";
}

export const createButton = (type, page) => {
    const button = `
    <button class="btn-inline results__btn--${type=='prev'? 'prev':'next'}" data-goto="${page}">
        <span>Page ${page}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type=='prev'? 'left':'right'}"></use>
        </svg>
    </button>
    `;
    return button;
}

export const highlightSelected = (id) => {
    const arrActive = Array.from(document.querySelectorAll(".results__link"));
    arrActive.forEach(el=>el.classList.remove("results__link--active"));

    const ele = document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}

export const renderPageButton = (page, numPages) => {
    //if this is the first page
    if(page==1 && numPages > 1) {
        const buttonHtml = createButton('next', page+1);
        elements.buttonDiv.insertAdjacentHTML('afterbegin', buttonHtml);
    } 
    //if this is the page in middle
    else if(page>1 && page<numPages) {
        const buttonHtml = `
        ${createButton('prev', page-1)}
        ${createButton('next', page+1)}
        `;
        elements.buttonDiv.insertAdjacentHTML('afterbegin', buttonHtml);
    } 
    //if this is the last page
    else if(page>1 && page==numPages) {
        const buttonHtml = createButton('prev', page-1);
        elements.buttonDiv.insertAdjacentHTML('afterbegin', buttonHtml);
    }
}

const limitRecipes = (title, limit = 17) => {
    const newTitle = [];
    title.split(' ').reduce((acc, curr)=> {
        if(acc + curr.length <= limit) {
            newTitle.push(curr);
        }

        return acc+curr.length;
    }, 0);

    return newTitle.join(' ') + '...';
}
const renderRecipe = recipe => {
    const html = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipes(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.resultsUi.insertAdjacentHTML('beforeend', html);
}

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    const numPages = Math.ceil((recipes.length)/resPerPage);
    renderPageButton(page, numPages);
}