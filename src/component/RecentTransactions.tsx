import React, { useEffect, useState } from 'react';
import './RecentTransactions.css';
import { Avatar, Button, Descriptions, DescriptionsProps, List } from 'antd';

const { v4: uuidv4 } = require('uuid');


const borderedItems: DescriptionsProps['items'] = [
  {
    key: '1',
    span: { xl: 2, xxl: 2 },
    label: 'Block Height',
    children: 'Cloud Database',
  },
  {
    key: '7',
    label: 'Config Info',
    children: (
      <>
        Sender: {}
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

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

interface IRecentTransaction {
  sender: string,
  recipients: [string],
  block_height: string,
  tx_fee: string,
  tx_hash: string
}

const TransactionList: React.FC<TransactionsProps> = ({ address, wsUrl }) => {
  const [items, setItems] = useState<IRecentTransaction[]>();
  const [isComingIn, setComingIn] = useState(false);
  const [borderedItems, setBorderedItems] = useState<DescriptionsProps>();

  const [ws, setWs] = useState<WebSocket>();
  const [wsQuery, setWsQuery] = useState<IWsQuery>();

  useEffect(() => {
    console.log("New coming in.")
    console.log(items)
  }, [isComingIn])

  useEffect(() => {
    const newWs = new WebSocket(wsUrl);

    var wsQuery: IWsQuery = {
      jsonrpc: '2.0',
      method: 'subscribe',
      id: uuidv4().toString(),
      params: {
        query: `tm.event = 'Tx' AND transfer.sender = '${address}'`,
      },
    };

    newWs.onopen = () => {
      newWs.send(JSON.stringify(wsQuery));
      setWsQuery(wsQuery)
      setWs(newWs)
    }
    
    newWs.onerror = (err) => {
      console.error(err)
      disconnectFromWebsocket();
    }

    newWs.onmessage = (event) => {
      
      const eventData = JSON.parse(event.data);

      if(eventData.result && eventData.result.events) {
        
        let events = eventData.result.events;
        
        let recentTransaction: IRecentTransaction = {
          sender: events["transfer.sender"][0],
          recipients: events["transfer.recipient"],
          block_height: events["tx.height"][0],
          tx_fee: events["tx.fee"][0],
          tx_hash: events["tx.hash"][0]
        }

        if(items !== undefined || items != null ) {
          setItems((old: any)=> [...old, recentTransaction])
        }

        else {
          setItems([recentTransaction])
        }
        
        setComingIn(true)
      }
    }

    return () => ws?.close();
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
      <List>
        <Descriptions
          bordered
          title="Recent Transaction"
          size='small'        
          items={borderedItems}
        />
      </List>
    </>
  );
};

export default TransactionList;
