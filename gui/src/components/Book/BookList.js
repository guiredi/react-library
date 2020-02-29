import { Modal, Button, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Books from './Book';


const { Option } = Select;


const BookList = () => {
  
  const [state, setState] = useState({name: '', summary: '', author: [],  visible: false, confirmLoading:false})
  const [stateAuthors, setStateAuthors] = useState({ authors: []})
  const [data, setData] = useState([]);
  const [enteredFilter, setEnteredFilter] = useState("");
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    setRedirect(false)
    const fetchData = async () => {
      let res = await axios.get('http://127.0.0.1:8000/v1/book/');
      let responseData = res.data.results
      let filteredData = responseData.filter(item => {
        return item.name.includes(enteredFilter);
      });
      setData(filteredData);
    };
    fetchData();
  }, [enteredFilter, redirect])

  const redirectBook = () => {
    if (redirect){
      return <Redirect to='/v1/book/'/>;
    }
  }

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


  const createBook = () => {
        axios.post(`http://127.0.0.1:8000/v1/book/`, {
              name : state.name,
              summary: state.summary,
              author: state.author
        }).then(res => {
          if (res.status === 201){
            setRedirect(true)
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
    createBook();
    setRedirect(true);
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
    <div>
        <input
          placeholder="Search Names"
          value={enteredFilter}
          onChange={e => setEnteredFilter(e.target.value)}
        />
        <Books data={data}/>
      </div>
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

export default BookList;
