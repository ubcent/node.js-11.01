const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registration = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
        return res.status(401).send({ message: 'This email has already existed' });
    }
    const passwordHashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: passwordHashed });
    const token = jwt.sign(
        {
            userId: user._id.toString(),
        },
        'mySecretKey',
        { expiresIn: '30d' },
    );

    res.status(201).send({ token, id: user._id, name: user.name, email: user.email });
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'Credentials are wrong' });
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) return res.status(404).send({ message: 'Credentials are wrong' });
    const token = jwt.sign(
        {
            userId: user._id.toString(),
        },
        'mySecretKey',
        { expiresIn: '30d' },
    );

    res.status(200).send({ token, id: user._id.toString(), name: user.name, email: user.email });
}
