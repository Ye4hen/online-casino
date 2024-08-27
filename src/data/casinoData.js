export const usersData = [
	{
		id: 1,
		login: "Lab",
		email: "lab@gmail.com",
		password: "lab123por098",
		balance: 1000,
		avatar: '',
		inventory: [
			{
				id: 4,
				name: "RedPoint",
				img: require('@/assets/coins/red-point_coin-3.png'),
				amount: 10,
				price: 100,
				category: 'Dice',
			},
			{
				id: 3,
				name: 'BlackFreedom',
				img: require('@/assets/coins/black-freedom_coin.png'),
				amount: 15,
				price: 200,
				category: 'Slots',
			},
		]
	},
	{
		id: 2,
		login: "JohnDoe",
		email: "john.doe@example.com",
		password: "pass1234",
		balance: 2000,
		avatar: '',
		inventory: [
		]
	},
	{
		id: 3,
		login: "JaneSmith",
		email: "jane.smith@example.com",
		password: "securePwd567",
		balance: 3000,
		avatar: '',
		inventory: [
		]
	},
	{
		id: 4,
		login: "MaxPower",
		email: "max.power@example.com",
		password: "max123",
		balance: 4000,
		avatar: '',
		inventory: [
		]
	},
	{
		id: 5,
		login: "EmilyJones",
		email: "emily.jones@example.com",
		password: "emily456",
		balance: 5000,
		avatar: '',
		inventory: [
		]
	},
	{
		id: 6,
		login: "AlexBrown",
		email: "alex.brown@example.com",
		password: "brownie789",
		balance: 6000,
		avatar: '',
		inventory: []
	},
	{
		id: 7,
		login: "SarahMiller",
		email: "sarah.miller@example.com",
		password: "sarahpass321",
		balance: 7000,
		avatar: '',
		inventory: [
		]
	},
	{
		id: 8,
		login: "ChrisWilson",
		email: "chris.wilson@example.com",
		password: "wilson123",
		balance: 8000,
		avatar: '',
		inventory: [
		]
	},
	{
		id: 9,
		login: "EvaJohnson",
		email: "eva.johnson@example.com",
		password: "evapass567",
		balance: 9000,
		avatar: '',
		inventory: [
		]
	},
	{
		id: 10,
		login: "RobertLee",
		email: "robert.lee@example.com",
		password: "lee321pass",
		balance: 10000,
		avatar: '',
		inventory: [
		]
	},
	{
		id: 11,
		login: "SophiaClark",
		email: "sophia.clark@example.com",
		password: "sophia789pass",
		balance: 11000,
		avatar: '',
		inventory: [
		]
	},
]


export const gamesData = [
	{
		id: 1,
		name: "Snow Spin",
		img: require("@/assets/games/snow_spin_image.jpg"),
		category: "Spinning Wheel",
		coins: [
		]
	},
	{
		id: 2,
		name: "Black Power",
		img: require("@/assets/games/black_power_image.jpg"),
		category: "Slots",
		coins: [
		]
	},
	{
		id: 3,
		name: "Red Anger",
		img: require("@/assets/games/red_anger_image.jpg"),
		category: "Dice",
		coins: [
		]
	},
	{
		id: 4,
		name: "Indian Magic",
		img: require("@/assets/games/indian_magic_image.jpg"),
		category: "Black Jack",
		coins: [
		]
	},
	{
		id: 5,
		name: "Golden Reels",
		img: require("@/assets/games/golden_reels_image.jpg"),
		category: "Spinning Wheel",
		coins: [
		]
	},
	{
		id: 6,
		name: "Lucky Seven",
		img: require("@/assets/games/lucky_seven_image.jpg"),
		category: "Slots",
		coins: [
		]
	},
	{
		id: 7,
		name: "Rolling Cubes",
		img: require("@/assets/games/rolling_cubes_image.jpg"),
		category: "Dice",
		coins: [
		]
	},
	{
		id: 8,
		name: "Ace Blackjack",
		img: require("@/assets/games/ace_blackjack_image.jpg"),
		category: "Black Jack",
		coins: [
		]
	},
]


export const faqQuestionsData = [
	{
		id: 1,
		question: "How do I deposit funds into my casino account?",
		answer: "To deposit funds, log in to your account, navigate to the cashier or deposit section, choose your preferred payment method, and follow the instructions provided to complete the deposit securely.",
		isOpen: true
	},
	{
		id: 2,
		question: "Are the games fair and random?",
		answer: "Absolutely. Our casino games employ certified random number generators (RNGs) to ensure fair and unbiased outcomes. These RNGs are regularly tested and audited by independent authorities to maintain fairness.",
		isOpen: false
	},
	{
		id: 3,
		question: "What withdrawal methods are available?",
		answer: "We offer various withdrawal options including bank transfers, e-wallets, and other secure methods. Simply head to the withdrawal section, select your preferred method, and follow the steps to cash out your winnings.",
		isOpen: false
	},
	{
		id: 4,
		question: "Is my personal and financial information secure?",
		answer: "Yes, your security is our priority. We utilize advanced encryption protocols and security measures to safeguard your data. Rest assured, all your personal and financial details are kept confidential and protected.",
		isOpen: false
	},
	{
		id: 5,
		question: "What bonuses and promotions are available?",
		answer: "We offer a range of bonuses and promotions for both new and existing players. From welcome bonuses to reload bonuses and free spins, keep an eye on our promotions page for the latest offers and rewards.",
		isOpen: false
	}
]

export const coinsData = [
	{
		id: 1,
		name: 'SnowBall',
		price: 500,
		img: require('@/assets/coins/snow-ball_coin.png'),
		category: 'Spinning Wheel',
		desc: 'The SnowBall coin brings luck and joy, often associated with big wins on the Spinning Wheel. Collect it to enhance your gaming experience!'
	},
	{
		id: 2,
		name: 'FairFight',
		price: 300,
		img: require('@/assets/coins/fair-fight_coin.png'),
		category: 'Black Jack',
		desc: 'The FairFight coin symbolizes fairness and strategy in Black Jack. While not a main casino coin, its use brings balance to your game.'
	},
	{
		id: 3,
		name: 'BlackFreedom',
		price: 200,
		img: require('@/assets/coins/black-freedom_coin.png'),
		category: 'Slots',
		desc: 'BlackFreedom coin is a mainstay for the Slots, granting you the freedom to explore numerous winning combinations.'
	},
	{
		id: 4,
		name: 'RedPoint',
		price: 100,
		img: require('@/assets/coins/red-point_coin-3.png'),
		category: 'Dice',
		desc: 'The RedPoint coin is a charm for high rolls in the Dice game. Use it to increase your chances of hitting big numbers!'
	},
];