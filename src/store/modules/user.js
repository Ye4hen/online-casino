
export default {
	namespaced: true,
	state: {
		userProfileName: null,
		userProfileId: null,
	},
	getters: {
		userProfileName: ({ userProfileName }) => userProfileName,
		userProfileId: ({ userProfileId }) => userProfileId,
		getUserById: (state, getters, rootState) => (userId) => {
			return rootState.login['users'].find((user) => user.id == userId);
		},
		getUserByLogin: (state, getters, rootState) => (userLogin) => {
			return rootState.login['users'].find((user) => user.login == userLogin);
		},
	},
	mutations: {
		setUserName(state, userProfileName) {
			state.userProfileName = userProfileName
		},
		setUserId(state, userId) {
			state.userProfileId = userId
		},
	},
	actions: {
		setUserName({ commit }, userProfileName) {
			commit("setUserName", userProfileName)
		},
		setUserId({ commit }, userId) {
			commit("setUserId", userId)
		},
	},
	modules: {},
}
