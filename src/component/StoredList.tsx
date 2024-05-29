import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  code_id: number;
  instantiator: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Code Id',
    dataIndex: 'code_id',
    key: 'code_id'
  },
  {
    title: 'Instantiator',
    dataIndex: 'instantiator',
    key: 'instantiator',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'volcano';
          if (tag === 'instantiated') {
            color = 'geekblue';
          } else {
            color = 'green';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  }
];

const data: DataType[] = [
  {
    key: '1',
    code_id: 23189,
    instantiator: 'cosmos1udcs6je039dtaq9jsunlss34prf260rw34k3wd',
    tags: [ 'stored', 'instantiated'],
  }
];

const StoredList: React.FC = () => {
  return(
    <>
      <Table columns={columns} dataSource={data}/>; 
    </>
  );
}

export default StoredList;