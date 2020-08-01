<template>
  <div class="card">
    <div class="card-content">
      <div class="field">
        <p
          class="title is-4"
          v-if="title"
          v-text="title"
        />

        <b-skeleton
          height="1.5rem"
          width="50%"
          :active="!title"
        />
      </div>

      <div class="field">
        <p
          class="title is-6"
          v-if="url"
        >
          <a :href="url" target="_blank">
            {{ url }}
          </a>
        </p>

        <b-skeleton
          height="1rem"
          width="50%"
          :active="!url"
        />
      </div>

      <template v-if="showElements">
        <hr />

        <b-skeleton
          :active="showElementsSkeleton"
        />

        <div
          class="columns"
          v-for="({ tagName, innerText, href }, i) in filteredElements"
          :key="i"
        >
          <div class="column is-1">
            <span class="tag is-dark">
              {{ tagName }}
            </span>
          </div>

          <div class="column page-value">
            <p v-if="tagName === 'A'">
              <a :href="href" target="_blank">
                {{ href }}
              </a>
            </p>

            <p v-if="tagName !== 'A'">{{ innerText }}</p>
          </div>
        </div>

        <div v-if="status === 'finished' && filteredElements.length === 0">
          <p>Cannot find any matching elements.</p>
        </div>
      </template>

      <div
        class="field"
        v-if="to"
      >
        <router-link
          class="button is-small has-text-weight-semibold"
          :to="to"
        >
          Open crawled page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => null,
    },

    url: {
      type: String,
      default: () => null,
    },

    elements: {
      type: Array,
      default: () => [],
    },

    status: {
      type: String,
      default: () => null,
    },

    to: {
      type: Object,
      default: () => null,
    },

    showElements: {
      type: Boolean,
      default: () => true,
    },
  },

  computed: {
    filteredElements() {
      return this.elements.filter(({ href, innerText }) => href && innerText);
    },

    showElementsSkeleton() {
      return this.status === null || ['pending', 'processing'].includes(this.status);
    },
  },
};
</script>

<style lang="sass" scoped>
.page-value
  overflow-wrap: anywhere
</style>
