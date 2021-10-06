<template>
  <div id="app" class="min-h-screen min-w-max">
    <div id="nav" class="bg-purple-600">
      <div class="container flex items-center justify-between py-6 px-12 text-white">
        <div>
          <a href="/" class="flex items-center font-bold"><img class="h-6 mr-3" src="./assets/logo.png" alt="Logo"> Books</a>
        </div>
        <div>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style src="./assets/css/tailwind.css" />
