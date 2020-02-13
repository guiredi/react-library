import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {AuthorList} from './components/Author/AuthorListView';
import {AuthorDetail} from './components/Author/AuthorDetailView';
import {BookList} from './components/Book/BookListView';
import {BookDetail} from './components/Book/BookDetailView';
import BookFilter from './components/Book/BookFilter';

const BaseRouter = () => (
    <div>
      <Switch>
        <Route exact path='/authors/' component={AuthorList} />
        <Route exact path='/authors/:authorID/' component={AuthorDetail} />
        <Route exact path='/books/' component={BookList} />
        <Route exact path='/books/:bookID/' component={BookDetail} />
        <Route exact path='/filter' component={BookFilter} />
      </Switch>
    </div>
);

export default BaseRouter;
