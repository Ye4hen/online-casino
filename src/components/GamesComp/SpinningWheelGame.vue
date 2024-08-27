<template>
    <div class="wheel">
        <div>
            <div class="wheel-wrapper">
                <button
                    class="wheel-pointer"
                    :class="[gameWheelPointer]"
                    :disabled="userCoins < 1"
                    @click="onClickRotate"
                >
                    Start
                </button>
                <div
                    class="wheel-bg"
                    :class="[gameWheelBG, { freeze: freeze }]"
                    :style="`transform: rotate(${wheelDeg}deg)`"
                >
                    <div class="prize-list">
                        <div v-for="(item, index) in prizesList" :key="item.id" class="prize-item-wrapper">
                            <div
                                class="prize-item"
                                :style="`transform: rotate(${(360 / prizeList.length) * index}deg)`"
                            >
                                <div class="prize-name">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            freeze: false,
            rolling: false,
            wheelDeg: 0,
            prizeNumber: 8,
            result: null,
        }
    },
    computed: {
        ...mapGetters('wheel_prizes', { prizesList: 'getItemsList' }),
        ...mapGetters('user', ['userProfileId']),
        ...mapGetters('login', { getUserById: 'getItemById' }),
		...mapGetters('games', { getGameByName: 'getItemByName' }),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        prizeList() {
            return this.prizesList.slice(0, this.prizeNumber)
        },
        userCoins() {
            const coin =
                this.user &&
                this.user.inventory &&
                this.user.inventory.find((coin) => this.getCoinById(coin.id)?.category === this.game.category)
            console.log('coin')
            console.log(coin?.amount)
            return coin ? coin.amount : 0
        },
        gameName() {
            return this.$route.params.gameName
        },
        gameWheelBG() {
            if (this.game && this.game.name === 'Snow Spin') {
                return 'snow-spin__bg'
            } else if (this.game && this.game.name === 'Golden Reels') {
                return 'golden-reels__bg'
            }
            return 'default__bg'
        },
        gameWheelPointer() {
            if (this.game && this.game.name === 'Snow Spin') {
                return 'snow-spin__pointer'
            } else if (this.game && this.game.name === 'Golden Reels') {
                return 'golden-reels__pointer'
            }
            return 'default__pointer'
        },
    },

    watch: {
        prizeNumber() {
            this.freeze = true
            this.wheelDeg = 0

            setTimeout(() => {
                this.freeze = false
            }, 0)
        },
    },

    created() {
        this.setPrizesList()
        // if (this.getUserById(this.userProfileId)) {
        //     this.user = { ...this.getUserById(this.userProfileId) }
        // } else {
        //     this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        // }
        // if (this.getGameByName(this.gameName)) {
        //     this.game = { ...this.getGameByName(this.gameName) }
        // } else {
        //     const storageGamesList = JSON.parse(localStorage.getItem('gamesList'))
        //     let storageGame = storageGamesList.find((game) => game.id == this.gameName)
        //     this.game = { ...storageGame }
        // }
        // setTimeout(() => {
        this.user = { ...this.getUserById(this.userProfileId) }
        this.game = { ...this.getGameByName(this.gameName) }
        // }, 1500)
    },

    methods: {
        ...mapActions('wheel_prizes', { setPrizesList: 'loadList' }),
        ...mapActions('login', { updateUser: 'updateItem' }),
        onClickRotate() {
            if (this.rolling) {
                return
            }
            const resultIndex = Math.floor(Math.random() * this.prizeList.length)
            this.result = null
            this.roll(resultIndex)
        },
        roll(resultIndex) {
            this.rolling = true
            const { wheelDeg, prizeList } = this
            this.wheelDeg = wheelDeg - (wheelDeg % 360) + 6 * 360 + (360 - (360 / prizeList.length) * resultIndex)
            const coinsToDecrement = this.user.inventory.find(
                (coin) => this.getCoinById(coin.id).category === this.game.category
            )
            this.result = this.prizeList[resultIndex].name
            const prizeValue = Number(this.result.match(/\d+/))
            // console.log('prizeValue')
            // console.log(prizeValue)
            if (prizeValue >= 3) {
                // this.rolling = true
                const randomNum = Math.floor(Math.random() * 3)

                randomNum !== 1 ? this.continueRolling() : this.finishRolling(coinsToDecrement, prizeValue)
            } else {
                // Handle non-numeric prize result
                // if (this.result === 'Lost') {
                // setT

                // } else {
                // Handle numeric prize result
                // if (prizeValue >= 3) {
                // this.rolling = true
                // const randomNum = Math.floor(Math.random() * 2)
                // if (randomNum !== 1) {
                //     this.continueRolling()
                // } else {
                // this.finishRolling(coinsToDecrement, prizeValue)
                // }
                // } else {
                // console.log('coinsToDecrement')
                // console.log(coinsToDecrement)
                // console.log('prizeValue')
                // console.log(prizeValue)
                this.finishRolling(coinsToDecrement, prizeValue)
                // }
                // }
            }
        },
        continueRolling() {
            const resultIndex = Math.floor(Math.random() * this.prizeList.length)
            this.roll(resultIndex)
        },
        finishRolling(coinsToDecrement, prizeValue) {
            // if (this.result !== 'Lost') {
            setTimeout(() => {
                if (this.result !== 'Lost') {
                    this.rolling = false
                    coinsToDecrement.amount = coinsToDecrement.amount * prizeValue
                    console.log('coinsToDecrement.amount', coinsToDecrement.amount)
                    console.log('prizeValue', prizeValue)
                    this.updateUser({
                        itemId: this.user.id,
                        data: this.user,
                    })
                } else {
                    coinsToDecrement.amount = 0
                    this.user.inventory = this.user.inventory.filter((coin) => coin.id !== coinsToDecrement.id)
                    this.rolling = false
                    this.updateUser({
                        itemId: this.user.id,
                        data: this.user,
                    })
                }
            }, 4500)
            // this.rolling = false
            // }
        },
    },
}
</script>

