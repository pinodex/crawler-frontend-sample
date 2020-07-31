<template>
  <div class="section">
    <div class="container">
      <CrawlForm
        class="crawl-form"
        ref="form"
        :isLoading="isFormLoading"
        @submit="onSubmit"
      />

      <transition name="fade">
        <Page
          v-if="page"
          v-bind="page"
          :to="currentPageTarget"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { SnackbarProgrammatic as Snackbar } from 'buefy';
import CrawlForm from '@/components/CrawlForm.vue';
import Page from '@/components/Page.vue';
import pageService from '@/services/page';

export default {
  components: {
    CrawlForm,
    Page,
  },

  data: () => ({
    isFormLoading: false,
    page: null,
  }),

  computed: {
    currentPageTarget() {
      if (this.page && this.page.status === 'finished') {
        return {
          name: 'crawledPage',
          params: {
            id: this.page.id,
          },
        };
      }

      return null;
    },
  },

  methods: {
    async onSubmit({ url }) {
      this.isFormLoading = true;

      this.page = { url };

      try {
        const { id } = await pageService.create(url);

        this.pollPage(id);
      } catch (err) {
        this.isFormLoading = false;

        Snackbar.open({
          message: 'Cannot crawl submitted URL',
          type: 'is-danger',
        });
      }
    },

    async loadPage(id) {
      const page = await pageService.get(id);

      this.page = page;

      return page;
    },

    async pollPage(id) {
      const { status } = await this.loadPage(id);

      if (status === 'finished') {
        this.isFormLoading = false;
        this.$refs.form.reset();

        return;
      }

      if (status === 'failed') {
        Snackbar.open({
          message: 'An error occurred while crawling URL',
          type: 'is-danger',
        });

        this.isFormLoading = false;

        return;
      }

      setTimeout(() => this.pollPage(id), 1000);
    },
  },
};
</script>

<style lang="sass" scoped>
@import bulma/sass/utilities/_all

.crawl-form
  +desktop
    margin: 5rem 0
</style>
