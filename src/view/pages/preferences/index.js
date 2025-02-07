import React, { useCallback } from "react";
import { Button, Checkbox, Form, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleOption, setCheckedAll, setChartType } from "../../../state-managment/slices/settingsSlice";

import "./index.css";
import SearchLocation from "../../components/Search";
import { Link } from "react-router-dom";

const plainOptions = ["Temperature", "Humidity", "windSpeed"];

const Preferences = () => {
  const dispatch = useDispatch();
  const { Temperature, Humidity, windSpeed } = useSelector((state) => state.options);
  const chartType = useSelector((state) => state.options.chartType);
  const { isEmpty } = useSelector((state) => state.locations);
  
  const checkedList = [];
  if (Temperature) checkedList.push("Temperature");
  if (Humidity) checkedList.push("Humidity");
  if (windSpeed) checkedList.push("windSpeed");

  const checkAll = checkedList.length === plainOptions.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = useCallback((option) => {
    const optionsState = { Temperature, Humidity, windSpeed };
    const enabledOptions = Object.keys(optionsState).filter((key) => optionsState[key]);
  
    if (enabledOptions.length === 1 && enabledOptions[0] === option) {
      return;
    }
  
    dispatch(toggleOption(option));
  }, [dispatch, Temperature, Humidity, windSpeed]);
  
  const onCheckAllChange = useCallback((e) => {
    if (!e.target.checked) {
      return;
    }
    
    dispatch(setCheckedAll(plainOptions)); 
  }, [dispatch]);
  
  const onRadioChange = useCallback((e) => {
    dispatch(setChartType(e.target.value));
  }, [dispatch]);

  return (
    <Form className="form_container">
      <SearchLocation />

      <div className="options_group">
        <div className="checkbox_container">
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
          {plainOptions.map((option) => (
            <Checkbox
              key={option}
              checked={checkedList.includes(option)}
              onChange={() => onChange(option)}
            >
              {option}
            </Checkbox>
          ))}
        </div>

        <div className="radio_contanier">
          <Radio.Group value={chartType} size="large" onChange={onRadioChange}>
            <Radio.Button value="Line">Line Chart</Radio.Button>
            <Radio.Button value="Bar">Bar Chart</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      
      <Link to="/" className="submit_button">
        {isEmpty ? (
          <Button type="primary" disabled>Submit</Button>
        ) : (
          <Button type="primary">Submit</Button>
        )}
      </Link>
    </Form>
  );
};

export default Preferences;
