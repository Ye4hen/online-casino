<template>
    <div class="cta">
        <div class="cta__container">
            <div class="cta__content">
                <h2 class="cta__title title">{{ title }}</h2>
                <div class="cta__text">
                    <p>
                        Explore a world of endless entertainment and unparalleled excitement at our premier casino
                        platform. With a vast array of thrilling games, lucrative bonuses, and a secure gaming
                        environment, your ultimate winning adventure begins here. Join us now to claim exclusive rewards
                        and experience the thrill of winning in style!
                    </p>
                </div>
                <router-link :to="{ name: 'casino' }" class="cta__button button">Start Winning</router-link>
            </div>
            <div class="cta__image">
                <img src="@/assets/main-page/cta/cta-image.jpg" alt="Casino Coins" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainCTA',

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