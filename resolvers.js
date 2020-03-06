const resolvers = {
    Query: {
        getMessage: function(parent, args, context) {
            return "hello world";
        }
    },
    Mutation: {
        sendMessage: function(parent, { input }, {pub_sub}) {
            pub_sub.publish('message-send', {newMessage: input});
            return input;
        }
    },
    Subscription: {
        newMessage: {
            subscribe: function(parent, args, {pub_sub}) {
                return pub_sub.asyncIterator(['message-send']);
            }
        }
    }
}

module.exports = { resolvers };