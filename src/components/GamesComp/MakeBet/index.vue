<template>
    <div class="game-comp-item__bet bet-game-comp-item bet-popup">
        <div class="bet-popup__wrapper">
            <div class="bet-popup__content">
                <make-bet-title title="Before playing this game you should make a bet!" />
                <make-bet-form :game="game" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import MakeBetTitle from './MakeBetTitle.vue'
import MakeBetForm from './MakeBetForm.vue'

export default {
    name: 'MakeBet',

    props: {
        game: {
            type: Object,
            required: true,
        },
    },

    components: {
        MakeBetTitle,
        MakeBetForm,
    },

    methods: {
        ...mapActions('games', ['closeBetPopup']),
    },
}
</script>

<style lang="scss" scoped>
</style>