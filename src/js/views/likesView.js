import {elements} from './base';

export const togglLike = (isLiked) => {
    const buttonClass = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${buttonClass}`);
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

export const updateLikesPanel = (item) => {
    const html = `
        <li data-likeid=${item.id}>
            <a class="likes__link" href="#${item.id}">
                <figure class="likes__fig">
                    <img src="${item.img}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipes(item.title)}</h4>
                    <p class="likes__author">${item.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesPanel.insertAdjacentHTML('beforeend', html);
}

export const removeFromLikesPanel = (id) => {
    const element = document.querySelector(`[data-likeid="${id}"]`);
    if(element) {
        element.parentElement.removeChild(element);
    }
}

export const setHeartVisibility = (count) => {
    elements.likesSection.style.visibility = count > 0 ? 'visible' : 'hidden';
}

