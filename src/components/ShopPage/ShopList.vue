<template>
    <ul class="shop__list">
        <li v-for="coin in getFilteredCoinsList" :key="coin.id" class="shop__item item-shop">
            <div class="item-shop__info">
                <h4 class="item-shop__title">
                    <router-link
                        :to="{ name: 'product', params: { productName: coin.name } }"
                        class="item-shop__title-link"
                    >
                        {{ coin.name }}
                    </router-link>
                </h4>
                <h6 class="item-shop__category">
                    {{ coin.category }}
                </h6>
                <div class="item-shop__tag">
                    <strong class="item-shop__price"> ${{ coin.price }} </strong>
                </div>
            </div>
            <router-link :to="{ name: 'product', params: { productName: coin.name } }" class="item-shop__image">
                <img :src="coin.img" :alt="coin.name" />
            </router-link>
        </li>
        <message-popup
			:status="errorMessageStatus"
			:show="showErrorMessage"
			:text="errorMessage"
		/>
    </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MessagePopup from '@/components/MessagePopup/index.vue'

export default {
    name: 'ShopList',
	components: {
		MessagePopup,
	},

	data(){
		return{
			showErrorMessage: false,
			errorMessageStatus: false,
			errorMessage: null
		}
	},

    computed: {
        ...mapGetters('login', { usersList: 'getItemsList' }),
        ...mapGetters('user', ['userProfileName', 'userProfileId']),
        ...mapGetters('coins', { coinsList: 'getItemsList' }),
        ...mapGetters('coins', ['getFilteredCoinsList']),
    },

	watch: {
		getFilteredCoinsList:{
			handler(newValue){
				if(!newValue.length){
					this.errorMessage = 'There are no such coins!'
					this.errorMessageStatus = false
					this.showErrorMessage = true
					setTimeout(() => {
						this.showErrorMessage = false
					}, 3000)
				}
			}
		}
	},

    created() {
        const newUser = this.usersList.find((user) => {
            return user.login == this.userProfileName
        })
        if (newUser) {
            if (!this.userProfileId) {
                this.setUserId(newUser.id)
            }
        }
    },

    methods: {
        ...mapActions('user', ['setUserId']),
    },
}
</script>

<style lang="scss" scoped>
</style>