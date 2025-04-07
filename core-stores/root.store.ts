import React from 'react';
import { Store } from './store';
import { ShopStore } from './shopStore';
import { ThemeStore } from './themeStore';

export class Stores extends Store {
  shopStore!: ShopStore;
  themeStore!: ThemeStore;

  constructor() {
    super();
    this.shopStore = new ShopStore();
    this.themeStore = new ThemeStore();
  }
}

export const stores = new Stores();
export const StoresContext = React.createContext(stores);
