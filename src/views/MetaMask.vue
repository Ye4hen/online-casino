<script>
import { mapActions, mapGetters } from 'vuex'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
// import dotenv from 'dotenv';

// dotenv.config()
export default {
    name: 'MetaMask',

    components: {
        MainMasterPage,
    },

    data() {
        return {
            messageInput: null,
            user: {},
            transactionSum: null,
        }
    },

    computed: {
        // ...mapState('crypto', ['account', 'guestPosts', 'guestPostsCount']),
        ...mapGetters('crypto', ['getAccount', 'getGuestPosts', 'getGuestPostsCount']),
        ...mapGetters('user', ['getUserById']),

        userId() {
            return this.$route.params.userId
        },
    },

    watch: {
        transactionSum: {
            handler(newValue) {
                this.setTransactionSum(newValue)
            },
        },
    },

    async created() {
        await this.setUsersList()
        if (!this.userProfileId) this.setUserId(JSON.parse(localStorage.getItem('casinoUser')))
        // if (this.getUserById(this.userId)) {
        this.user = await { ...this.getUserById(this.userId) }
        // }
        // else {
        //     this.user = await { ...JSON.parse(localStorage.getItem('casinoUser')) }
        // }
    },

    methods: {
        ...mapActions('crypto', [
            'wave',
            'connectWallet',
            'getBalance',
            'sendTransaction',
            'setTransactionSum',
            'connectUsersWallet',
        ]),
        ...mapActions('login', { updateUser: 'updateItem', setUsersList: 'loadList' }),
    },
}
</script>

<template>
    <main-master-page>
        <section class="meta">
            <h1 class="text-2xl m-4">Erik's Crypto Guest Book</h1>
            <button v-if="!getAccount" class="bg-green-300 rounded p-4" @click="connectUsersWallet(user)">
                Connect Wallet
            </button>
            <div v-if="getAccount" class="mt-5">
                <input
                    v-model="messageInput"
                    name="guestBookInfo"
                    class="py-4 px-4 shadow border rounded"
                    maxlength="20"
                />
                <button class="bg-yellow-300 rounded p-4 mt-10" @click="wave(messageInput)">Send</button>
            </div>

            <div v-if="getAccount" class="border shadow w-4/12 p-4 mt-10">
                <h3 class="text-2xl">Number Of Entries: {{ getGuestPostsCount }}</h3>
                <div
                    v-for="(guestPost, idx) in getGuestPosts"
                    :key="idx"
                    class="flex flex-col m-auto"
                    :class="{ 'mt-4': idx > 1 }"
                >
                    <div v-if="guestPost.message" class="flex justify-between w-full">
                        <span class="font-semibold">{{ guestPost.timestamp }}</span>
                        <span>{{ guestPost.message }}</span>
                    </div>
                </div>
            </div>
            <div class="meta__transaction transaction-meta">
                <label>
                    Enter sum in dollars
                    <input v-model="transactionSum" type="number" />
                </label>
                <button
                    type="button"
                    class="button transaction-meta__button"
                    @click="sendTransaction(user, transactionSum)"
                >
                    Send
                </button>
            </div>
            <div>
                <button type="button" class="button" @click="getBalance">Get Balance</button>
            </div>
        </section>
    </main-master-page>
</template>

<style lang="scss" scoped>
.meta {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>