<template>
  <aside class="sidebar">
    <div class="sidebar__profile" v-if="userData">
      <div class="sidebar__profile-avatar">
        <el-avatar :src="userData.avatar" v-if="userData.avatar"/>
        <el-avatar icon="el-icon-user-solid" v-else></el-avatar>
      </div>
      <div class="sidebar__profile-name">{{ userData.username }}</div>
    </div>
    <ul>
      <li v-for="item in sidebarItems" :key="item.title">
        <router-link :to="{name:item.linkName}  "
                     :class="{active:$route.name===item.title ||
                      $route.meta.parent===item.title}"
        >
          <component
            :is="item.title"
            class="icon"
          ></component
          >
          <span>{{ item.title }}</span></router-link
        >
      </li>
    </ul>
    <div class="sidebar__bottom">
      <Logout/>
      <button>logout</button>
    </div>
  </aside>
</template>

<script lang="ts">
import {
  Chats,
  Home,
  Logout,
  Notifications,
  Settings,
  User,
  Voices,
} from "@/components/icons";
import {useAuthStore} from "@/store/auth/useAuthStore";
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "Sidebar",
  components: {Home, Voices, Notifications, Settings, Logout, User, Chats},
  setup() {
    const auth = useAuthStore();
    const userData = computed(() => auth.userData);
    const sidebarItems = [
      {title: "Home", linkName: "Home"},
      {title: "Chats", linkName: "Chats"},
      {title: "Voices", linkName: "Voices"},
      {title: "Settings", linkName: "Settings"},
    ];

    return {
      userData,
      sidebarItems,
    };
  },
});
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 230px;
  box-shadow: $box_shadow;
  background: #fff;

  &__profile {
    margin: 81px auto 0;

    &-avatar {
      width: 86px;
      height: 86px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      position: relative;

      img {
        width: 100%;

        height: 100%;
      }

      svg {
        max-width: 50px;
        fill: $color_gray2;
      }
    }

    &-name {
      margin: 10px 0 0;
      font-size: 18px;
      font-weight: 500;
    }
  }

  ul {
    margin: 75px 0 0;

    li {
      padding: 0 0 0 38px;
      margin: 0 0 40px;
      position: relative;

      &.active {
        &::after {
          content: "";
          position: absolute;
          top: -8px;
          left: 0;
          box-shadow: 1px 0px 10px rgba(42, 139, 242, 0.45),
          0px 0px 10px rgba(42, 139, 242, 0.55),
          4px 0px 25px rgba(42, 139, 242, 0.75);
          border-radius: 3px;
          background: $color_blue;
          width: 3px;
          height: 40px;
        }

        span {
          color: $color_blue;
          transition: $transition;
        }

        svg {
          fill: $color_blue;
        }
      }

      &:hover {
        span {
          color: $color_blue;
          transition: $transition;
        }

        svg {
          fill: $color_blue;
        }
      }

      a {
        display: flex;
        align-items: center;
      }

      svg {
        margin: 0 17px 0 0;
        max-width: 24px;
      }

      span {
        font-size: 16px;
        line-height: 19px;
        color: $color_gray;
        text-transform: uppercase;
        font-weight: 600;
        transition: $transition;
      }
    }
  }

  &__bottom {
    padding: 0 0 0 38px;
    width: fit-content;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 30px;

    &:hover {
      svg {
        fill: $color_blue !important;
      }

      button {
        color: $color_blue;
        transition: $transition;
      }
    }

    cursor: pointer;

    svg {
      margin: 0 17px 0 0;
    }

    button {
      font-size: 16px;
      line-height: 19px;
      color: $color_gray;
      text-transform: uppercase;
      font-weight: 600;
      border: none;
      background: none;
      outline: none;
      cursor: pointer;
      transition: $transition;
    }
  }
}

.active {
  &::after {
    content: "";
    position: absolute;
    top: -8px;
    left: 0;
    box-shadow: 1px 0px 10px rgba(42, 139, 242, 0.45),
    0px 0px 10px rgba(42, 139, 242, 0.55),
    4px 0px 25px rgba(42, 139, 242, 0.75);
    border-radius: 3px;
    background: $color_blue;
    width: 3px;
    height: 40px;
  }

  span {
    color: $color_blue !important;
    transition: $transition;
  }

  svg {
    fill: $color_blue;
  }
}
</style>
