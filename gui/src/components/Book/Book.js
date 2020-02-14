import React from 'react';
import { List, Avatar, Icon } from 'antd';

const Books = (props) => {
    return (
      <List
      itemLayout="horizontal"
      pagination={{
              onChange: (page) => {

              },
              pageSize: 5,
              }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<Icon type="book" />} />}
            description={<a href={`/books/${item.id}`}>{item.name}</a>}
          />
        </List.Item>
        )}
      />
    )
}

export default Books;
