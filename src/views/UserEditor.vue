<template>
    <loading-comp v-if="!user.id && userId" />
    <template v-else>
        <div class="editor-item-page">
            <div class="editor-item-page__container">
                <form action="#" class="editor-item-page__forms">
                    <div class="editor-item-page__image">
                        <div class="editor-item-page__image-body">
                            <div class="editor-item-page__image-action">
                                <label>
                                    Avatar
                                    <input
                                        type="file"
                                        name="userAvatar"
                                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                                        @change="onFileChange"
                                    />
                                </label>
                                <button
                                    type="button"
                                    class="editor-item-page__image-button button"
                                    @click="onDeleteAvatar"
                                >
                                    Delete an avatar
                                </button>
                            </div>
                            <div v-if="user.avatar" class="editor-item-page__avatar">
                                <img :src="user.avatar" :alt="user.login" />
                            </div>
                        </div>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Login
                            <input v-model.trim="user.login" type="text" maxlength="30" />
                        </label>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Email
                            <input v-model.trim="user.email" type="email" maxlength="30" />
                        </label>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Password
                            <input v-model.trim="user.password" :type="passwordFieldType" maxlength="30" />
                            <button type="button" class="see-pass-btn" @click="togglePasswordVisibility">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                    <path
                                        d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                                    />
                                </svg>
                            </button>
                        </label>
                    </div>
                    <div
                        v-if="user.inventory && user.inventory.length"
                        class="editor-item-page__label editor-item-page__label-coin item-form"
                    >
                        <span>Coins</span>
                        <ul class="editor-item-page__coins-list">
                            <li v-for="coin in user.inventory" :key="coin.id" class="editor-item-page__coins-item">
                                <div
                                    v-if="getCoinById(coin.id) && getCoinById(coin.id).id"
                                    class="editor-item-page__coins-list-coin"
                                >
                                    <h6>{{ getCoinById(coin.id).name }}</h6>
                                    <img :src="getCoinById(coin.id).img" :alt="getCoinById(coin.id).name" />
                                    <input v-model.trim="coin.amount" type="number" />
                                </div>
                                <div class="editor-item-page__coins-list-action">
                                    <button
                                        type="button"
                                        class="button"
                                        @click="
                                            updateUser({
                                                itemId: userId,
                                                data: user,
                                            })
                                        "
                                    >
                                        Edit amount
                                    </button>
                                    <button type="button" class="button" @click="deleteCoin(coin.id)">
                                        Delete coin
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Balance
                            <input v-model.trim="user.balance" type="number" />
                            <div v-if="balanceError" class="err-msg">{{ balanceError }}</div>
                        </label>
                    </div>
                    <div class="editor-item-page__label editor-item-page__label-admin item-form">
                        <label>
                            Is Admin?
                            <input v-model="user.admin" type="checkbox" />
                        </label>
                    </div>
                </form>
                <div class="editor-item-page__actions">
                    <button class="button" @click="onAction">{{ actionButtonTitle }}</button>
                    <router-link :to="{ name: 'editor' }" class="button">Cancel</router-link>
                </div>
                <message-popup :status="errorMessageStatus" :show="showErrorMessage" :text="errorMessage" />
            </div>
        </div>
    </template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MessagePopup from '@/components/MessagePopup/index.vue'
import LoadingComp from '@/components/LoadingComp/index.vue'

export default {
    name: 'UserEditor',
    components: {
        MessagePopup,
        LoadingComp,
    },

    data() {
        return {
            user: {},
            userBalanceInput: null,
            balanceError: null,
            showPassword: false,
            showErrorMessage: false,
            errorMessageStatus: false,
        }
    },

	computed: {
		...mapGetters('user', ['userProfileId', 'getUserByLogin']),
        ...mapGetters('login', { getUserById: 'getItemById', getUsersList: 'getItemsList' }),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        ...mapGetters(['errorMessage']),
        userLogin() {
            return this.$route.params.userLogin
        },
        userId() {
			const user = this.getUserByLogin(this.userLogin)
			return user?.id
        },
        actionButtonTitle() {
            return this.userId ? 'Save' : 'Add'
        },
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password'
        },
    },
    async created() {
        await this.setUsersList()
        await this.setCoinsList()
    },
    async mounted() {
        setTimeout(() => {
            this.user = { ...this.getUserById(this.userId) }
        }, 1100)
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('login', { updateUser: 'updateItem', addUser: 'addItem', setUsersList: 'loadList' }),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        deleteCoin(coinId) {
            this.user.inventory = this.user.inventory.filter((coin) => coin.id !== coinId)
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword
        },
        onFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.user.avatar = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(email)
        },
        async onAction() {
            if (this.user.login && this.user.email && this.user.password && this.isValidEmail(this.user.email)) {
                if (!this.user.balance && this.user.balance !== 0) {
                    this.user.balance = 0
                } else if (this.user.balance < 0) {
                    this.balanceError = 'Balance cant be negative'
                    this.messageStatus = false
                    this.showBalanceMessage = true
                    setTimeout(() => {
                        this.showBalanceMessage = false
                    }, 3000)
                } else if (!this.user.avatar)
                    this.user.avatar =
                        'https://firebasestorage.googleapis.com/v0/b/course-project-326a3.appspot.com/o/user%2Fcasino-avatar.jpg?alt=media&token=35f4fb67-1de1-43b7-a26a-873983754d12'
                else {
                    if (!this.userId) this.addUser(this.user)
                    else {
                        await this.updateUser({
                            itemId: this.user.id,
                            data: this.user,
                        })
                    }
                    this.balanceError = null
                    this.setErrorMessage('Edited successfully! Redirecting to the editor page...')
                    this.errorMessageStatus = true
                    this.showErrorMessage = true
                    setTimeout(() => {
                        this.showErrorMessage = false
                        this.$router.push({ name: 'editor' })
                    }, 3000)
                }
            } else {
                if (!this.user.email || !this.isValidEmail(this.user.email)) {
                    this.setErrorMessage('Invalid email')
                    this.errorMessageStatus = false
                    this.showErrorMessage = true
                    setTimeout(() => {
                        this.showErrorMessage = false
                    }, 3000)
                } else {
                    this.setErrorMessage('Fill all fields')
                    this.errorMessageStatus = false
                    this.showErrorMessage = true
                    setTimeout(() => {
                        this.showErrorMessage = false
                    }, 3000)
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>