import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import User from '../models/user'

export const createTokens = async (user, secret, secret2) => {
    const createToken = jwt.sign(
        {user: _.pick(user, ['_id', 'username', 'email', 'profileImageUrl' ]),}, secret,{ expiresIn: '1h', },
    );

    const createRefreshToken = jwt.sign(
        {user: _.pick(user, '_id'),},secret2,{expiresIn: '7d',},
    );

    return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, SECRET, SECRET2) => {
    let userId = 0;
    try {
        const { user: { _id } } = jwt.decode(refreshToken);
        userId = _id;
    } catch (err) {
        return {};
    }

    if (!userId) {return {};}

    const user = await User.findOne({ _id: userId });

    if (!user) { return {};}

    const refreshSecret = user.password + SECRET2;

    try {
        jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
        return {};
    }

    const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);
    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user,
    };
};
export const refreshLogin = async (token, SECRET) => {
    const user = jwt.verify(token, SECRET);
    console.log(user);
    return {
        ok: true,
        token,
        user,
    };
}
export const tryLogin = async (email, password, SECRET, SECRET2) => {
    const user = await User.findOne({ email });
    if (!user) {
        // user with provided email not found
        return {
            ok: false,
            errors: [{ path: 'email', message: 'Wrong email' }],
        };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        // bad password
        return {
            ok: false,
            errors: [{ path: 'password', message: 'Wrong password' }],
        };
    }

    const refreshTokenSecret = user.password + SECRET2;

    const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

    return {
        ok: true,
        token,
        refreshToken,
        user,
    };
};