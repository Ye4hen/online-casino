<template>
    <main-master-page>
        <loading-comp v-if="isLoading" />
        <div v-else-if="hasError" class="has-error">error</div>
        <div v-else class="editor">
            <div class="editor__container">
                <h2 class="editor__title title">Hello, dear Admin!</h2>
                <h4 class="editor__subtitle small-title">
                    Here you are able to edit, delete and add items to your Casino!
                </h4>
                <div class="editor__items">
                    <div class="editor__item item-editor">
                        <h4 class="item-editor__title small-title">Users</h4>
                        <div class="item-editor__filters">
                            <div class="item-editor__filter item-form">
                                <label>
                                    Login
                                    <input v-model.trim="filterUsersData.login" type="text" />
                                </label>
                            </div>
                            <div class="item-editor__filter item-form">
                                <label>
                                    Email
                                    <input v-model.trim="filterUsersData.email" type="email" />
                                </label>
                            </div>
                            <div class="item-editor__filter-ranges">
                                <div class="item-editor__filter-range item-form">
                                    <label>
                                        Balance from
                                        <input v-model.trim="filterUsersData.balanceFrom" type="number" />
                                    </label>
                                </div>
                                <div class="item-editor__filter-range item-form">
                                    <label>
                                        Balance to
                                        <input v-model.lazy="filterUsersData.balanceTo" type="number" />
                                    </label>
                                </div>
                            </div>
                            <div class="item-editor__filter-checkbox item-form">
                                Admin
                                <input v-model="filterUsersData.isAdmin" type="checkbox" />
                            </div>
                        </div>
                        <ul class="item-editor__list">
                            <li
                                v-for="user in getFilteredUsersList"
                                :key="user.id"
                                class="item-editor__object item-editor-object"
                            >
                                <div class="item-editor-object__img">
                                    <img :src="user.avatar" :alt="user.login" />
                                </div>
                                <h5 class="item-editor-object__name">
                                    {{ user.login }} <span v-if="user.edit">Admin</span>
                                </h5>
                                <h6 class="item-editor-object__email">{{ user.email }}</h6>
                                <strong class="item-editor-object__balance">${{ user.balance }}</strong>
                                <div class="item-editor-object__buttons">
                                    <router-link
                                        :to="{ name: 'user_editor', params: { userLogin: user.login } }"
                                        class="item-editor-object__button button"
                                        >Edit</router-link
                                    >
                                    <button class="item-editor-object__button button" @click="deleteUser(user.id)">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <router-link :to="{ name: 'user_editor' }" class="item-editor__add button"
                            >Add User</router-link
                        >
                    </div>
                    <div class="editor__item item-editor">
                        <h4 class="item-editor__title small-title">Coins</h4>
                        <div class="item-editor__filters item-editor__filters--coins">
                            <div class="item-editor__filter item-form">
                                <label>
                                    Name
                                    <input v-model.trim="filterCoinsData.name" type="text" />
                                </label>
                            </div>
                            <div class="item-editor__filter-ranges">
                                <div class="item-editor__filter-range item-form">
                                    <label>
                                        Price from
                                        <input v-model.trim="filterCoinsData.priceFrom" type="number" />
                                    </label>
                                </div>
                                <div class="item-editor__filter-range item-form">
                                    <label>
                                        Price to
                                        <input v-model.lazy="filterCoinsData.priceTo" type="number" />
                                    </label>
                                </div>
                            </div>
                            <ul class="item-editor__filter-list">
                                <li
                                    v-for="category in coinsCategoriesList"
                                    :key="category"
                                    class="item-editor__filter-item item-editor__filter-item--checkboxes"
                                >
                                    <label>
                                        {{ category }}
                                        <input v-model="filterCoinsData.category" :value="category" type="checkbox" />
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <ul class="item-editor__list">
                            <li
                                v-for="coin in getFilteredCoinsList"
                                :key="coin.id"
                                class="item-editor__object item-editor-object"
                            >
                                <div class="item-editor-object__img">
                                    <img :src="coin.img" :alt="coin.name" />
                                </div>
                                <h5 class="item-editor-object__name">
                                    {{ coin.name }}
                                </h5>
                                <h6 class="item-editor-object__category">{{ coin.category }}</h6>
                                <strong class="item-editor-object__price">${{ coin.price }}</strong>
                                <div class="item-editor-object__buttons">
                                    <router-link
                                        :to="{ name: 'coin_editor', params: { coinName: coin.name } }"
                                        class="item-editor-object__button button"
                                        >Edit</router-link
                                    >
                                    <button class="item-editor-object__button button" @click="onDeleteCoin(coin.id)">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <router-link :to="{ name: 'coin_editor' }" class="item-editor__add button"
                            >Add Coin</router-link
                        >
                    </div>
                    <div class="editor__item item-editor">
                        <h4 class="item-editor__title small-title">Games</h4>
                        <div class="item-editor__filters item-editor__filters--games">
                            <div class="item-editor__filter item-form">
                                <label>
                                    Enter the Name or the Category
                                    <input v-model.trim="filterGamesData.name" type="text" />
                                </label>
                            </div>
                        </div>
                        <ul class="item-editor__list">
                            <li
                                v-for="game in getFilteredGamesList"
                                :key="game.id"
                                class="item-editor__object item-editor-object"
                            >
                                <div class="item-editor-object__img">
                                    <img :src="game.img" :alt="game.name" />
                                </div>
                                <h5 class="item-editor-object__name">
                                    {{ game.name }}
                                </h5>
                                <h6 class="item-editor-object__category">{{ game.category }}</h6>
                                <ul class="item-editor-object__coins">
                                    <li
                                        v-for="coin in getCoinByCategory(game.category)"
                                        :key="coin.id"
                                        class="item-editor-object__coin"
                                    >
                                        <img :src="coin.img" :alt="coin.name" />
                                    </li>
                                </ul>
                                <div class="item-editor-object__buttons">
                                    <router-link
                                        :to="{ name: 'game_editor', params: { gameName: game.name } }"
                                        class="item-editor-object__button button"
                                        >Edit</router-link
                                    >
                                    <button class="item-editor-object__button button" @click="deleteGame(game.id)">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <router-link :to="{ name: 'game_editor' }" class="item-editor__add button"
                            >Add Game</router-link
                        >
                    </div>
                </div>
                <message-popup :status="errorMessageStatus" :show="showErrorMessage" :text="errorMessage" />
            </div>
        </div>
    </main-master-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import LoadingComp from '@/components/LoadingComp/index.vue'
