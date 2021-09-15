<template>
  <ul class="actions-list">
    <li v-for="(button, idx) in buttons"
        :key="Math.random() + idx">
      <button @[button.actionType]="button.cb">{{ button.title }}</button>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  buttons: {
    type: Array,
    required: true
  }
})
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