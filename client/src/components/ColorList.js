import React, { useState } from "react";
import requester from "easier-requests";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  async function saveEdit(event) {
    const colorId = colorToEdit.id;
    event.preventDefault();
    try {
      const requestId = requester.createUniqueID();
      await requester.put(
        `http://localhost:5000/api/colors/${colorId}`,
        requestId,
        colorToEdit
      );
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      window.open("/", "_self");
    }
  }

  async function deleteColor(color) {
    const colorId = color.id;

    try {
      const requestId = requester.createUniqueID();
      await requester.delete(
        `http://localhost:5000/api/colors/${colorId}`,
        requestId
      );
      window.open("/", "_self");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
