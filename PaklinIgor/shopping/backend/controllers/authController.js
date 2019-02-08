const User = require('../models/user');
const RefreshToken = require('../models/token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");

exports.registration = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
        return res.status(401).send({ message: 'This email has already existed' });
    }
    const passwordHashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: passwordHashed });
    const tokens = await createUserToken(user);

    res.status(201).send({ ...tokens, id: user._id, name: user.name, email: user.email });
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ message: 'Credentials are wrong' });
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) return res.status(404).send({ message: 'Credentials are wrong' });
        const tokens = await createUserToken(user);

        res.status(200).send({ ...tokens, id: user._id.toString(), name: user.name, email: user.email });
    } catch (err) {
        res.status(400).send({ message: err.toString() });
    }
}

exports.refresh = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader || authHeader.split(' ')[0].toLowerCase() !== "bearer") {
        return res.status(403).send({ message: 'No valid token' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send({ message: 'No valid token' });
    }
    const decoded = jwt.decode(token);
    if (decoded.userId) {
        const oldRefreshToken = await RefreshToken.findOne({user: decoded.userId});
        if (oldRefreshToken.token === req.body.refreshToken) {
            const user = await User.findById(decoded.userId);
            const tokens = await createUserToken(user);

            return res.status(200).send({ ...tokens });
        } else {
            return res.status(403).send({ message: 'No valid token' });
        }
    } else {
        return res.status(403).send({ message: 'No valid token' });
    }

}

const createRefreshToken = async (userId) => {
    const refreshToken = randomstring.generate();
    await RefreshToken.findOneAndDelete({ user: userId })
    await RefreshToken.create({ token: refreshToken, user: userId });

    return refreshToken;
}

const createUserToken = async (user) => {
    const refreshToken = await createRefreshToken(user._id);
    const token = jwt.sign(
        {
            userId: user._id.toString(),
        },
        'mySecretKey',
        { expiresIn: '1m' },
    );

    return { refreshToken, token };
}
