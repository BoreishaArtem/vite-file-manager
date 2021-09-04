<script setup>
import { ref, computed } from 'vue'

const data = ref([
  {
    id: 0,
    title: 'Item A',
    list: 1
  },
  {
    id: 1,
    title: 'Item B',
    list: 1
  },
  {
    id: 2,
    title: 'Item C',
    list: 2
  },
])

const filterList = (arr, idx) => arr.filter(listItem => listItem.list === idx)

const listOne = computed(() => filterList(data.value, 1))
const listTwo = computed(() => filterList(data.value, 2))

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemID', item.id)
}
const onDrop = (evt, list) => {
  const itemID = evt.dataTransfer.getData('itemID')
  const item = data.value.find(item => Number(item.id) === Number(itemID))
  item.list = list
}
</script>

<template>
</template>

<style>
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
</style>
