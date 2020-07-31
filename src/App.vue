<template>
  <div>
    <Navbar class="is-fixed-top has-shadow" />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="sass">
$gap: 400px

@import bulma
@import '~buefy/dist/buefy.css'

.fade-enter-active,
.fade-leave-active
  transition: opacity .2s

.fade-enter,
.fade-leave-to
  opacity: 0
</style>
