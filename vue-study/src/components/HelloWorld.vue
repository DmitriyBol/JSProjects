<template>
  <div class="main-container">
    <h1>This is my sample for test that tech</h1>
    <Todolist />
  </div>
</template>

<script>
import Todolist from "./TodoList/Todolist";
export default {
  name: 'HelloWorld',
  components: { Todolist },
}
</script>

<style scoped lang="scss">

.main-container {
  margin: 0 auto;
  padding: 20px;
  width: 900px;
  height: 500px;
  border: 1px solid #42b983;
}

a {
  color: #42b983;
}
</style>
