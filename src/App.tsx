import React, { useState } from 'react';
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
import User from './lib/connect_wallet';

const { Header, Sider, Content } = Layout;

const boxStyle: React.CSSProperties = {
  width: '100%'
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);



  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* Slide bar */}
      <Sider trigger={null} collapsible collapsed={collapsed} style={{height: '100vh'}}>
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
              <User/>
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
            <Flex justify='space-evenly' align='center' style={boxStyle}>
              <div >
                <Card title="Store your cotract byte codes" bordered={false}>
                  <Store />
                </Card>
              </div>
              <div style={{width: "30%", padding: "28px"}}>
                <StoreResult />
              </div>
            </Flex>

            <Flex align='center' justify='center' style={boxStyle}>
              <StoredList />
            </Flex>
          </Flex>

        </Content>
      </Layout>
    </Layout>
  );
};

export default App;