<template>
    <main-master-page>
        <loading-comp v-if="!currentProduct.id" />
        <template v-else>
            <div class="product">
                <div class="product__container">
                    <div class="product__main main-product">
                        <div class="main-product__info">
                            <h3 class="main-product__title title">{{ currentProduct?.name }}</h3>
                            <strong class="main-product__price">${{ productPrice }}</strong>
                            <div class="main-product__count item-form">
                                <span @click="decreaseCount">-</span>
                                <input v-model.trim="productCount" type="number" min="1" step="0.01" />
                                <span @click="increaseCount">+</span>
                            </div>
                            <message-popup :status="errorMessageStatus" :show="showErrorMessage" :text="errorMessage" />
                            <div class="main-product__desc">
                                <p>{{ currentProduct?.desc }}</p>
                            </div>
                            <button class="main-product__button button" @click="buyProduct">Buy</button>
                        </div>
                        <div class="main-product__image">
                            <img :src="currentProduct?.img" :alt="currentProduct?.name" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </main-master-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import MessagePopup from '@/components/MessagePopup/index.vue'
import LoadingComp from '@/components/LoadingComp/index.vue'

export default {
    name: 'ProductPage',
    components: {
        MainMasterPage,
        MessagePopup,
        LoadingComp,
    },
    data() {
        return {
            currentProduct: {},
            productCount: 1,
            user: {},
            showErrorMessage: false,
            errorMessageStatus: false,
        }
    },
    computed: {
        ...mapGetters('login', { usersList: 'getItemsList' }),
        ...mapGetters('coins', ['isLoading']),
		...mapGetters('coins', { getCoinById: 'getItemById', getCoinByName: 'getItemByName' }),
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters(['errorMessage']),
        coinName() {
			return this.$route.params.productName
		},
		coinId() {
			const coin = this.getCoinByName(this.coinName)
			return coin.id
		},
        productPrice() {
            return this.currentProduct?.price ? (this.currentProduct.price * this.productCount).toFixed(2) : 0
        },
    },
    async created() {
        await this.setCoinsList()
        if (!this.userProfileId) await this.setUserId(JSON.parse(localStorage.getItem('casinoUser')))
        setTimeout(async () => {
            this.currentProduct = await { ...this.getCoinById(this.coinId) }
            this.user = { ...this.getUserById(this.userProfileId) }
            console.log('currentProduct')
            console.log(this.currentProduct)
        }, 1500)
        // if (this.getUserById(this.userProfileId)) {
        // } else {
        // this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        // }
        this.setErrorMessage(null)
    },
    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('user', ['setUserId']),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('login', { updateUser: 'updateItem' }),
        decreaseCount() {
            if (this.productCount > 1) {
                this.productCount -= 1
            } else {
                this.setErrorMessage("You can't buy less than 1 product")
                this.errorMessageStatus = false
                this.showErrorMessage = true
                setTimeout(() => {
                    this.showErrorMessage = false
                }, 3000)
            }
        },
        increaseCount() {
            this.productCount += 1
            this.setErrorMessage(null)
        },
        buyProduct() {
            // if (!JSON.parse(localStorage.getItem('casinoUser'))) {
            if (!this.user.id) {
                this.setErrorMessage('You need to be logged in to buy something')
                this.errorMessageStatus = false
                this.showErrorMessage = true
                setTimeout(() => {
                    this.showErrorMessage = false
                }, 3000)
            } else {
                const existingProduct = this.user.inventory.find((item) => item.id == this.coinId)
                const totalPrice = this.productCount * this.getCoinById(this.coinId).price
                if (this.productCount < 1) {
                    this.productCount = 1
                } else {
                    this.productCount = Math.trunc(this.productCount)
                    const userBalance = parseFloat(this.user.balance)
                    if (totalPrice > userBalance) {
                        this.setErrorMessage('Not enough money on the balance')
                        this.errorMessageStatus = false
                        this.showErrorMessage = true
                        setTimeout(() => {
                            this.showErrorMessage = false
                        }, 3000)
                    } else {
                        this.setErrorMessage(null)
                        if (existingProduct) {
                            existingProduct.amount += this.productCount
                        } else {
                            const product = {
                                id: this.coinId,
                                amount: this.productCount,
                            }
                            this.user.inventory.push(product)
                        }
                        const balance = this.user.balance - Number(totalPrice).toFixed(3)
                        this.user.balance = balance.toFixed(3)
                        this.updateUser({
                            itemId: this.user.id,
                            data: this.user,
                        })

                        // localStorage.setItem('casinoUser', JSON.stringify(this.user))
                        this.setErrorMessage('Purchased successfully')
                        this.errorMessageStatus = true
                        this.showErrorMessage = true
                        setTimeout(() => {
                            this.showErrorMessage = false
                        }, 3000)
                        this.productCount = 1
                    }
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>