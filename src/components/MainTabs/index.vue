<template>
    <div class="main-tabs">
        <div class="main-tabs__container">
            <h2 class="main-tabs__title title">{{ title }}</h2>
            <tabs-list />
            <games-tabs-list />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import GamesTabsList from './GamesTabsList.vue'
import TabsList from './TabsList.vue'
export default {
    name: 'MainTabs',
    components: { TabsList, GamesTabsList },
    props: {
        title: {
            type: String,
            required: true,
        },
    },

    created() {
        this.setGamesList()
    },
    methods: {
        ...mapActions('games', { setGamesList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>