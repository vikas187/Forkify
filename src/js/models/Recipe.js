import axios from 'axios';

export default class Recipe {

    constructor(id) {
        this.id = id;
    }

    async getRecipe(){
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(ex) {
            console.log(ex);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods*15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        console.log(this.ingredients);

        const newIngredients = this.ingredients.map(el=> {
            let ingredients = el.toLowerCase();
            unitsLong.forEach((ul, i) => {
                ingredients = ingredients.replace(ul, unitsShort[i]);
            });

            ingredients = ingredients.replace(/ *\([^)]*\) */g, ' ');

            const arrIng = ingredients.split(' ');
            const ingUnit = arrIng.findIndex(el1 => units.includes(el1));
            let objIng;

            //if we found the unit
            if(ingUnit > -1) {
                const arrCount = arrIng.slice(0, ingUnit);
                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0,ingUnit).join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[ingUnit],
                    ingredients: arrIng.slice(ingUnit+1).join(' ')
                }
            }
            //if we didnt find the unit but there is a number
            else if(parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: "",
                    ingredients: arrIng.slice(1).join(' ')
                };
            }
            //if we didnt find  any unit or number
            else if(ingUnit === -1) {
                objIng = {
                    count: 1,
                    unit: "",
                    ingredients
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updatesServings(type){
        const newServings = type == "dec" ? this.servings-1 : this.servings+1;
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings/this.servings);
        })
        this.servings = newServings;
    }
}