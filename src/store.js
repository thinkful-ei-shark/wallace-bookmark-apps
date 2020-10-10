const store = {
    bookmarks: [],
    filter: 1,

};




const addBookmark = bookmark => {
    store.bookmarks.push(bookmark);
};


const setFilter = filter => {
    this.store.filter = filter;
};


function deleteItem(id) {
    this.store.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.id !== id);
    //     let removeIndex = this.store.bookmarks.map(item => item.id).indexOf(id);
    //     ~removeIndex && this.store.bookmarks.splice(removeIndex, 1);

}


export default {
    store,
    setFilter,
    addBookmark,
    deleteItem
};