import React from 'react';
import ReactDOM from 'react-dom';

import {createServer, Model} from 'miragejs';

import {App} from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de Site',
          amount: 8000,
          type: 'deposit',
          category: 'Dev',
          createdAt: new Date('2021-04-12 10:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          amount: 1100,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date('2021-04-16 21:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
