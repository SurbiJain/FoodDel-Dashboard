import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserStartDateContext, UserEndDateContext} from "./index";


const DateSelector = () => {
  const {startDate, setStartDate} = useContext(UserStartDateContext);
  const {endDate, setEndDate} = useContext(UserEndDateContext);
  
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