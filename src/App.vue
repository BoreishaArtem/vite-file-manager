<template>
  <div class="main-container" @keypress.esc="selectionEnabled ? selectionEnabled = false : ''">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="container">
      <create-folder-popup
          @popupClosed="showPopup = false"
          @folderNameApplied="createNewFolder"
          v-model="folderNameModel"
          v-if="showPopup"
      />
      <ul class="actions-list">
        <li><button @click="showPopup = true">New Folder</button></li>
        <li><button>Upload files</button></li>
        <li><button>Cut</button></li>
        <li><button @click="selectionEnabled = !selectionEnabled">Select</button></li>
        <li><button>Copy</button></li>
        <li><button>Paste</button></li>
        <li><button @click="deleteFolders">Delete</button></li>
      </ul>

      <div class="folders">
        <div class="folders-item"
             v-for="(folder, idx) in foldersTree"
             :key="Math.random() * idx"
             @click="selectFolder(folder.root)"
             :class="[
                folder.root.type === 'folder' ? 'folder' : 'file',
                selectionEnabled ? 'selection' : ''
             ]"
        >
          <div class="folder-inline" v-if="folder.root.type === 'folder'"></div>
          <span>{{ getFoldersData(folder).data[0] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CreateFolderPopup from './components/CreateFolderPopup.vue'
import foldersData from './folders.json'
import {ref, onBeforeMount, reactive} from 'vue'
import Tree from './Tree'
const showPopup = ref(false)
const selectionEnabled = ref(false)
const selectedFolders = ref([])
const folderNameModel = ref('')
const foldersTree = ref([])

const fillFoldersTree = arr => {
  arr.forEach(item => {
    foldersTree.value.push(new Tree(item))
  })
}

const selectFolder = fl => {
  if (selectionEnabled.value) {
    selectedFolders.value.push(fl.id)
  } else {
    selectedFolders.value = []
  }
}

const deleteFolders = () => {
  if (selectionEnabled.value) {
    let arr = []
    selectedFolders.value.forEach(fl => {
      const item = foldersTree.value.find(item => item["root"].id !== fl)
      if (item) {
        arr.push(item)
      }
    })
    foldersTree.value = arr
  }
}

const createNewFolder = () => {
  showPopup.value = false
  const newFolder = new Tree({ data: [folderNameModel.value],
    parent: null,
    children: null,
    type: 'folder',
    id: foldersTree.value.length + 1 })
  foldersTree.value.push(newFolder)
}

const getFoldersData = fl =>  {
  const { data, parent, children, type, id } = fl["root"]
  return {
    data,
    parent,
    children,
    type,
    id
  }
}

onBeforeMount(() => {
  fillFoldersTree(foldersData)
})

// const tree = new Tree({ data: [1,2,3], parent: 1, children: 2, type: 'folder', id: 1 })
</script>

<style>
body {
  font-family: "Arial Narrow", sans-serif;
  color: black;
  font-size: 1rem;
  font-weight: 600;
}

.main-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5rem;
  width: 100%;
}

.container .actions-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-right: 5rem;
  list-style: none;
  padding: 0;
}

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

.list-item {
  width: 93%;
  border: 1px solid black;
  padding: 1rem;
  margin-bottom: 2rem;
  cursor: grab;
}

.left {
  height: 100%;
  width: 40%;
  margin-right: 2rem;
  min-height: 10rem;
  border: 1px solid black;
}
.right {
  height: 100%;
  width: 40%;
  border: 1px solid black;
  min-height: 10rem;
}
.drop {
  width: 100%;
  height: 20rem;
  border: 1px solid black;
}

.folders {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  flex-wrap: wrap;
  width: 100%;
  min-height: 8rem;
}
.selection {
  box-shadow: -10px 10px 10px rgba(255, 255, 0, 0.3);
}

.selected {
  box-shadow: -10px 10px 10px rgba(0, 0, 255, 0.3);
}

.folders-item {
  position: relative;
  margin-top: 5rem;
  transition: all .3s ease-in-out;
  color: black;
  margin-right: 5rem;
}
.folders-item > span {
  display: inline-block;
  position: absolute;
  top: 100%;
  margin-top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}


.folder-inline {
  width: 90px;
  height: 100px;
  background: linear-gradient(to bottom left, rgba(255,255,0,0.2), rgba(255,0, 255,0.5));
  border-radius: 0.5rem;
  clip-path: polygon(0% 0%, 90% 0, 90% 70%, 100% 70%, 100% 100%, 50% 100%, 0 100%);
  transition: 0.2s ease-in-out;
  opacity: 0.9;
}

.file {
  width: 90px;
  height: 100px;
  background: linear-gradient(to bottom left, rgba(0,0,255,0.2), rgba(0,0, 255,0.5));
  border-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  opacity: 0.9;
  position: relative;
}

.folder-inline:hover {
  opacity: 1;
  background: rgba(255,0, 255,0.5);
}

.file:hover {
  opacity: 1;
  background: rgba(0,0, 255,0.5);
}
.file::before, .file::after {
  content: "";
  position: absolute;
  width: 50%;
  height: 2px;
  background: white;
}
.file::before {
  top: 40%;
  transform: translateX(-50%);
}
.file::after {
  top: 60%;
  transform: translateX(-50%);
}
</style>
