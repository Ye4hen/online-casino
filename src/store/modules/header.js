

export default {
	namespaced: true,
	state: {
		isPopupActive: false,
	},
	getters: {

	},
	mutations: {
		openPopup(state) {
			state.isPopupActive = true
			document.body.classList.add('popup-active')
		},
		closePopup(state) {
			state.isPopupActive = false
			document.body.classList.remove('popup-active')
		}
	},
	actions: {
		openPopup({ commit }) {
			commit("openPopup")
		},
		closePopup({ commit }) {
			commit("closePopup")
		},
	},
	modules: {},
}
