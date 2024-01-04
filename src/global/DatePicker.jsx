import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { endDateContext, startDateContext } from "./../App";


const DateSelector = () => {
  const {endDate, setEndDate} = useContext(endDateContext);
  const {startDate, setStartDate} = useContext(startDateContext);

  
  return (
    <div>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={date => setStartDate(date)}
        startDate={startDate}
      />
      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={date => setEndDate(date)}
        endDate={endDate}
        startDate={startDate}
        minDate={startDate}
     />
    </div>
  );
};

export default DateSelector;