<template>
    <main-master-page>
        <shop-page />
    </main-master-page>
</template>

<script>
import ShopPage from '@/components/ShopPage'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
export default {
    name: 'ShopView',
    components: {
        MainMasterPage,
        ShopPage,
    },
}
</script>

<style lang="scss" scoped>
</style>