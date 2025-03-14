const { EventEmitter } = require('events');

class GlobalStateWatcher extends EventEmitter {
  constructor(globalState) {
    super();
    this.globalState = globalState;
  }

  // Método para atualizar uma propriedade do globalState
  async update(key, value) {
    const oldValue = this.globalState.get(key);
    await this.globalState.update(key, value);
    this.emit('change', { key, oldValue, newValue: value });
  }

  // Método para ler uma propriedade do globalState
  get(key) {
    return this.globalState.get(key);
  }

  close() {
    this.removeAllListeners();
  }
}

module.exports = {
    GlobalStateWatcher
};