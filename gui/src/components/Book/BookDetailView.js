
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router"
import { Button, Card, Input, Collapse } from 'antd';
import SelectAuthorBook from './select'

const { Panel } = Collapse;

const BookDetail = (props) => {
  const {bookID} = props.match.params;
  const [state, setState] = useState({book: [], name: '', summary:'', author: [] })
  const [books, setBook] = useState(0);
  const [authors, setAuthor] = useState([]);

  let history = useHistory()

  useEffect(() => {
  async function fetchData() {
    const res = await axios.get(`http://127.0.0.1:8000/v1/book/${bookID}/`);
    // setState({book: res.data})
    setBook(res.data)
  }
  fetchData();
  }, [bookID]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`http://127.0.0.1:8000/v1/book/${bookID}/author/`);
      let responseData = res.data
      setAuthor(responseData);
    };
    fetchData();
  }, [bookID]);


  const deleteBook = (id) => {
        axios.delete(`http://127.0.0.1:8000/v1/book/${id}/`)
          .then(res =>{
            if (res.status === 200 || 204){
              history.push('/books/');
            }
          });
  }

  const updateBook = (id) => {
        axios.put(`http://127.0.0.1:8000/v1/book/${id}/`, {
              name : state.name,
              summary : state.summary,
              author : state.author

        }).then(res => {
          if (res.status === 200 || 204){
            history.push('/books/');
          }
        });

  }

  const changeState = (key, value) => {
    setState(prevState => {
      return {
        ...prevState,
        [key]: value
      }
    })
  };

  const handleChange = (value) => {
    setState(prevState => {
      return{
        ...prevState,
        author:value
      }
    });
  }


  return(
    <div>
      <Card title= {books.name}  bordered={false}  style={{ width: 300 }}>
        <p>{books.summary}</p>

      <Collapse defaultActiveKey={['1']}>
        <Panel header="Authors" key="1">
          <ul>
            {authors.map((author) =>
                <li key={author.id}>
                    {author.name}
                </li>
            )}
          </ul>
        </Panel>
      </Collapse>
      </Card>
      <br />
      <Button type="danger" htmlType="submit" onClick={()=>{deleteBook(bookID)}}>Delete</Button>
      <h2>Update an Book</h2>
      <Input type="text" name="name"  placeholder="Update Book name here" onChange={ e => changeState('name', e.currentTarget.value)} />
      <Input type="text" name="summary"  placeholder="Update Summary here" onChange={ e => changeState('summary', e.currentTarget.value)} />
      <SelectAuthorBook data={handleChange}/>
       <Button type="primary" htmlType="submit" onClick={()=>updateBook(bookID)}>Update</Button>
    </div>
  );
};

export {BookDetail};
