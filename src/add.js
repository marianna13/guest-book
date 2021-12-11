import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "1", label: "Номер 1" },
  { value: "1", label: "Номер 2" },
  { value: "2", label: "Номер 3" }
];

export default function Add() {
  let [room, setRoom] = useState("");
  let [name, setName] = useState("");
  const handleChange = function (e) {
    setRoom(e.label);
  };
  return (
    <div>
      <h1>{room}</h1>
      <form>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              borderColor: "rgb(51, 136, 255)",
              alignItems: "center",
              alignContent: "center",
              padding: 10,
              margin: 5
            }}
          />
        </label>
        <input
          type="submit"
          value="Сохранить"
          style={{
            backgroundColor: "rgb(51, 136, 255)",
            borderColor: "rgb(51, 136, 255)",
            alignItems: "center",
            alignContent: "center",
            padding: 10,
            margin: 5,
            color: "white"
          }}
        />
      </form>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Выберите.."
      />
    </div>
  );
}
