<template>
  <div class="create-folder-popup-wrapper">

    <div class="create-folder-popup-background"
         @click="$emit('popupClosed')"></div>

    <div class="create-folder-popup">
      <h1>Create new folder</h1>

      <input type="text"
             placeholder="name"
             @keydown.enter="applyFolderName"
             @input="updateModelValue">

      <button @click="applyFolderName">Apply</button>
    </div>
  </div>

</template>

<script setup>
const emit = defineEmits([
  'popupClosed',
  'folderNameApplied',
  'update:modelValue'
])

const applyFolderName = () => emit('folderNameApplied')
const updateModelValue = event => emit('update:modelValue', event.target.value)
</script>

<style scoped>
.create-folder-popup-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.create-folder-popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.3);
}

.create-folder-popup {
  padding:2rem;
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: 400px;
  width: 900px;
  background: white;
  flex-wrap: wrap;
  border: 1px solid blue;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.create-folder-popup h1 {
  width: 100%;
}
.create-folder-popup input {
  width: 60%;
}
.create-folder-popup button {
  width: 60%;
}

</style>
