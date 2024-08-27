<template>
    <main-master-page>
        <div class="support">
            <div class="support__container">
                <h2 class="support__title title">If you have any problems with our casino</h2>
                <h4 class="support__subtitle small-title">Try something from this list</h4>
                <ul class="support__list">
                    <li class="support__item small-title">Log out from you profile and log in</li>
                    <li class="support__item small-title">
                        Go to your profile/home page and come back to the page where you had a problem
                    </li>
                    <li class="support__item small-title">Reopen the website</li>
                    <li class="support__item small-title">
                        Write here - <a href="https://t.me/B_O_B_jr" class="support__link">My Telegram</a>
                    </li>
                </ul>
                <h4 class="support__subtitle small-title">Rules</h4>
                <ol class="support__list">
                    <li class="support__item small-title">Sign up or Log in</li>
                    <li class="support__item small-title">Replenish your balance</li>
                    <li class="support__item small-title">
                        Buy coins(particular game needs particular coins. For example: to play slots you need coin
                        "BlackFreedom", etc.)
                    </li>
                    <li class="support__item small-title">Play and relax🍺 🎰</li>
                </ol>
            </div>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'

export default {
    name: 'SupportView',
    components: {
        MainMasterPage,
    },
}
</script>

<style lang="scss" scoped>
.support {
    padding-top: 11.25rem;
    padding-bottom: 3.75rem;
    min-height: 100vh;
    &__container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 1.875rem;
    }

    &__title {
        text-align: center;
    }

    &__subtitle {
        text-align: center;
    }

    &__link {
        color: #39a463;
        transition: color 0.3s;
        white-space: nowrap;
        @media (any-hover: hover) {
            &:hover {
                color: #ccc;
            }
        }
    }

    ul,
    ol,
    li {
        padding-left: 1.875rem;
    }
    ul li {
        list-style: initial;
    }
    ol {
        list-style: decimal;
    }
}
</style>