export const elements = {
    searchInput: document.querySelector('.search__field'),
    formName: document.querySelector('.search'),
    resultsDiv: document.querySelector('.results'),
    resultsUi: document.querySelector('.results__list'),
    buttonDiv: document.querySelector('.results__pages'),
    recipeDiv: document.querySelector('.recipe'),
    addButton: document.querySelector('.recipe__btn'),
    shoppingList: document.querySelector('.shopping__list'),
    likesPanel: document.querySelector('.likes__list'),
    likesSection: document.querySelector('.likes')
}

export const elementstrings = {
    loader: "loader"
}

export const renderLoader = parent => {
    const loader = `
        <div class=${elementstrings.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);

}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementstrings.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
}
