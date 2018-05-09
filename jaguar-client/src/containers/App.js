import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import Loadable from 'react-loadable';


const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        decode(token);
        const { exp } = decode(refreshToken);
        if (Date.now() / 1000 > exp) {
            return false;
        }
    } catch (err) {
        return false;
    }

    return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            ))
        }
    />
);

const Loading = () => <div>...loading</div>;

const AsyncHome = Loadable({
    loader: () => import('../containers/Home'),
    loading: Loading,
});
const AsyncSignUp = Loadable({
    loader: () => import('./authorization/SignUpForm'),
    loading: Loading,
});
const AsyncLogin = Loadable({
    loader: () => import('./authorization/AuthForm'),
    loading: Loading,
});
const AsyncViewUsers = Loadable({
    loader: () => import('./authorization/UserList'),
    loading: Loading,
});
const AsyncUpdateUser = Loadable({
    loader: () => import('./authorization/UpdateUser'),
    loading: Loading,
});
const AsyncView = Loadable({
    loader: () => import('./taskview/TaskView'),
    loading: Loading,
});
const AsyncCreateOrg = Loadable({
    loader: () => import('./adminPages/orgAdminPage/OrgForm.jsx'),
    loading: Loading,
});
const AsyncCreateTeam = Loadable({
    loader: () => import('./adminPages/teamAdminPage/TeamForm'),
    loading: Loading,
});
const AsyncProjectAdmin = Loadable({
    loader: () => import('./proj_group/ProjectView'),
    loading: Loading,
});
const AsyncTaskDetail = Loadable({
    loader: () => import('./taskview/TaskDetail'),
    loading: Loading,
});
const AsyncOrgAdmin = Loadable({
    loader: () => import('./adminPages/orgAdminPage/OrgAdmin.jsx'),
    loading: Loading,
});
const AsyncTeamAdmin = Loadable({
    loader: () => import('./adminPages/teamAdminPage/teamAdmin'),
    loading: Loading,
});
const AsyncViewGroup = Loadable({
    loader: () => import('./proj_group/GroupView.js'),
    loading: Loading,
});


class App extends Component {
    render(){
        return(
            <Router>
                <div>
                <Switch>
                    <Route path="/" exact component={AsyncHome} />
                    <Route path="/signup" exact component={AsyncSignUp} />
                    <Route path="/login" exact component={AsyncLogin} />
                    <PrivateRoute path="/view-users" exact component={AsyncViewUsers} />
                    <PrivateRoute path="/view" exact component={AsyncView} />
                    <PrivateRoute path="/update-user" exact component={AsyncUpdateUser} />
                    <PrivateRoute path="/create-team" exact component={AsyncCreateTeam} />
                    <PrivateRoute path="/org-admin" exact component={AsyncOrgAdmin} />
                    <PrivateRoute path="/task-detail" exact component={AsyncTaskDetail} />
                    <PrivateRoute path="/project-admin" exact component={AsyncProjectAdmin} />
                    <PrivateRoute path="/create-org" exact component={AsyncCreateOrg} />
                    <PrivateRoute path="/team-admin" exact component={AsyncTeamAdmin} />
                    <PrivateRoute path="/view-group" exact component={AsyncViewGroup} />
                </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
