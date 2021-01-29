<template>
<ul class="suggestions">
        <li v-for="pokemon in searchFilter" v-bind:key="pokemon.number">
            <img
                v-bind:src="pokemon.img"
                v-bind:alt="pokemon.Name"
            />
            <div class="info" >
              <h1>
              <span v-html="matchedLetters(pokemon.Name)">
               </span>
               </h1>
                <span v-for="type in pokemon.Types" v-bind:class="'type ' + type.toLowerCase()" v-bind:key="type">{{type}}</span>
            </div>
        </li>
        <li v-if="!searchFilter">
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
export default {
  name: 'SearchResults',
  props: [ 'searchResults', 'filter', 'searchValue'],
  methods: {

    // simple search and replace -- we already have access to searchValue in props
    // so once we have access to individual pokemon names (iterating in template)
    // it's just a matter of matching the searchValue to the name

    matchedLetters (name) {
      if (!name) {
        return null;
      }
      return name.replace(new RegExp(this.searchValue, 'i'), match => {
        return '<span class="hl">'+match+'</span>'
      })
      },

    // results are sorted by Name and Type in separate functions;
    // the logic here is that we want to see matches by Name first
    // and only matches by Type if we don't have sufficient name matches

    // separating by Name/Type also allows for reusability down the line 

    resultsByName () {
      const matchValue = new RegExp("\\w*"+this.searchValue.toLowerCase()+"\\w*");
        return this.searchResults.filter((pokemon) => {
          return pokemon.Name.toLowerCase().match(matchValue)
          })
    },

    resultsByType () {
      const matchValue = new RegExp("\\w*"+this.searchValue.toLowerCase()+"\\w*");
          return this.searchResults.filter((pokemon) => {
            return pokemon.Types.some(type => type.toLowerCase().match(matchValue))
            })     
        },
  },
  
  computed: {
    searchFilter () {
      // We want to see pokemon with name matches first, so we get those as a batch
      let matches = this.resultsByName();

      if (matches.length < 4) {
        // If we don't have enough results, we grab matches by type
        matches = matches.concat(this.resultsByType())
        // eliminate duplicates 
        matches = matches.filter((value, index) => matches.indexOf(value) === index)
      }

      if (matches.length === 0) {
        return null;
      }

      //optional maxCP filter
      if (this.filter) {
        matches.sort((a,b) => b.MaxCP - a.MaxCP)
              console.log('after filtered by maxcp: ', matches)
      } 

      // cuts the list down to 4
      return matches.slice(0,4)
    },
  }
}

</script>