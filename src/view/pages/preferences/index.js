import React, { useCallback } from "react";
import { Button, Checkbox, Form, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedList, setChartType } from "../../../state-managment/slices/settingsSlice";

import "./index.css";
import SearchLocation from "../../components/Search";
import { Link } from "react-router-dom";


const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Temperature", "Humidity", "Wind Speed"]; 

const Preferences = () => {
  const dispatch = useDispatch();
  const checkedList = useSelector((state) => state.options.checkedList);
  const chartType = useSelector((state) => state.options.chartType);
  const { isEmpty } = useSelector((state) => state.locations);
  

  const checkAll = checkedList.length === plainOptions.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = useCallback( list => {
    dispatch(setCheckedList(list));
  }, [dispatch] );

  const onCheckAllChange = useCallback( e => {
      dispatch(setCheckedList(e.target.checked ? plainOptions : []));
  }, [dispatch] );

  const onRadioChange = useCallback( e => {
      dispatch(setChartType(e.target.value));
  }, [dispatch] );

  return (
    <Form className="form_container">
      <SearchLocation />

      <div className="options_group">
        <div className="options_contanier">

          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
          <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </div>

        <div className="options_contanier">
          <Radio.Group value={chartType} size="large" onChange={onRadioChange}>
            <Radio.Button value="Line">Line Chart</Radio.Button>
            <Radio.Button value="Bar">Bar Chart</Radio.Button>
          </Radio.Group>
        </div>

      </div>
      
      <Link to="/" className="submit_button" >
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
