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
 * @property {string} long_name
 * @property {string} location_code
 * @property {string} location_id
 * @property {string} location_kind_id
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} elevation
 * @property {string} unit_id
 * @property {string} time_zone_name
 * @property {string} county_name
 * @property {string} state
 * @property {string} nearest_city
 * @property {number} flood_storage_pct
 * @property {number} current_elevation
 * @property {number} daily_elevation_change
 * @property {a2w.models.DamProfile} dam_profile
 */
