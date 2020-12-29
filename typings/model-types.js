/**
 * @typedef {any} ResizeObserver
 */

/** @namespace a2w.models */

/**
 * @typedef a2w.models.LocationSummary
 * @property {string} office_id
 * @property {string} location_id
 * @property {string} id
 * @property {string} parent_id
 * @property {string} source
 * @property {string} parent_source
 * @property {string} public_name
 * @property {string} location_type
 * @property {string} location_type_id
 * @property {string} sub_location_type_id
 * @property {string} sub_location_type
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} zoom_depth
 * @property {number} flood_value
 * @property {number} drought_value
 * @property {boolean} is_leaf
 * @property {string} lake_indicator
 * @property {string} dam_indicator
 * @property {number} current_elevation
 * @property {number} current_stage
 * @property {number} current_inflow
 * @property {number} current_outflow
 * @property {number} current_precipitation
 * @property {string} flood_message
 * @property {string} drought_message
 * @property {string} all_message
 * @property {number} public_indicator
 * @property {number} tree_depth
 */

/**
 * @typedef a2w.models.LocationSearchResult
 * @property {string} office_id
 * @property {string} location_id
 * @property {string} id
 * @property {string} location_id
 * @property {string} source
 * @property {string} description
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} zoom_depth
 * @property {string} location_type
 */

/**
 * @typedef a2w.models.DistrictBasin
 * @property {string} district_office_id Can be matched to LocationSummary.office_id
 * @property {string} district_name
 * @property {string} basin_name
 * @property {string} basin_division_code
 * @property {string} district_id Can be matched to LocationSummary.id
 * @property {string} basin_id Can be matched to LocationSummary.parent_id (and organization_l.id?)
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef a2w.models.DamProfileHistoryEntry
 * @property {string} date
 * @property {number} in_flow
 * @property {number} top_of_dam
 * @property {number} top_of_flood
 * @property {number} bottom_of_flood
 * @property {number} stream_bed
 * @property {number} out_flow
 */

/**
 * @typedef a2w.models.DamProfile
 * @property {a2w.models.DamProfileHistoryEntry[]} history
 */

/**
 * @typedef a2w.models.CwmsDetail
 * @property {string} office_id
 * @property {string} office_name
 * @property {string} public_name
 * @property {string} location_kind_id
 * @property {number} elevation
 * @property {string} unit_id
 * @property {string} time_zone_name
 * @property {string} county_name
 * @property {string} state
 * @property {string} nearest_city
 * @property {string} location_code
 * @property {string} location_id
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} division_id
 * @property {number} district_id
 * @property {number} operating_basin_id
 * @property {number} base_location_code
 * @property {string} base_location_id
 * @property {string} sub_location_id
 * @property {string} location_type
 * @property {number} location_type_id
 * @property {string} lake_indicator
 * @property {string} dam_indicator
 * @property {number} current_elevation
 * @property {number} previous_elevation
 * @property {string} elevation_date
 * @property {number} current_stage
 * @property {number} previous_stage
 * @property {string} stage_date
 * @property {number} current_flow
 * @property {string} flow_date
 * @property {number} current_inflow
 * @property {string} inflow_date
 * @property {number} current_precipitation
 * @property {string} precipitation_date
 * @property {number} current_storage
 * @property {string} storage_date
 * @property {number} current_drought_storage
 * @property {string} drought_storage_date
 * @property {number} current_surcharge
 * @property {string} surchange_date
 * @property {number} current_tail_water_elevation
 * @property {number} tail_water_elevation_date
 * @property {number} current_tail_water_stage
 * @property {number} tail_water_stage_date
 * @property {number} current_rule_curve
 * @property {string} rule_curve_date
 * @property {number} current_power_generation
 * @property {string} power_generation_date
 * @property {number} current_air_temperature
 * @property {string} air_temperature_date
 * @property {number} current_water_temperature
 * @property {string} water_temperature_date
 * @property {number} current_do
 * @property {string} do_date
 * @property {number} current_ph
 * @property {number} ph_date
 * @property {number} current_cond
 * @property {string} cond_date
 * @property {object} channel_capacity
 * @property {number} spillway_crest
 * @property {string} vertical_datum
 * @property {number} drainage_area
 * @property {number} public_ind
 * @property {string} stream_location_code
 * @property {number} bottom_of_conservation
 * @property {number} bottom_of_flood
 * @property {number} bottom_of_normal
 * @property {number} design_capacity
 * @property {string} level_type
 * @property {number} stream_bed
 * @property {number} top_of_conservation
 * @property {number} top_of_dam
 * @property {number} top_of_deadpool
 * @property {number} top_of_flood
 * @property {number} top_of_surcharge
 */

/**
 * @typedef a2w.models.StreamLocation
 * @property {string} office_id
 * @property {string} public_name
 * @property {string} location_code
 * @property {string} location_id
 * @property {number} station
 * @property {string} station_unit
 */

/**
 * @typedef a2w.models.CwmsLevel
 * @property {string} specified_level_id Name of the level being measured
 * @property {number} current_value
 * @property {string} value_unit Units for the current value
 * @property {string} parameter_id Elev, Stor, etc.
 * @property {string} parameter_type_id Inst, Avg, Min, Max, etc.
 * @property {Date} level_as_of
 * @property {string} location_level_id String that could be used for RADAR time series query.
 */

/**
 * @typedef a2w.models.LocationChild
 * @property {string} location_code
 * @property {string} location_id
 * @property {number} label
 * @property {string} location_kind_id
 * @property {string} location_type
 */

/**
 * @typedef a2w.models.LocationNid
 * @property {string} nid_id
 * @property {number} record_id
 * @property {string} dam_name
 * @property {string} other_dam_name
 * @property {string} dam_former_name
 * @property {string} dam_designer
 * @property {string} dam_type
 * @property {string} core
 * @property {string} foundation
 * @property {string} year_completed
 * @property {number} dam_length
 * @property {number} dam_height
 * @property {number} structural_height
 * @property {number} hydraulic_height
 * @property {number} nid_height
 * @property {string} owner_name
 */
 
/**
 * @typedef a2w.models.SampleCount
 * @property {Date} sample_date
 * @property {number} num_samples
 */
 
/**
 * @typedef a2w.models.SampleResult
 * @property {string} sample_number
 * @property {number} sample_depth
 * @property {string} depth_unit_of_measure
 * @property {number} value
 * @property {string} units
 * @property {string} lab_id
 * @property {Date} date_entered
 * @property {string} sample_name
 * @property {Date} sample_time
 * @property {number} collect_method
 * @property {string} collect_pnt
 * @property {string} source_code
 * @property {string} huc
 * @property {string} source_description
 * @property {string} collection_method_name
 */
