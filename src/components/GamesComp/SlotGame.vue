<template>
    <div class="game-comp-item" style="text-align: center">
        <div v-if="coins.length > 0" class="bandit">
            <div ref="banditBody" class="bandit__body">
                <div class="bandit__body--meter">
                    <div class="meter__count meter__count_1">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                    <div class="meter__count meter__count_2">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                    <div class="meter__count meter__count_3">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                    <div class="meter__count meter__count_4">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                    <div class="meter__count meter__count_5">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                    <div class="meter__count meter__count_6">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                </div>
                <div class="bandit__bg">
                    <img src="@/assets/slots/body.png" alt="slot bg" />
                </div>
                <div class="bandit__buttons">
                    <button type="button" class="bandit__button quit" @click="quit">quit</button>
                    <button type="button" :disabled="!this.user.bets || !this.user.bets.length" class="bandit__button play" @click="getHand">Play</button>
                </div>
            </div>
        </div>
        <message-popup :status="messageStatus" :show="isMessage" :text="message" />
        <make-bet :game="game" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MessagePopup from '@/components/MessagePopup/index.vue'
import MakeBet from '@/components/GamesComp/MakeBet/index.vue'

export default {
    name: 'SlotGame',

    inject: ['usersCoins'],

    data() {
        return {
            game: {},
            user: {},
            isAnimated: false,
            overStepFive: false,
            attemptFinished: false,
            isMessage: false,
            messageStatus: false,
            message: null,
            messageMaster: this.messageMaster,
            coins: this.usersCoins,
            userBets: this.bets,
        }
    },

    components: {
        MessagePopup,
        MakeBet,
    },

    computed: {
        ...mapGetters('games', { getGameByName: 'getItemById', gamesList: 'getItemsList' }),
		...mapGetters('coins', { getCoinById: 'getItemByName' }),
        ...mapGetters('user', ['userProfileId']),
        ...mapGetters('login', { getUserById: 'getItemById' }),
        ...mapGetters('slots__prizes', { slotsPrizesList: 'getItemsList' }),
        gameName() {
            return this.$route.params.gameName
        },
        getSlotImg() {
            return (item) => (this.game.name === 'Black Power' ? item.img_bl : item.img_sl)
        },
    },

    async created() {
        this.setSlotsPrizesList()
        setTimeout(() => {
            this.user = { ...this.getUserById(this.userProfileId) }
            this.game = { ...this.getGameByName(this.gameName) }

            const getBet = this.user.bets && this.user.bets.length
            if (!getBet) this.openBetPopup()
        }, 1100)
    },

    methods: {
        ...mapActions('games', { setGamesList: 'loadList' }),
        ...mapActions('slots__prizes', { setSlotsPrizesList: 'loadList' }),
        ...mapActions('login', { updateUser: 'updateItem' }),
        ...mapActions('games', ['openBetPopup', 'closeBetPopup']),
        getHand() {
            console.log('xyi')
            // this.$refs.banditHand.classList.add('armGo')
            // this.$refs.banditCircle.classList.add('circleGo')
            this.isAnimated = true
            this.getRandom(this.$el.querySelector('.meter__count_1'), 1, this.slotsPrizesList.length)
            this.getRandom(this.$el.querySelector('.meter__count_2'), 1, this.slotsPrizesList.length)
            this.getRandom(this.$el.querySelector('.meter__count_3'), 1, this.slotsPrizesList.length)
            this.getRandom(this.$el.querySelector('.meter__count_4'), 1, this.slotsPrizesList.length)
            this.getRandom(this.$el.querySelector('.meter__count_5'), 1, this.slotsPrizesList.length)
            this.getRandom(this.$el.querySelector('.meter__count_6'), 1, this.slotsPrizesList.length)
            setTimeout(() => {
                // this.$refs.banditCircle.classList.remove('circleGo')
                // this.$refs.banditHand.classList.remove('armGo')
                this.overStepFive = true
                this.isAnimated = false
                this.captureImages()
            }, 3000)
        },
        getRandom(el, min, max) {
            let i = 0
            const random = {
                value: 0,
                getRandomImg: (min, max) => {
                    let randNum = Math.floor(Math.random() * (max - min + 1)) + min

                    if (randNum === random.value) return random.getRandomImg(min, max)
                    random.value = randNum

                    const foundPrize = this.slotsPrizesList.find((prize) => {
                        return prize.number === randNum
                    })

                    const randomImg = foundPrize ? this.getSlotImg(foundPrize) : null
                    return randomImg
                },
            }

            const replay = setInterval(() => {
                if (i >= 15 || !el) {
                    clearInterval(replay)
                    const meterCount = this.$el.querySelector('.meter__count')
                    const eventNew = new Event('change')
                    meterCount.dispatchEvent(eventNew)
                } else {
                    el.classList.add('fadeOutUp')
                    setTimeout(() => {
                        el.classList.remove('fadeOutUp')
                        el.classList.add('fadeInDown')
                    }, 100)
                    el.classList.remove('fadeInDown')
                    const imgSrc = random.getRandomImg(min, max)
                    const imgSrc2 = random.getRandomImg(min, max)
                    const imgSrc3 = random.getRandomImg(min, max)
                    if (imgSrc && imgSrc2 && imgSrc3) {
                        el.innerHTML = `
							<img src="${imgSrc}" style="height: 6.9rem;" alt="Slot Image" />
							<img src="${imgSrc2}" style="height: 6.9rem;" alt="Slot Image" />
							<img src="${imgSrc3}" style="height: 6.9rem;" alt="Slot Image" />
                        `
                    }
                    i++
                }
            }, 150)
        },
        captureImages() {
            const capturedImages = []

            for (let i = 1; i <= 6; i++) {
                const meterCountImg = this.$el.querySelectorAll(`.meter__count_${i} img`)

                // for (let j = 0; j < meterCountImg.length; j++) {
                capturedImages.push(meterCountImg[0].src)
                capturedImages.push(meterCountImg[1].src)
                capturedImages.push(meterCountImg[2].src)
                // }
            }

            console.log('capturedImages')
            console.log(capturedImages)

            this.compareImages(capturedImages)
        },

        compareImages(images) {
            // Check if all six images are the same
            const areAllImagesSame = images.every((img, _, arr) => img === arr[0])

            // Check if any three images are the same
            const imageCounts = {}
            images.forEach((img) => {
                imageCounts[img] = (imageCounts[img] || 0) + 1
            })

            // Identify the most frequent image(s)
            const maxCount = Math.max(...Object.values(imageCounts))
            const mostFrequentImages = Object.keys(imageCounts).filter((img) => imageCounts[img] === maxCount)

            const consistentMostFrequentImages =
                mostFrequentImages.length > 0 ? mostFrequentImages.filter((img) => img === mostFrequentImages[0]) : []

            // Apply gradient border to the most frequent images
            const allImages = document.querySelectorAll('.meter__count img')
            console.log('allImages')
            console.log(allImages)
            images.forEach((img) => {
                if (consistentMostFrequentImages.includes(img)) {
                    allImages.forEach((image) => {
                        if (image.src === img && maxCount >= 0.35 * images.length) {
                            // Apply gradient border to the image
                            image.classList.add('hg-image')
                            console.log(image.classList)
                        }
                    })
                }
            })

            const fortyPercentImagesSame = Object.values(imageCounts).some((count) => count >= 0.45 * images.length)

            // Check if any two images are the same
            const halfImagesSame = Object.values(imageCounts).some((count) => count >= images.length / 2)

            const oneThirdsImagesSame = Object.values(imageCounts).some((count) => count >= 0.35 * images.length)

            // Find the coin to decrement based on the game category
            const coinsToDecrement = this.user.bets.find((bet) => bet.gameId === this.game.id)

            // Decrement logic based on image comparisons
            if (areAllImagesSame) {
                this.showMessage('All Same!!! X5', true)
                coinsToDecrement.bet = Math.floor(coinsToDecrement.bet * 10)
            } else if (halfImagesSame) {
                this.showMessage('Half of the images are same!!! X3', true)
                coinsToDecrement.bet = Math.floor(coinsToDecrement.bet * 3)
            } else if (fortyPercentImagesSame) {
                this.showMessage('40% of the images are same!!! X2', true)
                coinsToDecrement.bet = Math.floor(coinsToDecrement.bet * 2)
            } else if (oneThirdsImagesSame) {
                this.showMessage('One thirds of the images are same!!! X1.5', true)
                coinsToDecrement.bet = Math.floor(coinsToDecrement.bet * 1.5)
            } else {
                this.showMessage('You lost:(', false)
                if (coinsToDecrement.bet > 4) {
                    coinsToDecrement.bet = Math.floor(coinsToDecrement.bet / 5)
                } else {
                    coinsToDecrement.bet = 0
                    this.user.bets = this.user.bets.filter((bet) => bet.coinId !== coinsToDecrement.coinId)
                }
            }

            // Update the user data
            this.updateUser({
                itemId: this.user.id,
                data: this.user,
            })
        },

        showMessage(msg, status) {
            this.message = msg
            this.messageStatus = status
            this.isMessage = true
            setTimeout(() => {
                this.isMessage = false
            }, 3000)
        },

		quit() {
			this.closeBetPopup()
            this.$router.push({
                name: 'games',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.bandit {
    position: relative;
    // width: 18.75rem;
    // height: 21.875rem;
    margin: 0 auto;
    line-height: 1.2;
    margin-top: 0.625rem;
    padding-bottom: 6.25rem;
}
.bandit__body {
    // background: url('@/assets/slots/body.png') 0 0 no-repeat;
    // width: 28.6875rem;
    // height: 28.6875rem;
    position: relative;
    z-index: 98;
}
.bandit__bg {
    // margin-left: 9.375rem;
    // position: absolute;
    // position: relative;
    // z-index: -1;
    // margin: 0 auto;
    width: 48.2rem;
    img {
        width: 100%;
    }
}
.bandit__hand {
    background: url('@/assets/slots/arm.svg') 0 0 no-repeat;
    width: 1.5625rem;
    height: 4.875rem;
    cursor: pointer;
    position: absolute;
    transform-origin: 100% 100%;
    // left: 16.625rem;
    // top: 8.4375rem;
    bottom: 265px;
    right: 117px;
    z-index: 99;
}
.bandit__circle {
    background: url('@/assets/slots/circle.svg') 0 0 no-repeat;
    width: 2.3125rem;
    height: 2.3125rem;
    cursor: pointer;
    position: absolute;
    transform-origin: 100% 100%;
    // left: 16.3125rem;
    // top: 6.5625rem;
    bottom: 335px;
    right: 110px;
    z-index: 100;
}
.bandit__body--meter {
    position: absolute;
    display: grid;
    // opacity: 0;
    grid-template-columns: repeat(6, 1fr);
    // left: 11.5rem;
    left: 3.2rem;
    top: 300px;
    height: 20.65rem;
    // width: 28.85rem;
    // width: 50%; /* 28.85/48.2 */
    width: 86.5%;
    text-align: center;
    // margin-top: 7.4375rem;
    overflow: hidden;
    font-size: 4.25rem;
    font-weight: bold;
    color: #df2c2b;
    text-shadow: 0.0625rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.2901960784313726);
    z-index: 2;
}
.meter__count {
    // width: 4.8125rem;
    // height: 4.875rem;
    // display: inline-block;
}

.bandit__button {
    position: absolute;
    padding: 10px;
    font-size: 30px;
    text-transform: capitalize;
    font-family: 'Lobster', sans-serif;
    width: 200px;
    height: 75px;
    border-radius: 24px;
    transition: all 0.3s;
    z-index: 2;
}

.quit {
    bottom: 14%;
    left: 13%;
    border: 1px solid red;
    background-color: red;
}

.play {
    bottom: 14%;
    right: 13%;
    border: 1px solid green;
    background-color: green;
}

.bandit__button:hover {
    background-color: #fff;
    border: 1px solid #fff;
}
.bandit__button.play:hover {
    color: green;
}
.bandit__button.quit:hover {
    color: red;
}

.meter__count img {
    // max-width: 100% !important;
    height: 6.8rem;
    // height: 33.33%
    width: 100%;
}

.animated {
    animation-duration: 0.2s;
    animation-fill-mode: both;
}
.armGo {
    -webkit-animation: armGo 2s;
    -webkit-animation-delay: none;
    animation: armGo 2s;
    animation-delay: none;
}
.circleGo {
    -webkit-animation: circleGo 2s;
    -webkit-animation-delay: none;
    animation: circleGo 2s;
    animation-delay: none;
}
.fadeOutUp {
    animation-name: fadeOutUp;
}
.fadeInDown {
    animation-name: fadeInDown;
    img {
        max-width: 3.125rem;
    }
}
.bounceOut {
    animation-name: bounceOut;
    animation-duration: 0.75s;
}
.slideInDown {
    animation-name: slideInDown;
    animation-duration: 2s;
}

@keyframes armGo {
    0% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -moz-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -o-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -ms-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    50% {
        transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
        -webkit-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
        -moz-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
        -o-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
        -ms-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
    }
    100% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -moz-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -o-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -ms-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
}
@keyframes circleGo {
    0% {
        transform: translate3d(0px, 0px, 0px);
        -webkit-transform: translate3d(0px, 0px, 0px);
        -moz-transform: translate3d(0px, 0px, 0px);
        -o-transform: translate3d(0px, 0px, 0px);
        -ms-transform: translate3d(0px, 0px, 0px);
    }
    50% {
        transform: translate3d(0px, 11.25rem, 0px);
        -webkit-transform: translate3d(0px, 11.25rem, 0px);
        -moz-transform: translate3d(0px, 11.25rem, 0px);
        -o-transform: translate3d(0px, 11.25rem, 0px);
        -ms-transform: translate3d(0px, 11.25rem, 0px);
    }
    100% {
        transform: translate3d(0px, 0px, 0px);
        -webkit-transform: translate3d(0px, 0px, 0px);
        -moz-transform: translate3d(0px, 0px, 0px);
        -o-transform: translate3d(0px, 0px, 0px);
        -ms-transform: translate3d(0px, 0px, 0px);
    }
}
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translate(0px, -2.5rem);
        -webkit-transform: translate(0rem, -2.5rem);
        -moz-transform: translate(0px, -2.5rem);
        -o-transform: translate(0px, -2.5rem);
        -ms-transform: translate(0px, -2.5rem);
    }
    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
        transform: translate(0px, 2.5rem);
        -webkit-transform: translate(0px, 2.5rem);
        -moz-transform: translate(0px, 2.5rem);
        -o-transform: translate(0px, 2.5rem);
        -ms-transform: translate(0px, 2.5rem);
    }
}
@keyframes fadeOutUp {
    from {
        opacity: 0;
        transform: translate(0px, 2.5rem);
        -webkit-transform: translate(0px, 2.5rem);
        -moz-transform: translate(0px, 2.5rem);
        -o-transform: translate(0px, 2.5rem);
        -ms-transform: translate(0px, 2.5rem);
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate(0px, -2.5rem);
        -webkit-transform: translate(0px, -2.5rem);
        -moz-transform: translate(0px, -2.5rem);
        -o-transform: translate(0px, -2.5rem);
        -ms-transform: translate(0px, -2.5rem);
    }
}
@keyframes bounceOut {
    20% {
        visibility: visible;
        transform: scale3d(0.9, 0.9, 0.9);
    }

    50%,
    55% {
        opacity: 1;
        transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
        transform: scale3d(0, 0, 0);
    }
}
@keyframes slideInDown {
    /*   
слайдом вниз
from {
	visibility: visible;
  transform: translate3d(0, -100%, 0);
  -webkit-transform: translate3d(0, -100%, 0);
  -moz-transform: translate3d(0, -100%, 0);
  -o-transform: translate3d(0, -100%, 0);
  -ms-transform: translate3d(0, -100%, 0);
}

to {
	visibility: visible;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  } */
    from {
        visibility: visible;
        z-index: 99;
        transform: scale3d(1, 1, 1);
    }

    10%,
    20% {
        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }

    30%,
    50%,
    70%,
    90% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%,
    60%,
    80% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
        z-index: 99;
        visibility: visible;
        transform: scale3d(1, 1, 1);
    }
}
</style>