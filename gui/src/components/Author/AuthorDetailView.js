
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router"
import { Button, Card, Input } from 'antd';


const AuthorDetail = (props) => {
  const {authorID} = props.match.params;
  const [state, setState] = useState({ name: '', author: [] })
  let history = useHistory()


  useEffect(() => {
  async function fetchData() {
    // You can await here
    const res = await axios.get(`http://127.0.0.1:8000/v1/author/${authorID}/`);
    setState({author: res.data})
  }
  fetchData();
  }, [authorID]);

  const deleteAuthor = (id) => {
        axios.delete(`http://127.0.0.1:8000/v1/author/${id}/`)
          .then(res =>{
            if (res.status === 204){
              history.push('/authors/');
              console.log('>>>>>>> Delete OK');
            }
          });
  }

  const updateAuthor = (id) => {
        axios.put(`http://127.0.0.1:8000/v1/author/${id}/`, {
              name : state.name
        }).then(res => {
          if (res.status === 200){
            history.push('/authors/');
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
      default:
        return null
    }
  };

  return(
    <div>
      <Card title= {state.author.name}  bordered={false}  style={{ width: 300 }}/>
      <p> <Button type="danger" htmlType="submit" onClick={()=>{deleteAuthor(authorID)}}>Delete</Button> </p>
      <p> <Input type="text" name="name" onChange={ e => changeState('name', e.currentTarget.value)} /> </p>
      <p> <Button type="primary" htmlType="submit" onClick={()=>updateAuthor(authorID)}>Update</Button> </p>
    </div>
  );
};

export {AuthorDetail};
