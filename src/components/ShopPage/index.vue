<template>
    <div class="shop">
        <loading-comp v-if="isLoading" />
        <div v-else class="shop__container">
            <shop-filter />
            <shop-list />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ShopFilter from './ShopFilter.vue'
import ShopList from './ShopList.vue'
import LoadingComp from '@/components/LoadingComp/index.vue'

export default {
    name: 'ShopPage',
    components: { ShopList, ShopFilter, LoadingComp },

    computed: {
        ...mapGetters('coins', ['isLoading', 'hasError']),
    },

    created() {
        this.setGamesList()
        this.setCoinsList()
    },

    methods: {
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('games', { setGamesList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>