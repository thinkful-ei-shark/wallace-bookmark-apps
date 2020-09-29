const store = {
  bookmarks: [],
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

function findById(id) {
  return this.store.bookmarks.find((bookmark) => bookmark.id === id);
}

function bookmarkExpand(id) {
  let foundBookmark = this.store.bookmarks.find(
    (bookmark) => bookmark.id === id
  );
  foundBookmark.expanded = !foundBookmark.expanded;
}

function addBookmark(bookmark) {
  this.store.bookmarks.push(bookmark);
}

function deleteBookmark(id) {
  this.store.bookmarks = this.store.bookmarks.filter(
    (currentBookmark) => currentBookmark.id !== id
  );
}

function setFilter(filter) {
  this.store.filter = filter;
}

function setError(error) {
  this.error = error;
}

export default {
  store,
  addItem,
  findById,
  setError,
  setFilter,
  addBookmark,
  deleteBookmark,
  bookmarkExpand,
};
