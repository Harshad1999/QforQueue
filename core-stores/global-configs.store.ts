import { action, makeObservable, observable } from 'mobx';

class GlobalConfigs {
  loginAttempts: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(rawData: { [key in string]: any }) {
    this.loginAttempts = rawData.loginAttempts;
  }
}

export class GlobalConfigsStore {
  configs!: GlobalConfigs;

  constructor() {
    this.configs = new GlobalConfigs({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makeObservable<GlobalConfigsStore, any>(this, {
      // observable
      configs: observable,
      // action
      updateGlobalConfigs: action,
    });
  }

  updateGlobalConfigs = (configs: Partial<GlobalConfigs>) => {
    this.configs = { ...this.configs, ...configs };
  };
}

export const globalConfigsStore = new GlobalConfigsStore();
