<template>
  <div class="settings">
    <div class="settings__item">Avatar<Button :label="$t('Upload avatar')" /></div>
    <div class="settings__item">
      Change language
      <select name="select" v-model="currentLocale">
        <option :value="locale" v-for="locale in locales" :key="locale">{{ locale }}</option>
      </select>
    </div>
  </div>
</template>
<script>
import Button from '@/components/ui/Button';
export default {
  components: { Button },
  data: () => ({
    currentLocale: '',
  }),
  computed: {
    locales() {
      return this.$i18n.availableLocales;
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
};
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
