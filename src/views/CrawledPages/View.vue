<template>
  <div class="section">
    <div class="container">
      <div
        v-if="page"
        class="pages"
      >
        <transition name="fade">
          <Page
            v-bind="page"
          />
        </transition>
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
    page: null,
  }),

  async mounted() {
    const { id } = this.$route.params;

    try {
      const page = await pageService.get(id);

      this.page = page;
    } catch (err) {
      this.$router.push({
        name: 'crawledPages',
      });
    }
  },
};
</script>
