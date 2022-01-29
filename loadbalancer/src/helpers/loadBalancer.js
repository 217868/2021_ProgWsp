export function initiate(store) {
    setInterval(() => {
        var clientsQueue = store.state.clients.filter((client) => client.files.length > 0);
        var freeThreads = store.state.threads.filter((thread) => !thread.busy);

        if (freeThreads.length < 1 || clientsQueue.length < 1) return;

        var freeThread = freeThreads[0];
        var highestPriorityClient = clientsQueue.reduce(function(prev, current) {
            return (prev.priority > current.priority) ? prev : current
        });

        assignClient(store, freeThread, highestPriorityClient);

    }, 1500);

    setInterval(() => {
        var busyThreads = store.state.threads.filter((thread) => thread.busy);
        busyThreads.forEach(thread => {
            store.commit('threadProcessMb', {threadNumber: thread.number, mb: 100});
        });
    }, 1500);
}


function assignClient(store, thread, client) {
    store.commit('setThreadBusyState', {threadNumber: thread.number, busy: true, client: client});
}