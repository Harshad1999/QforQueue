import { action, makeObservable, observable } from 'mobx';

export class ThemeStore {
  theme: 'light' | 'dark' = 'light';

  constructor() {
    makeObservable(this, {
      theme: observable,
      toggleTheme: action,
      setTheme: action,
    });
  }

  toggleTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  };

  setTheme = (newTheme: 'light' | 'dark') => {
    this.theme = newTheme;
  };
}
