<template>
    <ul class="header-popup-body__list">
        <li v-for="game in getFilteredGamesList" :key="game.id" class="header-popup-body__item header-popup-item">
            <div class="header-popup-item__info">
                <h4 class="header-popup-item__name">
                    <router-link
                        :to="{ name: 'game', params: { gameName: game.name } }"
                        class="header-popup-item__name-link"
                        @click="closePopup"
                    >
                        {{ game.name }}
                    </router-link>
                </h4>
                <div class="header-popup-item__category">
                    {{ game.category }}
                </div>
            </div>
            <router-link
                :to="{ name: 'game', params: { gameName: game.name } }"
                class="header-popup-item__image"
                @click="closePopup"
            >
                <img :src="game.img" :alt="game.name" />
            </router-link>
        </li>
        <message-popup :status="errorMessageStatus" :show="showErrorMessage" :text="errorMessage" />
    </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MessagePopup from '@/components/MessagePopup/index.vue'

export default {
    name: 'PopupGamesList',
    components: {
        MessagePopup,
    },

    data() {
        return {
            showErrorMessage: false,
            errorMessageStatus: false,
            errorMessage: null,
        }
    },

    computed: {
        ...mapGetters('games', ['getFilteredGamesList']),
        ...mapGetters('games', { gamesList: 'getItemsList' }),
    },

    watch: {
        getFilteredGamesList: {
            handler(newValue) {
                console.log(newValue)
                if (!newValue.length) {
                    this.errorMessage = 'There are no such games!'
                    this.errorMessageStatus = false
                    this.showErrorMessage = true
                    setTimeout(() => {
                        this.showErrorMessage = false
                    }, 3000)
                }
            },
        },
    },

    methods: {
        ...mapActions('header', ['closePopup']),
    },
}
</script>

<style lang="scss" scoped>
</style>