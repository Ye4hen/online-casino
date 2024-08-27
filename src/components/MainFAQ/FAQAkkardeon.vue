<template>
    <div v-if="faqList && faqList.length" class="faq__items">
        <div v-for="faq in faqList" :key="faq.id" class="faq__item item-faq">
            <div :class="{ 'faq-active': faq.isOpen }" class="item-faq__header" @click="openFAQ(faq.id)">
                <div class="item-faq__question">
                    {{ faq.question }}
                </div>
                <div class="item-faq__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
                        <path
                            fill="#39a463"
                            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                        />
                    </svg>
                </div>
            </div>
            <div :class="{ 'faq-active': faq.isOpen }" class="item-faq__answer">
                <p>{{ faq.answer }}</p>
            </div>
        </div>
    </div>
    <loading-comp v-else />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingComp from '@/components/LoadingComp/index.vue'

export default {
    name: 'FAQAkkardeon',

    components: {
        LoadingComp,
    },

    computed: {
        ...mapGetters('faq', { faqList: 'getItemsList' }),
    },

    created() {
        this.setFaqList()
    },

    methods: {
        ...mapActions('faq', ['openFAQ']),
        ...mapActions('faq', { setFaqList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>