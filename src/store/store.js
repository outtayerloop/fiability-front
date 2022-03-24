// store.js

import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        topicsTrends: [], 
        trendsLoaded: false,
        topicsFilter: cookies.get('topics'),
    },
    getters:{

    },
    mutations: {
        setTopicsTrends (state, topicsTrends) {
          state.topicsTrends = topicsTrends;
        },
        setTrendsLoadedTrue (state) {
            state.trendsLoaded = true;
        },
        setTopicsFilter(state){
            state.topicsFilter =  cookies.get('topics');
        }
    }
});
export default store;