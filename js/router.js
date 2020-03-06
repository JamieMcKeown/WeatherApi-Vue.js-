import Home from './pages/Home'
// import Display from './pages/Display'


export default new VueRouter({
    routes: [
        { path: '/', redirect: "/Home" },
        { path: '/Home', component: Home },
    ]
})