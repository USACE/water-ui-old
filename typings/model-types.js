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
 * @property {string} district_office_id
 * @property {string} district_name
 * @property {string} basin_name
 * @property {string} basin_location_code
 * @property {string} basin_location_id
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
 * @typedef a2w.models.LocationDetail
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
 * @property {number} current_top_of_wall_elevation
 * @property {number} top_of_wall_elevation_date
 * @property {number} current_top_of_wall_stage
 * @property {number} top_of_wall_stage_date
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
*/
