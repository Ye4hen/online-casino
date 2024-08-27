import { createStore } from "vuex";
import login from "./modules/login";
import header from "./modules/header";
import games from "./modules/games";
import user from "./modules/user";
import faq from "./modules/faq";
import coins from "./modules/coins";
import wheel_prizes from "./modules/wheel_prizes";
import blackjack from "./modules/blackjackModule";
import slots__prizes from "./modules/slots__prizes";
import crypto from "./modules/crypto";


export default createStore({
	state: {
		errorMessage: null,
		isBet: false
	},
	getters: {
		errorMessage: ({ errorMessage }) => errorMessage,
		isBet: ({ isBet }) => isBet,
	},
	mutations: {
		setErrorMessage(state, message) {
			state.errorMessage = message
		},
		setBet(state, status) {
			state.isBet = status
		},
	},
	actions: {
		setErrorMessage({ commit }, message) {
			commit("setErrorMessage", message)
		},
		setBet({ commit }, status) {
			commit("setBet", status)
		},
	},
	modules: {
		login,
		header,
		games,
		user,
		faq,
		coins,
		wheel_prizes,
		blackjack,
		slots__prizes,
		crypto
	},
});
