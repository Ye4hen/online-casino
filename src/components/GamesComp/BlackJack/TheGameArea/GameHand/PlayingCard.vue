<template>
    <div class="card" :class="{ 'face-down': isFaceDown }">
        <div class="front" :class="getCardFrontBG">
            <div class="top-corner">
                <PlayingCardValue :value="card.value" :suit="card.suit" />
                <PlayingCardSuit :suit="card.suit" />
            </div>
        </div>
        <div class="back" :class="getCardBackBG" />
    </div>
</template>

<script>
import PlayingCardValue from './PlayingCardValue.vue'
import PlayingCardSuit from './PlayingCardSuit.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        PlayingCardValue,
        PlayingCardSuit,
    },

    props: {
        card: {
            type: Object,
            required: true,
        },
        isFaceDown: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            game: {},
        }
    },

    computed: {
        ...mapGetters('games', { getGameByName: 'getItemByName' }),
        isPlayerTurn() {
            return !this.isDealing && this.activeHandIndex > 0
        },

        gameName() {
            return this.$route.params.gameName
        },
        getCardFrontBG() {
            if (this.game.name === 'Indian Magic') return 'indian-magic_front'
            else if (this.game.name === 'Ace Blackjack') return 'ace-blackjack_front'
            else return 'default_front'
        },
        getCardBackBG() {
            if (this.game.name === 'Indian Magic') return 'indian-magic_back'
            else if (this.game.name === 'Ace Blackjack') return 'ace-blackjack_back'
            else return 'default_back'
        },
    },

    created() {
		this.game = { ...this.getGameByName(this.gameName) }
    },

    methods: {},
}
</script>

<style lang="scss" scoped>
.card {
    position: relative;
    display: inline-block;
    width: 8rem;
    height: 12rem;
    margin: 0.2rem;
    transition: all 0.2s ease;
    @media (max-width: 47.9988rem) {
        width: 7rem;
        height: 10rem;
    }
    @media (max-width: 28.125rem) {
        height: 8rem;
        width: 5rem;
    }
}
.card .front,
.card .back {
    border-radius: 0.75rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    backface-visibility: hidden;
    transition: transform 0.5s;
    transform-style: preserve-3d;
}

.indian-magic_front {
    background-color: rgb(180, 67, 11);
}

.ace-blackjack_front {
    background-color: rgb(48, 26, 12);
}

.default_front {
    background-color: rgb(12, 36, 48);
}

.card .front {
    background-image: url('@/assets/blackjack/card-front.svg');
}

.indian-magic_back {
    background-color: #e08530;
}

.ace-blackjack_back {
    background-color: #e0ae30;
}

.default_back {
    background-color: #e04030;
}

.card .back {
    background-image: url('@/assets/blackjack/card-back.svg');
    transform: rotateY(-180deg);
}
.card.face-down .back {
    transform: rotateY(0deg);
}
.card.face-down .front {
    transform: rotateY(180deg);
}
.card .top-corner {
    position: absolute;
    text-align: center;
    top: 0.5rem;
    left: 0.5rem;
    width: 3rem;
    height: 6.1rem;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 47.9988rem) {
        height: 5rem;
    }
    @media (max-width: 28.125rem) {
        height: 3rem;
    }
}
</style>