import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthorList from './components/Author/AuthorList';
import {AuthorDetail} from './components/Author/AuthorDetailView';
import BookList from './components/Book/BookList';
import {BookDetail} from './components/Book/BookDetailView';


const BaseRouter = () => (
    <div>
      <Switch>
        <Route exact path='/authors/' component={AuthorList} />
        <Route exact path='/authors/:authorID/' component={AuthorDetail} />
        <Route exact path='/books/' component={BookList} />
        <Route exact path='/books/:bookID/' component={BookDetail} />
        <Route path='*' redirectTo="/authors"/>
      </Switch>
    </div>
);

export default BaseRouter;
