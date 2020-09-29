const store = {
    bookmarks: [],
    // dont think we need these properties below
    adding: false,
    error: null,
    filter: 1,
};

// Any and all functions manipulating store go here

function addItem() {
    return store.bookmarks.map((bookmark) => {
        return (bookmark.expanded = false);
    });
}

// function findById(id) {
//     return this.store.bookmarks.find((bookmark) => bookmark.id === id);
// }


function addBookmark(bookmark) {
    this.store.bookmarks.push(bookmark);
}


function setFilter(filter) {
    this.store.filter = filter;
}



export default {
    store,
    addItem,
    //findById,
    setFilter,
    addBookmark,

};