import User from '../models/user';
import Organization from '../models/organization';
import Team from '../models/team';

const verification = function validateEmail(v) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(v);
};

const passwordError = (password) => {
    if(password.length < 5 ) {
        return {path: 'password', message: 'that just a tad too short for your security'};
    }
    if(password.length > 25 ) {
        return {path: 'password', message: 'that is a very long password, lets keep it below 25 characters please'}

    }
    if(!password.length) {
        return {path: 'password', message: 'We want you to be secure, please help'};
    }
};

const emailError = async (e) => {
    let userEmail = await User.findOne({email: e});
    if(!e.length) {
        return {path: 'email', message: 'email is required, thanks'};
    }
    if(userEmail) {
        return {path: 'email', message: `sorry but that ${e} is currently being used, we hope by you...`}
    }
    if(!verification(e)) {
        return {path: 'email', message: `sorry but we don't think that ${e} is a valid email`};
    }
};

const usernameError = async (u) => {
    let user = await User.findOne({'username': u});
    if(!u.length) {
        return {path: 'username', message: 'if this is blank how do we know what to call you'}
    }
    if(user) {
        return {path: 'username', message: `sorry but ${u} needs to be more unique`}
    }
    if(u.length < 4 ) {
        return {path: 'username', message: 'we love brevity but that is too brev'}
    }
};

const orgError = async (org) => {
    let organization = await Organization.findOne({'orgtitle': org});
    if(!org.length) {
        return {path: 'orgtitle', message: 'if this is blank why do you want to start a new organization?'}
    }
    if(organization) {
        return {path: 'orgtitle', message: `that's interesting ${org} has already been created`}
    }
    if(org.length < 4 ) {
        return {path: 'orgtitle', message: 'WLA! (we like acronyms) but we need a few more characters'}
    }
};

const teamError = async (team) => {
    let teams = await Team.findOne({ 'teamtitle': team});
    if (!team.length) {
        return { path: 'teamtitle', message: 'if this is blank why do you want to start a new organization?' }
    }
    if (teams) {
        return { path: 'teamtitle', message: `that's interesting ${team} has already been created` }
    }
    if (team.length < 4) {
        return { path: 'teamtitle', message: 'WLA! (we like acronyms) but we need a few more characters' }
    }
};

export {emailError, passwordError, usernameError, orgError, teamError};