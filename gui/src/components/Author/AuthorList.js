import { Modal, Button, Input} from 'antd';
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import Author from './Author';
import { Redirect } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap';



const AuthorList = () => {

  const [state, setState] = useState({ name: '', visible: false, confirmLoading:false});
  const [redirect, setRedirect] = useState(false)
  const [data, setData] = useState([]);
  const [enteredFilter, setEnteredFilter] = useState("");
  const [isLoading, setLoading] = useState(false);



  useEffect(() => {
    setLoading(true)
    setRedirect(false)
    const fetchData = async () => {
      let res = await axios.get('http://127.0.0.1:8000/v1/author/');
      let responseData = res.data.results
      let filteredData = responseData.filter(item => {
        return item.name.includes(enteredFilter);
      });
      setData(filteredData);
      setLoading(false)

    };
    fetchData();
  }, [enteredFilter, redirect]);

  const refreshpage = () => {
    window.location.reload();
  }
  const createAuthor = () => {
        axios.post(`http://127.0.0.1:8000/v1/author/`, {
              name : state.name
        }).then(res => {
          if (res.status === 201){
            setRedirect(true)
          }
        });
  };

  const changeState = (e) => {
    const value=e.currentTarget.value
    setState(prevState => {
      return {
        ...prevState,
        name : value
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
      name:null,
      visible: false,
      confirmLoading: false,
    });
    createAuthor();
    refreshpage();
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setState({
      visible: false,
    });
  };
  const { visible, confirmLoading} = state;

// if(isLoading) {
//   return <Spinner/>
// }

  return (
    <div>

        <div>
          <input
            placeholder="Search Names"
            value={enteredFilter}
            onChange={e => setEnteredFilter(e.target.value)}
          />
          <Author data={data}/>
        </div>
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
            onChange={ e => changeState(e)}
          />
        </Modal>
    </div>
  );
};

export default AuthorList;
