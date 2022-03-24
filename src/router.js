import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Checker from '../components/Checker'
import Help from '../components/home/footer/Help'


import * as constants from "./constants"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: constants.HOME_NAME,
            component: Home
        },
        {
            path: constants.HOME_ROUTE,
            name: constants.HOME_NAME,
            component: Home
        },
        {
            path: constants.CHECKER_ROUTE,
            name: constants.CHECKER_NAME,
            component: Checker
        },
        {
            path: constants.HELP_ROUTE,
            name: constants.HELP_NAME,
            component: Help
        }        
    ]
})