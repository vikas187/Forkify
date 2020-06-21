import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getRecipes() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
        } catch(ex) {
            this.result = "no result returned";
            alert(ex);
        }
    }
}
