import { getCurrPrices } from '../client/store/transactions';
import store from '../client/store';

let interval;
export const requestInInterval = () => {
  interval = setInterval(() => {
    store.dispatch(getCurrPrices());
  }, 1000);
};

export const clearingInterval = () => {
  clearInterval(interval);
};
