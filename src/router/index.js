import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginPage from "../views/LoginPage.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: { requiresAuth: false },
	},
	{
		path: "/login",
		name: "login",
		component: LoginPage,
		meta: { requiresAuth: false },
	},
	{
		path: "/editor",
		name: "editor",
		component: () => import('../views/EditorView.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: "/casino",
		name: "casino",
		component: () => import('../views/CasinoView.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: "/games",
		name: "games",
		component: () => import('../views/GamesView.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: "/game/:gameName",
		name: "game",
		component: () => import('../views/GamePage.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: "/shop",
		name: "shop",
		component: () => import('../views/ShopView.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: "/product/:productName",
		name: "product",
		component: () => import('../views/ProductPage.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: "/user-profile/:userLogin",
		name: "user_profile",
		component: () => import('../views/ProfilePage.vue'),
		props: (route) => ({
			userId: route.params.userId,
		}),
		meta: { requiresAuth: true },
	},
	{
		path: "/user-editor/:userLogin?",
		name: "user_editor",
		component: () => import('../views/UserEditor.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: "/coin-editor/:coinName?",
		name: "coin_editor",
		component: () => import('../views/CoinsEditor.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: "/game-editor/:gameName?",
		name: "game_editor",
		component: () => import('../views/GameEditor.vue'),
		meta: { requiresAuth: true },
	},
	// {
	// 	path: "/meta_mask/:userId?",
	// 	name: "meta_mask",
	// 	component: () => import('../views/MetaMask.vue'),
	// 	meta: { requiresAuth: true },
	// },
	{
		path: "/sell_form/name=:coinName&amount=:coinAmount",
		name: "sell_form",
		component: () => import('../views/SellForm.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: "/support",
		name: "support",
		component: () => import('../views/SupportView.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('../views/NotFound.vue'),
		meta: { requiresAuth: false }
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { top: 0 };
	},
});

router.beforeEach((to) => {
	const userStorage =
		JSON.parse(localStorage.getItem('casinoUser'))
	if (to.meta.requiresAuth && !userStorage) {
		return {
			name: 'login',
			query: { redirect: to.fullPath },
		}
	}
})


export default router;
