<template>
    <div class="game-hand" :class="handClasses">
        <transition-group name="deal" tag="div" class="cards">
            <PlayingCard v-for="(card, i) in hand.cards" :key="i" :card="card" :is-face-down="card.isFaceDown" />
        </transition-group>
        <HandTotal :index="index" />
        <HandBet :hand="hand" />
        <HandResult :result="toResultString(hand.result)" />
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import blackjack from '@/store/helpers/blackjack'
import PlayingCard from './GameHand/PlayingCard.vue'
import HandResult from './GameHand/HandResult.vue'
import HandTotal from './GameHand/HandTotal.vue'
import HandBet from './GameHand/HandBet.vue'
export default {
    components: {
        PlayingCard,
        HandResult,
        HandTotal,
        HandBet,
    },
    props: {
        hand: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapState('blackjack', ['activeHandIndex']),
        ...mapGetters('blackjack', ['isSplit']),
        isActiveHand() {
            return this.activeHandIndex === this.index
        },
        isInactiveHand() {
            return this.isSplit && !this.isActiveHand && this.activeHandIndex && this.index > 0
        },
        handClasses() {
            let classes = []
            if (this.isActiveHand && this.index > 0) classes.push('is-active')
            if (this.isSplit && this.index > 0) classes.push('is-split')
            if (this.index === 0) classes.push('is-dealer')
            if (this.isInactiveHand) classes.push('is-inactive')
            return classes
        },
    },
    methods: {
        toResultString(resultValue) {
            for (const key in blackjack.results) {
                if (blackjack.results[key] === resultValue) return key
            }
        },
    },
}
</script>

<style scoped>
.game-hand {
    position: relative;
    transition: transform 0.2s ease;
}
.game-hand.is-dealer,
.game-hand.is-split {
    transform: scale(0.9);
}
.game-hand.is-active,
.game-hand.is-split.is-active {
    position: absolute;
    max-width: 55%;
    transform: scale(1.3);
    z-index: 100;
}
.game-hand.is-split {
    transition: scale 0s;
}
.game-hand.is-inactive {
    opacity: 0.3;
    transform: translateY(-4rem);
}
.cards {
    min-height: 12.4rem;
    min-width: 8.4rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}
.deal-enter-active {
    animation: deal 0.3s;
}
.deal-leave-active {
    animation: deal 0.3s reverse;
}
.is-split .deal-leave-active {
    animation-duration: 0;
}
@keyframes deal {
    0% {
        transform: translateY(-100vh);
    }
    100% {
        transform: translateY(0);
    }
}
</style>