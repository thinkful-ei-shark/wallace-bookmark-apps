import $ from 'jquery';
import store from './store';
import api from './api';



/*******TEMPLATES***************** */

function generateHomeTemplate() {
    // this function will be for New bookmark button and filer by drop down box
    return `
    <h1>Bookmark App</h1>
    <div class="header-container">
        <form class="new-bookmark">
        <button class="general-btn">New Bookmark!</button>
        <select class="ratingFilter">
        <option value="1">1 or higher</option>
        <option value="2">2 or higher</option>
        <option value="3">3 or higher</option>
        <option value="4">4 or higher</option>
        <option value="5">5 + </option>
        </select>
    </div>
    </form>` + generateBookmarks();
}

function addBookmarkTemplate() {
    return `<h3 class="form-heading">Add New Bookmark</h3>
  <section class="addBookmarkSection">
      <form class="addBookmarkForm" id="addBookmarkForm">
        <div>
            <label for="add-bookmark-url">Enter Url:</label>
            <input type="text" class="full-width" id="add-bookmark-url" name="url" required>
        </div>
        <div>
            <label for="add-bookmark-title">Enter Title:</label>
            <input type="text" class="full-width" id="add-bookmark-title" name="title" required>
        </div>
        <div class="rating-dropdown">
        <label>Rating:</label>
            <select class="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
        </div>
        
        <div class="description-div">
            <label for="bookmark-textarea" class="desc-label">Add a description:</label><br>
            <textarea name="desc" id="bookmark-textarea" rows="5" required></textarea>
        </div>
        <div class="form-buttons" id="form-buttons">
          <input type="button" class="general-btn" value="Cancel" id="cancel-add-bookmark">
          <input type="button" class="general-btn" value="Create" id="submit-newBookmark">
        </div>
      </form>
    </section>
    `;
}

const generateBookmarks = () => {
    let content = '';
    let bookmarks = filterByRating();
    // for loop Stephen showed me
    for (let i in bookmarks) {
        content += `
        <div class="book-container" data-item-id=${bookmarks[i].id}>
            <div class="condensed">
                <h4 class="bookmark-name">${bookmarks[i].title}</h4>
                <h4>Rating: ${bookmarks[i].rating}</h4>
                <input type="button" class="expand-button general-btn" value="Expand">
            </div>
            <div class = "expanded hidden">
            <input type="button" class="general-btn" onclick="location.href='${bookmarks[i].url}'" target="_blank" value="Visit Site" />
                <input type="button" class="delete-button general-btn" value="Delete">
                <p>${bookmarks[i].desc}</p>
            </div>
        </div>
        `;
    }
    return content;
};

// this gets the bookmark ID from closest element to current event
// which would be itself
const getBookmarkIdFromElement = function (item) {
    return $(item)
        .closest('.book-container')
        .data('item-id');
};

/************EVENT LISTENERS***************** */

const deleteBookmark = () => {
    $('.delete-button').on('click', (event) => {
        const id = getBookmarkIdFromElement(event.currentTarget);
        // delete item from api
        api.deleteBookmark(id);
        // need to delete current item from store here
        store.deleteItem(id);
        render();
    });
};


// toggles hidden class so visit site btn delete btn and descriptions show
const expandBookmark = () => {
    $('.expand-button').on('click', (event) => {
        // navigates DOM from currentTarget to hidden 
        // expanded bookmark and toggles class so it shows
        $($(event.currentTarget).parent().parent().children()[1]).toggleClass('hidden');
    });
};


const newBookmarkButtonSubmit = () => {
    $('.main').submit((event) => {
        event.preventDefault();
        let content = addBookmarkTemplate();
        $('.main').html(content);
        newBookmarkSubmitHandler();
        newBookmarkCancelHandler();
    });
};

// new bookmark submit btn handler
const newBookmarkSubmitHandler = function () {
    // on newbookmark submit btn
    $('#submit-newBookmark').on('click', (event) => {
        event.preventDefault();
        let obj = {
            url: $('#add-bookmark-url').val(),
            title: $('#add-bookmark-title').val(),
            rating: $('.rating').val(),
            desc: $('#bookmark-textarea').val(),
        };
        if (obj.url === '') {
            alert('Please enter a valid URL!');
        } else if (obj.title === '') {
            alert('Please enter a title!');
        } else {
            // calls a PUT fetch to api bookmarks to add bookmark to API
            api.createBookmark(obj).then(bookmark => {
                // add new bookmark to store
                store.addBookmark(bookmark);
                $('.main').html('');
                render();
            });
        }

    });
};

// Cancel add bookmark button
const newBookmarkCancelHandler = function () {
    $('#cancel-add-bookmark').on('click', (event) => {
        event.preventDefault();
        $('.main').html('');
        render();
    });

};

/*********Filter functions******* */

const filterByRating = () => {
    let bookmarkRating = store.store.filter;
    return store.store.bookmarks.filter((item) => {
        return item.rating >= bookmarkRating;
    });
};


const filterRatingHandler = () => {
    $('.ratingFilter').on('change', () => {
        store.store.filter = $('.ratingFilter').val();
        render();
    });
};

/*************************RENDER********************** */
function render() {
    $('.main').html(generateHomeTemplate());
    bindEventHandlers();
}


/*************EXPORT*********************** */
function bindEventHandlers() {
    newBookmarkButtonSubmit();
    filterRatingHandler();
    newBookmarkSubmitHandler();
    expandBookmark();
    deleteBookmark();
    getBookmarkIdFromElement();
}
export default {
    bindEventHandlers,
    render,
};
