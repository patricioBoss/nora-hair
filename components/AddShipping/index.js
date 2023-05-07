import { useState } from "react";
import {
  convertLocationsToOptions,
  getLocationsByState,
  stateOptions,
} from "./statedata";
import styles from "./styles.module.scss";
import Select from "react-select";

export default function Shipping({ setState, setLocation, profile }) {
  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState();
  const handleStateChange = (value) => {
    setState(value);
    console.log("this state value", value);
    setPlaces(getLocationsByState(value.value));
    setCurrentPlace("");
  };
  const handleLocationChange = (value) => {
    console.log("this is location value", value);
    setCurrentPlace(value);
    setLocation(value);
  };
  return (
    <div className={styles.payment}>
      <div className={styles.header + " mb-2"}>
        <h3>Shipping</h3>
      </div>
      <Select
        options={[{ value: "", label: "select state" }, ...stateOptions]}
        onChange={handleStateChange}
        defaultValue={{ value: "", label: "select state" }}
        placeholder={"select state"}
        className="border-0 w-full  my-0.5 focus:outline-none focus:ring focus:!border-blue-300 mb-3"
        classNames={{
          option: (state) => {
            // console.log("this is state", { state });
            return state.label === state.selectProps.value.label
              ? " !bg-black !text-white"
              : " hover:!bg-gray-200 !bg-white !text-black";
          },
          control: (state) => {
            // console.log(state);
            return ` hover:!border-black hover:!shadow-none ${
              state.isFocused && "!border-black"
            } !shadow-none focus:!shadow-none`;
          },
        }}
      />
      <Select
        options={[
          { value: "", label: "select Location" },
          ...convertLocationsToOptions(places),
        ]}
        onChange={handleLocationChange}
        defaultValue={{ value: "", label: "select Location" }}
        value={currentPlace}
        placeholder={"select state"}
        className="border-0 w-full  my-0.5 focus:outline-none focus:ring focus:!border-blue-300"
        classNames={{
          option: (state) => {
            // console.log("this is state", { state });
            return state.label === state.selectProps.value.label
              ? " !bg-black !text-white"
              : " hover:!bg-gray-200 !bg-white !text-black";
          },
          control: (state) => {
            // console.log(state);
            return ` hover:!border-black hover:!shadow-none ${
              state.isFocused && "!border-black"
            } !shadow-none focus:!shadow-none`;
          },
        }}
        groupBy={(option) => option.label}
      />
    </div>
  );
}
