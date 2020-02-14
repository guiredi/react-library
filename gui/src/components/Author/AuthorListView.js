
import React from 'react';
import AuthorModal from './AuthorModal'
import AuthorFilter from './AuthorFilter'


const AuthorList = () => {

  return (

      <div>
          <AuthorFilter />
          <br />
          <AuthorModal />
      </div>
  )
};

export {AuthorList};
