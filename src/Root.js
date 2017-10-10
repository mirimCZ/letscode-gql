import React from 'react'
import ApolloClient, { createBatchingNetworkInterface, ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import ListPage from './ListPage'
import DetailPage from './DetailPage'

const networkInterface = createBatchingNetworkInterface({
  uri: 'http://localhost:3000/graphql',
  batchInterval: 30,
})

const apolloClient = new ApolloClient({
  networkInterface: networkInterface,
  shouldBatch: true,
})

const Root = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <div id="app">
        <div id="head">
          <ul>
            <li><Link to="/">List</Link></li>
            <li><Link to="/article/1">Article</Link></li>
          </ul>
        </div>
        <div id="content">
          <Switch>
            <Route exact path="/" component={ListPage} />
            <Route path="/article/:id" component={DetailPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </ApolloProvider>
)

export default Root
