<template lang="jade">
    #app
        #home(
            :class="{ 'modal-open': showModal }"
        )
            header-component        
            section.main
                list-characters(
                    ref="characters"
                )
                list-favourites(
                    ref="comics"
                )
            footer-component
        #modal
            modal-custom( 
                v-if="showModal"
                @close="showModal = false"
            )
               .comic__pic-contaier( 
                    slot="img"
                )
                    img.comic__pic(
                        :src="(comic !== undefined  ? ((comic.thumbnail !== undefined) ? comic.thumbnail.path + '.' + comic.thumbnail.extension : '/' ) : '/' )"
                    )
                .comic__content-modal( 
                    slot="body"
                )
                    h3.comic__title(
                        :title="comic.title"
                    ) {{ comic.title }}
                    p.comic__description {{ comic.description ? comic.description : 'No description...' }}
                .comic__content-footer( 
                    slot="footer"
                )   
                    .favourites__add
                      .modal__container-icon
                           span.add__favourites-icon_default
                        h5.button-text( 
                            @click="addComic(comic)"
                        ) ADDED TO FAVOURITES
                    .comic__buy 
                        .modal__container-icon
                           span.buy__comic-icon_default                       
                        h5.button-text BUY FOR $3.99
        spinner(
            v-if="showLoading"
        )    
</template>

<script>
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import headerComponent from '../components/Header.vue'
    import footerComponent from '../components/Footer.vue'
    import Spinner from '../components/Spinner.vue'
    import listCharacters from '../components/ListCharacters.vue'
    import listFavourites from '../components/ListFavourites.vue'
    import modalCustom from '../components/Modal.vue'

    export default {
        name: 'home',
        data () {
            return{
                showModal: false,
                showLoading: false
            }
        },
        computed:
            {
                ...mapGetters(
                    {
                        comic: 'showComic' 
                    }
                )
            ,
            }
        ,
        components: 
            { 
                headerComponent,
                footerComponent,
                listCharacters,
                listFavourites,
                Spinner,
                modalCustom
            }
        ,
        methods:
            {
                addComic (comic){
                    this.$refs.comics.add(comic);    
                    this.showModal = false;
                }
            }
        ,
    }
</script>

<style lang="stylus">
#home
    position absolute
    height 100% 
    width 100%

.main
    z-index 1
    display flex
    flex-flow row nowrap
    height calc(100% - 140px)
    overflow hidden
    background-color #f5f5f5

.comic__pic-contaier
    width 200px
    height 100%

.comic__pic
    width 200px
    height 300px

.comic__title
    line-height 20px
    top -10px
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
    width 100%
    height 25px
    color #3d3332
    margin 0px !important

.comic__description
    color #928889
    padding 10px
    height 260px
    overflow hidden


.comic__content-footer
    height 60px
    align-items center
    justify-content center
    display flex
    text-align center
    flex-flow row nowrap

.comic__content-footer > div
    width 50%
    height 100%
    cursor pointer

.content-text
    margin 5px 25px 0px 50px

.favourites__add
    color #7a706f
    background-color #dcdcdc

.favourites__add:hover
    color #eb1c22
    background-color #322827

.favourites__add:hover .add__favourites-icon_default 
    background url('/static/icons/btn-favourites-primary.png') no-repeat !important

.modal__container-icon
    position relative

.add__favourites-icon_default
    background url('/static/icons/btn-favourites-default.png') no-repeat !important
    width 40px
    height 40px
    top: 10px;
    left: 25px
    position absolute

.buy__comic-icon_default
    background url('/static/icons/shopping-cart-primary.png') no-repeat !important
    width 40px
    height 40px
    top: 10px;
    left: 55px
    position absolute

.comic__buy
    color #eb1c22
    background-color #dcdcdc

.button-text
    font 900 14px/40px 'Helvetica'

.modal-open
    filter blur(3px)

a
    text-decoration none

a:hover
    text-decoration none

h3
    font 900 1.8em 'Helvetica'

h2
  font 800 2em 'Helvetica'

ul 
  list-style-type none
  padding 0px
</style>