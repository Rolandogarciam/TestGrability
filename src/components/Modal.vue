<template lang="jade">
transition( 
    name="modal"
)
    .modal-mask
        .modal-wrapper
            .modal-container

                .modal-header
                    a(
                      @click="$emit('close')"
                    ) 
                        span.close__icon
                    slot(
                        name="header"
                    )
                        

                .modal-body
                    slot( 
                         name="img"
                    )
                    .modal__containter-info
                        slot( 
                             name="body"
                        )

                .modal-footer
                    slot(
                        name="footer"
                    )      
</template>

<script>
    export default {
        name: 'modal'
    }
</script>

<style lang="stylus">
.modal-mask 
    position fixed
    z-index 9998
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .5)
    display flex
    justify-content center
    align-items center
    flex-flow column nowrap
    transition opacity .3s ease

.modal-container 
    width 650px
    height 410px
    background-color #fff
    box-shadow 0 2px 8px rgba(0, 0, 0, .33)
    transition all .3s ease
    font-family Helvetica, Arial, sans-serif

.modal-container > div
    border 0px 

.modal-header
    height 40px
    padding 5px 0px
    position relative

.modal-header h3 
    margin-top 0
    color #42b983

.modal-body
    display flex
    flex-flow row nowrap
    height 310px
    padding 0px 20px

.modal__containter-info
    padding 0px 20px
    width calc( 100% - 240px)
    height 100%

.close__icon
    cursor pointer
    background url('/static/icons/btn-close.png') no-repeat !important
    width 30px
    right 10px
    height 30px
    position absolute


.modal-footer
    padding 0px
.modal-enter 
  opacity 0

.modal-leave-active
  opacity 0

.modal-enter .modal-container,
.modal-leave-active .modal-container 
  -webkit-transform scale(1.1);
  transform scale(1.1)

</style>