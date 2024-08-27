<template>
    <loading-comp v-if="!game.id && gameName" />
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
                                        name="gameAvatar"
                                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                                        @change="onFileChange"
                                    />
                                </label>
                            </div>
                            <div v-if="game.img" class="info-profile__avatar game-img">
                                <img :src="game.img" :alt="game.name" />
                            </div>
                        </div>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Name
                            <input v-model.trim="game.name" type="text" />
                        </label>
                    </div>
                    <div class="editor-item-page__label item-form">
                        <label>
                            Category
                            <select v-model="game.category">
                                <option v-for="category in getCategoriesList" :key="category" :value="category">
                                    {{ category }}
                                </option>
                            </select>
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
    name: 'GameEditor',
    components: {
        MessagePopup,
        LoadingComp,
    },

    data() {
        return {
            game: {},
            showErrorMessage: false,
            errorMessageStatus: false,
        }
    },

    computed: {
        ...mapGetters('games', ['getCategoriesList']),
        ...mapGetters('games', { getGameByName: 'getItemByName' }),
        ...mapGetters(['errorMessage']),
        gameName() {
            return this.$route.params.gameName
        },
        actionButtonTitle() {
			return this.gameName ? 'Save' : 'Add'
        },
    },

    async created() {
        this.setGamesList()
        setTimeout(() => {
			this.game = { ...this.getGameByName(this.gameName) }
        }, 1100)
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('games', { updateGame: 'updateItem', addGame: 'addItem', setGamesList: 'loadList' }),
        async onFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.game.img = e.target.result
                }
                reader.readAsDataURL(file)
                setTimeout(async () => {
                    await this.updateGame({
                        itemId: this.game.id,
                        data: this.game,
                    })
                }, 100)
                this.setErrorMessage('Image is set successfully!')
                this.errorMessageStatus = true
                this.showErrorMessage = true
                setTimeout(() => {
                    this.showErrorMessage = false
                }, 3000)
            }
        },
        async onAction() {
            if (this.game.name && this.game.category && this.game.img) {
                if (!this.gameName) await this.addGame(this.game)
                else {
                    await this.updateGame({
                        itemId: this.game.id,
                        data: this.game,
                    })
                    this.setErrorMessage('Game updated successfully! Redirecting to the editor page...')
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
.game-img {
    background-color: transparent;
}
</style>