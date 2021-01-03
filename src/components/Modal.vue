<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>


<style scoped>
.modal {
  position: absolute;
  right: 0;
  z-index: 1000;
  padding: 5px 10px;
  max-width: 250px;
  max-height: 400px;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #b8b8b8;
}
</style>