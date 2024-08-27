<template>
    <div class="main-block">
        <div class="main-block__container">
            <swiper
                :modules="modules"
                :slides-per-view="1"
                :effect="'coverflow'"
                :pagination="{ clickable: true }"
                :loop="true"
                :auto-height="true"
                :autoplay="{ delay: 3000 }"
                :speed="800"
                class="main-swiper"
                :space-between="50"
            >
                <swiper-slide v-if="!isAuth" class="main-swiper-slide slide-main">
                    <div class="slide-main__body">
                        <div class="slide-main__content">
                            <h2 class="slide-main__title title">I invite you to sign up and start winning!</h2>
                            <router-link :to="{ name: 'login' }" class="slide-main__button button">
                                Registration
                            </router-link>
                        </div>
                        <div class="slide-main__bg-img">
                            <img src="@/assets/main-page/main-block/sign-up_slide.jpg" alt="sign-up" />
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide v-if="isAuth" class="main-swiper-slide slide-main">
                    <div class="slide-main__body">
                        <div class="slide-main__content">
                            <h2 class="slide-main__title title">Ready for thrilling games and big wins?</h2>
                            <router-link :to="{ name: 'games' }" class="slide-main__button button">
                                Play Now
                            </router-link>
                        </div>
                        <div class="slide-main__bg-img">
                            <img src="@/assets/main-page/main-block/ready_for_wins.jpg" alt="ready for wins?" />
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="main-swiper-slide slide-main">
                    <div class="slide-main__body">
                        <div class="slide-main__content">
                            <h2 class="slide-main__title title">Have you been thinking about playing a casino?</h2>
                            <router-link :to="{ name: 'casino' }" class="slide-main__button button">
                                Try your luck!
                            </router-link>
                        </div>
                        <div class="slide-main__bg-img">
                            <img src="@/assets/main-page/main-block/thinking-casino_slide.jpg" alt="image-slogan" />
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="main-swiper-slide slide-main">
                    <div class="slide-main__body">
                        <div class="slide-main__content">
                            <h2 class="slide-main__title title">Do you want to invest to win more?</h2>
                            <router-link :to="{ name: 'shop' }" class="slide-main__button button"> Invest </router-link>
                        </div>
                        <div class="slide-main__bg-img">
                            <img
                                src="@/assets/main-page/main-block/invest-casino_slide.jpg"
                                alt="slogan-image about investing in the casino"
                            />
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCube, EffectCoverflow } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cube'

export default {
    name: 'MainSwiper',

    components: {
        Swiper,
        SwiperSlide,
    },

	setup() {
		return {
			modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCube, EffectCoverflow],
		}
	},
    computed: {
        isAuth() {
            return JSON.parse(localStorage.getItem('casinoUser'))
        },
    },

}
</script>