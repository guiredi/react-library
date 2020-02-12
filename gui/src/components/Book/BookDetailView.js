
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router"
import { Button, Card, Input, Select } from 'antd';

const { Option } = Select;

const BookDetail = (props) => {
  const {bookID} = props.match.params;
  const [state, setState] = useState({book: [], name: '', summary:'', authors: '' })
  let history = useHistory()

  useEffect(() => {
  async function fetchData() {
    const res = await axios.get(`http://127.0.0.1:8000/v1/book/${bookID}/`);
    setState({book: res.data})
  }
  fetchData();
  }, [bookID]);

  console.log(state.book.author);

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
              authors : state.authors

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
          case 'authors':
            setState(prevState => {
              return {
                ...prevState,
                authors: value
              }
            })
            break;
      default:
        return null
    }
  };

  return(
    <div>
      <Card title= {state.book.name}  bordered={false}  style={{ width: 300 }}/>
      <p> <Button type="danger" htmlType="submit" onClick={()=>{deleteBook(bookID)}}>Delete</Button> </p>
      <p> <Input type="text" name="name" onChange={ e => changeState('name', e.currentTarget.value)} /> </p>
      <p> <Button type="primary" htmlType="submit" onClick={()=>updateBook(bookID)}>Update</Button> </p>
    </div>
  );
};

export {BookDetail};
