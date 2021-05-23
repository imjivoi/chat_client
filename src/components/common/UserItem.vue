<template>
  <li class="flex align-center mb-1">
    <div class="flex align-center">
      <Avatar :image="hasAvatar" class="mr-1"/>
      <div class="user__name">{{ username }}</div>
    </div>
    <span class="role" v-if="isAdmin">Admin</span>
<!--    <div class="options bg-blur transition" v-if="isRequest">-->
<!--      <el-button size="small" type="primary" plain-->
<!--                 @click="updateParticipant( true )">Accept-->
<!--      </el-button>-->
<!--      <el-button size="small">Block</el-button>-->
<!--    </div>-->
  </li>
</template>

<script lang="ts">
import Avatar from "@/components/ui/Avatar.vue"

import {defineComponent} from "vue";

export default defineComponent({
  components:{Avatar},
  props: {
    participantId: {
      type: String,
      require: true
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    isRequest: {type: Boolean, default: false}
  },
  computed: {
    hasAvatar(): string {
      return this.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    updateParticipant(accepted?: boolean, blocked?: boolean) {
      this.$emit('update', {
        accepted,
        blocked,
        participant_id: this.participantId
      })
    }
  }
});
</script>

<style scoped lang="scss">
li {
  @include list_item_mixin;
  position: relative;

  .role {
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: $color_gray;
  }

  &:hover {
    .options {
      opacity: 1;
    }

  }
}

.options {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  opacity: 0;

}

.user__name {
  font-weight: 600;
  font-size: 0.95em;
}
</style>
