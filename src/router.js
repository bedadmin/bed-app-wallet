import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

VueRouter.prototype.goBack = function() {
    this.isBack = true
    window.history.go(-1)
}

const router = new VueRouter({
	// mode: 'history',
	routes: [
		{
			path: '/guide',
			name: 'guide',
			component: (resolve) => require(['./pages/guide/index.vue'], resolve)
		},
		{
			path: '/',
			redirect: '/main-index/wallet'
		},
		// Create Wallet
		{
			path: '/create-index',
			name: 'create-index',
			component: (resolve) => require(['./pages/create/index.vue'], resolve)
		},
		{
			path: '/create-create',
			name: 'create-create',
			component: (resolve) => require(['./pages/create/create.vue'], resolve)
		},
		{
			path: '/create-packup',
			name: 'create-packup',
			component: (resolve) => require(['./pages/create/packup.vue'], resolve)
		},
		{
			path: '/create-mnemonic',
			name: 'create-mnemonic',
			component: (resolve) => require(['./pages/create/mnemonic.vue'], resolve)
		},
		// Import Wallet
		{
			path: '/import-index',
			name: 'import-index',
			component: (resolve) => require(['./pages/import/index.vue'], resolve)
		},
		// Home
		{
			path: '/main-index',
			name: 'main-index',
			component: (resolve) => require(['./pages/main/index.vue'], resolve),
			children: [
				{
					path: '/main-index/wallet',
					name: 'main-wallet',
					component: (resolve) => require(['./pages/wallet/index.vue'], resolve)
				},
				{
					path: '/main-index/news',
					name: 'main-news',
					component: (resolve) => require(['./pages/news/index.vue'], resolve),
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/main-index/mine',
					name: 'main-mine',
					component: (resolve) => require(['./pages/mine/index.vue'], resolve)
				}
			]
		},
		{
			path: '/qr',
			name: 'qr',
			component: (resolve) => require(['./components/qr-scanner.vue'], resolve)
		},
		// Wallet
		{
			path: '/wallet-index',
			name: 'wallet-index',
			component: (resolve) => require(['./pages/wallet/index.vue'], resolve)
		},
		{
			path: '/wallet-send',
			name: 'wallet-send',
			component: (resolve) => require(['./pages/wallet/send.vue'], resolve)
		},
		{
			path: '/wallet-receive',
			name: 'wallet-receive',
			component: (resolve) => require(['./pages/wallet/receive.vue'], resolve)
		},
		{
			path: '/wallet-add',
			name: 'wallet-add',
			component: (resolve) => require(['./pages/wallet/add.vue'], resolve)
		},
		{
			path: '/wallet-coin-history',
			name: 'wallet-coin-history',
			component: (resolve) => require(['./pages/wallet/coin-history.vue'], resolve)
		},
		// News
		{
			path: '/news-index',
			name: 'news-index',
			component: (resolve) => require(['./pages/news/index.vue'], resolve)
		},
		{
			path: '/news-items',
			name: 'news-items',
			component: (resolve) => require(['./pages/news/items.vue'], resolve)
		},
		{
			path: '/news-detail',
			name: 'news-detail',
			component: (resolve) => require(['./pages/news/detail.vue'], resolve)
		},
		// Mine
		{
			path: '/mine-index',
			name: 'mine-index',
			component: (resolve) => require(['./pages/mine/index.vue'], resolve)
		},
		{
			path: '/mine-tx-hisInfo',
			name: 'mine-tx-hisInfo',
			component: (resolve) => require(['./pages/mine/tx-hisInfo.vue'], resolve)
		},
		{
			path: '/mine-addrs',
			name: 'mine-addrs',
			component: (resolve) => require(['./pages/mine/addrs.vue'], resolve)
		},
		{
			path: '/mine-addrInfo',
			name: 'mine-addrInfo',
			component: (resolve) => require(['./pages/mine/addrInfo.vue'], resolve)
		},
		{
			path: '/mine-manage',
			name: 'mine-manage',
			component: (resolve) => require(['./pages/mine/manage.vue'], resolve)
		},
		{
			path: '/mine-manageInfo',
			name: 'mine-manageInfo',
			component: (resolve) => require(['./pages/mine/manageInfo.vue'], resolve)
		},
		{
			path: '/mine-set',
			name: 'mine-set',
			component: (resolve) => require(['./pages/mine/set.vue'], resolve)
		},
		{
			path: '/mine-help',
			name: 'mine-help',
			component: (resolve) => require(['./pages/mine/help.vue'], resolve)
		},
		{
			path: '/mine-about',
			name: 'mine-about',
			component: (resolve) => require(['./pages/mine/about.vue'], resolve)
		},
		// Node
		{
			path: '/vote-index',
			name: 'vote-index',
			component: (resolve) => require(['./pages/vote/index.vue'], resolve)
		},
		{
			path: '/vote-register',
			name: 'vote-register',
			component: (resolve) => require(['./pages/vote/register.vue'], resolve)
		},
		{
			path: '/vote-votes',
			name: 'vote-votes',
			component: (resolve) => require(['./pages/vote/votes.vue'], resolve)
		},
		{
			path: '/vote-voters',
			name: 'vote-voters',
			component: (resolve) => require(['./pages/vote/voters.vue'], resolve)
		},
		{
			path: '/vote-vote',
			name: 'vote-vote',
			component: (resolve) => require(['./pages/vote/vote.vue'], resolve)
		},
		{
			path: '/vote-votecancel',
			name: 'vote-votecancel',
			component: (resolve) => require(['./pages/vote/votecancel.vue'], resolve)
		},
		// Register
		{
			path: '/register-index',
			name: 'register-index',
			component: (resolve) => require(['./pages/register/index.vue'], resolve)
		}
	]
});

// router.afterEach((to, from) => {
// 	if (store.state.isplusReady) {
// 		if (to.path == "/main-index/wallet" || to.path == '/main-index/mine') {
// 			plus.navigator.setStatusBarStyle('light');
// 			plus.navigator.setStatusBarBackground('#317DC0');
// 		} else if (to.path == "/qr") {
// 			plus.navigator.setStatusBarStyle('light');
// 			plus.navigator.setStatusBarBackground('#1D1D1D');
// 		} else {
// 			plus.navigator.setStatusBarStyle("dark");
// 			plus.navigator.setStatusBarBackground("#FFFFFF");
// 		}
// 	}
// })

export default router;