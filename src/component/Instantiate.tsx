import { Button, Form, Input, Radio, Upload } from 'antd';
import React from 'react';
import { UploadOutlined, CompressOutlined } from '@ant-design/icons';

const Instantiate: React.FC = () => (        
  <Form
    labelCol={{ span: 10 }}
    wrapperCol={{ span: 15 }}
    layout="horizontal"
  >
    <Form.Item name="label_contract" label="Label" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item name="is_set_admin" label="Option to set admin" rules={[{ required: true }]}>
        <Radio.Group>
            <Radio value="no_admin"> No-admin </Radio>
            <Radio value="set_admin"> Set Admin </Radio>
        </Radio.Group>
    </Form.Item>

    <Form.Item name="a_address" label="Provide admin address" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item name="code_id" label="Code ID" rules={[{ required: true }]}>
        <Input type='number'/>
    </Form.Item>

    <Form.Item name="i_address" label="Provide your instantiator's address" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item name="args" label="Upload args file (Only JSON Format)" rules={[{ required: true }]}>
        <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture"
            maxCount={1}>
            <Button icon={<UploadOutlined />}> Upload Argument</Button>
        </Upload>
    </Form.Item>

    <Form.Item>
      <Button icon={<CompressOutlined />} htmlType="submit" >
        Instantiate
      </Button>
    </Form.Item>
  </Form>
);

export default Instantiate;