<style lang="scss" scoped>
.result {
    margin-top: 1.25rem;
}

.wheel {
    display: grid;
    div {
        justify-self: center;
    }
}

.wheel-wrapper {
    width: 31.25rem;
    height: 31.25rem;
    position: relative;
    @media (max-width: 47.9988rem) {
        width: 18.75rem;
        height: 18.75rem;
    }
}

.wheel-pointer {
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 62.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 3.75rem;
    z-index: 10;

    &::after {
        content: '';
        position: absolute;
        top: -2rem;
        left: 50%;
        border-width: 0 0.5rem 2.5rem;
        border-style: solid;
        border-color: transparent transparent yellow;
        transform: translateX(-50%);
    }
    &:disabled {
        opacity: 0.6;
    }
}
.wheel-bg {
    width: 100%;
    height: 100%;
    border-radius: 62.5rem;
    overflow: hidden;
    transition: transform 4s ease-in-out;

    &.freeze {
        transition: none;
        background: red;
    }
}

.snow-spin__bg {
    background-color: #93e7fb;
}

.golden-reels__bg {
    background-color: #ffd700;
}

.default__bg {
    background-color: #7eef97;
}

.snow-spin__pointer {
    color: #93e7fb;
    background-color: #fffafa;
    &::after {
        border-color: transparent transparent #fffafa;
    }
}

.golden-reels__pointer {
    color: #8b8000;
    background-color: #ffff00;
    &::after {
        border-color: transparent transparent #ffff00;
    }
}

.default__pointer {
    color: #000;
    background-color: yellow;
    &::after {
        border-color: transparent transparent yellow;
    }
}

.prize-list {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
}

.prize-item-wrapper {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    width: 15.625rem;
    height: 15.625rem;
    @media (max-width: 47.9988rem) {
        width: 9.375rem;
        height: 9.375rem;
    }
}

.prize-item {
    width: 100%;
    height: 100%;
    &:first-child {
        border: 0.0625rem solid #000;
    }
    transform-origin: bottom;

    .prize-name {
        padding: 1.5rem 0;
        font-size: 1.25rem;
        @media (max-width: 47.9988rem) {
            font-size: 1rem;
            padding: 1rem 0;
        }
    }

    .prize-icon {
    }
}
</style>

