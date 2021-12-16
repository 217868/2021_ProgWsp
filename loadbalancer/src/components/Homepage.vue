<template>
  <div class="homepage">
    <div class="threadsList">
      <div v-for="thread in threads" :key="thread.number" class="thread">
        <Thread :thread="thread"/>
      </div>
    </div>
    <div class="clientsListWrapper">
      <div class="clientsListHeader">Kolejka:</div>
      <div class="clientsList">
        <div class="header">
          <div class="clientNameHeader">Nazwa klienta</div>
          <div class="fileSizeHeader">Rozmiar pliku [mb]</div>
          <div class="timeHeader">Czas oczekiwania [s]</div>
          <div class="priorityHeader">Priorytet</div>
        </div>
        <div class="clientsWrapper">
          <div class="allClients">
            <div v-for="client in clientsQueue" :key="client.name" class="client">
              <div>{{client.name}}</div>
              <div>{{Math.trunc(client.fileSize)}}</div>
              <div>{{client.timeWaiting}}</div>
              <div>{{client.priority}}</div>
            </div>
          </div>
        </div>
        <div class="listFooter"/>
      </div>
      <div class="buttonsSection">
        <div class="generateSection">
          <div class="sectionHeader">Generuj klientów:</div>
          <div class="sectionContent">
            <input v-model="generatedNo" type="number" class="input"/>
            <button @click="addClients">Generuj</button>
          </div>
        </div>
        <div class="createSection">
          <div class="sectionHeader">Stwórz klienta:</div>
          <div class="sectionContent">
            <input v-model="size" class="input" type="number" placeholder="Rozmiar pliku"/>
            <input v-model="time" class="input" type="number" placeholder="Czas oczekiwania"/>
            <button @click="addClient">Stwórz</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as loadBalancer from '../helpers/loadBalancer.js'
import * as nameGenerator from '../helpers/nameGenerator.js'
import Thread from './Thread.vue'

export default {
  name: 'Homepage',
  data() {
    return {
      generatedNo: 0
    }
  },
  components: {
    Thread
  },
  computed: {
    clientsQueue() {
      return this.$store.state.clients.filter((client) => !client.isBeingServed);
    },
    threads() {
      return this.$store.state.threads;
    }
  },
  methods: {
    addClients() {
      let clients = [];

      for(let i = 0; i < this.generatedNo; i++) {
        clients.push({
          name: nameGenerator.generateName(),
          fileSize: Math.random() * 10000,
          timeWaiting: 1,
          isBeingServed: false,
          percentageServed: 0,
          priority: 0
        })
      }

      this.$store.commit('addClients', clients);
    },
    addClient() {
      let clients = [];
      clients.push({
        name: nameGenerator.generateName(),
        fileSize: this.size,
        timeWaiting: this.time,
        isBeingServed: false,
        percentageServed: 0,
        priority: 0
      });

      this.$store.commit('addClients', clients);
    }
  },

  mounted: function() {
    setInterval(() => {
      this.$store.commit('incrementTimeWaiting');
    }, 1000);

    loadBalancer.initiate(this.$store);
  }
}
</script>

<style>
  body, html, #app {
    height: 90%;
    margin: 0;
    padding: 0;
  }
</style>

<style scoped>
  .homepage {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
  }
  .threadsList {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 50px;
  }

  .clientsListWrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 80%;
  }

  .clientsListHeader {
    text-align: left;
    font-size: 20px;
    margin-bottom: 5px;
    font-size: bold;
    color: #5e4387;
  }

  .clientsList {
    background-color: #5e4387;
    border-radius: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;

    color: white;
    font-size: 12px;
    text-align: left;

    overflow-x: hidden;
  }

  .clientsWrapper {
    flex: 1;
    background-color: #8364b2;
  }

  .allClients {
    height: 0;
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .listFooter {
    height: 10px;
  }

  .header {
    display: flex;
    width: 100%;
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 5px;

    border-bottom: white 5px solid;
  }

  .header div {
    flex: 1;
  }

  .client {
    display: flex;
    padding-left: 10px;
    width: 100%;

    padding-top: 2px;
    padding-bottom: 2px;
    border-bottom: white 1px solid;

  }

  .client div {
    flex: 1;
  }

  .buttonsSection {
    display: flex;
    margin-top: 10px;
  }

  .generateSection {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .generateSection > div, .createSection > div {
    width: fit-content;
  }

  .createSection {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: left;
  }
  
  .sectionHeader {
    text-align: left;
    font-size: 20px;
    margin-bottom: 5px;
    font-size: bold;
    color: #5e4387;
  }

  .sectionContent {
    background-color: #5e4387;
    padding: 10px;
    border-radius: 5px;
  }

  input {
    border: none;
    border-radius: 2px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-left: 2px;
    margin-right: 2px;
    text-align: center;

    color: #5e4387;
  }

  button {
    background-color: #8364b2;
    color: white;
    border: none;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-right: 30px;
    margin-left: 10px;
    border-radius: 2px;

    cursor: pointer;
    outline: inherit;
  }

  button:hover {
    background-color: #a480db;
  }
</style>
