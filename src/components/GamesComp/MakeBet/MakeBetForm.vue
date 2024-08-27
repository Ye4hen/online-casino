<template>
    <form v-if="usersCoins && usersCoins.length" action="#" class="bet-popup__form form-bet-popup">
        <div class="form-bet-popup__coins">
            <h3 class="form-bet-popup__coins-title">Here are the coins you can choose to play</h3>
            <div class="balance-game">
                <div v-for="coin in usersCoins" :key="coin.id" class="balance-game__item form-bet-popup__coins-item">
                    <template v-if="!coinToPlay || coinToPlay === coin.id">
                        <template v-if="coin && coin.amount">
                            <img
                                class="balance-game-img"
                                :src="getCoinById(coin.id).img"
                                :alt="getCoinById(coin.id).name"
                            />
                            <div class="balance-game-amount">{{ coin.amount }}</div>
                        </template>
                        <div v-else class="balance-game__item">
                            <div>You do not have needed coins:(</div>
                            <router-link
                                :to="{ name: 'product', params: { productName: neededCoinName ? neededCoinName : '#' } }"
                                >Go and buy some!</router-link
                            >
                        </div>
                    </template>
                </div>
            </div>
            <div class="form-bet-popup__coins-select item-form">
                <label>
                    Choose the coin
                    <select v-model="coinToPlay">
                        <option v-for="coin in usersCoins" :key="coin.id" :value="coin.id">
                            {{ getCoinById(coin.id).name }}
                        </option>
                    </select>
                </label>
            </div>
            <div v-if="coinToPlay" class="form-bet-popup__coins-amount item-form">
                <label>
                    Enter the amount of coins you want to bet
                    <input v-model="coinsAmount" type="number" />
                </label>
            </div>
        </div>
        <div class="form-bet-popup__buttons">
			<button type="button" class="form-bet-popup__button button" @click="quit">Quit</button>
            <button type="button" :disabled="!coinsAmount" class="form-bet-popup__button button" @click="makeBet">
                Bet
            </button>
        </div>
    </form>
    <div v-else class="balance-game__item">
        You do not have needed coins:(
        <router-link :to="{ name: 'product', params: { productName: neededCoinName ? neededCoinName : '#' } }"
            >Go and buy some!</router-link
        >
    </div>
    <message-popup :status="messageStatus" :show="isMessage" :text="message" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MessagePopup from '@/components/MessagePopup/index.vue'

export default {
    name: 'MakeBetForm',

    data() {
        return {
            isCoinChosen: false,
            coinToPlay: null,
            coinsAmount: null,
            isMessage: false,
            messageStatus: false,
            message: null,
            user: {},
        }
    },

    components: {
        MessagePopup,
    },

    inject: ['usersCoins'],

    props: {
        game: {
            type: Object,
            required: true,
        },
    },

    watch: {
        coinsAmount: {
            handler(newValue) {
                const coin = this.usersCoins.find((coin) => coin.id === this.coinToPlay)
                if (newValue && newValue > coin.amount) {
                    this.showMessage(`You have only ${coin.amount} coins`, false)
                    this.coinsAmount = null
                }
            },
        },
    },

    computed: {
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        ...mapGetters('user', ['userProfileId']),
        ...mapGetters('login', { getUserById: 'getItemById' }),

        neededCoinName() {
            const coin = this.coinsList.find((coin) => coin?.category === this.game.category)
            return coin?.name
        },
    },

    created() {
        // this.user = { ...this.getUserById(localStorage.getItem('casinoUser')) }
        setTimeout(() => {
            this.user = { ...this.getUserById(this.userProfileId) }
        }, 1100)
    },

    methods: {
        ...mapActions('games', ['closeBetPopup']),
        ...mapActions('login', { updateUser: 'updateItem' }),

        quit() {
            this.closeBetPopup()
            this.$router.push({
                name: 'games',
            })
        },

        async makeBet() {
            const bet = this.coinsAmount
            const userCoin = this.user.inventory.find((coin) => coin.id === this.coinToPlay)
            const coinAmount = userCoin.amount - bet
            userCoin.amount = Number(coinAmount)
            this.user.bets = []
            this.user.bets.push({
                coinId: userCoin.id,
                gameId: this.game.id,
                bet: bet,
            })
            if (Number(coinAmount) < 1)
                this.user.inventory = this.user.inventory.filter((coin) => coin.id != userCoin.id)

            await this.updateUser({
                itemId: this.user.id,
                data: this.user,
            })
            this.showMessage('Bet successfully made', true)
            setTimeout(() => {
                this.$router.go()
            }, 3000)
        },

        showMessage(msg, status) {
            this.message = msg
            this.messageStatus = status
            this.isMessage = true
            setTimeout(() => {
                this.isMessage = false
            }, 3000)
        },
    },
}
</script>

<style lang="scss" scoped>
</style>