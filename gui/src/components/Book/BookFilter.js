import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Books from './Book';

function BookFilter(props) {
  const [data, setData] = useState([]);
  const [enteredFilter, setEnteredFilter] = useState("");     // second, we create a new useState Hook for our filter

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get('http://127.0.0.1:8000/v1/book/');
      let responseData = res.data.results
      let filteredData = responseData.filter(item => {       // third, we defined our filteredData array
        return item.name.includes(enteredFilter);
      });
      setData(filteredData);                                 // fourth, we used setEnteredFilter to set out local filter state
    };
    fetchData();                                             // fifth, we called out fetchData function inside useEffect Hook
  }, [enteredFilter, props.data]);                                       // sixth, we set enteredFilter as a dependency

  return (
    <div>
      <input                                                 // first, we have created an input element
        placeholder="Search Names"
        value={enteredFilter}
        onChange={e => setEnteredFilter(e.target.value)}
      />
      <Books data={data}/>
    </div>
  );
}

export default BookFilter;
