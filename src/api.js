const BASE_URL = 'https://thinkful-list-api.herokuapp.com/thomaswallace/bookmarks';

// This block of code seems to be how everyone is handling API call error handling
// Need explained to me whats happening
const bookmarksApiFetch = (...args) => {
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                error = {
                    code: res.status
                };
                if (!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error);
                }
            }
            return res.json();
        })
        .then(data => {
            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        });
};

function getBookmarks() {
    return bookmarksApiFetch(`${BASE_URL}`);
}



function createBookmark(bookmark) {
    const newBookmark = JSON.stringify(bookmark);
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: newBookmark
    };
    return bookmarksApiFetch(`${BASE_URL}`, options);
}

const deleteBookmark = (id) => {
    return bookmarksApiFetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
};


export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
};