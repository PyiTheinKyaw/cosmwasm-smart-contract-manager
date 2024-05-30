import { Avatar, Button, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import {
    UserOutlined,
} from '@ant-design/icons';


import './Users.css';
import ConfirmNetworkModal from './ConfirmNetwork';
import WalletConnection from '../lib/Wallet_Connection';
import { SigningArchwayClient } from '@archwayhq/arch3.js/build';
import Notifactions from './Notification';
import { ChainInfoInterface } from 'src/lib/interface/ChainInfo';
import { WalletInfo } from './interface/IWalletInfo';


interface UsersProp {
  onConnected: (value: WalletInfo) => void;
}

const User: React.FC<UsersProp> = ({ onConnected }) => {

  const [walletConnected, setWalletConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>();

  const isWalletConnected = (value: boolean) => {
    setWalletConnected(value)    
  }

  useEffect(() => {
    const walletInfo = localStorage.getItem('wallet_info');
    if (walletInfo !== null) {
      setWalletInfo(JSON.parse(walletInfo));
      onConnected(JSON.parse(walletInfo));
    }
  },[walletConnected]);

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
        
        {
          walletConnected && walletInfo &&
          <NetworkName text={walletInfo.offlineSigner?.chainId} />
        }        

        <WalletConnection onConnection={isWalletConnected} />

        {/* <ConfirmNetworkModal shouldOpen /> */}
    </>
  );
}

interface NetworkNameProps {
    text: any;
  }

const NetworkName: React.FC<NetworkNameProps> = ({ text }) => {
    return <div className="blinking-text"><Tag color="magenta">{text}</Tag></div>;
  };

export default User;