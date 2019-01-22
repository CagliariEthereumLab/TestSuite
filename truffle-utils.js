const Web3 = require('web3');
const contract = require('truffle-contract');


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
    },

    getWeb3: function (net) {

        var web3Provider;
        var web3 = null;


        if (typeof net !== 'undefined') {

            if (typeof net.provider !== 'undefined') {
                //obtain credential by provider
                web3Provider = net.provider();
            } else {
                //obtain credential by params

                let url;
                url = "http://" + net.host + ":" + net.port;
                web3Provider = new Web3.providers.HttpProvider(url);
            }

            web3 = new Web3(web3Provider);
            console.warn("Web3 Initialized!");

        } else {
            console.warn("ERROR with web3: No web3 detected. Impossible to create a New Instance");
        }

        this.web3 = web3;

        return web3;
    },

    getAccounts: function () {
        var self = this;


        return new Promise(function (resolve, reject) {
            self.web3.eth.getAccounts(function (e, accounts) {
                if (e != null) {
                    console.log("There was an error fetching your accounts.");
                    reject(e);
                } else {
                    if (accounts.length == 0) {
                        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                        reject("No account fetch");
                    }
                    // self.accounts = accounts;       //Aggiunge al this accounts
                    // account = self.accounts[0];
                    // self.accountSMTP = self.accounts[0]; // //Aggiunge al this accountSMTP
                    // console.log('Attempting to attach Sender contract from account ', accounts);

                    resolve(accounts);
                }
            });
        });
    },

    /**Use this to deploy a contract**/
    getContractByArtifact: function (artifact, from) {
        var Contract = contract(artifact);
        Contract.setProvider(this.web3.currentProvider);
        //fix for we web3 1.0
        if (typeof Contract.currentProvider.sendAsync !== "function") {
            Contract.currentProvider.sendAsync = function () {
                return Contract.currentProvider.send.apply(
                    Contract.currentProvider,
                    arguments
                );
            };
        }
        Contract.defaults({from: from, gas: '30000000'});
        return Contract;
    },

    getContractByAddress: function (artifact, from, contract_address) {
        var self = this;

        var Contract = contract(artifact);
        Contract.setProvider(self.web3.currentProvider);
        //fix for we web3 1.0
        if (typeof Contract.currentProvider.sendAsync !== "function") {
            Contract.currentProvider.sendAsync = function () {
                return Contract.currentProvider.send.apply(
                    Contract.currentProvider,
                    arguments
                );
            };
        }
        Contract.defaults({from: from, gas: '30000000'});
        return Contract.at(contract_address);
    },

};

