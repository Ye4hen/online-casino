<template>
    <div id="popup" class="header-search-popup header-popup popup">
        <div class="header-popup__wrapper popup__wrapper">
            <div class="header-popup__content">
                <button data-close type="button" class="header-popup__close popup__close" @click="closePopup"></button>
                <div class="header-popup__body header-popup-body">
                    <popup-filter />
                    <popup-games-list />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import PopupFilter from './PopupFilter.vue'
import PopupGamesList from './PopupGamesList.vue'

export default {
    name: 'SearchPopup',
    components: { PopupGamesList, PopupFilter },
    created() {
        this.setGamesList()
    },

    methods: {
        ...mapActions('header', ['closePopup']),
        ...mapActions('games', { setGamesList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>