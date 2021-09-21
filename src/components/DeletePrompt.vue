<template>
  <div class="delete-prompt-popup-background" @click="$emit('close')"></div>
  <div class="delete-prompt" tabindex="0" @keypress.enter="selectPrompt(true)">
    <p>Are you shure that you want to delete {{ folderName }} - folder?</p>
    <div class="buttons">
      <button @click="selectPrompt(true)">Yes</button>
      <button @click="selectPrompt(false)">No</button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['promptSelected', 'close'])
const props = defineProps({
  folderName: {
    required: true,
    type: String,
  },
})
const selectPrompt = val => {
  emits('promptSelected', val)
  emits('close')
}
</script>

<style scoped>
.delete-prompt-popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.3);
}
.delete-prompt {
  padding:2rem;
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: 200px;
  width: 400px;
  background: white;
  flex-wrap: wrap;
  border: 1px solid blue;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.buttons {
  width: 100%;
}
button {
  outline: none;
  width: 9rem;
  margin: 0 1rem;
  cursor: pointer;
}
</style>