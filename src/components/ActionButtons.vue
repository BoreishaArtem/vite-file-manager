<template>
  <ul class="actions-list">
    <li v-for="(button, idx) in actionButtons"
        :key="Math.random() + idx">
      <button @[button.actionType]="button.cb">{{ button.title }}</button>
    </li>
  </ul>
</template>

<script setup>
import {ref} from "../imports/app.imports";
const actionButtons = ref([
  {
    title: 'New Folder',
    actionType: 'click',
    cb: () => {
      console.log('Create new folder')
    }
  },
  {
    title: 'Upload files',
    actionType: 'click',
    cb: () => {
      console.log('Files to upload')
    }
  },
  {
    title: 'Cut',
    actionType: 'click',
    cb: () => {
      console.log('Files to cut')
    }
  },
  {
    title: 'Select',
    actionType: 'click',
    cb: () => {
      console.log('Files to select')
    }
  },
  {
    title: 'Copy',
    actionType: 'click',
    cb: () => {
      console.log('Files to copy')
    }
  },
  {
    title: 'Paste',
    actionType: 'click',
    cb: () => {
      console.log('Files to paste')
    }
  },
  {
    title: 'Delete',
    actionType: 'click',
    cb: () => {
      console.log('Delete folders')
    }
  },
])
</script>

<style scoped>
.container .actions-list li button {
  margin-right: 2rem;
  cursor: pointer;
  width: 100%;
  font-size: 1.1rem;
  padding: .5rem 1rem;
  border-radius: 4px;
  background: linear-gradient(to left, rgba(0,255, 0, .1), rgba(0,0,255, .2));
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
  transition: all 2s ease-in-out;
}

.container .actions-list li input {
  margin-right: 2rem;
  cursor: pointer;
  width: 100%;
  padding: .5rem 2rem;
  border-radius: 4px;
  background: linear-gradient(to left, rgba(0,255, 0, .1), rgba(0,0,255, .2));
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
  transition: all 2s ease-in-out;
}

.container .actions-list li:hover {
  transition: all 2s ease-in-out;
  background: linear-gradient(to right, rgba(0,255, 0, .1), rgba(0,0,255, .2));
}
</style>