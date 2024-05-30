import React, { useState } from 'react';

import { Avatar, Button, Divider, Flex, List, Modal, Timeline, Typography } from 'antd';
import {
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import UploadConfig from '../lib/upload_config';
import './Modal.css';

interface CNModal {
    shouldOpen: boolean
}

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const ConfirmNetworkModal: React.FC<CNModal> = ({shouldOpen}) => {

    const [open, setOpen] = useState(shouldOpen);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image: any) => {
      setSelectedImage(image);
    };

    return(
      <>      
        <Modal
            title="Set up network configuration"
            closeIcon={<MenuUnfoldOutlined />}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            styles={{header: {marginBottom: '30px'}}}
        >       
          <Timeline
            items={[
              {
                children: 'Chain-ID: something',
              },
              {
                children: 'Chain-Name: Something',
              },
            ]}
          />
          <Flex gap="middle" wrap className='image-container'>
              <Avatar 
                shape="square" 
                size={103} 
                src={<img 
                        onClick={() => handleImageClick('test')} 
                        src={'data:image/png;base64,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'} 
                        className={selectedImage === 'test' ? 'selected' : ''}
                      />
                    }
              />

              <Avatar shape="square" size={103} src={<img src={'https://avatars.githubusercontent.com/u/86496504?s=280&v=4'} />} />
              <UploadConfig />
          </Flex>
        </Modal>
      </>
    );
}

export default ConfirmNetworkModal;
  