<template lang="jade">
    header
        .logo
            img.logo-img(
                src="/static/img/MarvelLogo.png"
            )
        search-characters
        .menu
</template>

<script>
    import searchCharacters from './Search.vue'
    export default {
        name: 'header',
        components: { searchCharacters }
    }
</script>

<style lang="stylus">
header
    display flex
    width: 100%
    z-index 3
    box-shadow 0px 1px 4px 0px #6f5e5e
    height 70px
    background-color #2d2727
    flex-flow row nowrap
    justify-content space-between
    padding 5px 0px 5px 10px
    align-items strentch
    position relative

.logo
    width 160px

.logo-img
   width 160px
   height 60px

.menu
    width calc(20% - 160px)

</style>
