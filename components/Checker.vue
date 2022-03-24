<template>
  <div>
    <Bar />
    <br />
    <br />
    <v-main>
      <v-container>
        <v-row id="form-row" align="center" justify="center">
          <v-col>
            <v-form>
              <v-text-field
                id="entry-field"
                v-model="entry.url"
                counter="255"
                :label="$t('message.entry')"
                required
                :disabled="isSubmitting"
                @keydown="onEntryFieldKeyDown()"
                outlined
                :rules="entryRules"
              ></v-text-field>
            </v-form>
            <v-row justify="center">
              <v-btn
                :disabled="!hasValidUrl()"
                color="success"
                class="mr-4"
                @click="checkEntry()"
                :loading="isSubmitting"
                v-if="checkerResult === null"
              >
                {{ $t('message.check') }}
              </v-btn>
            </v-row>
            <br />
            <v-row v-if="checkerResult === true" justify="center" style="margin-bottom: 1px">
              <v-icon color="success">mdi-check-outline</v-icon>
              <span style="margin-left: 5px; color: #4caf50">{{ $t('message.reliability') }} : {{ truthfulnessPercentage }} %</span>
            </v-row>
            <v-row v-if="checkerResult === `medium`" justify="center" style="margin-bottom: 1px">
              <v-icon color="warning">mdi-close-outline</v-icon>
              <span style="margin-left: 5px; color: #fb8c00">{{ $t('message.reliability') }} : {{ truthfulnessPercentage }} %</span>
            </v-row>
            <v-row v-if="checkerResult === false" justify="center" style="margin-bottom: 1px">
              <v-icon color="error">mdi-close-outline</v-icon>
              <span style="margin-left: 5px; color: #ff5252">{{ $t('message.reliability') }} : {{ truthfulnessPercentage }} %</span>
            </v-row>
          </v-col>
        </v-row>
        <div @click="showSnackbar = false">
          <v-snackbar :timeout="4000" v-model="showSnackbar" color="error">
            {{ snackbarMessage }}
          </v-snackbar>
        </div>
        <Suggestion/>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import * as constants from "../src/constants";
import * as config from "../config";
import Bar from "./home/Bar.vue";
import Footer from "./home/Footer.vue";
import Suggestion from "./Suggestion.vue"
import axios from "axios";

let globalInstance = null  // Used only in "entryRules" data member (do not use elsewhere !)

export default {
  name: constants.CHECKER_NAME,
  components: {
    Bar,
    Footer,
    Suggestion
  },
  mounted: function() {
    globalInstance = this
  },
  data: () => ({
    entry: {
      url: "",
    },
    isSubmitting: false,
    checkerResult: null,
    showSnackbar: false,
    snackbarMessage: null,
    entryRules: [
      (value) => {
        /**
         * Return true if the currently typed URL is valid, else return false.
         * Defined here as methods cannot be called from data in the current Vue.js version.
         * @param url provided URL to check
         * @returns {boolean}
         */
        const isValidUrl = (url) => {
          if(url === undefined || url === null || url === false || url === "" || url.replaceAll(" ", "") === "")
            return false
          const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
          const matches = url.match(urlRegex)
          if(matches === null)
            return false
          else{
            return matches[0] === url
          }
        };
        return isValidUrl(value) || globalInstance.$t('message.invalidUrl');
      },
    ],
    truthfulnessPercentage: null,
  }),
  methods: {
    /**
     * Send a request to the API checker endpoint and display an icon indicating
     * whether the entry was labeled as truthful or not.
     */
    checkEntry() {
      this.isSubmitting = true;
      const that = this;
      axios
        .post(`${config.API_BASE_URL}/checker`, JSON.stringify(that.entry), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.message !== "ok")
            that.displaySnackbar(
              that.$t('message.urlParsingError')
            );
          else {
            that.truthfulnessPercentage = res.data.content * 100 // Pourcentage renvoye en decimal
            that.checkerResult = that.setCheckerResultFromTruthfulnessPercentage()
            that.isSubmitting = false;
          }
        })
        .catch((err) => {
          that.isSubmitting = false;
          if (that.hasReceivedServerErrorResponse(err))
            that.displaySnackbar(err.response.data.message);
          else that.displaySnackbar(that.$t('message.serverRequestError'));
        });
    },
    /**
     * Entry field keydown event listener implementation.
     * Reset the checker result to null.
     */
    onEntryFieldKeyDown() {
      this.checkerResult = null;
    },
    /**
     * Display a snack bar with the provided error message.
     * @param errorMessage Error message to display
     */
    displaySnackbar(errorMessage) {
      this.snackbarMessage = errorMessage;
      this.showSnackbar = true;
    },
    /**
     * Return true if the currently typed URL is valid, else return false.
     * @returns {boolean}
     */
    hasValidUrl() {
      if(this.entry.url === undefined || this.entry.url === null || this.entry.url === false || this.entry.url === "" || this.entry.url.replaceAll(" ", "") === "")
        return false
      const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      const matches = this.entry.url.match(urlRegex)
      if(matches === null)
        return false
      else{
        return matches[0] === this.entry.url
      }
    },
    /**
     * Return true if the error contains a response, else return false.
     * @param err received error
     * @returns {boolean}
     */
    hasReceivedServerErrorResponse(err) {
      return (
        err.response !== undefined &&
        err.response !== null &&
        err.response !== false
      );
    },
    setCheckerResultFromTruthfulnessPercentage(){
    if(this.truthfulnessPercentage / 100 >= constants.TRUTHFULNESS_PERCENTAGE_THRESHOLD)
      return true
    else if(this.truthfulnessPercentage / 100 > constants.WRONGFULNESS_PERCENTAGE_THRESHOLD)
      return `medium`
    else
      return false
  }
  },
};
</script>