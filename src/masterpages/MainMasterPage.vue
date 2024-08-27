<template>
    <div class="wrapper">
        <header-comp />
        <main><slot></slot></main>
        <footer-comp />
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp'
import FooterComp from '@/components/FooterComp'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'MainMasterPage',
    components: {
        HeaderComp,
        FooterComp,
    },

    computed: {
        ...mapGetters('games', { gamesList: 'getItemsList' }),
        ...mapGetters('coins', { coinsList: 'getItemsList' }),
    },

    created() {
        this.setUsersList()
        this.setPrizesList()
        this.setGamesList()
        this.setCoinsList()
        // setTimeout(() => {
        //     const setGamesListToLocalStorage = JSON.stringify(this.gamesList)
        //     localStorage.setItem('gamesList', setGamesListToLocalStorage)
        //     const setCoinsListToLocalStorage = JSON.stringify(this.coinsList)
        //     localStorage.setItem('coinsList', setCoinsListToLocalStorage)
        // }, 500)
    },

    methods: {
        ...mapActions('login', { setUsersList: 'loadList' }),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('games', { setGamesList: 'loadList' }),
        ...mapActions('crypto', ['fetchUsdToMaticRate']),
        ...mapActions('wheel_prizes', { setPrizesList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>