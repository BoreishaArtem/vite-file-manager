<template>
  <div class="main-container" @keypress.esc="selectionEnabled ? selectionEnabled = false : ''">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div class="container">

      <create-folder-popup @popupClosed="showPopup = false"
                           @folderNameApplied="createNewFolder"
                           v-model="folderNameModel"
                           v-if="showPopup" />

      <ActionButtons :buttons="actionButtons" />

      <div class="folders">
        <div class="back-to-parent" @dblclick="backToParent">
          <span>Back</span>
        </div>

        <div class="folders-item"
             v-for="(folder, idx) in currentFolder.children"
             @dblclick="openFolder(folder)"
             :key="Math.random() * idx">
          <div class="folder-inline" v-if="folder.type === 'folder'"></div>
          <span>{{ folder.data }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  reactive,
  Tree,
  Node,
  ActionButtons,
  CreateFolderPopup,
} from './imports/app.imports'
/* Data */
const showPopup = ref(false)
const selectionEnabled = ref(false)
const selectedFolders = ref([])
const folderNameModel = ref('')
const foldersTree = ref(null)
const currentFolder = ref(null)
const actionButtons = ref([
  {
    title: 'New Folder',
    actionType: 'click',
    cb: openCreateFolderPopup
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

const fillFoldersTree = () => {
  const mainNode = new Node('', false, [], 'root', 0)
  foldersTree.value = new Tree(mainNode)
  currentFolder.value = foldersTree.value.root
}

function openCreateFolderPopup() {
  showPopup.value = true
}

const backToParent = () => {
  if (currentFolder.value.id !== 0) {
    const { parent, id } = currentFolder.value
    const { id: rootID } = foldersTree.value.root
  }
}

const openFolder = fl => {
  currentFolder.value = fl
}

const createNewFolder = () => {
  const parent = currentFolder.value
  const node = new Node(folderNameModel.value, parent.id, [], 'folder', parent.id + 1)
  parent.children.push(node)
  showPopup.value = false
}

onBeforeMount(() => {
  fillFoldersTree()
})

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

.back-to-parent {
  width: 90px;
  height: 100px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  opacity: 0.9;
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
