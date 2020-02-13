
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Books from './Book';
import { Input, Button, Select } from 'antd';
import { Redirect } from 'react-router-dom'

const { Search } = Input;
const { Option } = Select;
const BookList = () => {
  const [state, setState] = useState({ books: [], name: '', summary: '', author: [], redirect: false })
  const [stateAuthors, setStateAuthors] = useState({ authors: []})

  const setRedirect = () => {
    setState({
      redirect: true
    })
  }

  const renderRedirect = () => {
    if (state.redirect){
      return <Redirect to='/books/' />
    }
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/v1/book/')
        .then(res => {
          console.log(res);
            setState({
                books: res.data.results
            });
        })
        axios.get('http://127.0.0.1:8000/v1/author/')
             .then(response => {
              // console.log({authors:response.data.results});
                setStateAuthors({
                    authors: response.data.results
                  });
                });
  },[state.redirect]);

  const names = stateAuthors.authors.map(author => {
    return author.name
  })
  console.log(names);

  const children = [];
  names.forEach((item, i) => {
    children.push(<Option key={i} value={item}>{item}</Option>)
  });


  const createAuthor = () => {
        axios.post(`http://127.0.0.1:8000/v1/book/`, {
              name : state.name,
              summary: state.summary,
              author: state.author
        }).then(res => {
          if (res.status === 201){
            console.log(">>>>>> CREATE OK");
            setState(prevState => {
              return{
                ...prevState,
                redirect:true
              }
            })
          }
        })
  }

  const changeState = (key, value) => {
    switch (key) {
      case 'name':
        setState(prevState => {
          return {
            ...prevState,
            name: value
          }
        })
        break;
      case 'summary':
        setState(prevState => {
          return {
            ...prevState,
            summary: value
          }
        })
        break;
      default:
        return null
    }
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
    setState(prevState => {
      return{
        ...prevState,
        author:value
      }
    })
  }

  return (

      <div>
          <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
          <Books data={state.books} />
          <br />
          <h2>Create an Book</h2>
          <Input type="text" name="name"  placeholder="Put a Author name here" onChange={ e => changeState('name', e.currentTarget.value)} />
          <Input type="text" name="summary"  placeholder="Put a Summary here" onChange={ e => changeState('summary', e.currentTarget.value)} />
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChange}
          >
            {children}
          </Select>
          <br />
          <Button type="primary" htmlType="submit" onClick={()=>createAuthor()}>Create</Button>
          {renderRedirect()}

      </div>
  )
};

export {BookList};
