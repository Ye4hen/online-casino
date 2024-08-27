import getStoreTemplate from "../helpers/storeTemplate"

const faqStore = {
	...getStoreTemplate('FAQ'),

	mutations: {
		...getStoreTemplate('FAQ').mutations,
		openFAQ(state, faqId) {
			state['FAQ'].find((faq) => {
				if (faq.id === faqId) faq.isOpen = true
				else faq.isOpen = false
			})
		},
	},

	actions: {
		...getStoreTemplate('FAQ').actions,
		openFAQ({ commit }, faqId) {
			commit("openFAQ", faqId)
		},
	},
}

export default faqStore