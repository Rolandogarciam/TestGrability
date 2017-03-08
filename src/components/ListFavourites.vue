<template lang="jade">
aside.favourites
    .favourites-container
        section.favourites_header
            span.favourites__content-icon
            h2.content-text My favourites
    .fav
        ul.comics
            li.list__comic(
                v-for="comic in data"
            )
                .list__comic__content
                    .list__comic__fav
                        .list__comic__delete
                            span.bash__icon(
                               @click="deleteComic(comic)"
                            )
                        .list__comic__fav__pic-container
                            img.list__comic__fav__pic( 
                                :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                            )
                        .list__comic__title
                            h5.list__comic__text {{ comic.title }}             
</template>

 <script>
import { mapGetters, mapActions } from 'vuex';

function getRandoms(validData) {
    const max = 9;
    let amount = 3;
    let randoms = [];
    while(randoms.length < amount ){
        let num = Math.floor((Math.random() * max) + 1);
        let used = false;
        for(var i=0; i < randoms.length ;i++){
            if(randoms [i] == num){
                used = true;
                break;
            } 
        }
        if(validData[num].comics.returned > 0  && !used )
        {
            randoms.push(num);            
        }
    }
    
    return randoms; 
}
     
export default {
    name: 'favourites',
    computed: {
            data(){
                let comics = this.$store.state.comics.dataComics;
                let count = comics.length;
                if( count <= 0 && this.$parent.$refs.characters.data.length > 0 ){
                    let randoms = getRandoms(this.$parent.$refs.characters.data);
                    randoms.map((random, i)=>
                    {
                        let idCharacters = this.$parent.$refs.characters.data[random].id;
                        this.randomComics(idCharacters);   
                    });
                }
                return comics;
            }    
    },
    methods: 
        {
            ...mapActions(
                [
                    'randomComics',
                ]
            ),
            add (comic) {
                this.$store.commit('add', { comic });
            },
            deleteComic (comic) {
                this.$store.commit('delete', { comic });
            }
        }
    ,
}
</script>

<style lang="stylus">
.comics
    display flex
    flex-wrap wrap
    justify-content space-around
    width 100%
    margin auto

.favourites
    background #ddd
    height 100%
    width calc(20% + 80px)

.favourites__content-icon
    background url('/static/icons/favourites.png') no-repeat !important
    width 40px
    height 40px
    position absolute


.favourites_header
    position relative
    padding 10px 5px 5px 15px

.fav
    height calc(100% - 55px)
    padding 0px 20px
    overflow auto

.list__comic
    margin auto

.list__comic__content
    width 150px !important
    margin-top 10px
    display flex
    flex-flow column wrap
    justify-content space-between
    align-items center
    height 100%

.list__comic__fav__pic
    height 210px
    width 130px

.list__comic__delete
    position relative

.list__comic__text
    overflow hidden
    height 30px
    font 600 14px 'Helvetica'

.bash__icon
    background url('/static/icons/btn-delete.png') no-repeat !important
    width 35px
    right 0px
    cursor pointer
    top -8px
    height 35px
    position absolute
</style>