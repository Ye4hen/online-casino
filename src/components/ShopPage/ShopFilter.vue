<template>
    <div class="shop__filter filter-shop">
        <div class="filter-shop__item item-form">
            <label>
                Name
                <input v-model.trim="filterData.name" type="text" />
            </label>
        </div>
        <div class="filter-shop__item">
            <h4 class="filter-shop__title--category">Category</h4>
            <ul class="filter-shop__list">
                <li
                    v-for="category in coinsCategoriesList"
                    :key="category"
                    class="filter-shop__item filter-shop__item--checkboxes"
                >
                    <label>
                        {{ category }}
                        <input v-model="filterData.category" :value="category" type="checkbox" />
                    </label>
                </li>
            </ul>
        </div>
        <div class="filter-shop__item">
            <h4 class="filter-shop__title--category">Price</h4>
            <div class="filter-shop__prices">
                <div class="filter-shop__price item-form">
                    <label>
                        From
                        <input v-model.trim="filterData.priceFrom" type="number" />
                    </label>
                </div>
                <div class="filter-shop__price item-form">
                    <label>
                        To
                        <input v-model.lazy="filterData.priceTo" type="number" />
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ShopFilter',

    data() {
        return {
            filterData: {
                name: '',
                category: [],
                priceFrom: null,
                priceTo: null,
            },
        }
    },

    computed: {
        ...mapGetters('coins', ['coinsCategoriesList', 'getFilteredCoinsList']),
    },

    watch: {
        filterData: {
            handler(newValue) {
                this.updateFilter(newValue)
            },
            deep: true,
        },
    },

    methods: {
        ...mapActions('coins', ['updateFilter']),
    },
}
</script>

<style lang="scss" scoped>
</style>