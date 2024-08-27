<template>
    <h2 class="bet-popup__title small-title">
        {{ title }}
    </h2>
</template>

<script>
export default {
    name: 'MakeBetTitle',

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