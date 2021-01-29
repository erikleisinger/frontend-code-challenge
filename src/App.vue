<template>
      <label for="maxCP" class="max-cp" >
        <input type="checkbox" id="maxCP" v-model="maxCPFilter"/>
        <small>
            Maximum Combat Points:
        </small>
    </label>
    <input type="text" class="input" placeholder="Pokemon or type" v-on:input="search" v-model="searchValue"/>
    <div class="loader" v-if="loading"></div>  
    <SearchResults v-if="searchValue" v-bind:searchValue="searchValue" v-bind:searchResults="searchResults" v-bind:filter="maxCPFilter"/>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const URL_PATH =
    'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

import SearchResults from './SearchResults';

export default {
    name: 'App',
    components: {
        SearchResults
    },
    data: () => ({
        searchResults: [],
        maxCPFilter: false,
        searchValue: '',
        loading: false
        }),
    methods: {
        search: async function () {
            this.loading = true;
            await fetch(URL_PATH)
            .then(response => response.json())
            .then(data => { 
                this.loading = false;
                this.searchResults = data;
            })
        }
    }
};
</script>
