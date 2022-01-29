import { createStore } from 'vuex'

export default createStore({
  state: {
    clients: [],
    threads: [
      {
        number: 0,
        busy: false,
        client: null,
        mbProcessed: 0.0,
        file: null
      },
      {
        number: 1,
        busy: false,
        client: null,
        mbProcessed: 0.0,
        file: null
      },
      {
        number: 2,
        busy: false,
        client: null,
        mbProcessed: 0.0,
        file: null
      },
      {
        number: 3,
        busy: false,
        client: null,
        mbProcessed: 0.0,
        file: null
      },
      {
        number: 4,
        busy: false,
        client: null,
        mbProcessed: 0.0,
        file: null
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
      state.threads[threadNumber].file = client.files[0];

      let clientToChange = {...client};
      clientToChange.files.shift();
      if (clientToChange.files.length == 0) {
        state.clients = [...state.clients.filter(client => state.threads[threadNumber].client.name != client.name)];
      } else {
        state.clients = [...state.clients.map(client => client.name !== clientToChange.name ? client : {...client, ...clientToChange})]
      }
    },

    threadProcessMb (state, {threadNumber, mb}) {
      let thread = state.threads[threadNumber]
      thread.mbProcessed += mb;
      thread.file.percentageServed = (thread.mbProcessed / thread.file.fileSize);

      if (thread.file.fileSize > thread.mbProcessed) return;

      thread.busy = false;
      thread.client = null;
      thread.file = null;
      thread.mbProcessed = 0.0;
    }
  },
  actions: {
  },
  modules: {
  }
})

function calculatePriority(state, client) {
  if (client.files.length == 0) return 0;

  let numOfClients = state.clients.length * 1000;
  return (numOfClients/client.files[0].fileSize) + ((client.timeWaiting * 10)/numOfClients);
}
