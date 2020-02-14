
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router"
import { Button, Card, Input } from 'antd';
import SelectAuthorBook from './select'


const BookDetail = (props) => {
  const {bookID} = props.match.params;
  const [state, setState] = useState({book: [], name: '', summary:'', author: [] })
  let history = useHistory()


  useEffect(() => {
  async function fetchData() {
    const res = await axios.get(`http://127.0.0.1:8000/v1/book/${bookID}/`);
    setState({book: res.data})
  }
  fetchData();
  }, [bookID]);


  const deleteBook = (id) => {
        axios.delete(`http://127.0.0.1:8000/v1/book/${id}/`)
          .then(res =>{
            if (res.status === 204){
              history.push('/books/');
              console.log('>>>>>>> Delete OK');
            }
          });
  }

  const updateBook = (id) => {
        axios.put(`http://127.0.0.1:8000/v1/book/${id}/`, {
              name : state.name,
              summary : state.summary,
              author : state.author

        }).then(res => {
          if (res.status === 200){
            history.push('/books/');
          }
        });

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

  const names = state.book.map(author => {
    return author.name
  })


  return(
    <div>
      <Card title= {state.book.name}  bordered={false}  style={{ width: 300 }}>
        <p>{state.book.summary}</p>
        <p>{state.book.author}</p>

      </Card>
      <br />
      <Button type="danger" htmlType="submit" onClick={()=>{deleteBook(bookID)}}>Delete</Button>
      <h2>Update an Book</h2>
      <Input type="text" name="name"  placeholder="Put a Author name here" onChange={ e => changeState('name', e.currentTarget.value)} />
      <Input type="text" name="summary"  placeholder="Put a Summary here" onChange={ e => changeState('summary', e.currentTarget.value)} />
      <SelectAuthorBook data={handleChange}/>
      <p> <Button type="primary" htmlType="submit" onClick={()=>updateBook(bookID)}>Update</Button> </p>
    </div>
  );
};

export {BookDetail};
