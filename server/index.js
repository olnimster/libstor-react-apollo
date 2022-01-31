const express = require("express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const {MONGODB} = require("./config.js");
const resolvers = require("./graphql/resolves/");
const {graphqlUploadExpress} = require("graphql-upload");
const cors = require("cors");
const app = express();
const corsOptions = require("./utils/corn");
const {ApolloServer} = require("apollo-server-express");
const path = require("path")

let port = process.env.PORT;

if (port == null || port === "") {
    port = 4000;
}

app.use(cors(corsOptions));

async function startServer() {
    const server = new ApolloServer({
        typeDefs, resolvers,
        context: ({req, res}) => ({req, res}),
        formatError: (err) => {
            if (err.message.startsWith("Database Error: ")) {
                return new Error("Internal server error");
            }
            return err;
        },
    });

    await server.start();

    await mongoose.connect(MONGODB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });

    const app = express();

    app.use(graphqlUploadExpress());
    server.applyMiddleware({app});
    app.use(express.static(path.join(__dirname + "/public")));

    app.get('*', function (req, res) {
        res.sendFile('index.html', {root: path.join(__dirname + "/public")});
    });

    app.listen({port}, () => {
        console.log(
            `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
        );
    });
}

startServer();