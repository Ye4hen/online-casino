<template>
    <div class="main-tabs__items">
        <button
            class="main-tabs__item button"
            :class="{ 'active-tab-button': activeTab === 'All' }"
            @click="setActiveTab('All')"
        >
            All
        </button>
        <button
            v-for="tab in getCategoriesList"
            :key="tab"
            class="main-tabs__item button"
            :class="{ 'active-tab-button': activeTab === tab }"
            @click="setActiveTab(tab)"
        >
            {{ tab }}
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'TabsList',

    data() {
        return {
            activeTab: 'All',
        }
    },
    computed: {
        ...mapGetters('games', ['getCategoriesList']),
    },

    created() {
        this.getFilteredGamesListByCategory(this.activeTab)
    },

    methods: {
        ...mapActions('games', ['getFilteredGamesListByCategory']),
        setActiveTab(tab) {
            this.activeTab = tab
            this.getFilteredGamesListByCategory(this.activeTab)
        },
    },
}
</script>

<style lang="scss" scoped>
</style>