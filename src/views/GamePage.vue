<template>
    <main-master-page>
        <div class="game-comp">
            <game-master-page v-if="game && game.id" :game="game" :user="user" class="game-comp__container">
                <div v-if="game.category === 'Dice'" class="game__comp-item">
                    <dice-game />
                </div>
                <div v-else-if="game.category === 'Black Jack'" class="game__comp-item">
                    <black-jack-game />
                </div>
                <div v-else-if="game.category === 'Slots'" class="game__comp-item">
                    <slot-game />
                </div>
                <div v-else-if="game.category === 'Spinning Wheel'" class="game__comp-item">
                    <spinning-wheel-game />
                </div>
            </game-master-page>
            <loading-comp v-else />
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import { mapActions, mapGetters } from 'vuex'

import GameMasterPage from '@/masterpages/GameMasterPage.vue'
import DiceGame from '@/components/GamesComp/DiceGame.vue'
import BlackJackGame from '@/components/GamesComp/BlackJackGame.vue'
import SlotGame from '@/components/GamesComp/SlotGame.vue'
import SpinningWheelGame from '@/components/GamesComp/SpinningWheelGame.vue'
import LoadingComp from '@/components/LoadingComp/index.vue'

export default {
    name: 'GamePage',

    components: {
        MainMasterPage,
        GameMasterPage,
        DiceGame,
        BlackJackGame,
        SlotGame,
        SpinningWheelGame,
        LoadingComp,
    },

    data() {
        return {
            game: {},
            user: {},
        }
    },
    computed: {
        ...mapGetters('games', { getGameByName: 'getItemByName', gamesList: 'getItemsList' }),
        ...mapGetters('games', ['hasError', 'isLoading']),
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters('coins', { coinsList: 'getItemsList' }),
        ...mapGetters('login', { usersList: 'getItemsList' }),
        gameName() {
            return this.$route.params.gameName
        },
    },
    async created() {
        // const storageGamesList = JSON.parse(localStorage.getItem('gamesList'))
        // let storageGame = storageGamesList.find((game) => game.id == this.gameId)
        // const setGameToLocalStorage = JSON.stringify(storageGame)
        // localStorage.setItem('game', setGameToLocalStorage)
        // if (this.getUserById(this.userProfileId)) {
        //     this.user = { ...this.getUserById(this.userProfileId) }
        //     let storageUser = JSON.parse(localStorage.getItem('casinoUser'))
        //     if (JSON.stringify(storageUser) !== JSON.stringify(this.user)) {
        //         storageUser = { ...this.user }
        //         localStorage.setItem('casinoUser', JSON.stringify(storageUser))
        //     }
        // } else {
        //     this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        //     let foundUser = this.usersList.find((user) => user.id == this.user.id)
        //     if (foundUser !== this.user) {
        //         foundUser = { ...this.user }
        //     }
        // }
        // if (this.getGameById(this.gameId)) {
        await this.setUsersList()
        await this.setGamesList()
        await this.setCoinsList()
        if (!this.userProfileId) await this.setUserId(JSON.parse(localStorage.getItem('casinoUser')))
        console.log('this.userProfileId')
        console.log(this.userProfileId)
        setTimeout(() => {
            this.user = { ...this.getUserById(this.userProfileId) }
			this.game = { ...this.getGameByName(this.gameName) }
            console.log('this.gameId')
            console.log(this.game)
        }, 1500)
        // }
        // else {
        //     this.game = { ...JSON.parse(localStorage.getItem('game')) }
        // }
    },

    methods: {
        ...mapActions('games', { setGamesList: 'loadList', updateGame: 'updateItem' }),
        ...mapActions('user', ['setUserId']),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('login', { setUsersList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>