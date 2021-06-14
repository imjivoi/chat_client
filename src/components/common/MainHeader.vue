<template>
  <header class="header">
    <div class="wrapper">
      <div class="header__content">
        <div class="user">
          <router-link :to="{ name: 'Home' }">
            <Avatar :image="userData.avatar" :nickname="userData.username" :size="40" />
            <div class="user__name">{{ userData.username }}</div>
          </router-link>
        </div>
        <div class="settings">
          <Settings @click="$router.push({ name: 'Settings' })" />
          <Logout @click="logout()" />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Settings, Logout } from '@/components/icons';
import Avatar from '@/components/ui/Avatar.vue';

import { useUserStore } from '@/store';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'MainHeader',
  components: { Avatar, Settings, Logout },
  setup() {
    const auth = useUserStore();
    const userData = computed(() => auth.userData);
    function logout() {
      auth.logout();
    }
    return {
      userData,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
.header {
  &__content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 60px;
}

.user {
  margin: 0 60px 0 0;
  cursor: pointer;
  &__name {
    margin: 0 0 0 10px;
    font-size: 20px;
    font-weight: 600;
  }

  a {
    display: flex;
    align-items: center;
  }
}

.settings {
  display: flex;
  align-items: center;

  :deep() svg {
    width: 60px;
    height: 27px;
    cursor: pointer;
    &:hover {
      fill: $primary;
    }
  }
}
</style>
