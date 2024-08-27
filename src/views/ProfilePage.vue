<template>
    <main-master-page>
        <section class="profile">
            <div v-if="user && user.id" class="profile__container">
                <h2 class="profile__title title">
                    <span>Hello, </span><span>{{ user?.login }}!</span>
                </h2>
                <h5 class="profile__subtitle small-title">You can see your profile here!</h5>
                <div class="profile__info info-profile">
                    <div class="info-profile__body">
                        <div class="info-profile__main main-info-profile">
                            <h4 class="main-info-profile__name small-title">{{ user?.login }}</h4>
                            <h6 class="main-info-profile__email">{{ user?.email }}</h6>
                            <div class="info-profile__action action-info-profile">
                                <button class="action-info-profile__button button" @click="onLogOut">Log Out</button>
                            </div>
                        </div>
                        <div class="info-profile__image">
                            <div class="info-profile__image-body">
                                <div class="info-profile__image-action">
                                    <label>
                                        Upload your avatar here:
                                        <input
                                            type="file"
                                            name="userAvatar"
                                            accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                                            @change="onFileChange"
                                        />
                                    </label>
                                </div>
                                <div v-if="user && user.avatar" class="info-profile__avatar">
                                    <img :src="user.avatar" :alt="user?.login" />
                                </div>
                            </div>
                            <message-popup :status="errorMessageStatus" :show="showErrorMessage" :text="errorMessage" />
                        </div>
                    </div>
                </div>
                <form action="#" class="profile__form form-profile">
                    <h3 class="form-profile__title small-title">
                        You can change your personal information whenever you want!
                    </h3>
                    <div class="form-profile__items">
                        <div class="form-profile__item item-form">
                            <label v-if="user">
                                Login
                                <input v-model.trim="user.login" type="text" maxlength="30" />
                            </label>
                        </div>
                        <div class="form-profile__item item-form">
                            <label v-if="user">
                                Email
                                <input v-model.trim="user.email" type="text" maxlength="35" />
                            </label>
                        </div>
                        <div class="form-profile__item item-form">
                            <label v-if="user">
                                Password
                                <input v-model.trim="user.password" :type="passwordFieldType" maxlength="30" />
                                <button type="button" class="see-pass-btn" @click="togglePasswordVisibility">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="16"
                                        width="18"
                                        viewBox="0 0 576 512"
                                    >
                                        <path
                                            d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                                        />
                                    </svg>
                                </button>
                            </label>
                        </div>
                    </div>
                    <div class="form-profile__buttons">
                        <button type="button" class="form-profile__button button" @click="onSave">Save</button>
                        <button type="button" class="form-profile__button button" @click="onCancel">Cancel</button>
                    </div>
                </form>
                <div class="profile__balance balance-profile">
                    <div class="balance-profile__top">
                        <h4 class="balance-profile__title small-title">Here you can replenish your balance</h4>
                        <div style="display: grid">
                            <strong class="balance-profile__balance small-title"
                                >$<span>{{ user?.balance }}</span></strong
                            >
                        </div>
                    </div>
                    <div class="balance-profile__main item-form">
                        <message-popup :status="messageStatus" :show="showBalanceMessage" :text="balanceMessage" />
                        <label>
                            <input v-model.trim="userBalanceInput" type="number" />
                        </label>
                        <button
                            type="button"
                            :disabled="!userBalanceInput"
                            class="balance-profile__button button"
                            @click="replenishBalance"
                        >
                            replenish
                        </button>
                    </div>
                </div>
                <div class="profile__inventory inventory-profile">
                    <div v-if="user && user.inventory && user.inventory.length" class="inventory-profile__body">
                        <h4 class="inventory-profile__title small-title">Here is your inventory</h4>
                        <ul class="inventory-profile__list">
                            <li
                                v-for="item in user?.inventory"
                                :key="item.id"
                                class="inventory-profile__item item-inventory-profile"
                            >
                                <template v-if="item.amount > 0">
                                    <div class="item-inventory-profile__info">
                                        <div class="item-inventory-profile__sell">
                                            <div class="item-inventory-profile__sell-count item-form">
                                                <button :disabled="showErrorMessage" @click="decreaseCount(item)">
                                                    -
                                                </button>
                                                <input
                                                    v-model.trim="itemAmounts[item.id]"
                                                    type="number"
                                                    min="1"
                                                    step="0.01"
                                                />
                                                <button :disabled="showErrorMessage" @click="increaseCount(item)">
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                class="item-inventory-profile__sell-button button"
                                                :disabled="mailLoading[item.id]"
                                                @click="sellCoin(item)"
                                            >
                                                {{ mailLoading[item.id] ? 'Loading...' : 'Sell' }}
                                            </button>
                                        </div>
                                        <div class="item-inventory-profile__amount">{{ item.amount }}</div>
                                        <h6 class="item-inventory-profile__title">
                                            <router-link
                                                :to="{ name: 'product', params: { productName: getCoinById(item.id)?.name } }"
                                                target="_blank"
                                                >{{ getCoinById(item.id)?.name }}</router-link
                                            >
                                        </h6>
                                        <div class="item-inventory-profile__image">
                                            <img :src="getCoinById(item.id)?.img" :alt="getCoinById(item.id)?.name" />
                                        </div>
                                    </div>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="inventory-profile__top">
                        <h4 class="inventory-profile__title small-title">Here must be your inventory...</h4>
                        <h6 class="inventory-profile__subtitle">
                            I cant find anything in your inventory...
                            <router-link :to="{ name: 'shop' }" class="inventory-profile__subtitle-link">
                                Try adding something to it
                            </router-link>
                        </h6>
                    </div>
                </div>
            </div>
            <loading-comp v-else />
        </section>
    </main-master-page>
