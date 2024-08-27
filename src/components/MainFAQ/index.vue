<template>
    <div class="faq">
        <div class="faq__container">
            <FAQ-text title="FAQ" />
            <FAQ-akkardeon />
        </div>
    </div>
</template>

<script>
import FAQAkkardeon from './FAQAkkardeon.vue'
import FAQText from './FAQText.vue'
export default {
    name: 'MainFAQ',
    components: {
        FAQText,
        FAQAkkardeon,
    },
}
</script>
       

<style lang="scss" scoped>
</style>