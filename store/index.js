import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";
import expandSidebar from "./ExpandSlice";
import dialog from "./DialogSlice";


const config = {
  key: "rootv3",
  storage,
};
const cartPersistConfig = {
  key: 'cart',
  storage: storage,
  blacklist: ['cartSlide']
}
const reducers = combineReducers({ cart:persistReducer(cartPersistConfig,cart), expandSidebar, dialog });
const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
