// import { createStore } from 'vuex'
import { ethers } from 'ethers'
import contractABI from '@/artifacts/contracts/WaveContract.sol/WavePortal.json'

const contractAddress = '0xFE59570F31ACE4A11C0303027c5f077D59Dc2784'

const crypto = {
	namespaced: true,
	state: {
		account: '',
		guestPosts: [],
		loading: false,
		guestPostsCount: 0,
		transactionSum: null,
		rate: null
	},
	getters: {
		getAccount: ({ account }) => account,
		getRate: ({ rate }) => rate,
		getGuestPosts: state => state.guestPosts,
		getGuestPostsCount: state => state.guestPostsCount,
	},
	mutations: {
		setAccount(state, account) {
			state.account = account
		},
		setGuestPosts(state, guestPosts) {
			state.guestPosts = guestPosts
		},
		setLoading(state, loading) {
			state.loading = loading
		},
		setGuestPostsCount(state, count) {
			state.guestPostsCount = count
		},
		setTransactionSum(state, tansSum) {
			state.transactionSum = tansSum
		},
	},
	actions: {
		async getBalance({ commit }) {
			commit('setLoading', true)
			try {
				const { ethereum } = window
				if (ethereum) {
					const provider = new ethers.providers.Web3Provider(ethereum)
					const signer = provider.getSigner()
					// const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
					// const count = await wavePortalContract.getBalance()
					// const amt = ethers.utils.formatEther(count)
					// console.log('Balance:', amt)
					const result = await signer.getBalance().then(res => (parseInt(res._hex) / Math.pow(10, 18)).toFixed(4))
					// console.log('Balance:')
					// console.log(result)
					return result
				}
				commit('setLoading', false)
			} catch (e) {
				commit('setLoading', false)
				console.log('Error:', e)
			}
		},
		async wave({ commit }, messageInput) {
			commit('setLoading', true)
			try {
				const { ethereum } = window
				if (ethereum) {
					const provider = new ethers.providers.Web3Provider(ethereum)
					const signer = provider.getSigner()
					const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

					wavePortalContract.on('PrizeMoneySent', (receiver, amount) => {
						console.log('Prize won! %s received ', receiver, amount.toNumber())
					})

					const overrides = {
						value: ethers.utils.parseEther('.05'),
						gasLimit: 200000
					}

					const waveTxn = await wavePortalContract.wave(messageInput, overrides)
					console.log('Mining...', waveTxn.hash)
					await waveTxn.wait()
					console.log('Mined -- ', waveTxn.hash)

					const count = (await wavePortalContract.totalWaveCount()).toNumber()
					console.log('Wave count:', count)
				} else {
					console.log('Ethereum object doesn\'t exist!')
				}
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				console.log('Error:', error)
			}
		},
		async getAllWaves({ commit, state }) {
			try {
				const { ethereum } = window
				if (ethereum) {
					const provider = new ethers.providers.Web3Provider(ethereum)
					const signer = provider.getSigner()
					const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

					const waves = await wavePortalContract.getAllWaves()

					const wavesCleaned = waves.map((wave) => {
						const waveTime = new Date(wave.timestamp * 1000)
						const waveTimeFormatted = new Intl.DateTimeFormat('en-US').format(waveTime)
						return {
							address: wave.waver,
							timestamp: waveTimeFormatted,
							message: wave.message
						}
					})

					commit('setGuestPosts', wavesCleaned)

					wavePortalContract.on('NewWave', (from, message, timestamp) => {
						const waveTime = new Date(timestamp * 1000)
						const waveTimeFormatted = new Intl.DateTimeFormat('en-US').format(waveTime)
						const newPost = {
							address: from,
							timestamp: waveTimeFormatted,
							message
						}
						commit('setGuestPosts', [...state.guestPosts, newPost])
					})
				} else {
					console.log('Ethereum object doesn\'t exist!')
				}
			} catch (error) {
				console.log('Error:', error)
			}
		},
		async getWaveCount({ commit }) {
			try {
				const { ethereum } = window
				if (ethereum) {
					const provider = new ethers.providers.Web3Provider(ethereum)
					const signer = provider.getSigner()
					const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
					const count = await wavePortalContract.totalWaveCount()
					console.log('Total wave count:', count)
					commit('setGuestPostsCount', count)
				} else {
					console.log('Ethereum object doesn\'t exist!')
				}
			} catch (error) {
				console.log('Error:', error)
			}
		},
		async connectWallet({ commit, dispatch }) {
			try {
				const { ethereum } = window
				if (!ethereum) {
					alert('Must connect to MetaMask! If you have not installed MetaMask, please visit https://metamask.io/download')
					return
				}
				const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
				console.log('Connected:', accounts[0])
				commit('setAccount', accounts[0])
				await dispatch('getWaveCount')
				await dispatch('getAllWaves')
				await dispatch('getBalance')
			} catch (error) {
				console.log('Error:', error)
			}
		},

		async fetchUsdToMaticRate({ state, commit }) {
			commit('setLoading', true)
			try {
				// const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
				const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
				const data = await response.json();
				state.rate = data['matic-network'].usd;
				console.log('state.rate');
				console.log(state.rate);
				return state.rate
			} catch (error) {
				console.error('Error fetching the USD to MATIC rate:', error);
				state.rate = 1
				return state.rate
				// throw error;
			} finally {
				commit('setLoading', false)
			}
		},

		async sendTransaction({ commit, state, dispatch }, user) {
			commit('setLoading', true);
			try {
				await dispatch('fetchUsdToMaticRate')
				const maticAmount = Number((state.transactionSum / state.rate).toFixed(4));
				const valueInWei = ethers.utils.parseEther(maticAmount.toFixed(18));

				const params = [
					{
						from: user.cryptoAccount,
						to: process.env.VUE_APP_OWNER_ACCOUNTANT,
						gas: '0x5208', // 21000 Gwei (Gas limit)
						value: valueInWei.toHexString(), // Convert to hexadecimal
					},
				];
				console.log(params);

				const transaction = await window.ethereum.request({
					method: 'eth_sendTransaction',
					params,
				});

				console.log(transaction);
				return transaction;
			} catch (error) {
				console.error('Error sending transaction:', error);
				throw error;
			} finally {
				commit('setLoading', false);
			}
		},

		setTransactionSum({ commit }, transSum) {
			commit('setTransactionSum', transSum)
		},

		async connectUsersWallet({ state, dispatch }, user) {
			await dispatch('connectWallet')
			await dispatch('fetchUsdToMaticRate')
			const account = state.account
			user.cryptoAccount = account
			await dispatch('login/updateItem', {
				itemId: user.id,
				data: user
			}, '', { root: true });
		},
	},

}

export default crypto