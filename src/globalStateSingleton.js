let globalStateWatcher = null;

module.exports = {
    setGlobalStateWatcher: (instance) => {
        globalStateWatcher = instance;
    },
    getGlobalStateWatcher: () => {
        if (!globalStateWatcher) {
            throw new Error("GlobalStateWatcher ainda não inicializado!");
        }
        return globalStateWatcher;
    }
};