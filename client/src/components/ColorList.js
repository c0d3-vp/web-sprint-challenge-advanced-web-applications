import React, { useState } from 'react';
import {axiosWithAuth} from '../utils/axioswithauth'

const initialColor = {
  color: '',
  code: { hex: '' }
};
const newColor = {
  color: '',
  code: {hex: ''},
  id: ''
}

const ColorList = ({ colors, updateColors, getColors }) => {

  const [adding, setAdding]  = useState(false)
  const [colorToAdd, setColorToAdd] = useState(newColor)
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = () => {
    setAdding(true);
  }

  const saveAdd = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors`, colorToAdd)
    .then(res => {
      getColors()})
    .catch(e => console.log(`Where are the colors? ${e}`))
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => getColors())
    .catch(e => console.log(`Where are the colors?  ${e}`))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => getColors)
    .catch(e=> `DENIED: ${e}`)
  };

  return (
    <div className='colors-wrap'>
      <p>Colors</p>
      <button onClick={() => addColor()}></button>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Color</legend>
          <label>
            Color Name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}

        <form onSubmit={saveAdd}>
          <legend>Add Color</legend>
          <label>
            Color Name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </form>
      
    </div>
  );
};

export default ColorList;