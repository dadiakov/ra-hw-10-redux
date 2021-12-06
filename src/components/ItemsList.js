import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditStatus,
  removeItem,
  setSortValue,
} from '../actions/actionCreators';
import { EDIT_ITEM } from '../actions/actionTypes';

export default function ItemsList() {
  const items = useSelector((state) => {
    const items = state.itemsListReducer.items;
    const re = new RegExp(state.itemsListReducer.sortValue, 'i');
    const sortedArray = items.filter((e) => re.exec(e.name));
    return sortedArray;
  });
  const dispatch = useDispatch();
  const [sortInput, setSortInput] = useState('');

  const deleteItem = (id) => {
    dispatch(removeItem(id));
    dispatch(setEditStatus(false));
  };

  const edit = (e) => {
    const { id, name, price } = e;
    dispatch({ type: EDIT_ITEM, payload: { id, name, price } });
    dispatch(setEditStatus(true));
  };

  const sortValueChangeHandler = (e) => {
    setSortInput(e.target.value);
    dispatch(setSortValue(e.target.value));
  };

  return (
    <React.Fragment>
      <div style={{ marginTop: 25 }}>Фильтр:</div>
      <input value={sortInput} onChange={(e) => sortValueChangeHandler(e)} />
      {sortInput ? (
        <button
          style={{ marginLeft: 5 }}
          onClick={() => {
            sortValueChangeHandler({ target: { value: '' } });
          }}
        >
          Очистить
        </button>
      ) : null}
      <ul className="work-item-container">
        {items.map((e) => (
          <li id={e.id} key={e.id}>
            {e.name} {e.price}
            <button onClick={() => edit(e)} className="btn edit-button">
              ✎
            </button>
            <button
              onClick={() => deleteItem(e.id)}
              className="btn delete-button"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
