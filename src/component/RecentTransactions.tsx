import { Avatar, List } from 'antd';
import React, { useEffect, useState } from 'react';
const { v4: uuidv4 } = require('uuid');

interface TransactionsProps {
  address: any,
  wsUrl: any,
}

interface IWsQuery {
  jsonrpc: string,
  method: string,
  id: any,
  params : {query: string}
}

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

const TransactionList: React.FC<TransactionsProps> = ({ address, wsUrl }) => {
  const [transactions, setTransactions] = useState([]);

  const [ws, setWs] = useState<WebSocket>();
  const [wsQuery, setWsQuery] = useState<IWsQuery>();


  useEffect(() => {
    const newWs = new WebSocket(wsUrl);

    var wsQuery: IWsQuery = {
      jsonrpc: '2.0',
      method: 'subscribe',
      id: uuidv4().toString(),
      params: {
        query: `tm.event = 'Tx' AND transfer.recipient CONTAINS '${address}'`,
      },
    };

    newWs.onopen = () => {
      newWs.send(JSON.stringify(wsQuery));
      console.log('websocket connected.')
      setWsQuery(wsQuery)
      setWs(newWs)
    }
    
    newWs.onerror = (err) => {
      console.error(err)
      disconnectFromWebsocket();
    }

    newWs.onmessage = (event) => {
      const eventData = event.data;
      
      if (eventData && eventData.result && eventData.result.data) {
        console.log('Matching transaction found' + JSON.stringify(eventData.result.data));        
        disconnectFromWebsocket();      
      }
    }

  }, []);

  const disconnectFromWebsocket = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;  
    ws.send(JSON.stringify({ ...wsQuery, method: 'unsubscribe' })); 
    ws.close(); 
  }

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

export default TransactionList;
