<template>
    <transition name="fade">
        <div class="title-screen">
            <img :src="coin.img" :alt="coin.name" />
            <div v-if="!userCoins || userCoins < 1" class="balance-game__item">
                You do not have needed coins:(
                <router-link :to="{ name: 'shop' }">Go and buy some!</router-link>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            game: {},
            user: {},
            coin: {},
        }
    },

    computed: {
        ...mapState('blackjack', ['bank']),
        ...mapGetters('user', ['userProfileId']),
        ...mapGetters('login', { getUserById: 'getItemById' }),
		...mapGetters('games', { getGameByName: 'getItemByName' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),

        gameName() {
            return this.$route.params.gameName
        },

        coinForLoading() {
            return (game) => this.coinsList.find((coin) => this.getCoinById(coin.id).category === game.category)
        },

        userCoins() {
            const coinsData = this.user.inventory.filter(
                (coin) => this.getCoinById(coin.id)?.category === this.game.category
            )
            if (coinsData.length === 1) {
                return coinsData[0].amount
            } else if (!coinsData.length) return 0
            const highestCoin = coinsData.reduce((maxCoin, currentCoin) => {
                const maxCoinData = this.getCoinById(maxCoin.id)
                const currentCoinData = this.getCoinById(currentCoin.id)
                return maxCoinData.amount > currentCoinData.amount ? maxCoin : currentCoin
            })

            return highestCoin.amount
        },
    },

    created() {
        // setTimeout(() => {
        this.user = { ...this.getUserById(this.userProfileId) }
        this.game = { ...this.getGameByName(this.gameName) }
        // }, 1100)
        this.coin = { ...this.coinForLoading(this.game) }
    },

    mounted() {
        setTimeout(() => {
            if (this.userCoins && this.userCoins > 0) {
                this.startNewGame(this.userCoins)
                const coin = this.user.inventory.find(
                    (coin) => this.getCoinById(coin.id).category === this.game.category
                )
                coin.amount = this.bank
                this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
            }
        }, 2000)
    },

    methods: {
        ...mapActions('blackjack', ['startNewGame']),
        ...mapActions('login', { updateUser: 'updateItem' }),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('games', { setGamesList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
.title-screen {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    padding: 0px 0.9375rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    font-weight: 100;
    letter-spacing: 0.5rem;
    transition: all 0.2s;
    z-index: 200;
    background: rgb(12, 36, 48);
    color: #e1ae0f;
    img {
        max-width: 100%;
    }
    @media (max-width: 47.9988rem) {
        font-size: 3rem;
    }
}
</style>