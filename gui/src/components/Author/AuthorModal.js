import { Modal, Button, Input } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import AuthorFilter from './AuthorFilter'

const AuthorModal = () => {

  const [state, setState] = useState({ name: '', visible: false, confirmLoading:false , redirect: false});

  const createAuthor = () => {
        axios.post(`http://127.0.0.1:8000/v1/author/`, {
              name : state.name
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

  const showModal = () => {
    setState({
      visible: true
    });
  };


  const handleOk = () => {

    setState({
      visible: false,
      confirmLoading: false,
      redirect:true
    });
    createAuthor();

  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setState({
      visible: false,
    });
  };
  const { visible, confirmLoading} = state;

  return (
    <div>
        <AuthorFilter data={state.redirect}/>
        <Button type="primary" onClick={showModal}>
          Create Author
        </Button>
        <Modal
          title="Author"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Input
            type="text"
            name="name"
            placeholder="Put a Author name here"
            onChange={ e => changeState('name', e)}
          />
        </Modal>
    </div>
  );
};

export default AuthorModal;
