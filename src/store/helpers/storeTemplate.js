
import DbOperations from './DbOperations'

import { getFiltersList } from '../modules/helpers'
import { isMatchFilter } from '../modules/helpers'

function getStoreTemplate(collectionTitle) {
	const collectionDB = new DbOperations(collectionTitle)
	return {
		namespaced: true,

		state: () => ({
			[collectionTitle]: [],
			loading: false,
			error: null,
			filter: {},
			coinsFilter: {
				name: '',
				category: [],
				priceFrom: null,
				priceTo: null,
			},
			usersFilter: {},
			filterGamesCategory: [],
			errorMessage: null,
			isBetPopupActive: false,
		}),

		getters: {
			isLoading: state => state.loading,
			hasError: state => state.error,

			getItemsList: (state) => state[collectionTitle],
			getCategoriesList: (state) => getFiltersList(state[collectionTitle], "category"),
			coinsCategoriesList: (state) => getFiltersList(state[collectionTitle], 'category'),
			getItemById: (state) => (itemId) => state[collectionTitle].find((item) => item.id == itemId),
			getItemByName: (state) => (itemName) => state[collectionTitle].find((item) => item.name == itemName),
			getFilteredGamesList: (state, getters, rootState) => {
				const filteredGames = state[collectionTitle].filter((game) => {
					return isMatchFilter(game, state.filter);
				});

				if (!filteredGames.length) {
					rootState.errorMessage = "There are no games with such parameters";
				} else {
					rootState.errorMessage = null;
				}

				return filteredGames;
			},
			getFilteredCoinsList: state => {
				let filteredCoinsList = state['coins']
				filteredCoinsList = state['coins'].filter(coin => {
					const nameMatch = !state.coinsFilter.name || coin.name.toLowerCase().includes(state.coinsFilter.name.toLowerCase())
					const categoryMatch = state.coinsFilter.category.length === 0 || state.coinsFilter.category.includes(coin.category)
					const priceMatch = (!state.coinsFilter.priceFrom || coin.price >= state.coinsFilter.priceFrom) &&
						(!state.coinsFilter.priceTo || coin.price <= state.coinsFilter.priceTo)

					return nameMatch && categoryMatch && priceMatch
				})

				return filteredCoinsList
			},
			getFilteredUsersList: state => {
				let filteredUsersList = state['users']
				filteredUsersList = state['users'].filter(user => {
					const loginMatch = !state.usersFilter.login || user.login.toLowerCase().includes(state.usersFilter.login.toLowerCase())
					const emailMatch = !state.usersFilter.email || user.email.toLowerCase().includes(state.usersFilter.email.toLowerCase())
					const balanceMatch = (!state.usersFilter.balanceFrom || user.balance >= state.usersFilter.balanceFrom) &&
						(!state.usersFilter.balanceTo || user.balance <= state.usersFilter.balanceTo)
					const isAdminMatch = !state.usersFilter.isAdmin || user.admin == state.usersFilter.isAdmin

					return loginMatch && emailMatch && balanceMatch && isAdminMatch
				})

				return filteredUsersList

			},
			filterGamesCategory: (state) => state.filterGamesCategory
		},

		mutations: {
			setItemsList(state, itemsList) {
				state[collectionTitle] = itemsList
			},
			deleteItem(state, deleteItemId) {
				state[collectionTitle] = state[collectionTitle].filter((item) => item.id !== deleteItemId)
			},
			setLoading(state, value) {
				state.loading = value
			},
			setError(state, error) {
				state.error = error
			},
			setFilter(state, filterData) {
				if (collectionTitle === 'games') {
					state.filter = { ...state.filter, ...filterData }
				} else if (collectionTitle === 'coins') {
					state.coinsFilter = { ...state.coinsFilter, ...filterData }
				} else if (collectionTitle === 'users') {
					state.usersFilter = { ...state.usersFilter, ...filterData }
				}
			},
			getFilteredGamesListByCategory(state, tabItem) {
				if (tabItem) {
					if (tabItem === "All") {
						return state.filterGamesCategory = state[collectionTitle]
					} else {
						state.filterGamesCategory = state[collectionTitle].filter((game) => {
							return game.category === tabItem
						});
					}
				} else return state.filterGamesCategory
			},
			openBetPopup(state) {
				state.isBetPopupActive = true
				document.body.classList.add('bet-popup-active')
			},
			closeBetPopup(state) {
				state.isBetPopupActive = false
				document.body.classList.remove('bet-popup-active')
			},
			// setGameIdToLocalStorage(gameId) {
			// 	localStorage.setItem('gameId', gameId)
			// },
			// getGameIdFromLocalStorage() {
			// 	localStorage.getItem('gameId')
			// },
		},

		actions: {
			loadList({ commit }) {
				commit('setError', null)
				commit('setLoading', true)
				collectionDB
					.loadItemsList()
					.then((list) => {
						commit('setItemsList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			addItem({ commit, dispatch }, item) {
				commit('setError', null)
				commit('setLoading', true)
				collectionDB
					.addItem(item)
					.then(() => {
						dispatch('loadList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			deleteItem({ commit, dispatch }, itemId) {
				commit('setError', null)
				commit('setLoading', true)

				collectionDB
					.deleteItem(itemId)
					.then(() => {
						dispatch('loadList').then(() => {
							commit('deleteItem', itemId);
						});
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			updateItem({ commit, dispatch }, { itemId, data }) {
				commit('setError', null)
				commit('setLoading', true)

				collectionDB
					.updateItem(itemId, data)
					.then(() => {
						dispatch('loadList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			updateFilter({ commit }, filterData) {
				commit('setFilter', filterData)
			},
			getFilteredGamesListByCategory({ commit }, tabItem) {
				commit("getFilteredGamesListByCategory", tabItem)
			},
			openBetPopup({ commit }) {
				commit("openBetPopup")
				console.log('lox');
			},
			closeBetPopup({ commit }) {
				commit("closeBetPopup")
			},
		},
	}
}

export default getStoreTemplate

