<template>
  <section class="friends p-d-flex p-jc-between">
    <div class="empty" v-if="isLoading">
      <Spinner height="100%" />
    </div>
    <template v-else>
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
          <UserItem v-for="friend in friends" :key="friend.id" :item="friend" />
        </ul>
      </div>
    </template>
  </section>
</template>

<script lang='ts'>
import Spinner from "../components/Spinner.vue";
import UserItem from "../components/UserItem.vue";

import InputText from "primevue/inputtext";

import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "@/composition-api/useStore";
import { AllActionTypes } from "@/store/types/actions.types";
export default defineComponent({
  components: { InputText, UserItem, Spinner },
  setup() {
    const store = useStore();

    const search = ref("");
    const isLoading = ref(true);
    const friends = computed(() => store.getters.friends);

    onMounted(async () => {
      await store.dispatch(AllActionTypes.GET_FRIENDS);
      isLoading.value = false;
    });

    return { search, isLoading, friends };
  },
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