<template>
    <main-master-page>
        <games-page title="Our Games" />
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import GamesPage from '@/components/GamesPage/'
export default {
    name: 'GamesView',
    components: {
        MainMasterPage,
        GamesPage,
    },
}
</script>


<style lang="scss" scoped>
</style>