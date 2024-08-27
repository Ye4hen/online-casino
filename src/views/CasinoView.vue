<template>
    <main-master-page>
        <loading-comp v-if="(!coinsList || !coinsList.length) && (!enlargedPrizesList || !enlargedPrizesList.length)" />
        <div v-else-if="hasError">error</div>
        <div v-else class="casino">
            <div class="casino__container">
                <h2 class="casino__title title">Welcome to the Main Casino!</h2>
                <div class="casino__body">
                    <div class="casino__coins coins-casino">
                        <div class="coins-casino__body">
                            <h3 class="coins-casino__title small-title">Choose the coin to play</h3>
                            <Swiper
                                :modules="modules"
                                :slides-per-view="slidesPerView"
                                :loop="true"
                                :auto-height="true"
                                navigation
                                :autoplay="{ delay: 3000 }"
                                :speed="800"
                                :space-between="spaceBetween"
                                :breakpoints="{
                                    320: {
                                        slidesPerView: 1,
                                    },
                                    550: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        spaceBetween: 50,
                                        slidesPerView: 3,
                                    },
                                    992: {
                                        spaceBetween: 100,
                                        slidesPerView: 3,
                                    },
                                }"
                                class="coins-casino__list"
                            >
                                <SwiperSlide v-for="coin in coinsList" :key="coin.id">
                                    <!-- Coin content -->
                                    <div
                                        class="coins-casino__item item-casino-coin"
                                        :class="{ 'chosen-coin': selectedCoinId === coin.id }"
                                        @click="chooseCoinToPlay(coin, coin.id)"
                                    >
                                        <h5 class="item-casino-coin__name small-title">{{ coin.name }}</h5>
                                        <div class="item-casino-coin__img">
                                            <img :src="coin.img" :alt="coin.name" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    <div class="casino__wheel">
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
                                            <div
                                                v-for="(item, index) in enlargedPrizesList"
                                                :key="item.id"
                                                class="prize-item-wrapper"
                                            >
                                                <div
                                                    class="prize-item"
                                                    :style="`transform: rotate(${
                                                        (360 / enlargedPrizesList.length) * index
                                                    }deg)`"
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
                    </div>
                </div>
            </div>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import LoadingComp from '@/components/LoadingComp/index.vue'
import { mapGetters, mapActions } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCube, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cube'
export default {
    name: 'CasinoView',

    components: {
        MainMasterPage,
        Swiper,
        SwiperSlide,
        LoadingComp,
    },

    data() {
        return {
            freeze: false,
            rolling: false,
            wheelDeg: 0,
            prizeNumber: 8,
            result: null,
            enlargedPrizesList: [],
            chosenCoin: {},
            selectedCoinId: null,
            modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCube, EffectCoverflow],
        }
    },

    computed: {
        ...mapGetters('wheel_prizes', ['hasError', 'isLoading']),
        ...mapGetters('wheel_prizes', { prizesList: 'getItemsList' }),
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters('games', { getGameByName: 'getItemByName' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        userCoins() {
            if (this.chosenCoin) {
                const coin =
                    this.user &&
                    this.user.inventory &&
                    this.user.inventory.find((coin) => this.getCoinById(coin.id)?.name === this.chosenCoin.name)
                return coin ? coin.amount : 0
            } else return 0
        },
        gameName() {
            return this.$route.params.gameName
        },
        gameWheelBG() {
            return 'default__bg'
        },
        gameWheelPointer() {
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
        this.setCoinsList()
        if (!this.userProfileId) this.setUserId(JSON.parse(localStorage.getItem('casinoUser')))
        setTimeout(() => {
            this.enlargedPrizesList = [...this.prizesList, ...this.prizesList]
            this.user = { ...this.getUserById(this.userProfileId) }
			this.game = { ...this.getGameByName(this.gameName) }
        }, 1100)
        // if (this.getUserById(this.userProfileId)) {
        // } else {
        // this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        // }
        // if (!this.enlargedPrizesList.length) {
        //     this.enlargedPrizesList = [
        //         { id: '1OVrUz2R6sisTcBkKYjp', name: 'Lost' },
        //         { id: '4aSrITVCxqJIiFOBXkyk', name: 'X2' },
        //         { id: 'Ewie6cZAIcrQ9d1RJyi0', name: 'X3' },
        //         { id: 'GpTpZP61fM7gyCr8zqR9',  name: 'Lost' },
        //         { id: 'JuSPNbWej7549NxOJmfV',  name: 'Lost' },
        //         { id: 'PAqITQwmwR5mLETTxqSs',name: 'X1' },
        //         { id: 'sIqsQYk0Rj5PbZ3Pd1Mp',  name: 'X10' },
        //         { id: 'yeCnjsrq9Py70nyVo6gF', name: 'X5' },
        //         { id: '1OVrUz2R6sisTcBkKYjp',  name: 'Lost' },
        //         { id: '4aSrITVCxqJIiFOBXkyk', name: 'X2' },
        //         { id: 'Ewie6cZAIcrQ9d1RJyi0', name: 'X3' },
        //         { id: 'GpTpZP61fM7gyCr8zqR9',  name: 'Lost' },
        //         { id: 'JuSPNbWej7549NxOJmfV',  name: 'Lost' },
        //         { id: 'PAqITQwmwR5mLETTxqSs',name: 'X1' },
        //         { id: 'sIqsQYk0Rj5PbZ3Pd1Mp',  name: 'X10' },
        //         { id: 'yeCnjsrq9Py70nyVo6gF', name: 'X5' },
        //     ]
        // }
    },

    methods: {
        ...mapActions('wheel_prizes', { setPrizesList: 'loadList' }),
        ...mapActions('login', { updateUser: 'updateItem' }),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('user', ['setUserId']),
        chooseCoinToPlay(coin, coinId) {
            if (this.selectedCoinId === coinId) {
                this.chosenCoin = null
                this.selectedCoinId = null
            } else {
                this.chosenCoin = coin
                this.selectedCoinId = coinId
            }
        },
        onClickRotate() {
            if (this.rolling) {
                return
            }
            const resultIndex = Math.floor(Math.random() * this.enlargedPrizesList.length)
            this.result = null
            this.roll(resultIndex)
        },
        roll(resultIndex) {
            const coinsToDecrement = this.user.inventory.find(
                (coin) => this.getCoinById(coin.id).name === this.chosenCoin.name
            )
            this.rolling = true
            const { wheelDeg, enlargedPrizesList } = this
            this.wheelDeg =
                wheelDeg - (wheelDeg % 360) + 6 * 360 + (360 - (360 / enlargedPrizesList.length) * resultIndex)
            setTimeout(() => {
                this.rolling = false
                this.result = this.enlargedPrizesList[resultIndex].name

                const resultName = this.result
                const multiplier = parseInt(resultName.substring(1))

                if (this.result === 'Lost') {
                    coinsToDecrement.amount = 0
                    this.user.inventory = this.user.inventory.filter((coin) => coin.id !== coinsToDecrement.id)
                } else if (!isNaN(multiplier)) {
                    coinsToDecrement.amount *= multiplier
                }
                this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
                this.chosenCoin = {}
                this.selectedCoinId = null
            }, 4500)
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
    width: 62.5rem;
    height: 62.5rem;
    position: relative;
    @media (max-width: 68.75rem) {
        width: 37.5rem;
        height: 37.5rem;
    }
    @media (max-width: 48rem) {
        width: 25rem;
        height: 25rem;
    }
    @media (max-width: 30rem) {
        width: 18.75rem;
        height: 18.75rem;
    }
}

.wheel-pointer {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 62.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 3.75rem;
    z-index: 10;
    @media (max-width: 30rem) {
        width: 3.75rem;
        height: 3.75rem;
    }

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
    width: 31.25rem;
    height: 31.25rem;
    @media (max-width: 68.75rem) {
        width: 18.75rem;
        height: 18.75rem;
    }
    @media (max-width: 48rem) {
        width: 12.5rem;
        height: 12.5rem;
    }
    @media (max-width: 30rem) {
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
        @media (max-width: 68.75rem) {
            font-size: 1rem;
            padding: 1rem 0;
        }
        @media (max-width: 30rem) {
            font-size: 0.875rem;
            padding: 0.5rem 0;
        }
    }

    .prize-icon {
    }
}
</style>
