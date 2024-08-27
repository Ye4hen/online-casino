<template>
    <div class="controls-row">
        <div class="controls">
            <div class="controls__wrapper">
                <div class="control__content">
                    <GameButton
                        action="doubleDown"
                        :is-enabled="canDoubleDown && isPlayerTurn"
                        @click="onAction(doubleDown)"
                    />
                    <GameButton action="split" :is-enabled="canSplit && isPlayerTurn" @click="split" />
                </div>
                <TheBank class="bank" />
                <div class="control__content">
                    <GameButton action="stand" :is-enabled="isPlayerTurn" @click="onAction(stand)" />
                    <GameButton action="hit" :is-enabled="isPlayerTurn" @click="onHit" />
                </div>
            </div>
            <!-- <button class="controls__btn" @click="onQuit">End the game</button> -->
        </div>
    </div>
</template>

<script>
import GameButton from './GameButton.vue'
import TheBank from './TheBank.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    components: {
        GameButton,
        TheBank,
    },

    computed: {
        ...mapState('blackjack', ['isDealing', 'activeHandIndex', 'bank']),
        ...mapGetters('blackjack', ['canSplit', 'canDoubleDown', 'isGameOver']),
        ...mapGetters('user', ['userProfileId']),
        ...mapGetters('login', { getUserById: 'getItemById' }),
        ...mapGetters('games', { getGameByName: 'getItemByName' }),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        isPlayerTurn() {
            return !this.isDealing && this.activeHandIndex > 0
        },

        gameName() {
            return this.$route.params.gameName
        },

        blackjackCoin() {
            const coinsData = this.user.inventory.filter(
                (coin) => this.getCoinById(coin.id).category === this.game.category
            )
            if (coinsData.length === 1) {
                return coinsData[0]
            } else if (!coinsData.length) return 0
            else {
                const highestCoin = coinsData.reduce((maxCoin, currentCoin) => {
                    const maxCoinData = this.getCoinById(maxCoin.id)
                    const currentCoinData = this.getCoinById(currentCoin.id)
                    return maxCoinData.amount > currentCoinData.amount ? maxCoin : currentCoin
                })
                return highestCoin
            }
        },

        userCoins() {
            const coin = this.blackjackCoin
            console.log('this.blackjackCoin')
            console.log(this.blackjackCoin)
            return coin ? coin.amount : 0
        },
    },

    watch: {
        isGameOver(newValue) {
            if (newValue) {
                this.blackjackCoin.amount = 0
                this.user.inventory = this.user.inventory.filter((item) => item.id !== this.blackjackCoin.id)
                this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
            }
        },
        bank(newBankValue) {
            this.blackjackCoin.amount = newBankValue + 1
            this.updateUser({
                itemId: this.user.id,
                data: this.user,
            })
        },
    },

    created() {
        // setTimeout(() => {
        this.user = { ...this.getUserById(this.userProfileId) }
        this.game = { ...this.getGameByName(this.gameName) }
        // }, 1500)
    },

    methods: {
        ...mapActions('blackjack', ['doubleDown', 'split', 'stand', 'hit', 'resetRound']),
        ...mapActions('login', { updateUser: 'updateItem' }),
        onAction(action) {
            action()
        },
        onHit() {
            const onlyOnce = false
            this.hit({ onlyOnce })
        },
    },
}
</script>

<style lang="scss" scoped>
.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.controls-row {
    text-align: center;
}
.controls__wrapper {
    margin-top: 12.5rem;
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    @media (max-width: 47.9988rem) {
        justify-content: center;
        display: grid;
        gap: 0.9375rem;
    }
}

.bank {
    @media (max-width: 47.9988rem) {
        order: -1;
    }
}

.control__content {
    display: inline-flex;
    align-items: center;
    gap: 0.9375rem;
    // @media (max-width: 37.5rem) {
    //     flex-wrap: wrap;
    // }
}

.controls__btn {
    display: inline-block;
    padding: 2rem 4rem;
    font-size: 1.5625rem;
    font-weight: 700;
    border: 0;
    margin: 0 0.5rem;
    background-color: #393232;
    border-radius: 2em;
    transition: all 0.2s ease;
    box-shadow: 0 0.25rem 0 0 rgba(0, 0, 0, 0.25);
    transform: translateY(-0.125rem);
    cursor: pointer;
    @media (any-hover: hover) {
        &:hover {
            background-color: #242424;
        }
    }
}
</style>