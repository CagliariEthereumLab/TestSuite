// module.exports.net = require('./.' + require('minimist')(process.argv.slice(2), {string: ['net']})['net']);
module.exports.root = process.env.PWD;
module.exports.init = requireWrapper(process.env.PWD + '/truffle');

/**
 * Wrapper function
 */

function requireWrapper(modulePath){ // force require
    try {
        return require(modulePath);
    }
    catch (e) {
        console.log("WARNING something wrong!!");
        return false;
    }
};
