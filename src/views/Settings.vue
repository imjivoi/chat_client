<template>
  <div class="settings">
    <div class="settings__item">
      {{ $t('Avatar') }}<Button :label="$t('Upload')" @click="onPickFile" /><input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"
      />
    </div>
    <div class="settings__item">
      {{ $t('Change language') }}
      <!-- <select name="select" v-model="currentLocale">
        <option :value="locale" v-for="locale in locales" :key="locale">{{ locale }}</option>
      </select> -->
      <Select @input="currentLocale = $event" :options="locales" />
    </div>
  </div>
</template>
<script lang="ts">
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue';

import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { useUserStore } from '@/store/auth/useUserStore';
export default defineComponent({
  name: 'Settings',
  components: { Button, Select },
  data: () => ({
    currentLocale: '',
  }),
  computed: {
    locales(): string[] {
      return this.$i18n.availableLocales;
    },
  },
  methods: {
    ...mapActions(useUserStore, ['uploadAvatar']),
    onPickFile() {
      const input = this.$refs.fileInput as HTMLInputElement;
      input.click();
    },
    async onFilePicked(event: any) {
      const files = event.target.files;
      const formData = new FormData();
      formData.append('image', files[0]);
      await this.uploadAvatar(formData);
    },
  },
  mounted() {
    this.currentLocale = this.$i18n.locale;
  },
  watch: {
    currentLocale: function() {
      this.$i18n.locale = this.currentLocale;
      localStorage.setItem('location', this.currentLocale);
    },
  },
});
</script>
<style lang="scss" scoped>
.settings {
  text-align: left;

  &__item {
    display: flex;
    align-items: center;
    margin: 0 0 25px;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
