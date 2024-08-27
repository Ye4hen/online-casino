<template>
    <div class="game-comp-item" style="text-align: center">
        <TheGameArea />
        <TheTitleScreen v-if="isTitleShowing" />
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import TheTitleScreen from '@/components/GamesComp/BlackJack/TheTitleScreen.vue'
import TheGameArea from '@/components/GamesComp/BlackJack/TheGameArea.vue'

export default {
    name: 'BlackJackGame',

    components: {
        TheTitleScreen,
        TheGameArea,
    },

    data() {
        return {
            game: {},
            user: {},
        }
    },

    computed: {
        ...mapState('blackjack', ['isTitleShowing']),
        ...mapGetters('user', ['userProfileId']),
        ...mapGetters('login', { getUserById: 'getItemById' }),
		...mapGetters('games', { getGameByName: 'getItemByName', gamesList: 'getItemsList' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        gameName() {
            return this.$route.params.gameName
        },
        userCoins() {
            const coinsData =
                this.user &&
                this.user.inventory &&
                this.user.inventory.filter((coin) => this.getCoinById(coin.id)?.category === this.game.category)
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

    async created() {
        // if (this.getUserById(this.userProfileId)) {
        // } else {
        //     this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        // }
        // if (this.getGameByName(this.gameName)) {
        // }
        // setTimeout(() => {
        this.user = { ...this.getUserById(this.userProfileId) }
        this.game = { ...this.getGameByName(this.gameName) }
        if (this.userCoins && this.userCoins > 0) {
            this.startNewGame(this.userCoins)
        }
        // }, 1500)
    },

    methods: {
        ...mapActions('games', { setGamesList: 'loadList' }),
        ...mapActions('blackjack', ['startNewGame']),
    },
}
</script>

<style lang="scss" scoped>
</style>