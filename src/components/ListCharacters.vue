<template lang="jade">
    section.characters
        .characters__header
            .tittle-header
                span.characters__header-tittle-icon
                h2.content-text Characters
            
            .dropdown.sort-by
                button.btn.btn-custom.dropdown-toggle(
                    type="button",
                    data-toggle="dropdown"
                ) Sort by
                span.caret
                ul.dropdown-menu
                    a(
                        @click="orderByName(!orderBy)"
                    ) Name
        .characters__content
            ul.cards(
                v-if="records > 0"
            )
                li.card(
                    v-for="(character, index) in data"
                ) 
                    .card__character
                        .card__character__header
                            .card__character__pic-container
                                img.card__character__pic( 
                                    :src="character.thumbnail.path + '.' + character.thumbnail.extension"
                                )
                        .card__character__content
                            .card__character__content-tittle
                                h3.card__character__content-name( :title="character.name" ) {{ character.name }}
                            .card__character__content-description
                                p.card__character__content-text {{ character.description ? character.description : 'No description...'}}
                            .card__character__content-detail
                                .btn.btn-marvel VIEW MORE             
                        .card__character__footer(
                            :class="{ hide: character.comics.returned <= 0 }"
                        )
                            h4 Related comics
                            .related__comics
                                ul.comics__content 
                                    a.comic__content(
                                        v-for="comic in character.comics.items.slice(0, 4)"
                                        @click="showComic(comic)",
                                    ) {{ comic.name }}
            .no-result(
                v-if="records <= 0"
            )
                p No results were found. 
                                    
        .characters__footer
            pagination(
                :class="{ hide: records <= 10}",
                for="characters", 
                ref="characters",
                :records="records",
                :per-page="perPage",
                :chunk="chunk" 
            )
</template>

<script>
    import Vue from 'vue'
    import { mapGetters, mapActions } from 'vuex'
    import {VuePagination, VueEvent} from 'vue-pagination-2'

    Vue.use(VuePagination)

    export default {
        data () {
                return {
                    perPage: 10,
                    chunk: 5,
                    orderBy: false,
                };
            }
        ,
        computed: 
            {
                ...mapGetters
                (
                    {
                        records: 'records',
                        data: 'dataCharacters'
                    }
                )
            }
        ,
        beforeMount () 
            {
                this.$parent.showLoading = true;
                this.fetchCharacters().done(() => this.$parent.showLoading = false)
            }
        ,
        mounted (){
            let vm = this;
            VueEvent.$on('vue-pagination::characters', function(page) {
                document.querySelector('.characters__content').scrollTop = 0;
                        if (vm.$root.search !== undefined && vm.$root.search !== ''){
                            return vm.searchCharacters({ data: vm.$root.search, page: page, orderBy: vm.orderBy});
                        } else {
                            return vm.fetchCharactersOrder({ page: page, orderBy: vm.orderBy});
                        }
                     }
                );
            }
        ,
        methods: 
            {
                ...mapActions
                (   
                    [
                        'fetchCharacters',
                        'fetchCharactersOrder',
                        'searchCharacters',
                        'findComic'
                    ]
                ),
                orderByName (order) {
                    this.orderBy = order;
                    this.$refs.characters.setPage(1);
                },
                showComic (comic){
                    this.$parent.showLoading = true;
                    this.findComic(JSON.parse(JSON.stringify(comic.resourceURI)))
                    .then(() => {
                        this.$parent.showModal = true;
                    })
                    .done(()=>{
                      this.$parent.showLoading = false;  
                    });
                }
            }
        ,
    }
</script>

<style lang="stylus">

.characters
    display flex
    flex-flow column nowrap
    height 100%
    width calc(80% - 80px)

.characters__header
    padding 10px 20px 10px 10px
    display flex
    justify-content space-between

.tittle-header
    position relative

.characters__header-tittle-icon
    background url('/static/icons/characters.png') no-repeat !important
    width 40px
    height 40px
    position absolute

