<template>
    <label for="maxCP" class="max-cp">
        <input type="checkbox" id="maxCP" />
        <small>
            Maximum Combat Points: {{ searchValue }}
        </small>
    </label>
    <input type="text" class="input" placeholder="Pokemon or type" v-on:input="search" v-model="searchValue"/>
    <div class="loader"></div>
    <ul class="suggestions">
        <li v-for="pokemon in searchResults" v-bind:key="pokemon.number">
            <img
                v-bind:src="pokemon.img"
                v-bind:alt="pokemon.name"
            />
            <div class="info">
                <h1><span class="hl"></span>
                    {{pokemon.Name}}
                    </h1>
                <span v-for="type in pokemon.Types" v-bind:class="'type ' + type.toLowerCase()" v-bind:key="type">{{type}}</span>
            </div>
        </li>
        <li>
            <img
                src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
                alt="No results"
            />
            <div class="info">
                <h1 class="no-results">
                    No results
                </h1>
            </div>
        </li>
    </ul>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const URL_PATH =
    'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

export default {
    
    data: () => ({
        searchValue: 'aa',
        searchResults: []
        }),
    methods: {
        async search() {
            await fetch(URL_PATH)
            .then(response => response.json())
            .then(data => { 
              const newSearchResults = data.filter((pokemon) => {
                    const matchValue = new RegExp("\\w*"+this.searchValue+"\\w*");
                    return pokemon.Name.match(matchValue)

                    })
                
                    if (newSearchResults.length > 4) {
                    newSearchResults.length = 4;
                    }
                    this.searchResults = newSearchResults;
            })
            },
            // match (name) {
            //     const stringToMatch = new RegExp("\\w*("+this.searchValue+")\\w*");
            //     // const matches = name.match(stringToMatch);
                
            //     }
    }
};
</script>
