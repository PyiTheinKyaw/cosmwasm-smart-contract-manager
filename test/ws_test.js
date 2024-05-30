const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

// Define the address that is checked in the transactions.
const address = 'archway1udcs6je039dtaq9jsunlss34prf260rwy724y6';

// Initialize websocket and wsQuery variables.
let websocket;
let wsQuery;

// This function initiates a WebSocket connection and sends a subscription request to track transactions that fulfill certain conditions.
const queryForBalanceUpdate = () => {
  try {
    // Open a new WebSocket connection to the specified URL.
    websocket = new WebSocket('wss://rpc.constantine.archway.io:443/websocket');

    // Define the subscription request. It asks for transactions where the recipient address, and checks for transactions to be published.
    wsQuery = {
      jsonrpc: '2.0',
      method: 'subscribe',
      id: uuidv4().toString(),
      params: {
        query: `tm.event = 'Tx' AND transfer.sender = '${address}'`,
      },
    };
  
    // query: `tm.event = 'Tx' AND transfer.recipient CONTAINS '${address}'`,
    // query: `tm.event = 'Tx' AND (transfer.recipient CONTAINS '${address}' OR transfer.sender CONTAINS '${address})'`,

    // When the WebSocket connection is established, send the subscription request.
    websocket.on('open', () => {
      websocket.send(JSON.stringify(wsQuery));
    });

    // When a message (i.e., a matching transaction) is received, log the transaction and close the WebSocket connection.
    websocket.on('message', (event) => {
      const eventData = JSON.parse(event);
      if (eventData && eventData.result && eventData.result.data) {
        console.log('Matching transaction found')
        tx_hash = eventData.result.events['tx.hash'];
        console.log(eventData.result);

        console.log(tx_hash)
        // disconnectFromWebsocket();
      }
    });

    // If an error occurs with the WebSocket, log the error and close the WebSocket connection.
    websocket.on('error', (error) => {
      console.error(error);
      disconnectFromWebsocket();
    });
  } catch (err) {
    // If an error occurs when trying to connect or subscribe, log the error and close the WebSocket connection.
    console.error(err);
    disconnectFromWebsocket();
  }
};

// This function closes the WebSocket connection and resets the websocket and wsQuery variables.
const disconnectFromWebsocket = () => {
  // If the WebSocket isn't open, exit the function.
  if (!websocket || websocket.readyState !== WebSocket.OPEN) return;

  // Send an 'unsubscribe' message to the server.
  websocket.send(JSON.stringify({ ...wsQuery, method: 'unsubscribe' }));

  // Close the WebSocket connection.
  websocket.close();

  // Reset the websocket and wsQuery variables.
  websocket = null;
  wsQuery = null;
};

// When the process is exiting, close the WebSocket connection if it's still open.
process.on('exit', () => {
  disconnectFromWebsocket();
});

// Start the process by calling the queryForBalanceUpdate function.
queryForBalanceUpdate();
