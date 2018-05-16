'use strict';
require('dotenv').config();
import 'babel-polyfill';
import express from 'express';
import session from 'express-session';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './apollo-graphql/schema.js';
import mongoose from "mongoose";
import cors from 'cors';
const MongoStore = require('connect-mongo')(session);
import jwt from 'jsonwebtoken';
import path from 'path';
const nconf = require('nconf');

nconf.argv().env().file('keys.json');

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
import Comment from "./models/comment";

import { refreshTokens } from './apollo-graphql/auth';

//`mongodb://localhost:27017/jaguar`

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(uri, {
    keepAlive: true
});

const app = express();
app.set('port', (process.env.PORT || 3001));

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
        url: uri,
        autoReconnect: true
    })
}));

const isNotProduction = process.env.NODE_ENV !== 'production';
if (isNotProduction) {
    app.use('*', cors({ origin: 'http://localhost:3000' }));
}


const staticFiles = express.static(path.join(__dirname, '../../jaguar-client/build'));
app.use(staticFiles);

if(!isNotProduction) {
    const staticFiles = express.static(path.join(__dirname, '../../jaguar-client/build'));
    app.use(staticFiles);
    app.use('/*', staticFiles);
}


app.use('/graphql', bodyParser.json(),
    graphqlExpress(req => ({ schema,
    context: {
    User, Task, Time, PlannedTime, Organization, UsertypeOrg, Priority, Group, Milestone, Project, Requirement, Team, Comment,
        user: req.user,
        SECRET,
        SECRET2,
    }
})));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.use('/*', staticFiles);


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(app.get('port'), function() {
    console.log(`Listening on ${app.get('port')}`);
});

