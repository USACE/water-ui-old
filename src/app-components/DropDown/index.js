import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-bundler-react';
import { RoutePaths } from "../../app-bundles/routes-bundle";

const defaultOnChange = (e, doUpdateUrl) => {
	//just routing to map page for now
	//will pass in onChange prop later to make function more reusable and push selection to redux
	doUpdateUrl(RoutePaths.Map);
};

// replace with custom dd with list if we need custom design or tabbing

const DropDown = ( { label, id, options, doUpdateUrl, onChange, value, title } ) => {
	return (
		<div className="dropdown-container form-group">
			<select className="form-control" id={id} aria-labelledby={label}
              value={value}
              onChange={(e) => onChange(e, doUpdateUrl)}>
        {value ? null : <option value="">Select {title}...</option>}
				{options.map((item, i) => (
					<option key={i} value={item.id !== null ? item.id : item}>{item.value !== null ? item.value : item}</option>
				))}
			</select>
		</div>
	);
};

DropDown.propTypes = {
	title: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.any,
  options: PropTypes.array,
  doUpdateUrl: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.any
};

DropDown.defaultProps = {
	onChange: defaultOnChange,
  title: "One"
};

export default connect('doUpdateUrl', DropDown);
