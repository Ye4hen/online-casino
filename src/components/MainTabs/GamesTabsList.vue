<template>
    <ul v-if="filteredGamesByCategory && filteredGamesByCategory.length" class="main-tabs__list">
        <li v-for="game in filteredGamesByCategory" :key="game.id" class="item-main-tab">
            <router-link :to="{ name: 'game', params: { gameName: game.name } }" class="item-main-tab__action">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        fill="#39a463"
                        d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                    />
                </svg>
            </router-link>
            <div class="item-main-tab__info">
                <router-link :to="{ name: 'game', params: { gameName: game.name } }">
                    <h4 class="item-main-tab__title">
                        {{ game.name }}
                    </h4>
                </router-link>
                <h6 class="item-main-tab__category">
                    {{ game.category }}
                </h6>
            </div>
            <div class="item-main-tab__image">
                <img :src="game.img" :alt="game.name" />
            </div>
        </li>
    </ul>
    <loading-comp v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingComp from '@/components/LoadingComp/index.vue'

export default {
    name: 'GamesTabsList',

    components: {
        LoadingComp,
    },

    computed: {
        ...mapGetters('games', ['filterGamesCategory']),
        ...mapGetters('games', { gamesList: 'getItemsList' }),
        filteredGamesByCategory() {
            if (!this.filterGamesCategory.length) return this.gamesList
            else return this.filterGamesCategory
        },
    },
}
</script>

<style lang="scss" scoped>
</style>