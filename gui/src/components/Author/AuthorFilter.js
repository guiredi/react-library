import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Author from './Author';

function AuthorFilter(props) {
  const [data, setData] = useState([]);
  const [enteredFilter, setEnteredFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get('http://127.0.0.1:8000/v1/author/');
      let responseData = res.data.results
      let filteredData = responseData.filter(item => {
        return item.name.includes(enteredFilter);
      });
      setData(filteredData);
    };
    fetchData();
  }, [enteredFilter, props.data]);


  return (
    <div>
      <input
        placeholder="Search Names"
        value={enteredFilter}
        onChange={e => setEnteredFilter(e.target.value)}
      />
      <Author data={data}/>
    </div>
  );
}

export default AuthorFilter;
