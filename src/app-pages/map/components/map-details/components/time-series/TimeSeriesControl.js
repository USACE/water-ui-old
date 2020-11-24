import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import { radarTimeControls } from "../../../../../../app-bundles/radar-time-series-bundle";
import { dateToString } from "../../../../../../app-bundles/bundle-utils";

const TimeSeriesControl = ({
  ltsTimeControl,
  ltsCustomStartDate,
  ltsCustomEndDate,
  doLtsSetTimeControl,
  doLtsSetCustomDate,
}) => {
  const handleDateRangeOnChange = (e) => {
    e.stopPropagation();
    doLtsSetTimeControl(parseInt(e.target.value));
  }

  const handleDateOnChange = (e) => {
    e.stopPropagation();
    const name = e.target.name;
    const date = e.target.value;
    doLtsSetCustomDate(name, date);
  };

  const handleOnClick = e => e.stopPropagation();

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
          onClick={handleOnClick}
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
              onClick={handleOnClick}
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
              onClick={handleOnClick}
            />
          </div>
        </>
      )}
    </div>
  )
};

TimeSeriesControl.propTypes = {
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
  TimeSeriesControl,
);
