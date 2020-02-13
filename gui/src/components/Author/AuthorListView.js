
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Authors from './Author';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom'


const { Search } = Input;

const AuthorList = () => {
  const [state, setState] = useState({ authors: [], name: '', redirect: false })

  // 
  // const setRedirect = () => {
  //   setState({
  //     redirect: true
  //   })
  // }

  const renderRedirect = () => {
    if (state.redirect){
      return <Redirect to='/authors/' />
    }
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/v1/author/')
        .then(res => {
          console.log(res);
            setState({
                authors: res.data.results
            });
        })
  },[state.redirect]);



  const createAuthor = () => {
        axios.post(`http://127.0.0.1:8000/v1/author/`, {
              name : state.name
        }).then(res => {
          if (res.status === 201){
            console.log(">>>>>> CREATE");
            setState(prevState => {
              return{
                ...prevState,
                redirect:true
              }
            })
          }
        })
  }

  const changeState = (key, e) => {
    const value=e.currentTarget.value
    switch (key) {
      case 'name':
        setState(prevState => {
          return {
            ...prevState,
            name : value
          }
        })
        break;
      default:
        return null
    }
  };

  return (

      <div>
          <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
          <Authors updatelist={state.redirect} data={state.authors} />
          <br />
          <h2>Create an author</h2>
          <Input type="text" name="name"  placeholder="Put a Author name here" onChange={ e => changeState('name', e)} />
          <br />
          <Button type="primary" htmlType="submit" onClick={()=>createAuthor()}>Create</Button>
          {renderRedirect()}

      </div>
  )
};

export {AuthorList};
