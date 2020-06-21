export default class Likes {
    constructor() {
        this.likes = [];

    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };

        this.likes.push(like);
        this.persistData();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el=> el.id===id);
        this.likes.splice(index,1);
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el=> el.id===id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    getLike(id) {
        const index = this.likes.findIndex(el=> el.id===id);
        return this.likes[index];
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    recoverData() {
        const likes = localStorage.getItem('likes');
        if(likes) {
            this.likes = JSON.parse(likes);
        }
    }
}