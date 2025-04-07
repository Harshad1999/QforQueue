import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { networkCodes } from '../core-constants/error-codes.constant';

export class Store {
  isBusinessOwner: boolean;
  isLoggedin: boolean;
  isLoading: boolean;
  isError: boolean;
  isNetworkConnected: string;
  isRefresh: boolean;

  constructor() {
    this.isBusinessOwner = true;
    this.isLoggedin = false;
    this.isLoading = false;
    this.isError = false;
    this.isNetworkConnected = networkCodes.pending;
    this.isRefresh = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makeObservable<Store, any>(this, {
      // observable
      isBusinessOwner: observable,
      isLoggedin: observable,
      isLoading: observable,
      isError: observable,
      isNetworkConnected: observable,
      isRefresh: observable,
      setLoading: action,
      setIsBusinessOwner: action,
      setIsLoggedIn: action,
      setNetworkConnected: action,
      setRefresh: action,
    });
  }

  get loading(): boolean {
    return this.isLoading;
  }

  get refresh(): boolean {
    return this.isRefresh;
  }

  setIsBusinessOwner(flag: boolean): void {
    this.isBusinessOwner = _.isNil(flag) || flag;
  }
  setIsLoggedIn(flag: boolean): void {
    this.isLoggedin = _.isNil(flag) || flag;
  }
  setLoading(flag: boolean): void {
    this.isLoading = _.isNil(flag) || flag;
  }
  
  setNetworkConnected(isConnected: string) {
    this.isNetworkConnected = isConnected;
  }

  setRefresh(isRefresh: boolean) {
    this.isRefresh = isRefresh;
  }
}
