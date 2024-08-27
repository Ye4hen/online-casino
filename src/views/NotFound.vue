<template>
    <section class="page_404">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-10 col-sm-offset-1 text-center">
                        <div class="four_zero_four_bg">
                            <h2 class="text-error">404</h2>

                            <div class="contant_box_404">
                                <h3 class="h2">Look like you're lost</h3>

                                <p>the page you are looking for not avaible!</p>

                                <router-link :to="{ name: 'home' }" class="link_404">Go to Home</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style lang="scss" scoped>
.page_404 {
    padding: 2.5rem 0;
    background: #fff;
    font-family: 'Arvo', serif;
    color: #000;
}

.text-error {
    text-align: center;
}

.page_404 img {
    width: 100%;
}

.four_zero_four_bg {
    min-height: 90vh;
    background-image: url('@/assets/error/errorPage.gif');
    background-repeat: no-repeat;
    height: 25rem;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.four_zero_four_bg h2 {
    font-size: 5rem;
    @media (max-width: 47.9988em) {
        font-size: 2.5rem;
    }
}

.four_zero_four_bg h3 {
    font-size: 5rem;
    @media (max-width: 47.9988em) {
        font-size: 2.5rem;
    }
}

.link_404 {
    color: #fff !important;
    padding: 0.625rem 1.25rem;
    background: #39ac31;
    margin: 1.25rem 0;
    display: inline-block;
}
.contant_box_404 {
    display: flex;
    gap: 1.875rem;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    a {
        margin: 0 auto;
    }
}
</style>