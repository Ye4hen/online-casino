require('dotenv').config()
require('@nomiclabs/hardhat-waffle')

module.exports = {
	solidity: '0.8.4',
	paths: {
		artifacts: './src/artifacts',
	},
	networks: {
		hardhat: {
			chainId: 1337,
		},
		amoy: {
			url: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
		// hardhat: {
		// 	chainId: 1,
		// },
		// forking: {
		// 	url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
		// 	accounts: [`0x${process.env.PRIVATE_KEY}`],
		// },
	},
}