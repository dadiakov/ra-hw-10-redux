import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditStatus, editItem, addItem } from '../actions/actionCreators';

export default function CreateItemForm() {
  const item = useSelector((state) => state.createItemFormReducer.item);
  const editStatus = useSelector(
    (state) => state.createItemFormReducer.editStatus
  );
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const onSaveClick = () => {
    if (!item.name || !item.price) {
      console.log('Заполните все поля');
      return;
    }
    dispatch(addItem(item));
    onCancelClick();
  };

  const onCancelClick = () => {
    dispatch(editItem({ name: '', price: '' }));
    dispatch(setEditStatus(false));
  };

  const onChangeHandler = (e) => {
    dispatch(setEditStatus(true));
    const { name, value } = e.target;
    dispatch(editItem({ ...item, [name]: value }));
  };

  return (
    <form onSubmit={onFormSubmit} action="">
      <input
        name="name"
        value={item.name}
        onChange={onChangeHandler}
        type="text"
      />
      <input
        name="price"
        value={item.price}
        onChange={onChangeHandler}
        type="number"
      />
      <button onClick={onSaveClick} className="btn save-button">
        Save
      </button>
      {editStatus ? (
        <button onClick={onCancelClick} className="btn cancel-button">
          Cancel
        </button>
      ) : null}
    </form>
  );
}
