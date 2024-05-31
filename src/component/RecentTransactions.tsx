import React, { useEffect, useState } from 'react';
import './RecentTransactions.css';
import { Avatar, Button, Card, Descriptions, DescriptionsProps, Empty, Flex, List } from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Typography } from 'antd';

const { Text } = Typography;
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

interface IRecentTransaction {
  sender: string,
  recipients: [string],
  block_height: string,
  tx_fee: string,
  tx_hash: string,
  is_new: boolean,
}

const TransactionList: React.FC<TransactionsProps> = ({ address, wsUrl }) => {
  const [items, setItems] = useState<IRecentTransaction[]>([]);
  const [incomingItem, setIncomingItem] = useState<IRecentTransaction>();

  const [ws, setWs] = useState<WebSocket>();
  const [wsQuery, setWsQuery] = useState<IWsQuery>();

  useEffect(() => {
    console.debug('effect works.')
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
      setupEnv(wsQuery, newWs)
      console.log('web socket connected.')
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
          tx_hash: events["tx.hash"][0],
          is_new: true
        }

        initItems(recentTransaction)
        setItems(markAsDone)
      }
    }

    return () => disconnectFromWebsocket() ;
  }, []);

  useEffect(() => {
    if(incomingItem != undefined){
      setItems((prevItems: any) => [...prevItems, incomingItem])  
    }
  }, [incomingItem])

  useEffect(() => { console.log(items) }, [items])

  const markAsDone = items.map((item) => {
    return {...item, is_new: false};
  })

  const setupEnv = (wsQuery: IWsQuery, ws: WebSocket) => {
    setWsQuery(wsQuery)
    setWs(ws)
  }

  const initItems = (recentTnx: IRecentTransaction) => {
    setIncomingItem(recentTnx)
    if(items.length > 0) {
      // setItems(markAsDone)
    }
  }

  const disconnectFromWebsocket = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;  
    ws.send(JSON.stringify({ ...wsQuery, method: 'unsubscribe' })); 
    ws.close(); 
    console.log('disconnected')
  }

  return (
    <>
      <List itemLayout="horizontal">
        <TransitionGroup>
          {items.length != 0 && items.map((item, index) => (
            <RecentTransactionItem key={index} index={index} recentTx={item} isNew={items.length - 1 === index} />
          ))}

          
        </TransitionGroup>
      </List>
    </>
  );
};

const RecentTransactionItem: React.FC<{
  index: number,
  recentTx: IRecentTransaction,
  isNew: boolean
}> = ({
  index,
  recentTx,
  isNew
}) => {

  const truncatedHash = `Tx Hash: ${recentTx.tx_hash.slice(0, 6)}...${recentTx.tx_hash.slice(-6)}`;
  const msg = `Transactions is committed in block.${recentTx.block_height} with transaction fees ${recentTx.tx_fee}`;

  return(
    <>
      <CSSTransition key={index} timeout={1000} in={true} classNames="item">
        <List.Item className={'item'}>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={truncatedHash}
            description={msg}
          />
        </List.Item>
      </CSSTransition>
    </>
  );
}


export default TransactionList;
