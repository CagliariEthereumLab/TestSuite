console.log("============================ truffle.js");

const config = require("./config");
require('dotenv').config({path: config.root + '/.env'});

console.log("----pk ", process.env.pk);


console.log("----root ", config.root);
console.log("----title ", config.init.title);
console.log("----pk ", process.env.pk);
// console.log(config.root);
// console.log(config.init.contracts_directory);
//
//
// console.log(config.init.networks.ganache.host);
// console.log(config.init.networks.ganache.port);
// console.log(config.init.networks.ganache.network_id);
// console.log(config.init.networks.ganache.gas);
// console.log(config.init.networks.ganache.gasPrice);


module.exports = {
    description: "Core fore testing and deploy Smart Contract",
    authors: [
        "CagliariEthereumLab"
    ],
    compilers: {
        solc: {
            version: "^0.5.2",   //Current version:0.5.2+commit.1df8f40c.Emscripten.clang
            optimizer: {
                enabled: true,
                runs: 200
            }
        },
    },
    //working_directory:
    migrations_directory: config.init.migrations_directory,
    contracts_directory: config.init.contracts_directory,
    contracts_build_directory: config.init.contracts_build_directory,
    test_directory: config.init.test_directory,
    networks: {
        development: {
            host: config.init.networks.development.host,
            port: config.init.networks.development.port,
            network_id: config.init.networks.development.network_id,
            gas: config.init.networks.development.gas,
            gasPrice: config.init.networks.development.gasPrice
        },
        ganache: {
            host: config.init.networks.ganache.host,
            port: config.init.networks.ganache.port,
            network_id: config.init.networks.ganache.network_id,
            gas: config.init.networks.ganache.gas,
            gasPrice: config.init.networks.ganache.gasPrice
        },
        ropsten: {
            provider: () => new HDWalletProvider(process.env.pk, "https://ropsten.infura.io/" + process.env.infuraUrl, address_index = 0, num_addresses = 3),
            network_id: 3,
            gas: 3000000,
            gasPrice: 50
        },
        mainnet: {
            provider: () => new HDWalletProvider(process.env.pk, "https://mainnet.infura.io/" + process.env.infuraUrl),
            network_id: 1,
            gas: 3000000,
            gasPrice: 1100000000
        }
    },
    // mocha: {
    //     useColors: true,
    //     reporter: 'mocha-multi-reporters',
    //     reporterOptions: {
    //         configFile: './mocha-reporter-config.json',
    //     },
    // },
    // mocha: {
    // //     reporter: 'eth-gas-reporter',
    //     useColors: true,
    // //     reporterOptions: {
    // //         currency: "EUR",
    // //         gasPrice: 21
    // //     }
    // },
    plugins: [
        "truffle-plugin-hello"
    ]
};
