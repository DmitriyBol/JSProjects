<template>
  <li class="todo-item">
    {{ item.text }} {{item}}
    <button @click="$emit('remove', item.id)">Delete Todo</button>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.todo-item {
  padding: 10px;
  border: 1px solid #42b983;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}
</style>