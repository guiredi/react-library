import React from 'react';
import { List, Avatar } from 'antd';

const Authors = (props) => {
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
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            description={<a href={`/authors/${item.id}`}>{item.name}</a>}
          />
        </List.Item>
        )}
      />
    )
}

export default Authors;
