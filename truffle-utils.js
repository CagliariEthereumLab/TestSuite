const config = require("./config");

// console.log("----root ", config.root);
// console.log("----title ", config.init.title);
// console.log(config.root);
// console.log(config.init.contracts_directory);

const fs = require('fs-extra');
const path = require('path');

const addressPath = path.resolve(__dirname, config.init.contract_deployed_directory);


module.exports = {
    writeAddress: function (account_address, network, contract_address, file_name) {
        file_name += '.json';
        try {
            let resolvePath = path.resolve(addressPath, file_name);
            var data = {
                "contract_address": contract_address,
                "account_address": account_address
            };
            if (!fs.existsSync(resolvePath)) {
                var key = network,
                    obj = {
                        [key]: data
                    };
                fs.outputJsonSync(resolvePath, obj);
            }
            fs.readJson(resolvePath).then(content => {
                if (content.hasOwnProperty(network)) { //read the network
                    content[network].contract_address = contract_address;
                    content[network].account_address = account_address;
                } else { //add the network
                        content[network] = data;
                }
                fs.outputJsonSync(resolvePath, content);

            }).catch(err => {
                console.error(err)
            })
        } catch (err) {
            console.log('error!');
            console.error(err);
        }
    }
};
