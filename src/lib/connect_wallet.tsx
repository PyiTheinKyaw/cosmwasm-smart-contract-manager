import { Avatar, Button, Tag } from 'antd';
import React, { useState } from 'react';

import {
    UserOutlined,
} from '@ant-design/icons';


import './Wallet.css';
import ConfirmNetworkModal from '../component/ConfirmNetwork';

const User: React.FC = () => {
  return(
    <>
        <Button
            type='text'          
            style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                marginLeft: '-20px'
            }}
        >
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Button>
        
        <NetworkName text='Live' />
        <ConfirmNetworkModal shouldOpen />
    </>
  );
}

interface NetworkNameProps {
    text: string;
  }

const NetworkName: React.FC<NetworkNameProps> = ({ text }) => {
    return <div className="blinking-text"><Tag color="magenta">{text}</Tag></div>;
  };

export default User;