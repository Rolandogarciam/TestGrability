<template lang="jade">
transition(
    name="fade"
)
    .content-spinner
        .spinner
            .bounce1
            .bounce2
            .bounce3
</template>

<script>
export default {
    name: 'spinner'
}    
</script>

<style lang="stylus">
.content-spinner
    position relative
    display flex
    width 100%
    height 100%
    align-items center
    background-color rgba(0, 0, 0, 0.5)
    z-index 100

.spinner
    margin 100px auto 0
    width 70px
    text-align center

.spinner > div
    width 18px
    height 18px
    background-color #eb1c22
    border-radius 100%
    display inline-block
    -webkit-animation sk-bouncedelay 1.4s infinite ease-in-out both
    animation sk-bouncedelay 1.4s infinite ease-in-out both

.spinner .bounce1
    -webkit-animation-delay -0.32s
    animation-delay -0.32s

.spinner .bounce2
    -webkit-animation-delay -0.16s
    animation-delay -0.16s

@keyframes sk-bouncedelay
    0%, 80%, 100%
        -webkit-transform scale(0)
        transform scale(0)
    40%
        -webkit-transform scale(1.0)
        transform scale(1.0)
</style>