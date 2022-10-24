import App from './App'
import Vue from 'vue'
import {
	request,
	setip
} from 'request.js'
import uView from "uview-ui";
Vue.use(uView);
Vue.prototype.$request = request
Vue.prototype.$setip = setip
Vue.prototype.$url = "http://124.93.196.45:10001"
// Vue.prototype.$url = localStorage.url 
Vue.prototype.$toast = title => {
	uni.showToast({
		title: title,
		icon: 'none'
	})
}
Vue.config.productionTip = false
// #ifndef VUE3
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
