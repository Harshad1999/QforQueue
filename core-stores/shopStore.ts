import { action, makeObservable, observable } from 'mobx';

 class ShopModel {
  id: string;
  ownerId: string;
  name: string;
  type: 'barbershop' | 'clinic';
  pincode: string;
  operatingHours: {
    open: string;
    close: string;
  };
  address: string;
  rating: number;
  totalRatings: number;
  status: 'open' | 'closed' | 'break';
  imageUrl: string;
  description: string;
  services: string[];
  createdAt: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(rawData: { [key in string]: any }) {
    this.id = rawData.id;
    this.ownerId = rawData.ownerId;
    this.name = rawData.name;
    this.type = rawData.type;
    this.pincode = rawData.pincode;
    this.operatingHours = rawData.operatingHours;
    this.address = rawData.address;
    this.rating = rawData.rating;
    this.totalRatings = rawData.totalRatings;
    this.status = rawData.status;
    this.imageUrl = rawData.imageUrl;
    this.description = rawData.description;
    this.services = rawData.services;
    this.createdAt = rawData.createdAt;
  }
}

export class ShopStore {
  shopData!: ShopModel;
  constructor() {
    this.shopData = new ShopModel({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makeObservable<ShopStore, any>(this, {
      // Observable
    shopData: observable,
      // action
      updateShopData: action,
    });
  }

  updateShopData = (
    shopData: Partial<ShopModel>,
  ) => {
    this.shopData = new ShopModel({
      ...shopData,
    });
  };

  removeOutwardRemittancesData = () => {
    this.shopData = new ShopModel({});
  };
}

export const shopStore = new ShopStore();