.characters__content
    flex-grow 2
    height calc(100% - 43px)
    overflow auto

.cards
    display flex
    flex-wrap wrap

.card
    cursor pointer
    position relative
    margin 20px 20px 20px 40px
    box-shadow 0px 1px 0px #ddd
    width 400px
    height 310px
    background-color #fff

.card:hover .card__character__content-name
    color #eb1c22

.card:hover .card__character__pic
    box-shadow 2px 5px 5px  2px #ddd

.card__character
    width 100%
    height 100%
    display flex
    flex-flow row wrap

.card__character__header
    position relative
    width 175px
    height 50%

.card__character__pic-container
    width 175px
    height 175px
    top -20px
    left -20px
    position relative

.card__character__pic
    width 175px
    height 175px
    border-radius 50%
    box-shadow 1px 3px 3px #ddd


.card__character__header-tittle
    position absolute
    width calc(100% - 150px)
    left 175px
    top -23px
    text-align center

.card__character__content
    width calc(100% - 175px)
    height 50%


.card__character__content-tittle
    color #473d3c
    position relative
    width 100%
    height 25px
    top -20px

.card__character__content-name
    line-height 20px
    top -10px
    position absolute
    text-overflow ellipsis
    overflow  hidden
    white-space nowrap
    width 100%
    height 25px

.card__character__content-description
    color #928889
    font-size 12px
    padding-right 10px
    height 100px
    width 100%
    overflow hidden

.card__character__content-detail
    margin-top 5px
    

.no-result
    margin auto
    padding 20% 0px
    height 100% 
    text-align center

.card__character__footer
    padding 10px
    width 100%
    height 50%

.VuePagination
    height 53px
    text-align center

.VuePagination__pagination-item.page-item.active > a
    background-color #fff
    color #000 !important
    box-shadow 0px 1px 1px 1px #ddd
    border 1px solid transparent


.VuePagination__pagination-item > a
    width 40px
    height 40px
    font 600 16px/26px 'Arial' !important
    box-shadow 1px 2px 3px 2px #ddd
    border 1px solid transparent !important
    color #a7a7a7 !important

.VuePagination__pagination-item > a:hover
    background-color #f2f2f2 !important
    color #000 !important

.page-link
    margin 0px 10px

.VuePagination__count, hide
    display none !important

.VuePagination__pagination 
    margin 5px 0px 0px

.dropdown
    height 36px
    width 200px
    border-radius 0px

.dropdown > .caret
    position absolute
    top 15px
    right 5px


.dropdown > .dropdown-menu
    height 0px
    width 200px
    padding 0px
    margin 0px
    border 0px

.dropdown > .dropdown-menu > a
    box-shadow 1px 2px 3px 2px #ddd
    display block
    border 0px
    border-radius 0px
    width 200px !important
    height 35px
    background #fff
    cursor pointer
    padding 6px 12px
    font 600 14px/20px 'Arial' !important
    color #a7a7a7 !important

.btn-custom
    width 200px
    height 35px
    border-radius 0px
    text-align left
    background #fff
    font 600 14px/5px 'Arial' !important
    box-shadow 1px 2px 3px 2px #ddd
    border 1px solid transparent !important
    color #a7a7a7 !important

.btn-custom:hover, .dropdown > .dropdown-menu > a:hover
    color #000 !important

.btn-marvel
    background #eb1c22
    font-weight 600
    border-radius 0px
    color #fff

h4
    color #7a706f
    font 600 1.4em 'Helvetica'
    margin-top 0px
    margin-bottom 15px

.related__comics
    width 100%
    height calc(100% - 43px)

.comics__content
    display flex
    flex-flow row wrap
    width 100%
    height 100%

.comic__content
    font-size 12px
    margin-left 10px
    width 45%
    height 45%
    color #928889
    overflow hidden


.comic__content:hover
    color #eb1c22

</style>