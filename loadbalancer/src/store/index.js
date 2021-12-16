import { createStore } from 'vuex'

export default createStore({
  state: {
    clients: [],
    threads: [
      {
        number: 0,
        busy: false,
        client: null,
        mbProcessed: 0.0
      },
      {
        number: 1,
        busy: false,
        client: null,
        mbProcessed: 0.0
      },
      {
        number: 2,
        busy: false,
        client: null,
        mbProcessed: 0.0
      },
      {
        number: 3,
        busy: false,
        client: null,
        mbProcessed: 0.0
      },
      {
        number: 4,
        busy: false,
        client: null,
        mbProcessed: 0.0
      }
    ]
  },
  mutations: {
    addClients (state, clients) {
      state.clients = [...state.clients.concat(clients)];
    },

    incrementTimeWaiting (state) {
      state.clients.forEach((client) => {
        client.timeWaiting++;
        client.priority = calculatePriority(state, client);
      })
    },

    setThreadBusyState (state, { threadNumber, busy, client }) {
      state.threads[threadNumber].busy = busy;
      state.threads[threadNumber].client = client;

      let clientToChange = {...client};
      clientToChange.isBeingServed = true;

      state.clients = [...state.clients.map(client => client.name !== clientToChange.name ? client : {...client, ...clientToChange})]
    },

    threadProcessMb (state, {threadNumber, mb}) {
      let thread = state.threads[threadNumber]
      thread.mbProcessed += mb;
      thread.client.percentageServed = (thread.mbProcessed / thread.client.fileSize);

      if (thread.client.fileSize > thread.mbProcessed) return;

      state.clients = state.clients.filter(client => thread.client.name != client.name);
      thread.busy = false;
      thread.client = null;
      thread.mbProcessed = 0.0;
    }
  },
  actions: {
  },
  modules: {
  }
})

function calculatePriority(state, client) {
  let numOfClients = state.clients.filter((client) => !client.isBeingServed).length * 1000;
  return (numOfClients/client.fileSize) + (client.timeWaiting/numOfClients);
}
