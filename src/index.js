import $ from 'jquery';
import './styles.css';
import templates from './templates';
import api from './api';
import store from './store';

function init() {
    api.getBookmarks().then((bookmarks) => {
        bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
        store.addItem();
        templates.render();
    });

    templates.bindEventHandlers();
}

$(init);