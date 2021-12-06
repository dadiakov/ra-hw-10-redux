import { nanoid } from 'nanoid';
import { ADD_ITEM, REMOVE_ITEM, SET_SORT_VALUE } from '../actions/actionTypes';

const initialState = {
  items: [
    { id: nanoid(), name: 'Ремонт телефона', price: 1500 },
    { id: nanoid(), name: 'Ремонт планшета', price: 2500 },
    { id: nanoid(), name: 'Ремонт ноутбука', price: 5000 },
  ],
  sortValue: '',
};

export default function ItemsListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      const { id, name, price } = action.payload;
      const index = state.items.findIndex((e) => e.id === id);
      if (index >= 0) {
        const newState = { ...state };
        newState.items[index].name = name;
        newState.items[index].price = price;
        return newState;
      }
      return {
        ...state,
        items: [...state.items, { id: nanoid(), name, price }],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: [...state.items.filter((e) => e.id !== action.payload)],
      };
    case SET_SORT_VALUE:
      return { ...state, sortValue: action.payload };
    default:
      return state;
  }
}
