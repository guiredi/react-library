
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router"
import { Button, Card, Input, Collapse } from 'antd';

const { Panel } = Collapse;

const AuthorDetail = (props) => {
  const {authorID} = props.match.params;
  // const {match {[params { authorID }]}} = props
  const [state, setState] = useState({ name: '', author: []})
  const [books, setBook] = useState([]);
  let history = useHistory()


  useEffect(() => {
  async function fetchData() {
    const res = await axios.get(`http://127.0.0.1:8000/v1/author/${authorID}/`);
    setState({author: res.data})
  }
  fetchData();
  }, [authorID]);


  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`http://127.0.0.1:8000/v1/author/${authorID}/book/`);
      let responseData = res.data
      setBook(responseData);
    };
    fetchData();
  }, [authorID]);

  const deleteAuthor = (id) => {
        axios.delete(`http://127.0.0.1:8000/v1/author/${id}/`)
          .then(res =>{
            if (res.status === 200 || 204){
              history.push('/authors/');
            }
          })
  }


  const updateAuthor = (id) => {
        axios.put(`http://127.0.0.1:8000/v1/author/${id}/`, {
              name : state.name
        }).then(res => {
          if (res.status === 200 || 204){
            history.push('/authors/');

          }
        });

  }

  const changeState = (value) => {
    setState(prevState => {
      return {
        ...prevState,
        name: value
      }
    })
  };


  return(
    <div>
      <Card title= {state.author.name}  bordered={false}  style={{ width: 300 }}/>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Author Books" key="1">
          <ul>
            {books.map((book) =>
                <li key={book.id}>
                    {book.name}
                </li>
            )}
          </ul>
        </Panel>
      </Collapse>
      <br />
      <p> <Button type="danger" htmlType="submit" onClick={()=>{deleteAuthor(authorID)}}>Delete</Button> </p>
      <p> <Input type="text" name="name"  placeholder= "Update author name" onChange={ e => changeState(e.currentTarget.value)}  /> </p>
      <p> <Button type="primary" htmlType="submit" onClick={()=>updateAuthor(authorID)}>Update</Button> </p>
    </div>
  );
};

export {AuthorDetail};
