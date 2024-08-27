<template>
    <div class="faq__content">
        <h2 class="faq__title title">{{ title }}</h2>
        <div class="faq__text">
            <p>Still have questions? <a href="#">Email Us</a></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FAQText',

    props: {
        title: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
</style>