<template>
    <loading-comp v-if="!coin.id && coinId" />
    <template v-else>
        <div class="editor-item-page">
            <div class="editor-item-page__container">
                <div class="editor-item-page__forms">
                    <div class="info-profile__image">
                        <div class="info-profile__image-body">
                            <div class="info-profile__image-action">
                                <label>
                                    Image
                                    <input
                                        type="file"
                                        name="coinAvatar"
                                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                                        @change="onFileChange"
                                    />
                                </label>
                            </div>
                            <div v-if="coin.img" class="info-profile__avatar coin-img">
                                <img :src="coin.img" :alt="coin.name" />
                            </div>
                        </div>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Name
                            <input v-model.trim="coin.name" type="text" />
                        </label>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Category
                            <select v-model="coin.category">
                                <option v-for="category in coinsCategoriesList" :key="category" :value="category">
                                    {{ category }}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Price
                            <input v-model.trim="coin.price" type="number" />
                            <div v-if="priceError" class="err-msg">{{ priceError }}</div>
                        </label>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Description
                            <textarea v-model="coin.desc" cols="30" rows="10"></textarea>
                        </label>
                    </div>
                </div>
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
    name: 'CoinsEditor',
    components: {
        MessagePopup,
        LoadingComp,
    },

    data() {
        return {
            coin: {},
            showErrorMessage: false,
            errorMessageStatus: false,
        }
    },

    computed: {
        ...mapGetters('coins', ['coinsCategoriesList']),
        ...mapGetters('coins', { getCoinById: 'getItemById', getCoinByName: 'getItemByName' }),
        ...mapGetters(['errorMessage']),
        coinName() {
			return this.$route.params.coinName
		},
		coinId() {
			const coin = this.getCoinByName(this.coinName)
			return coin.id
		},
        actionButtonTitle() {
            return this.coinName ? 'Save' : 'Add'
        },
    },

    async created() {
        await this.setCoinsList()
        setTimeout(() => {
            this.coin = { ...this.getCoinById(this.coinId) }
        }, 1100)
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('coins', { updateCoin: 'updateItem', addCoin: 'addItem', setCoinsList: 'loadList' }),
        async onFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.coin.img = e.target.result
                }
                reader.readAsDataURL(file)
                setTimeout(async () => {
                    await this.updateCoin({
                        itemId: this.coin.id,
                        data: this.coin,
                    })
                }, 100)
            }
        },
        async onAction() {
            if (this.coin.name && this.coin.category && this.coin.price && this.coin.img) {
                if (this.coin.price < 0) this.setErrorMessage('Price should be at least $50')
                else {
                    if (!this.coinId) this.addCoin(this.coin)
                    else {
                        await this.updateCoin({
                            itemId: this.coin.id,
                            data: this.coin,
                        })
                    }
                    this.setErrorMessage('Edited successfully! Redirecting to the editor page...')
                    this.errorMessageStatus = true
                    this.showErrorMessage = true
                    setTimeout(() => {
                        this.showErrorMessage = false
                        this.$router.push({ name: 'editor' })
                    }, 3000)
                }
            } else {
                this.setErrorMessage('Fill all fields')
                this.errorMessageStatus = false
                this.showErrorMessage = true
                setTimeout(() => {
                    this.showErrorMessage = false
                }, 3000)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.coin-img {
    background-color: transparent;
}
</style>