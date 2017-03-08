<template lang="jade">
    .search 
        input.search-input(
            type="text",  placeholder="Search Character..." v-model="search"
        )
        .search__icon-container
            span.search__icon
</template>

 <script>
import { VueEvent } from 'vue-pagination-2'

export default {
    name: 'search-characters',
    data () {
        return {
            search: ''
        }
    },
    watch: {
            search: function (q) {
                this.$root.search = q;
                VueEvent.$emit('vue-pagination::characters', 1 )
            }
        }
    ,
}
</script>

<style lang="stylus">
.search
    display flex
    flex-flow row nowrap
    align-items center
    width calc(50% - 30px)

.search-input
    height 50px
    outline none
    border 0px
    padding 15px
    width 100%
    border-radius 3px

.search__icon
    width 40px
    height 40px
    position absolute
    right 10px
    top 10px
    background url('/static/icons/search.png') no-repeat !important

.search__icon-container
    position relative
    height 100%
</style>