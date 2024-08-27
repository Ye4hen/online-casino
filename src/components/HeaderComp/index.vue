<template>
    <header class="header">
        <div class="header__container">
            <router-link :to="{ name: 'home' }" class="header__logo" @click="closingMenuDuringNavigation">
                <img src="@/assets/logo.png" alt="Ace Vise logo" />
            </router-link>
            <div :class="menuOpen" class="header__menu menu">
                <button type="button" class="menu__icon icon-menu" @click="openMobileMenu">
                    <span></span>
                </button>
                <nav class="menu__body">
                    <div class="menu__content">
                        <ul class="menu__list">
                            <li class="menu__item">
                                <router-link
                                    :to="{ name: 'casino' }"
                                    class="menu__link"
                                    @click="closingMenuDuringNavigation"
                                >
                                    Casino</router-link
                                >
                            </li>
                            <li class="menu__item">
                                <router-link
                                    :to="{ name: 'games' }"
                                    class="menu__link"
                                    @click="closingMenuDuringNavigation"
                                >
                                    Games</router-link
                                >
                            </li>
                            <li class="menu__item">
                                <router-link
                                    :to="{ name: 'shop' }"
                                    class="menu__link"
                                    @click="closingMenuDuringNavigation"
                                >
                                    Shop</router-link
                                >
                            </li>
                            <li class="menu__item">
                                <router-link
                                    :to="{ name: 'support' }"
                                    class="menu__link"
                                    @click="closingMenuDuringNavigation"
                                >
                                    Support & Rules</router-link
                                >
                            </li>
                            <li class="menu__item">
                                <router-link
                                    v-if="user.admin"
                                    :to="{ name: 'editor' }"
                                    class="menu__link"
                                    @click="closingMenuDuringNavigation"
                                >
                                    Editor</router-link
                                >
                            </li>
                        </ul>
                        <div class="menu-popup">
                            <button class="menu__button" @click="onOpenPopup">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="menu__search-icon"
                                    height="24"
                                    width="24"
                                >
                                    <path
                                        d="M10.111 2a8.114 8.114 0 018.112 8.111c0 1.85-.617 3.558-1.666 4.921l5.127 5.126a1.077 1.077 0 010 1.525c-.39.39-1.006.422-1.428.087l-.097-.087-5.127-5.126a8.038 8.038 0 01-4.92 1.665A8.114 8.114 0 012 10.112 8.114 8.114 0 0110.111 2zm0 2.163a5.945 5.945 0 00-5.948 5.948 5.945 5.945 0 005.948 5.948 5.945 5.945 0 005.949-5.948 5.945 5.945 0 00-5.949-5.948z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </button>
                            <search-popup />
                        </div>
                    </div>
                    <div class="header__links">
                        <button class="header__link" @click="toTheRoute('user_profile')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="24" width="24">
                                <path
                                    fill="#fff"
                                    d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
                                />
                            </svg>
                        </button>
                        <a :href="toTelegramChannel" class="header__link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" height="24" width="24">
                                <path
                                    fill="#fff"
                                    d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"
                                />
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
import SearchPopup from '@/components/SearchPopup/'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'HeaderComp',
    components: { SearchPopup },
    data() {
        return {
            menuOpen: null,
            isMenuOpen: false,
            telegramChannelURL: 'https://t.me/+LpZMRR9as3g0NGFi',
            user: {},
        }
    },

    computed: {
        ...mapGetters('login', { usersList: 'getItemsList' }),
        ...mapGetters('user', ['userProfileName', 'userProfileId', 'getUserById', 'getUserByLogin']),

        userNameId() {
            return this.userProfileId
        },
        toTelegramChannel() {
            return this.user.id ? this.telegramChannelURL : null
        },
    },

    created() {
        const localUser = localStorage.getItem('casinoUser')
        if (!this.userProfileId && localUser) this.setUserId(JSON.parse(localUser))
        // if (this.getUserById(this.userProfileId)) {
        this.user = { ...this.getUserById(this.userProfileId) }
        // }
        // else {
        //     this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        // }
        this.setUsersList()
    },

    methods: {
        ...mapActions('header', ['openPopup']),
        ...mapActions('login', { setUsersList: 'loadList' }),
        ...mapActions('user', ['setUserId']),
        onOpenPopup() {
            this.closingMenuDuringNavigation()
            this.openPopup()
        },
        openMobileMenu() {
            this.isMenuOpen = !this.isMenuOpen
            if (this.isMenuOpen) {
                this.menuOpen = 'menu-open'
                document.body.classList.add('lock')
            } else {
                this.menuOpen = null
                document.body.classList.remove('lock')
            }
        },
        closingMenuDuringNavigation() {
            this.menuOpen = null
            document.body.classList.remove('lock')
        },
        toTheRoute(rout) {
            const storageUser = JSON.parse(localStorage.getItem('casinoUser'))
			if(storageUser){
			const getStorageUser = this.usersList.find((user) => user?.id === storageUser)
            if (storageUser && !this.userProfileId) {
                if (getStorageUser) {
                    this.setUserId(getStorageUser.id)
                }
            }

            if (!this.userProfileId) {
                this.setUserId(storageUser)
            }

            this.closingMenuDuringNavigation()

			this.$router.push({
				name: rout,
				params: { userLogin: getStorageUser.login },
			})
		} else {
			this.$router.push({
				name: 'login',
			})
			}
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/style';
</style>
