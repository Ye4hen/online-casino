<template>
    <main-master-page>
        <main-swiper />
        <main-tabs title="Our Games" />
        <main-FAQ />
        <main-CTA title="Start Your Winning Journey Now!" />
    </main-master-page>
</template>

<script>
import MainSwiper from '@/components/MainSwiper'
import MainTabs from '@/components/MainTabs'
import MainFAQ from '@/components/MainFAQ'
import MainCTA from '@/components/MainCTA'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
// @ is an alias to /src

export default {
    name: 'HomeView',
    components: {
        MainMasterPage,
        MainSwiper,
        MainTabs,
        MainFAQ,
        MainCTA,
    },
}
</script>
