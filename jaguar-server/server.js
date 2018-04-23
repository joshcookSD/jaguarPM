require('dotenv').config();
import express from 'express';
import session from 'express-session';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './apollo-graphql/schema.js';
import mongoose from "mongoose";
import cors from 'cors';
const MongoStore = require('connect-mongo')(session);
import jwt from 'jsonwebtoken';


// mongoose models for graphql context
import User from './models/user'
import Time from "./models/time";
import PlannedTime from "./models/plannedtime";
import Priority from "./models/priority";
import Project from "./models/project";
import Group from "./models/group";
import Requirement from "./models/requirement";
import Task from "./models/task";
import UsertypeOrg from "./models/usertypeorg";
import Milestone from "./models/milestone";
import Organization from "./models/organization";
import Team from "./models/team";

import { refreshTokens } from './apollo-graphql/auth';
const mongo_uri = `mongodb://JoshCook:password123@ds237669.mlab.com:37669/jaguar`;
// 'mongodb://localhost:27017/jaguar'

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(mongo_uri, {
    keepAlive: true
});

const PORT = 3001;
const app = express();

const SECRET = 'jikbNIUAR7984349HQIJBEOQW8Gionedibjgsidfl';
const SECRET2 = 'asiodfhoi1hoi23jnl1kejasdjlkfasdd';

const addUser = async (req, res, next) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const { user } = jwt.verify(token, SECRET);
            req.user = user;
        } catch (err) {
            const refreshToken = req.headers['x-refresh-token'];
            const newTokens = await refreshTokens(token, refreshToken, models, SECRET);
            if (newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
            }
            req.user = newTokens.user;
        }
    }
    next();
};

app.use(addUser);
app.use(session({
    resave: true,
    secret: SECRET,
    saveUninitialized: true,
    store: new MongoStore({
        url: mongo_uri,
        autoReconnect: true
    })
}));

app.use('*', cors({ origin: 'http://localhost:3000' }));
app.use('/graphql', bodyParser.json(),
    graphqlExpress(req => ({ schema,
    context: {
    User, Task, Time, PlannedTime, Organization, UsertypeOrg, Priority, Group, Milestone, Project, Requirement, Team,
        user: req.user,
        SECRET,
        SECRET2,
    }
})));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, function() {
    console.log(`GraphiQL is now running on http://localhost:${PORT}/graphiql`);
});


    // ? User.findOne({ where: { id: req.user.id } }) : Promise.resolve(null)