import {elements, renderLoader, clearLoader} from './base';
import {Fraction} from 'fractional';

const calFraction = count => {
    if(count) {

        const newCount = Math.round(count * 10000)/10000;
        const [int, dec] = newCount.toString().split('.').map(el=> parseInt(el, 10));
        if(!dec) {
            return newCount;
        }
        if(int === 0 ) {
            const factor = new Fraction(newCount);
            return `${factor.numerator}/${factor.denominator}`;
        } else {
            const factor = new Fraction(newCount-int);
            return `${int} ${factor.numerator}/${factor.denominator}`;
        }
    }
}

export const clearResults = () => {
    elements.recipeDiv.innerHTML = "";
}
export const renderResult = (recipe, isLiked) => {
    let html = `
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">`;
    recipe.ingredients.forEach(ing => {
         html += `
         <li class="recipe__item">
         <svg class="recipe__icon">
             <use href="img/icons.svg#icon-check"></use>
         </svg>
         <div class="recipe__count">${calFraction(ing.count)}</div>
         <div class="recipe__ingredient">
             <span class="recipe__unit">${ing.unit}</span>
             ${ing.ingredients}
         </div>
     </li>
        `;
    })

    html += `</ul>

        <button class="btn-small recipe__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;

    elements.recipeDiv.insertAdjacentHTML('afterbegin', html);
}

export const updateServingsIngredients = (recipe) => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    const ingArray = Array.from(document.querySelectorAll('.recipe__count'));
    ingArray.forEach((el, i) => {
        el.textContent = calFraction(recipe.ingredients[i].count);
    });
}