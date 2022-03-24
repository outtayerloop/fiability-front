<template>
    <v-container v-if="trendsLoaded">
    <v-row><v-col></v-col></v-row>
    <v-row><v-col></v-col></v-row>
    <h1 class="title">{{ $t("message.trends") }}</h1>
        <v-row class="text-center">
            <v-col cols="2"></v-col>
            <v-col
                cols="8"
            >
                <v-carousel
                    cycle
                    hide-delimiter-background
                    show-arrows-on-hover
                >
                    <v-carousel-item
                        v-for="(item,i) in articlesByTopics"
                        :key="i"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                    >
                       <v-card
                        class="mx-auto"
                        max-width="100%"
                        :color="colors[i]"
                        outlined
                    >
                        <v-card-title class="white--text text-h4">{{item.topic}}</v-card-title>

                        <v-divider class="mx-4"></v-divider>

                         <v-list-item-group
                        >
                            <v-list-item two-line
                                v-for="(article,j) in item.articles"
                                :key="j"
                            >
                                <v-list-item-content>
                                    <v-list-item-title class="text-left" v-text="article.title"></v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                        </v-list-item-group>            
                    </v-card>
                  </v-carousel-item>
                </v-carousel>
            </v-col>        
        </v-row>
    </v-container>
</template>


<script>
import axios from "axios";
import * as config from "../../config";
import { mapState } from 'vuex';

  export default {
    name:'Trends',
    data () {
      return {
        colors:[
          'red lighten-1',
          'pink darken-2',
          'warning',
          'deep-purple accent-4',
        ],
        politicCardItems: [
          {src: require('../../assets/politics_background_card.jpg'),title: this.$t('message.politics')},        
          {src: require('../../assets/health_background_card.jpg'),title: this.$t('message.health')},                  
          {src: require('../../assets/sciences_background_card.jpg'),title: this.$t('message.sciences')},                   
          {src: require('../../assets/environment_background_card.jpg'),title: this.$t('message.environment')},       
        ],
        articlesByTopics: [],
        fakeNewsList: [
                    {singleFakeNews: 'Fake news 1'},
                    {singleFakeNews: 'Fake news 2'},
                    {singleFakeNews: 'Fake news 3'},
                    {singleFakeNews: 'Fake news 4'},
                      
        ]
      }
    },
    mounted(){
     
      console.log(this);
      this.getTrends();
    },
    watch:{
        topicsFilter(new_val, old_val){
            console.log("hey");
            this.getTrends();
        }
    },
    computed: {
        ...mapState({
            topicsTrends: 'topicsTrends',
            trendsLoaded: 'trendsLoaded',
            topicsFilter: 'topicsFilter'
        }),
    },
    methods:{
        getTopics(){
            const that = this
            axios.get(`${config.API_BASE_URL}/topics`)
                .then(res => {
                    that.$store.commit("setTopicsTrends", res.content)
                    that.$store.commit("setTrendsLoadedTrue")
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getTrends(){
            const that = this;
            axios
            .get(`${config.API_BASE_URL}/entries/trends`, {
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((res) => {
            const articles = res.data.content ;
            console.log('data: ', articles);
            let topics = articles.map((article) =>{return article.topic});
            this.$store.commit("setTopicsTrends", topics);
            console.log('topics before filter: ',topics);
            console.log(this.topicsFilter);
            let filteredTopics;
            if(this.topicsFilter !== null && this.topicsFilter !== 'null')
                filteredTopics = topics.filter((topic) => { return this.topicsFilter.includes(topic)});
            else
                filteredTopics = topics;

            console.log("all topics:", filteredTopics);
            const mostOccurentTopics = that.getFourMostOccurentTopic(filteredTopics);
            const articlesByTopics = this.getFourLastArticleByTopic(mostOccurentTopics, articles);
            that.articlesByTopics = articlesByTopics;
            console.log("4 topics: ", mostOccurentTopics);
            
            console.log("articleByTopics: ", articlesByTopics);

                if(articlesByTopics.length > 0)
                this.$store.commit("setTrendsLoadedTrue");
            })
            .catch((err) => {
            console.log(err);
            });
           
        },
        getFourLastArticleByTopic(topics, articles){
            let resultat = [];
            for(var topic of topics){
                console.log(topic);
                let topicArticles = {
                    topic: topic,
                    articles: []
                };
                let i = articles.length-1;
                while(topicArticles.articles.length < 4 && i>=0){
                    if(articles[i].topic === topic)
                        topicArticles.articles.push(articles[i]);
                    i--;
                }
                resultat.push(topicArticles);
            }
            
            return resultat;
        },

        getFourMostOccurentTopic(arr){
            let fourMostOccurent= [];

            for(let i=0; i<4 ; i++){
                while(arr.length > 0){
                    let mustOccurent = this.getMostOccurentElInArray(arr); 
                    fourMostOccurent.push(mustOccurent);
                    arr = this.removeElFromArray(arr, mustOccurent);
                }
            }
            return fourMostOccurent;
        },
        getMostOccurentElInArray(arr){
            return  arr.sort((a,b) =>
                arr.filter(v => v===a).length
                - arr.filter(v => v===b).length
            ).pop();
        },
        removeElFromArray(arr, mustOccurent){
            return  arr.filter((el) =>{return el !== mustOccurent});
        }
    }
  }
</script>

<style scoped>
.title{
    text-align: center;
}
</style>