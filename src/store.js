const store = {
    bookmarks: [],
    // dont think we need these properties below
    //adding: false,
    //error: null,
    filter: 1,

};

// Any and all functions manipulating store go here

const addItem = () => {
    return store.bookmarks.map((bookmark) => {
        return (bookmark.expanded = false);
    });
};

// not using findbyId at all
const findById = id => {
    return this.store.bookmarks.find((bookmark) => bookmark.id === id);
};


const addBookmark = bookmark => {
    store.bookmarks.push(bookmark);
};


const setFilter = filter => {
    this.store.filter = filter;
};

// clears store not using this function at all
function clearStore() {
    this.store.bookmarks = [];
}

function deleteItem(id) {
    this.store.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.id !== id);
    //     let removeIndex = this.store.bookmarks.map(item => item.id).indexOf(id);

    //     ~removeIndex && this.store.bookmarks.splice(removeIndex, 1);
    // 
}


export default {
    store,
    addItem,
    setFilter,
    addBookmark,
    clearStore,
    findById,
    deleteItem
};