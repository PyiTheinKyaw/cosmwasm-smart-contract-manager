import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type {GetProp, UploadProps } from 'antd';
import { Flex, message, Upload } from 'antd';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: false,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },

  beforeUpload : (file: FileType) => {
    console.log(file.type)
    const isWASMOnly = file.type === 'application/wasm';
    if (!isWASMOnly) {
      message.error('You can only upload WASM file!');
    }
    
    return isWASMOnly;
  }
};

const WasmUpload: React.FC = () => (
  <Dragger {...props} >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single wasm upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
);

export default WasmUpload;