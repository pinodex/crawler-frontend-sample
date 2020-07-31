<template>
  <form @submit.prevent="submit">
    <h1 class="title">Enter a page URL:</h1>

    <div class="field is-grouped">
      <p class="control is-expanded">
        <input
          class="input is-large"
          type="text"
          placeholder="https://www.example.com"
          v-model="url"
          :disabled="isLoading"
        />
      </p>

      <p class="control">
        <button
          type="submit"
          class="button is-primary is-large"
          :class="{
            'is-loading': isLoading
          }"
          :disabled="!isValid"
        >
          Crawl
        </button>
      </p>
    </div>

    <p
      v-for="(error, i) in errors"
      class="help is-danger"
      :key="i"
      v-text="error"
    />
  </form>
</template>

<script>
import Joi from '@hapi/joi';

const formSchema = Joi.object({
  url: Joi
    .string()
    .uri()
    .required(),
});

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: () => false,
    },
  },

  data: () => ({
    url: null,
    isValid: false,
    errors: [],
  }),

  watch: {
    async url(url) {
      this.errors.length = 0;
      this.isValid = false;

      if (this.url.length === 0) {
        return;
      }

      try {
        await formSchema.validateAsync({ url });

        this.isValid = true;
      } catch (error) {
        this.errors.push(error.message);
      }
    },
  },

  methods: {
    submit() {
      this.$emit('submit', {
        url: this.url,
      });
    },

    reset() {
      this.url = null;
      this.isValid = null;
      this.errors.length = 0;
    },
  },
};
</script>
