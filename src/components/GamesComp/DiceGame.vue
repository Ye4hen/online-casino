<template>
    <div class="game-comp-item" style="text-align: center">
        <div class="game-comp-item__dices">
            <div :class="[gameDiceStyle, { 'dice-rotate': shouldRotate }]" class="game-comp-item__dice">
                {{ number1 }}
            </div>
            <div :class="[gameDiceStyle, { 'dice-rotate': shouldRotate }]" class="game-comp-item__dice">
                {{ number2 }}
            </div>
        </div>
        <div class="game-comp-item__form item-form">
            <label>
                Guess the numbers
                <input v-model="playNumber1" type="number" @input="checkInputsVal('playNumber1')" />
                <input v-model="playNumber2" type="number" @input="checkInputsVal('playNumber2')" />
            </label>
        </div>
        <button
            :disabled="!playNumber1 || !playNumber2 || userCoins < 1"
            class="game-comp-item__btn button"
            @click="onPlay"
        >
            Play
        </button>
        <strong class="small-title">{{ getResult }}</strong>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DiceGame',

    data() {
        return {
            game: {},
            user: {},
            number1: 0,
            number2: 0,
            getResult: null,
            playNumber1: null,
            playNumber2: null,
            shouldRotate: false,
        }
    },

    computed: {
        ...mapGetters('user', ['userProfileId']),
        ...mapGetters('login', { getUserById: 'getItemById' }),
		...mapGetters('games', { getGameByName: 'getItemByName' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        gameName() {
            return this.$route.params.gameName
        },
        userCoins() {
            const coin = this.user.inventory.find((coin) => this.getCoinById(coin.id)?.category === this.game.category)
            return coin ? coin.amount : 0
        },
        gameDiceStyle() {
            console.log('this.game1')
            console.log(this.game)
            if (this.game && this.game.name === 'Red Anger') {
                return 'red-anger__dice'
            } else if (this.game && this.game.name === 'Rolling Cubes') {
                return 'rolling-cubes__dice'
            }
            return 'default__dice'
        },
    },

    created() {
        // if (this.getUserById(this.userProfileId)) {
        // this.user = { ...this.getUserById(this.userProfileId) }
        // } else {
        // this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        // }
        // if (this.getGameByName(this.gameName)) {
        // this.game = { ...this.getGameByName(this.gameName) }
        // } else {
        // const storageGamesList = JSON.parse(localStorage.getItem('gamesList'))
        // let storageGame = storageGamesList.find((game) => game.id == this.gameName)
        // this.game = { ...storageGame }
        // }
        // setTimeout(() => {
        this.user = { ...this.getUserById(this.userProfileId) }
        this.game = { ...this.getGameByName(this.gameName) }
        // }, 1500)
    },

    methods: {
        ...mapActions('games', { setGamesList: 'loadList' }),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('login', { updateUser: 'updateItem' }),
        onPlay() {
            this.shouldRotate = true
            const coinsToDecrement = this.user.inventory.find(
                (coin) => this.getCoinById(coin.id).category === this.game.category
            )
            setTimeout(() => {
                this.number1 = this.getRandomNumber()
                this.number2 = this.getRandomNumber()
                this.shouldRotate = false
                if (this.playNumber1 === this.number1 && this.playNumber2 === this.number2) {
                    this.getResult = 'You won!'
                    coinsToDecrement.amount = coinsToDecrement.amount * 10
                } else if (this.playNumber1 === this.number1 || this.playNumber2 === this.number2) {
                    this.getResult = 'Close'
                    coinsToDecrement.amount += 1
                } else {
                    this.getResult = 'You lost('
                    if (coinsToDecrement.amount < 2) {
                        coinsToDecrement.amount = 0
                        this.user.inventory = this.user.inventory.filter((coin) => coin.id !== coinsToDecrement.id)
                    } else {
                        coinsToDecrement.amount -= 2
                    }
                }
                this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
            }, 3000)
        },
        getRandomNumber() {
            return Math.floor(Math.random() * 6) + 1
        },
        checkInputsVal(inputType) {
            if (inputType === 'playNumber1') {
                if (this.playNumber1 < 1 || this.playNumber1 > 6) {
                    this.playNumber1 = null
                }
            } else if (inputType === 'playNumber2') {
                if (this.playNumber2 < 1 || this.playNumber2 > 6) {
                    this.playNumber2 = null
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.dice-rotate {
    animation: diceRotationAnim 3s linear;
}

@keyframes diceRotationAnim {
    0% {
        transform: rotateY(0) rotateX(0) rotateZ(0);
    }
    50% {
        transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg);
    }
    to {
        transform: rotateY(0) rotateX(0) rotateZ(0);
    }
}
</style>