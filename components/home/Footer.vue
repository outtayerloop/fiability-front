<template>
    <v-container>    
        <v-footer
            dark
            app            
       >
            <v-card
                flat
                tile
                width="100%"
                class="dark lighten-1 text-center"
            >
                <v-card-text>
                    <ThemeFilter/>
                    <Contact/>
                    <AboutUs/>
                    <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" class="mx-6" @click="goToHelpPage"><v-icon  left>mdi-help-circle-outline</v-icon></v-btn>
                    </template>
                    <span>{{ $t("message.help") }}</span>
                    </v-tooltip>
                </v-card-text>
                <v-divider></v-divider>
               <strong>{{ new Date().getFullYear() }} - FIAbility</strong>
            </v-card>
        </v-footer>


      </v-container>
</template>

<script>
import Contact from "./footer/ContactUs.vue";
import AboutUs from "./footer/AboutUs.vue";
import ThemeFilter from './footer/ThemeFilter.vue';

export default {
  name: 'Footer',
  components:{Contact, AboutUs, ThemeFilter},
  methods:{
   goToHelpPage(){
        this.$router.push("/help");
    }
  }
};
</script>
