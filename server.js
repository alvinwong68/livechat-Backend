const { ApolloServer, PubSub } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { resolvers } = require('./resolvers.js');
const { createServer } = require('http');
const app = express();

const port = process.env.PORT || 3000;

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');

const pub_sub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: function() {
        return {pub_sub};
    }
});

server.applyMiddleware({app, path: '/graphql'});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, ()=> {
    console.log('listening to port 3000');
});