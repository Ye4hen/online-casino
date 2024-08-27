<template>
    <footer class="footer">
        <div class="footer__container">
            <footer-main quote='"Luck is what happens when preparation meets opportunity." - Seneca' />
            <footer-nav title="Website Navigation" />
        </div>
    </footer>
</template>

<script>
import FooterMain from './FooterMain.vue'
import FooterNav from './FooterNav.vue'
export default {
    name: 'FooterComp',
    components: { FooterMain, FooterNav },
}
</script>

<style lang="scss" scoped>
</style>