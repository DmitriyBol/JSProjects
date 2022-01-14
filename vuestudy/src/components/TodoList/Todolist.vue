<template>
  <div>
    <input class="todo-input" type="text" v-model="newTodoText"/>
    <button @click="add">Add new Item</button>
    <ul class="todo-list" v-if="todoArray.length">
      <Listitem
          v-for="item in todoArray"
          :key="item.id"
          :item="item"
          @remove="remove"
      />
    </ul>
  </div>
</template>

<script>
import Listitem from "./Listitem";

export default {
  name: "Todolist",
  components: {Listitem},
  data() {
    return {
      newTodoText: '',
      todoArray: [
        {
          id: Date.now(),
          text: 'Initial item'
        },
      ]
    }
  },
  methods: {
    add() {
      this.todoArray.push({
        id: Date.now(),
        text: this.newTodoText.trim()
      })
    },
    remove(idItem) {
      this.todoArray = this.todoArray.filter((item) => item.id !== idItem);
      console.log('removed... ID ', idItem)
    }
  }
}
</script>

<style scoped>
.todo-input {
  margin: 0 10px;
  padding: 5px;
}

.todo-list {
  list-style-type: none;
}
</style>