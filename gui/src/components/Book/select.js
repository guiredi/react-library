import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';


const SelectAuthorBook = () =>{
  const [state, setState] = useState({ authors: [] })
  const { Option } = Select;

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/v1/author/')
        .then(res => {
          console.log(res);
            setState({
                authors: res.data.results
            });
        })
  },[]);

  // useEffect(() => {
  // async function fetchData() {
  //   const res = await axios.get('http://127.0.0.1:8000/v1/author/');
  //   setState({authors: res.data.results})
  // }
  // fetchData();
  // }, []);

  const names = state.authors.map(author => {
    return author.name
  })

  const children = [];
  names.forEach((item, i) => {
    children.push(<Option key={i}>{item}</Option>)
  });


  return(
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
    >
    {children}
    </Select>
  )

};

export {SelectAuthorBook};
