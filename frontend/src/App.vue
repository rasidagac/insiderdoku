<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
</script>

<template>
  <header class="bg-gray-100 py-4 h-16">
    <div class="flex items-center justify-between container mx-auto">
      <div class="flex items-center">
        <img alt="Insider logo" class="logo" src="@/assets/logo-old.png" width="64" />
        <h1 class="text-xl font-bold text-gray-700 -ml-0.5">Doku</h1>
      </div>
      <nav>
        <Button as-child variant="link">
          <RouterLink to="/">Home</RouterLink>
        </Button>
        <Button as-child variant="link">
          <RouterLink to="/leaderboard">Leaderboard</RouterLink>
        </Button>
      </nav>
    </div>
  </header>

  <main class="container mx-auto">
    <RouterView />
  </main>
</template>