import MessagePopup from '@/components/MessagePopup/index.vue'

export default {
    name: 'EditorView',

    data() {
        return {
            filterUsersData: {},
            filterCoinsData: {
                name: '',
                category: [],
                priceFrom: null,
                priceTo: null,
            },
            filterGamesData: {},
            showErrorMessage: false,
            errorMessageStatus: false,
            errorMessage: null,
        }
    },

    components: {
        MainMasterPage,
        LoadingComp,
        MessagePopup,
    },

    computed: {
        ...mapGetters('login', ['isLoading', 'hasError', 'getFilteredUsersList']),
        ...mapGetters('login', { usersList: 'getItemsList' }),
        ...mapGetters('games', { gamesList: 'getItemsList' }),
        ...mapGetters('games', ['getFilteredGamesList']),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        ...mapGetters('coins', ['coinsCategoriesList', 'getFilteredCoinsList']),
        getCoinByCategory() {
            return (category) => this.coinsList.filter((coin) => coin.category.toLowerCase() === category.toLowerCase())
        },
    },

    created() {
        this.setCoinsList()
        this.setGamesList()
        this.setUsersList()
    },

    watch: {
        filterUsersData: {
            handler(newValue) {
                this.updateUsersFilter(newValue)
            },
            deep: true,
        },
        filterCoinsData: {
            handler(newValue) {
                this.updateCoinsFilter(newValue)
            },
            deep: true,
        },
        filterGamesData: {
            handler(newValue) {
                this.updateGamesFilter(newValue)
            },
            deep: true,
        },

        getFilteredUsersList: {
            handler(newValue) {
                console.log(newValue)
                if (!newValue.length) {
                    this.errorMessage = 'There are no such users!'
                    this.errorMessageStatus = false
                    this.showErrorMessage = true
                    setTimeout(() => {
                        this.showErrorMessage = false
                    }, 3000)
                }
            },
        },
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
        getFilteredCoinsList: {
            handler(newValue) {
                console.log(newValue)
                if (!newValue.length) {
                    this.errorMessage = 'There are no such coins!'
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
        ...mapActions('games', {
            setGamesList: 'loadList',
            deleteGame: 'deleteItem',
            updateGamesFilter: 'updateFilter',
        }),
        ...mapActions('coins', {
            setCoinsList: 'loadList',
            deleteCoin: 'deleteItem',
            updateCoinsFilter: 'updateFilter',
        }),
        ...mapActions('login', {
            setUsersList: 'loadList',
            deleteUser: 'deleteItem',
            updateUser: 'updateItem',
            updateUsersFilter: 'updateFilter',
        }),
        onDeleteCoin(coinId) {
            this.deleteCoin(coinId)
            this.usersList.forEach((user) => {
                if (user.inventory) {
                    const coin = user.inventory.find((coin) => coin.id == coinId)
                    if (coin) {
                        user.inventory = user.inventory.filter((coin) => coin.id !== coinId)
                        this.updateUser({
                            itemId: user.id,
                            data: user,
                        })
                    }
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
</style>