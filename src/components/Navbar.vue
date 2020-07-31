<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          <p class="has-text-weight-bold">
            Page Crawler
          </p>
        </div>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link
            v-for="({ routeName, text }, i) in items"
            class="navbar-item"
            :key="i"
            :to="{ name: routeName }"
            :class="{
              'is-active': activeRouteItem === i
            }"
            v-text="text"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
const items = [
  {
    routeName: 'index',
    text: 'Home',
  },
  {
    routeName: 'crawledPages',
    text: 'Crawled Pages',
  },
];

export default {
  computed: {
    items: () => items,

    activeRouteItem() {
      const { name } = this.$route;

      return this.items.findIndex(({ routeName }) => routeName === name);
    },
  },
};
</script>
