<template lang="jade">
    footer
        p.text  Grability 2017 - Todos los derechos resevados 
        .logo
            svg.grability(
               viewBox="0 0 40 40"
            )
                g(
                   fill="none",
                   fill-rule="evenodd"
                )
                    circle(
                        fill="#05ce7c",
                        cx="20",
                        cy="20",
                        r="20"
                    )
                    path(
                        d="M28.571 23.393a7.857 7.857 0 0 1-7.857 7.857v-4.584c1.579-.004 2.857-1.468 2.857-3.273h5zm-5-13.572h5v13.571h-5z", 
                        fill="#FFF"
                    )
                    circle(
                        fill="#FFF" 
                        cx="16.429", 
                        cy="28.75", 
                        r="2.5"
                    )
                    path(
                        d="M19.286 24.464a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM20 20.536a3.571 3.571 0 1 0 0-7.143 3.571 3.571 0 0 0 0 7.143zm0 6.13h.714v4.586H20z"
                        fill="#FFF"
                    )

            
</template>

<script>
    export default {
        name: 'footer'
    }
</script>

<style lang="stylus">
footer
    display flex
    width: 100%
    z-index 3
    height 70px
    background-color #2d2727
    flex-flow row nowrap
    justify-content space-between
    padding 20px
    align-items center
    position relative

.grability
    width 40px

.text
    margin 0px
    color #fff

</style>