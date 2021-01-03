<template>
  <section class="friends p-d-flex p-jc-between">
    <div class="friends__list">
      <h2 class="p-mb-2">Friends</h2>
      <div class="friends__search p-mb-3" style="text-align: left">
        <span class="p-input-icon-left" style="width: 100%">
          <i class="pi pi-search" />
          <InputText
            type="text"
            v-model="search"
            placeholder="Search"
            class="p-inputtext-sm"
            style="width: 100%"
          />
        </span>
      </div>
      <ul class="friends__items">
        <UserItem />
      </ul>
    </div>
  </section>
</template>

<script lang='ts'>
import UserItem from "../components/UserItem.vue";

import InputText from "primevue/inputtext";

import { defineComponent } from "vue";
export default defineComponent({
  components: { InputText, UserItem },
});
</script>

<style scoped lang='scss'>
.friends {
  height: 100%;

  &__list {
    width: 300px;
    @include block_mixin;
  }
}
</style>