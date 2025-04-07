//all mobx store content
import React from 'react';
import { Store } from './store';
import { ShopStore } from './shopStore';

export class Stores extends Store {
  shopStore!: ShopStore;

  constructor() {
    super();
    this.shopStore = new ShopStore();
  }
}
export const stores = new Stores();
export const StoresContext = React.createContext(stores);
