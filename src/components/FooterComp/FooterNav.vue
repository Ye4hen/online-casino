<template>
    <div class="footer__nav nav-footer">
        <h4 class="nav-footer__title small-title">{{ title }}</h4>
        <ul class="nav-footer__list">
            <li class="nav-footer__item">
                <router-link :to="{ name: 'casino' }" class="nav-footer__link"> Casino</router-link>
            </li>
            <li class="nav-footer__item">
                <router-link :to="{ name: 'games' }" class="nav-footer__link"> Games</router-link>
            </li>
            <li class="nav-footer__item">
                <router-link :to="{ name: 'shop' }" class="nav-footer__link"> Shop</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'FooterNav',
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