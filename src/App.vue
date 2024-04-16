<script setup>
</script>

<template>
  <header>
    <ul class="flex gap-8 justify-center items-center h-[35px]">
      <li><router-link class="p-2 hover:text-slate-300 duration-300" to="/vue-task-desktop-blockchain">Home</router-link></li>
      <li><router-link class="p-2 hover:text-slate-300 duration-300" to="/vue-task-desktop-blockchain/section1">Deskop</router-link></li>
      <li><router-link class="p-2 hover:text-slate-300 duration-300" to="/vue-task-desktop-blockchain/section2">Blockchain</router-link></li>
    </ul>
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
</style>
