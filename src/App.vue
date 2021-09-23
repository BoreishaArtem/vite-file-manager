<template>
  <div class="main-container" @keydown.esc="keyEvent" tabindex="0">
    <img alt="Vue logo" src="./assets/logo.png"/>

    <div class="container">

      <delete-prompt :folderName="folderToDelete"
                     @promptSelected="deleteFolder"
                     v-if="showDeletePrompt"
                     @close="closeDeletionPrompt" />

      <create-folder-popup @popupClosed="showPopup = false"
                           @folderNameApplied="createNewFolder"
                           v-model="folderNameModel"
                           v-if="showPopup"/>

      <ActionButtons :buttons="actionButtons"/>

      <h1>{{ currentFolder.path }}</h1>

      <div class="folders">

        <div class="back-to-parent folders-item"
             v-if="currentFolder.path !== ''"
             @dblclick="backToParent">
          <span>Back</span>
        </div>

        <div class="folders-item"
             v-for="(folder, idx) in currentFolder.children"
             @dblclick="openFolder(folder)"
             @mousedown="deleteFolders"
             @mouseup="deletionDisabled"
             :class="{ 'folder-selection': selectionEnabled }"
             :key="Math.random() * idx">
          <div class="folder-inline"
               @click="selectFolders(folder, idx)"
               :class="{ 'folder-selected-item': selectionEnabled && findSelectedItem(idx) }"
               v-if="folder.type === 'folder'">

            <span class="folder-inline-delete-btn"
                  v-if="foldersDeletionState"
                  @click="showFolderDeletePrompt(folder)"></span>

          </div>

          <span>{{ folder.name }}</span>

        </div>selectedFolders
      </div>
    </div>
  </div>
</template>

<script setup>

/* @TODO
* Drag & drop;
* Upload files;
* Copy & paste;
* New type of files
* Image downloads
*  */

import {
  ref,
  Node,
  Tree,
  reactive,
  onBeforeMount,
  DeletePrompt,
  ActionButtons,
  CreateFolderPopup,
} from './imports/app.imports'

/* Data */
const folderNameModel = ref('')
const deleteFnLink = ref(null)
const showPopup = ref(false)
const selectionEnabled = ref(false)
const showDeletePrompt = ref(false)
const foldersDeletionState = ref(false)
const foldersTree = ref(null)
const currentFolder = ref(null)
const folderToDelete = ref(null)
const valuesCopiedStatus = ref(null)

const selectedFolders = ref([])
const copiedFoldersArray = ref([])
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
      if (currentFolder.value.children.length > 0) {
        selectionEnabled.value = !selectionEnabled.value
        if (!selectionEnabled.value) selectedFolders.value = []
      }
    }
  },
  {
    title: 'Copy',
    actionType: 'click',
    cb: () => {
      if (selectedFolders.value.length > 0) {
        valuesCopiedStatus.value = true
        copiedFoldersArray.value = selectedFolders.value
      }
    }
  },
  {
    title: 'Paste',
    actionType: 'click',
    cb: () => {
      if (selectedFolders.value.length > 0 && valuesCopiedStatus.value) {
        const uniqueValues = copiedFoldersArray.value.filter(fl => {
          return !currentFolder.value.children.includes(fl)
        })
        if (uniqueValues) currentFolder.value.children.push(uniqueValues)
      }
    }
  },
])

const setUpFoldersTree = () => {
  const mainNode = new Node('', '', [], 0, 'folder')
  foldersTree.value = new Tree(mainNode)
  currentFolder.value = foldersTree.value.root
}

const findSelectedItem = (idx) => {
  const updatedIdx = idx + 1
  return !!selectedFolders.value.find(i => i.id === updatedIdx)
}

function openCreateFolderPopup() {
  showPopup.value = true
}

const deleteFolders = () => {
  const timeoutMs = 700
    deleteFnLink.value = setTimeout(() => {
      foldersDeletionState.value = !!!foldersDeletionState.value
    }, timeoutMs)
}

const deletionDisabled = () => {
  clearTimeout(deleteFnLink.value)
}

const keyEvent = event => {
  if (foldersDeletionState.value || selectionEnabled.value) {
    foldersDeletionState.value = false
    selectionEnabled.value = false
  }
}

const closeDeletionPrompt = () => {
  showDeletePrompt.value = false
  foldersDeletionState.value = false
}

const deleteFolder = val => {
  if (val) {
    currentFolder.value.children =
        currentFolder
        .value
        .children
        .filter(child => child.name !== folderToDelete.value)
  }
  closeDeletionPrompt()
}

const backToParent = () => {
  const currentPath = currentFolder.value.path
  const name = currentFolder.value.name + 1
  const path = currentPath.substring(0, currentPath.length - name.length)
  recursiveSearch(foldersTree.value.root, path)
}

const selectFolders = (fl, idx) => {
  const currentIdx = idx + 1
  const findFolder = selectedFolders.value.find(i => i.id === currentIdx)

  if (!findFolder) {
    selectedFolders.value.push(fl)
  } else {
    selectedFolders.value = selectedFolders.value.filter(i => i.id !== findFolder.id)
  }
}

const recursiveSearch = (root, path) => {
  if (root.path === path) {
    currentFolder.value = root
  }
  root.children.forEach(child => {
    child.path === path ? currentFolder.value = child : recursiveSearch(child, path)
  })
}

const showFolderDeletePrompt = fl => {
  folderToDelete.value = fl.name
  showDeletePrompt.value = true
}

const openFolder = fl => {
  currentFolder.value = fl
  selectionEnabled.value = false
}

const createNewFolder = () => {
  const childrenId = currentFolder.value.children.length + 1
  const folderPath = `${currentFolder.value.path}/${folderNameModel.value}`
  const newFolder = new Node(folderPath, folderNameModel.value, [], childrenId, 'folder')
  currentFolder.value.children.push(newFolder)
  showPopup.value = false
}

onBeforeMount(() => {
  setUpFoldersTree()
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
  outline: none;
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
  color: white;
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

.folder-selection {
  box-shadow: 0 0 10px rgba(0,0,0,.4);
}

.folder-selected-item {
  box-shadow: 0 0 20px rgba(0,0,255,.8);
}


.folders-item {
  position: relative;
  margin-top: 5rem;
  transition: all .3s ease-in-out;
  color: black;
  border-radius: 10px;
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
  position: relative;
  width: 90px;
  height: 100px;
  background: linear-gradient(to bottom left, rgba(255, 255, 0, 0.2), rgba(255, 0, 255, 0.5));
  border-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  opacity: 0.9;
}

.folder-inline-delete-btn {
  position: absolute;
  left: 0;
  top: 0;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all .25s ease-in-out;
  background: linear-gradient(red, purple);
}

.folder-inline-delete-btn:hover {
  background: red;
}

.folder-inline-delete-btn::after {
  content: 'x';
  position: absolute;
  color: white;
  left: 50%;
  font-size: .6rem;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.file {
  width: 90px;
  height: 100px;
  background: linear-gradient(to bottom left, rgba(0, 0, 255, 0.2), rgba(0, 0, 255, 0.5));
  border-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  opacity: 0.9;
  position: relative;
}

.folder-inline:hover {
  opacity: 1;
  background: rgba(255, 0, 255, 0.5);
}

.file:hover {
  opacity: 1;
  background: rgba(0, 0, 255, 0.5);
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
