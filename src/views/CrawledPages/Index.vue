<template>
  <div class="section">
    <div class="container">
      <div class="pages">
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
      </div>
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
    pages: [],
  }),

  async mounted() {
    const pages = await pageService.all();

    this.pages = pages.filter(({ status }) => status === 'finished');
  },
};
</script>
