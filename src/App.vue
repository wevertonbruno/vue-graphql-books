<template>
  <div id="app" class="min-h-screen min-w-max">
    <div id="nav" class="bg-purple-600">
      <div class="container flex items-center justify-between py-6 px-12 text-white">
        <div>
          <a href="/" class="flex items-center font-bold"><img class="h-6 mr-3" src="./assets/logo.png" alt="Logo"> Books</a>
        </div>
        <nav class="flex gap-6">
          <div v-if="isAuthenticated" class="nav-item"><router-link to="/">Home</router-link> </div>
          <div v-if="isAuthenticated" class="nav-item" @click="handleLogout"><a href="">Logout</a></div>
        </nav>
      </div>
    </div>
    <transition name="slide" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
  </div>
</template>

<script>
import { isAuthenticated } from './utils'
import { onLogout } from './vue-apollo'

export default {
  computed: {
    isAuthenticated(){
      return isAuthenticated()
    }
  },
  methods: {
    async handleLogout(){
      await onLogout(this.$apollo.provider.defaultClient)
      this.$router.push('/login')
    }
  }
}
</script>

<style src="./assets/css/tailwind.css" />
<style>
  .slide-enter-active,
  .slide-leave-active{
    transition: opacity 1s, transform 1s;
  }

  .slide-enter,
  .slide-leave-to{
    opacity: 0;
    transform: translateX(-30%);
  }

</style>
