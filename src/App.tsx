import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Layout, Menu, Space, theme } from 'antd';
import Store from './component/Store';
import Instantiate from './component/Instantiate';
import StoreResult from './component/StoreResult';
import StoredList from './component/StoredList';
import User from './component/Users';
import TransactionList from './component/RecentTransactions';
import { WalletInfo } from './component/interface/IWalletInfo';

const { Header, Sider, Content } = Layout;

const boxStyle: React.CSSProperties = {
  width: '100%'
};

const cardStyle: React.CSSProperties = {
  maxHeight: '60vh'
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isWalletConnected = (value: WalletInfo) => {
    setWalletInfo(value)    
  }

  return (
    <Layout>
      {/* Slide bar */}
      <Sider trigger={null} collapsible collapsed={collapsed} style={{height: '200vh'}}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Manager',
            },
            {
              key: '2',
              icon: <SettingOutlined />,
              label: 'Settings',
            }
          ]}
        />
      </Sider>

      {/* Content */}
      <Layout>

        {/* Header */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          
          <Flex gap="middle" >
            <Flex justify='space-between' align='center'>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />

              {/* Connect to wallet */}
              <User onConnected={isWalletConnected}/>

            </Flex>
          </Flex>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Flex gap="middle" align="start" vertical>
            <Flex justify='space-evenly' align='flex-start' style={boxStyle}>
              <div>
                <Card title="Store your contract byte codes" bordered={false} style={cardStyle}>
                  <Store />
                </Card>
              </div>
              
              <div style={{paddingLeft: "28px", width: "40%"}}>
                <Card title="Recent Transaction" bordered={false} style={cardStyle}>
                  {walletInfo && 
                    <TransactionList 
                      address={walletInfo?.accounts[0].address}
                      wsUrl={walletInfo?.ChainInfo.wss} 
                    />
                  }
                </Card>
              </div>
            </Flex>

            <Flex align='flex-start' justify='flex-start' style={boxStyle}>
              {/* <Card title="Contracts Info"> */}
                <StoredList />
              {/* </Card> */}
            </Flex>
          </Flex>

        </Content>
      </Layout>
    </Layout>
  );
};

export default App;