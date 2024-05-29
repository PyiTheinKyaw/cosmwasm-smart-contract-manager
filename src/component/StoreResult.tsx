import React, { useState } from 'react';
import { Avatar, List, Radio, Space } from 'antd';

const data = [
  {
    label: 'BNFT',
    desc: "Contract is stored on contract with code id 1"
  },
  {
    label: 'BNFT',
    desc: "Contract is stored on contract with code id 1"
  },
  {
    label: 'BNFT',
    desc: "Contract is stored on contract with code id 1"
  },
  {
    label: 'BNFT',
    desc: "Contract is stored on contract with code id 1"
  },
];


const StoreResult: React.FC = () => {

  return (
    <>
      <h1>
        Recent Transactions
      </h1>
      <List
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={item.label}
              description={item.desc}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default StoreResult;