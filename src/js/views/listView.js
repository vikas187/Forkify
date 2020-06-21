import {elements} from './base';

export const renderElement = (item) => {
    const markup = `
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input class="shopping_count_value" type="number" value="${item.count}" step="${item.count}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;

    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
}

export const deleteElement = (id) => {
    const element = document.querySelector(`[data-itemid="${id}"]`);
    //debugger;
    element.parentElement.removeChild(element);
}