</template>

<script>
import emailjs from '@emailjs/browser'
import { mapGetters, mapActions } from 'vuex'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import MessagePopup from '@/components/MessagePopup/index.vue'
import LoadingComp from '@/components/LoadingComp/index.vue'

export default {
    name: 'ProfilePage',

    components: {
        MainMasterPage,
        MessagePopup,
        LoadingComp,
    },

    data() {
        return {
            user: {},
            userBalanceInput: null,
            balanceMessage: null,
            showBalanceMessage: false,
            showErrorMessage: false,
            showPassword: false,
            messageStatus: false,
            errorMessageStatus: false,
            itemAmounts: {},
            mailLoading: {},
        }
    },

    computed: {
        ...mapGetters('user', ['userProfileId', 'getUserByLogin']),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        ...mapGetters('login', ['isLoading', 'hasError']),
        ...mapGetters('login', { usersList: 'getItemsList', getUserById: 'getItemById' }),
        ...mapGetters(['errorMessage']),
        ...mapGetters('crypto', ['getRate']),
        userLogin() {
            return this.$route.params.userLogin
        },
        userId() {
			const user = this.getUserByLogin(this.userLogin)
			return user?.id
        },
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password'
        },
    },

    watch: {
        userBalanceInput: {
            handler(newValue) {
                this.setTransactionSum(newValue)
            },
        },
    },

    async created() {
        await this.setUsersList()
        if (!this.userProfileId) await this.setUserId(JSON.parse(localStorage.getItem('casinoUser')))
        setTimeout(() => {
            this.user = { ...this.getUserById(this.userId) }
            console.log('user')
            console.log(this.user)
            this.initializeAdditionalReq()
        }, 1500)
        // if (this.getUserById(this.userId)) {
        //     this.user = { ...this.getUserById(this.userId) }

        // let storageUser = JSON.parse(localStorage.getItem('casinoUser'))
        // if (JSON.stringify(storageUser) !== JSON.stringify(this.user)) {
        //     storageUser = { ...this.user }
        //     localStorage.setItem('casinoUser', JSON.stringify(storageUser))
        // }
        // } else {
        //     if (!this.userProfileId) this.setUserId(JSON.parse(localStorage.getItem('casinoUser')))
        //     this.user = { ...this.getUserById(this.userProfileId) }
        // this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        // let foundUser = this.usersList.find((user) => user.id == this.user.id)
        // if (foundUser !== this.user) {
        //     foundUser = { ...this.user }
        // }
        // }
        this.setErrorMessage(null)

        const self = this
        window.addEventListener('storage', function (event) {
            if (event.key === 'logoutEvent') {
                self.user = null
                self.setUserName(null)
                self.setUserId(null)
                localStorage.removeItem('casinoUser')
                self.$router.push({ name: 'home' })
            }
        })
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('user', ['setUserName', 'setUserId']),
        ...mapActions('login', { updateUser: 'updateItem', setUsersList: 'loadList' }),
        ...mapActions('crypto', ['wave', 'connectUsersWallet', 'getBalance', 'sendTransaction', 'setTransactionSum']),
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(email)
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword
        },
        async onDeleteAvatar() {
            if (this.user.avatar) {
                this.user.avatar = ''
                await this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
                this.setErrorMessage('Avatar deleted successfully!')
                this.showErrorMessage = true
                this.errorMessageStatus = true
                setTimeout(() => {
                    this.showErrorMessage = false
                }, 3000)
            } else {
                this.setErrorMessage('You have not chosen the image')
                this.showErrorMessage = true
                this.errorMessageStatus = false
                setTimeout(() => {
                    this.showErrorMessage = false
                }, 3000)
            }
        },
        onLogOut() {
            this.$router.push({
                name: 'home',
            })
            this.setUserId(null)
            this.setUserName(null)
            this.user = null
            localStorage.removeItem('casinoUser')
            localStorage.setItem('logoutEvent', Date.now().toString())
        },
        async onFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.user.avatar = e.target.result
                }
                reader.readAsDataURL(file)
                setTimeout(async () => {
                    await this.updateUser({
                        itemId: this.user.id,
                        data: this.user,
                    })
                }, 100)
                this.setErrorMessage('Image uploaded successfully')
                this.showErrorMessage = true
                this.errorMessageStatus = true
                setTimeout(() => {
                    this.showErrorMessage = false
                }, 3000)
            }
        },
        async onSave() {
            if (this.user.login && this.user.email && this.user.password && this.isValidEmail(this.user.email)) {
                await this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
                this.setErrorMessage('Saved successfully!')
                this.showErrorMessage = true
                this.errorMessageStatus = true
                setTimeout(() => {
                    this.showErrorMessage = false
                }, 3000)
            } else {
                if (!this.user.email || !this.isValidEmail(this.user.email)) {
                    this.setErrorMessage('Invalid email')
                    this.showErrorMessage = true
                    this.errorMessageStatus = false
                    setTimeout(() => {
                        this.showErrorMessage = false
                    }, 3000)
                } else {
                    this.setErrorMessage('Fill all fields')
                    this.showErrorMessage = true
                    this.errorMessageStatus = false
                    setTimeout(() => {
                        this.showErrorMessage = false
                    }, 3000)
                }
            }
        },
        onCancel() {
            this.$router.push({ name: 'home' })
        },
        async replenishBalance() {
            try {
                await this.connectUsersWallet(this.user)
                const balance = await this.getBalance()
                const maticAmount = Number((this.userBalanceInput / this.getRate).toFixed(4))
                console.log('maticAmount')
                console.log(this.userBalanceInput)
                console.log(this.getRate)
                console.log('balance')
                console.log(balance)

                if (this.userBalanceInput > 0 && balance > maticAmount) {
                    const res = await this.sendTransaction(this.user)

                    if (res) {
                        const inputBalanceSum = (Number(this.user.balance) + Number(this.userBalanceInput)).toFixed(3)
                        this.user.balance = inputBalanceSum

                        this.setErrorMessage(null)
                        this.userBalanceInput = null
                        this.balanceMessage = 'Payment proceeded successfully!'
                        this.messageStatus = true
                        this.showBalanceMessage = true

                        setTimeout(() => {
                            this.showBalanceMessage = false
                        }, 5000)

                        await this.updateUser({
                            itemId: this.user.id,
                            data: this.user,
                        })

                        console.log('User updated successfully')
                    } else {
                        throw new Error('Transaction failed')
                    }
                } else if (balance < maticAmount) {
                    this.balanceMessage = 'Not enough money on the crypto wallet'
                    this.messageStatus = false
                    this.showBalanceMessage = true
                    setTimeout(() => {
                        this.showBalanceMessage = false
                    }, 5000)
                } else {
                    this.balanceMessage = 'Please enter a positive number'
                    this.messageStatus = false
                    this.showBalanceMessage = true
                    setTimeout(() => {
                        this.showBalanceMessage = false
                    }, 5000)
                }
            } catch (err) {
                console.error('Error:', err)
                this.balanceMessage = `${err.message}`
                this.messageStatus = false
                this.showBalanceMessage = true
                setTimeout(() => {
                    this.showBalanceMessage = false
                }, 5000)
            }
        },
        async sellCoin(item) {
            const YOUR_SERVICE_ID = process.env.VUE_APP_YOUR_SERVICE_ID
            const YOUR_TEMPLATE_ID = process.env.VUE_APP_YOUR_TEMPLATE_ID
            const PUBLIC_KEY = process.env.VUE_APP_PUBLIC_KEY
            // Check if all necessary fields are filled and the email is valid
            const coin = await this.getCoinById(item.id)
            // Gather required data for the email template
            const templateParams = {
                name: this.user.login,
                email: this.user.email,
                wallet: this.user.cryptoAccount,
                coinName: coin.name,
                coinAmount: this.itemAmounts[item.id],
                money: Number(this.itemAmounts[item.id] * coin.price).toFixed(2),
            }

            console.log('templateParams')
            console.log(coin)
            this.mailLoading[item.id] = true
            // Send the email using EmailJS
            emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
                () => {
                    this.showMessage('Request is sent to the admin', true)
                    this.mailLoading[item.id] = false
                },
                (error) => {
                    // Handle error
                    this.showMessage(`FAILED..., ${error.text}`, false)
                    this.mailLoading[item.id] = false
                }
            )
        },
        initializeAdditionalReq() {
            this.user.inventory.forEach((item) => {
                this.itemAmounts[item.id] = item.amount
                this.mailLoading[item.id] = false
            })
        },
        decreaseCount(item) {
            if (this.itemAmounts[item.id] > 1) {
                this.itemAmounts[item.id] -= 1
            } else {
                this.itemAmounts[item.id] = 1
                this.showMessage("You can't sell less than 1 product", false)
            }
        },
        increaseCount(item) {
            if (this.itemAmounts[item.id] < item.amount) {
                this.itemAmounts[item.id] += 1
            } else {
                this.showMessage("You can't sell more coins than you have", false)
            }
        },
        showMessage(message, status) {
            this.setErrorMessage(message)
            this.errorMessageStatus = status
            this.showErrorMessage = true
            setTimeout(() => {
                this.showErrorMessage = false
            }, 3000)
        },
    },
}
</script>

<style lang="scss" scoped>
</style>