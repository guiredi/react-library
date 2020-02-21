import { Modal, Button, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import BookFilter from './BookFilter'
const { Option } = Select;

const BookModal = () => {
  const [state, setState] = useState({name: '', summary: '', author: [],  visible: false, confirmLoading:false , redirect: false})
  const [stateAuthors, setStateAuthors] = useState({ authors: []})

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get('http://127.0.0.1:8000/v1/author/');
      setStateAuthors({
        authors: res.data.results
      });
    };
    fetchData();
  }, []);

  const names = stateAuthors.authors.map(author => {
    return author.name
  })

  const children = [];
  names.forEach((item, i) => {
    children.push(<Option key={i} value={item}>{item}</Option>)
  });

  const renderRedirect = () => {
    if (state.redirect){
      return <Redirect to='/authors/' />
    }
  }

  const createAuthor = () => {
        axios.post(`http://127.0.0.1:8000/v1/book/`, {
              name : state.name,
              summary: state.summary,
              author: state.author
        }).then(res => {
          if (res.status === 201){
            setState(prevState => {
              return{
                ...prevState,
                redirect:true
              }
            });
          }
        });
  };

  const changeState = (key, value) => {
    setState(prevState => {
      return {
        ...prevState,
        [key]: value
      }
    })
  };

  const showModal = () => {
    setState({
      visible: true
    });
  };

  const handleOk = () => {
    setState({
      visible: false,
      confirmLoading: false,
    });
    createAuthor();
    renderRedirect();
  };

  const handleCancel = () => {
    setState({
      visible: false,
    });
  };
  const { visible, confirmLoading} = state;

  console.log(state)

  return (
    <div>
      <BookFilter data={state.redirect}/>
      <Button type="primary" onClick={showModal}>
        Create Book
      </Button>
      <Modal
        title="Create a Book"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
      <Input type="text"
             name="name"
             placeholder="Put a Book name here"
             onChange={ e => changeState('name', e.currentTarget.value)}
      />
      <Input type="text"
             name="summary"
             placeholder="Put a Summary here"
             onChange={ e => changeState('summary', e.currentTarget.value)}
      />
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select authors"
        onChange={e => changeState('author', e)}
      >
        {children}
      </Select>
      </Modal>
    </div>
  );


}

export default BookModal;
