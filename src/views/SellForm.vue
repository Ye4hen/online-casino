<template>
    <form class="sell-form"></form>
</template>

<script>
export default {
    name: 'SellForm',

    computed: {
        coinName() {
            return this.$route.params.coinName
        },
        coinAmount() {
            return this.$route.params.coinAmount
        },
    },
}
</script>

<style lang="scss" scoped>
</style>