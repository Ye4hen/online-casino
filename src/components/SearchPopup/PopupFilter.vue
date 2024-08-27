<template>
    <div class="header-popup-body__filter">
        <label>
            <input v-model.trim="filterData.name" type="text" placeholder="Search..." />
        </label>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'PopupFilter',

    data() {
        return {
            filterData: {},
        }
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
        ...mapActions('games', ['updateFilter']),
    },
}
</script>

<style lang="scss" scoped>
</style>