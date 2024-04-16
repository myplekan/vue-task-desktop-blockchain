<script setup>
import { ref } from "vue";
import desktopItems from "../desktopItems";

const data = ref(desktopItems);

let step = ref(10);
let lastId = ref(0);
let priority = ref(0);
let deleted = ref(null);

const handleClick = (id) => {
  if (id >= 0 && id < data.value.length) {
    if (data.value[id].active) {
      data.value[id].active = false;
    } else {
      data.value.forEach((item, index) => {
        item.active = index === id;
      });
      lastId.value = id;
    }
  } else {
    lastId.value = 0;
  }
};

const updatePriority = () => {
  if (lastId.value >= 0 && lastId.value < data.value.length) {
    data.value[lastId.value].priority = priority.value;
  }
};

const handleDelete = (id) => {
  const deletedItems = data.value.filter((elem) => elem.id === id);
  if (deletedItems.length > 0) {
    data.value = data.value.filter((elem) => elem.id !== id);
    lastId.value = 0;
    deleted.value = deletedItems[0];
  }
};

const returnDeleted = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  deleted.value.positionX = viewportWidth / 2 - deleted.value.elementWidth / 2;
  deleted.value.positionY =
    (viewportHeight - 200) / 2 - (deleted.value.elementHeight + 30) / 2;

  data.value = [...data.value, deleted.value];
  deleted.value = null;
};
</script>

<template>
  <h1 class="font-bold text-2xl text-center mb-5">Desktop</h1>
  <div class="top flex flex-col items-center justify-between h-[152px] pb-[30px]">
    <div class="top-input">
      <label>Step: <input class="border-2 rounded-lg border-slate-300" type="number" v-model.number="step" /></label>
      <label
        >Priority:
        <input class="border-2 rounded-lg border-slate-300" type="number" v-model.number="priority" @change="updatePriority"
      /></label>
    </div>

    <div class="top-input">
      <button @click="() => (data[lastId].positionX -= step)">-</button>
      Position X: {{ data[lastId].positionX }}
      <button @click="() => (data[lastId].positionX += step)">+</button>

      <button @click="() => (data[lastId].positionY -= step)">-</button>
      Position Y: {{ data[lastId].positionY }}
      <button @click="() => (data[lastId].positionY += step)">+</button>

      <button @click="() => (data[lastId].elementWidth -= step)">-</button>
      Width: {{ data[lastId].elementWidth }}
      <button @click="() => (data[lastId].elementWidth += step)">+</button>

      <button @click="() => (data[lastId].elementHeight -= step)">-</button>
      Height: {{ data[lastId].elementHeight }}
      <button @click="() => (data[lastId].elementHeight += step)">+</button>
    </div>

    <button class="button" @click="returnDeleted">Return deleted item</button>
  </div>

  <div class="desktop">
    <div
      class="desktop-card card"
      v-for="card of data"
      :key="card.id"
      :style="{
        left: card.positionX + 'px',
        top: card.positionY + 'px',
        width: card.elementWidth + 'px',
        'z-index': card.priority,
      }"
      @click="handleClick(card.id)"
    >
      <h3 class="card-title" :class="{ 'is-active': card.active }">
        {{ card.title }}
        <div class="card-delete" @click="handleDelete(card.id)">x</div>
      </h3>

      <div
        class="card-content"
        :style="{ height: data[0].elementHeight + 'px' }"
      >
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-input {
  display: flex;
  gap: 10px;
  outline: none;
}

.top-input input {
  width: 70px;
  padding: 5px 10px;
  outline: none;
}

.button,
.top-input button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(203 213 225);
  border-radius: 4px;
  transition: background-color 300ms ease;
  cursor: pointer;
}

.button {
  padding: 5px 10px;
}

.top-input button:hover,
button:hover {
  background-color: #2d9643;
}

.top-input button {
  width: 24px;
  height: 24px;
}

.desktop {
  position: relative;
  height: calc(100vh - 240px);
}

.card {
  position: absolute;
  background-color: white;
  border: 1px solid rgb(203 213 225);
  text-align: center;
}

.card-title {
  position: relative;
  height: 30px;
  border-bottom: 1px solid rgb(203 213 225);
}

.card-delete {
  position: absolute;
  right: 10px;
  top: 0;
  cursor: pointer;
}
.card-delete:hover {
  color: red;
}

.is-active {
  background-color: #2d9643;
}
</style>
