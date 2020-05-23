<template>
    <section>
        <!-- <navbar-section /> -->
        <div id="nav">
            <router-link v-for="(link, index) in navLinks" :key="index" :to="link.path">{{ link.name }}</router-link>
        </div>
        <router-view />
    </section>
</template>

<script>
import routes from '@/router/routes'
export default {
    computed: {
        navLinks: function() {
            return routes
        }
    }
}
</script>

<style lang="scss" scoped>
#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;
        margin: 0 10px;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
