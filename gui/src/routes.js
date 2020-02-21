import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthorModal from './components/Author/AuthorModal';
import {AuthorDetail} from './components/Author/AuthorDetailView';
import BookModal from './components/Book/BookModal';
import {BookDetail} from './components/Book/BookDetailView';


const BaseRouter = () => (
    <div>
      <Switch>
        <Route exact path='/authors/' component={AuthorModal} />
        <Route exact path='/authors/:authorID/' component={AuthorDetail} />
        <Route exact path='/books/' component={BookModal} />
        <Route exact path='/books/:bookID/' component={BookDetail} />
        <Route path='*' redirectTo="/authors"/>
      </Switch>
    </div>
);

export default BaseRouter;
