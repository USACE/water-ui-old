import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import { radarTimeControls } from "../../../../../../app-bundles/radar-time-series-bundle";
import { dateToString } from "../../../../../../utils";

export const TimeSeriesDateRange = ({
  ltsTimeControl,
  ltsCustomStartDate,
  ltsCustomEndDate,
  doLtsSetTimeControl,
  doLtsSetCustomDate,
}) => {
  const handleDateRangeOnChange = (e) => {
    doLtsSetTimeControl(parseInt(e.target.value));
  }

  const handleDateOnChange = (e) => {
    const name = e.target.name;
    const date = e.target.value;
    doLtsSetCustomDate(name, date);
  };

  const today = dateToString(new Date());
  return (
    <div className="time-series-control">
      <div className="time-series-input">
        <label htmlFor="timeControl">
          Date Range
        </label>
        <select
          id="timeControl"
          value={ltsTimeControl}
          onChange={handleDateRangeOnChange}
        >
          { radarTimeControls.map(({ value, label }) => (
            <option
              key={label}
              value={value}
            >
              {label}
            </option>
          ))}
        </select>
      </div>
      { /* TODO: input type date doesn't work on Safari or IE. See if we are allowed to use react-datepicker for selecting the dates */}
      { ltsTimeControl < 0 && (
        <>
          <div className="time-series-input">
            <label htmlFor="customStartDate">
              Start Date
            </label>
            <input
              type="date"
              id="customStartDate"
              name="customStartDate"
              value={ltsCustomStartDate}
              max={ltsCustomEndDate || today}
              onChange={handleDateOnChange}
            />
          </div>
          <div className="time-series-input">
            <label htmlFor="customEndDate">
              End Date
            </label>
            <input
              type="date"
              id="customEndDate"
              name="customEndDate"
              value={ltsCustomEndDate}
              max={today}
              min={ltsCustomStartDate}
              onChange={handleDateOnChange}
            />
          </div>
        </>
      )}
    </div>
  )
};

TimeSeriesDateRange.propTypes = {
  ltsTimeControl: PropTypes.number.isRequired,
  ltsCustomStartDate: PropTypes.string,
  ltsCustomEndDate: PropTypes.string,
  doLtsSetTimeControl: PropTypes.func.isRequired,
  doLtsSetCustomDate: PropTypes.func.isRequired,
};

export default connect(
  "selectLtsTimeControl",
  "selectLtsCustomStartDate",
  "selectLtsCustomEndDate",
  "doLtsSetTimeControl",
  "doLtsSetCustomDate",
  TimeSeriesDateRange,
);
