import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';


const SelectAuthorBook = (props) =>{
  const [state, setState] = useState({ author: [] })
  const { Option } = Select;

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/v1/author/')
        .then(res => {
            setState({
                author: res.data.results
            });
        })
  },[]);


  const names = state.author.map(author => {
    return author.name
  })

  const children = [];
  names.forEach((item, i) => {
    children.push(<Option key={i} value={item}>{item}</Option>)
  });


  return(
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
      onChange={props.data}
    >
    {children}
    </Select>
  )

};

export default SelectAuthorBook;
