import React, { useState } from 'react';
import axios from 'axios';


const AuthorGetByID = (props) => {
  const {authorID} = props.match.params;

  const renderAuthorById =() => {
    axios.get(`http://127.0.0.1:8000/v1/author/${authorID}/`)
    .then(res => {
      data = res.data.name;
      console.log(data);
    }).catch(function(error) {
         console.log(error.response.data);
      });
    return data;
  };



const AuthorGetAll = () => {
  state = {
      authors: []
  }
  componentDidMount() {
      axios.get('http://127.0.0.1:8000/v1/author/')
          .then(res => {
            console.log(res);
              this.setState({
                  authors: res.data.results
              });
          })
  }
};

const AuthorDelete = (id) => {
  axios.delete(`http://127.0.0.1:8000/v1/author/${id}`)
  .then(res => {
    if (res.status === 204) {
      this.props.history.push(`/`);
    }
  })
};


const AuthorUpdate = (id) => {
  await axios.put(`http://127.0.0.1:8000/v1/author/${id}/`{
        name : state.name
  })
        .then(res => {
          if (res.status === 201) {
            this.props.history.push(`/authors/`);
            console.log('deu bom');
          }
};

const AuthorCreate = (props) => {
  await axios.post("http://127.0.0.1:8000/v1/author/")
    .then(res => {
      if (res.status === 201) {
        this.props.history.push(`/authors/`);
        console.log('deu bom');
      }
    })
};

export {AuthorGetAll};
