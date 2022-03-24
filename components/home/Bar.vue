<template>
    <div>
        <v-app-bar
          app
          absolute
          :src="require('../../assets/home_bar_background_img_black.jpg')"
          
        >
         <v-spacer></v-spacer>
        
        <v-menu >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-earth</v-icon><span></span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              link
              v-for="(lang, i) in langs"
              :key="`lang${i}`"
              :value="lang" 
            >
              <v-list-item-title @click="updateLocale(lang)">{{ lang }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <template v-slot:extension>
            <v-tabs fixed-tabs color="orange">
                <v-tab class="white--text" to="home"><v-icon left class="white--text">mdi-home</v-icon>{{ $t("message.home") }}</v-tab>
                <v-tab class="white--text" to="checker"><v-icon left class="white--text">mdi-text-search </v-icon>{{ $t("message.checkSource") }}</v-tab>
            </v-tabs>
        </template>
        </v-app-bar>
    </div>
</template>

<script>

export default {
  name: 'Bar',
  data: () => ({
    langs: [ 'fr', 'en'],
    currentLanguage: null,
  }),
  methods: {
    updateLocale(val){
      this.$i18n.locale = val.toString();
    }
  }
};
</script>