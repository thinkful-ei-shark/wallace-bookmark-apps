// Base URL fir API requests
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/thomaswallace/bookmarks';

// blueprint for every api request (saves rewriting code)
const bookmarksApiFetch = (...args) => {
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                alert('Something went wrong! URL must start with https://!');
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

const getBookmarks = () => bookmarksApiFetch(`${BASE_URL}`);


const createBookmark = bookmark => {
    const newBookmark = JSON.stringify(bookmark);
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: newBookmark
    };
    return bookmarksApiFetch(`${BASE_URL}`, options);
};

// delete bookmark from API function 
const deleteBookmark = (id) => {
    return bookmarksApiFetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
};


export default {
    getBookmarks,
    createBookmark,
    deleteBookmark,
    bookmarksApiFetch
};
