<template>
    <div>
        <h2 class="game-comp__title title">{{ game.name }}</h2>
        <div class="game-comp__balance balance-game">
            <template v-if="getTheBet && getTheBet.bet > 0">
                <h4 class="balance-game__title small-title">Balance</h4>
                <div class="balance-game__item">
                    <img
                        class="balance-game-img"
                        :src="getCoinById(getTheBet.coinId).img"
                        :alt="getCoinById(getTheBet.coinId).name"
                    />
                    <div class="balance-game-amount">{{ Number(getTheBet.bet) }}</div>
                    <button type="button" :disabled="isMessage" class="balanca-game-button button" @click="getCoins">
                        Get the coins
                    </button>
                </div>
            </template>
        </div>
        <slot></slot>
        <div class="game-comp__bg-img">
            <img :src="game.img" alt="game background" />
        </div>
        <message-popup :status="messageStatus" :show="isMessage" :text="message" />
    </div>
</template>

<script>
import { computed } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import MessagePopup from '@/components/MessagePopup/index.vue'

export default {
    name: 'GameMasterPage',

    data() {
        return {
            coinId: null,
            userCoinsArr: [],
            isMessage: false,
            messageStatus: false,
            message: null,
            localUser: {},
        }
    },

    components: {
        MessagePopup,
    },

    props: {
        game: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
    },

    provide() {
        return {
            // explicitly provide a computed property
            messageMaster: computed(() => 'Lox'),
            usersCoins: computed(() => this.userCoins),
        }
    },

    computed: {
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        userCoins() {
            return (
                this.user &&
                this.user.inventory &&
                this.user.inventory.filter((coin) => {
                    if (this.getCoinById(coin.id)) {
                        return this.getCoinById(coin.id)?.category === this.game.category
                    }
                })
            )
        },
        neededCoinId() {
            const coin = this.coinsList.find((coin) => coin?.category === this.game.category)
            return coin?.id
        },
        getTheBet() {
            const bet = this.user.bets.find((bet) => bet.gameId === this.game.id)
            if (bet) {
                if (bet.bet > 0) return bet
                else return this.openBetPopup()
            } else return 'No bet made'
        },
    },

    created() {
        this.localUser = { ...this.user }
    },

    methods: {
        ...mapActions('login', { setUsersList: 'loadList', updateUser: 'updateItem' }),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('games', { setGamesList: 'loadList' }),
        ...mapActions('games', ['openBetPopup']),

        async getCoins() {
            const coin = this.localUser.inventory.find((coin) => coin.id === this.getTheBet.coinId)

            if (coin && coin.id) {
                const coinAmount = Number(coin.amount) + Number(this.getTheBet.bet)
                coin.amount = Number(coinAmount)
            } else {
                const product = {
                    id: this.getTheBet.coinId,
                    amount: this.getTheBet.bet,
                }
                this.localUser.inventory.push(product)
            }
            this.localUser.bets = this.localUser.bets.filter((bet) => bet.coinId != coin.id)

            await this.updateUser({
                itemId: this.localUser.id,
                data: this.localUser,
            })

            this.showMessage('Coins successfully received! Redirecting to the profile page...', true)
            setTimeout(() => {
                this.$router.push({
                    name: 'user_profile',
                    params: {
                        userLogin: this.user.login,
                    },
                })
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