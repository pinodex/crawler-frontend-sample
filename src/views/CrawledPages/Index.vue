<template>
  <div class="section">
    <div class="container">
      <template
        v-if="isLoading"
      >
        <Page :showElements="false" />
        <Page :showElements="false" />
        <Page :showElements="false" />
      </template>

      <template
        v-else-if="pages.length > 0"
      >
        <transition-group name="fade">
          <Page
            v-for="(page) in pages"
            v-bind="page"
            :showElements="false"
            :to="{
              name: 'crawledPage',
              params: {
                id: page.id
              }
            }"
            :key="page.id"
          />
        </transition-group>
      </template>

      <template v-else>
        <div class="empty-pages content has-text-centered">
          <p class="is-size-2">
            No crawled pages yet.
          </p>

          <p>
            Create a new page to crawl <router-link :to="{ name: 'index' }">here</router-link>.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Page.vue';
import pageService from '@/services/page';

export default {
  components: {
    Page,
  },

  data: () => ({
    isLoading: true,
    pages: [],
  }),

  async mounted() {
    const pages = await pageService.all();

    this.pages = pages.filter(({ status }) => status !== 'failed');

    this.isLoading = false;
  },
};
</script>

<style lang="sass" scoped>
@import bulma/sass/utilities/_all

.empty-pages
  +desktop
    margin: 5rem 0
</style>
