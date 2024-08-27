<template>
    <loading-comp v-if="!gamesList.length" />
    <template v-else>
        <ul class="games-page__list">
            <li v-for="game in gamesList" :key="game.id" class="games-page__item item-games-page">
                <router-link :to="{ name: 'game', params: { gameName: game.name } }" class="item-games-page__action" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            fill="#39a463"
                            d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                    </svg>
                </router-link>
                <div class="item-games-page__info">
                    <div class="item-games-page__info-top">
                        <router-link :to="{ name: 'game', params: { gameName: game.name } }">
                            <h3 class="item-games-page__title small-title">{{ game.name }}</h3>
                        </router-link>
                        <h5 class="item-games-page__category">{{ game.category }}</h5>
                    </div>
                    <ul class="item-games-page__coins-list games-coins-list">
                        <h4 class="games-coins-list__title">Coins needed:</h4>
                        <li v-for="coin in getCoinByCategory(game.category)" :key="coin" class="games-coins-list__item">
                            <h5 class="games-coins-list__name">{{ coin.name }}</h5>
                            <div class="games-coins-list__img">
                                <img :src="coin.img" :alt="coin.name" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="item-games-page__img">
                    <img :src="game.img" :alt="game.name" />
                </div>
            </li>
        </ul>
    </template>
</template>

<script>
import LoadingComp from '@/components/LoadingComp/index.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'GamesList',

    components: {
        LoadingComp,
    },

    computed: {
        ...mapGetters('games', ['isLoading', 'hasError']),
        ...mapGetters('games', { gamesList: 'getItemsList' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        getCoinByCategory() {
            return (category) => this.coinsList.filter((coin) => coin.category.toLowerCase() === category.toLowerCase())
        },
    },
}
</script>

<style lang="scss" scoped>
</style>