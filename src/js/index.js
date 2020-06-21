import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
const state = {};

const controlSearch = async (query) => {
    //const query = "pizza";
    if(query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.resultsDiv);

        try {
            await state.search.getRecipes();


            searchView.renderResult(state.search.result);

            clearLoader();
            console.log(state.search.result);
        } catch(ex) {
            console.log("Couldn't get the results");
            clearLoader();
        }
    }
}

elements.formName.addEventListener('submit', e => {
    e.preventDefault();
    const qr = searchView.getInput();
    controlSearch(qr);
});

elements.buttonDiv.addEventListener('click', event => {
    const  button = event.target.closest('.btn-inline');
    if(button) {
        //console.log(button.dataset.goto);
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
})

const controlRecipe = async() => {
    const id = window.location.hash.replace('#', '');
    //Create recipe object
    if(id) {
        state.recipe = new Recipe(id);

        recipeView.clearResults();

        renderLoader(elements.recipeDiv);

        if(state.search) searchView.highlightSelected(id);

        try {
            //get recipe from server
            await state.recipe.getRecipe();


            state.recipe.calcTime();

            state.recipe.calcServings();

            state.recipe.parseIngredients();
            clearLoader();

            recipeView.renderResult(state.recipe, state.like.isLiked(id));


            console.log(state.recipe);
        } catch(ex) {
            console.log("Couldn't get the recipe:" + ex);
            clearLoader();
        }
    
    }
}

//list controller
const controlList = () => {
    if(!state.list) {
        state.list = new List();
        window.l = state.list;
    }
    state.recipe.ingredients.forEach(el=>{
        const item = state.list.addItem(el.count, el.unit, el.ingredients);
        listView.renderElement(item);
    })
}

//event handler of shopping list
elements.shoppingList.addEventListener('click', event=> {
    const ingredient = event.target.closest('.shopping__item');
    if(event.target.matches('.shopping__delete, .shopping__delete *')) {
        const id = ingredient.dataset.itemid;
        state.list.deleteItem(id);
        listView.deleteElement(id);
    }
    if(event.target.matches('.shopping_count_value')) {
        debugger;
        const id = ingredient.dataset.itemid;
        const val = parseFloat(event.target.value, 10);

        state.list.updateItem(id, val)
    }
})

/*
Like controller
*/
const controlLike = () => {
    if(!state.like) {
        state.like = new Likes;
    }
    const currentId = state.recipe.id;
    if(state.like.isLiked(currentId)) {
        state.like.deleteLike(currentId);
        likesView.removeFromLikesPanel(currentId);
        likesView.togglLike(false);

    } else {
        const newLike = state.like.addLike(currentId, state.recipe.title, state.recipe.author, state.recipe.img);
        likesView.updateLikesPanel(newLike);
        likesView.togglLike(true);
    }
    likesView.setHeartVisibility(state.like.getNumLikes());
}

const renderLocalStorge = () => {
    state.like = new Likes;
    state.like.recoverData();
    likesView.setHeartVisibility(state.like.getNumLikes());
    state.like.likes.forEach(el=>{
        likesView.updateLikesPanel(el);
    })
}



//recipe controller
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
window.addEventListener('load', renderLocalStorge);
elements.recipeDiv.addEventListener('click', event => {
    //debugger;
    if(event.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updatesServings('dec');
        }
        recipeView.updateServingsIngredients(state.recipe);
    }
    if(event.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updatesServings('asc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    if(event.target.matches('.recipe__btn, .recipe__btn *')) {
        controlList();
    } else if(event.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});

