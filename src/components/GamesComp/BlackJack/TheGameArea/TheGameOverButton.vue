<template>
    <div class="game-over">
        <GameButton action="restart" :is-enabled="true" @click="restart" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import GameButton from './GameButton.vue'

export default {
    components: {
        GameButton,
    },

    methods: {
        ...mapActions('blackjack', ['restart']),
    },
}
</script>

<style scoped>
.game-over {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}
</style>