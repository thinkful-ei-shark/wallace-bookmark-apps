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

// not using findbyId at all
function findById(id) {
    return this.store.bookmarks.find((bookmark) => bookmark.id === id);
}


function addBookmark(bookmark) {
    this.store.bookmarks.push(bookmark);
}


function setFilter(filter) {
    this.store.filter = filter;
}

// clears store not using this function at all
function clearStore() {
    this.store.bookmarks = [];
}

function deleteBookmark(id) {
    this.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.id !== id);
}


export default {
    store,
    addItem,
    setFilter,
    addBookmark,
    clearStore,
    findById,
    deleteBookmark
};