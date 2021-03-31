const bcryptjs = require('bcryptjs');

const HashCreator = (password) => {

    const salt = bcryptjs.genSaltSync(10);
    const hashCretator = bcryptjs.hashSync(password, salt);
    return hashCretator;
};

module.exports = {
    HashCreator
};