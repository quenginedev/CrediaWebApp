<template>
    <transition name="slide-fade" mode="out-in" appear>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </transition>
</template>

<script>
    export default {
        name: "Auth",
    }
</script>

<style scoped>

</style>