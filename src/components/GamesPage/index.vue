<template>
    <div class="games">
        <div class="games__container">
            <h2 class="games__title title">{{ title }}</h2>
            <games-list />
        </div>
    </div>
</template>

<script>
import GamesList from '@/components/GamesPage/GamesList.vue'
import { mapActions } from 'vuex'
export default {
    name: 'GamesPage',
    components: {
        GamesList,
    },

    props: {
        title: {
            type: String,
            required: true,
        },
    },

    created() {
        this.setCoinsList()
    },

    methods: {
        ...mapActions('coins', { setCoinsList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>