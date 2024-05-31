import React from 'react';
import { Button, Dropdown, Form, Input, Space, Flex, Segmented, Upload} from 'antd';
import WasmUpload from '../lib/upload';
import type { MenuProps } from 'antd';
import { DownOutlined, SaveOutlined } from '@ant-design/icons';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

const items: MenuProps['items'] = [
    {
      label: 'any-of address',
      key: '0',
    },
    {
      label: 'everybody',
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'nobody',
      key: '3',
    },
  ];
const Store: React.FC = () => (        
  <Form
    labelCol={{ span: 7 }}
    wrapperCol={{ span: 12, offset: 2 }}
    labelAlign='left'
    layout="horizontal"
    size='small'
  >
    <Form.Item name="wasm_file" label="Upload your wasm file" rules={[{ required: true }]}>
      <WasmUpload />
    </Form.Item>

    <Form.Item name="i_p_type" label="Select Instantiator's permission" rules={[{ required: true }]}>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Permission Type
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Form.Item>

    <Form.Item name="i_address" label="Provide your instantiator's address" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Button icon={<SaveOutlined />} htmlType="submit">
      Store
    </Button>
    
  </Form>
);

export default Store;