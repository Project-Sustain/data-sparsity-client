const waterSiteIdName = "MonitoringLocationIdentifier";
const waterSiteCollection = "water_quality_sites";
const waterSiteProperties = ["OrganizationFormalName", "MonitoringLocationName", "MonitoringLocationTypeName", "ProviderName"];

const aqiSiteIdName = "monitor_id";
const aqiSiteCollection = "epa_aqi_monitors";
const aqiSiteProperties = ["sample_duration", "method"];

export const sparsityMetadata = [
    
    // Water Quality
    {
        "collection": "water_quality_bodies_of_water",
        "label": "Water Quality: Bodies Of Water",
        "siteIdName": waterSiteIdName,
        "siteCollection": waterSiteCollection,
        "sitePropertyFields": waterSiteProperties
    },
    {
        "collection": "water_quality_pipes",
        "label": "Water Quality: Pipes",
        "siteIdName": waterSiteIdName,
        "siteCollection": waterSiteCollection,
        "sitePropertyFields": waterSiteProperties
    },
    {
        "collection": "water_quality_streams",
        "label": "Water Quality: Rivers and Streams",
        "siteIdName": waterSiteIdName,
        "siteCollection": waterSiteCollection,
        "sitePropertyFields": waterSiteProperties
    },
    {
        "collection": "water_quality_point_data",
        "label": "Water Quality: Point Data",
        "siteIdName": waterSiteIdName,
        "siteCollection": waterSiteCollection,
        "sitePropertyFields": waterSiteProperties
    },

    // AQI
    {
        "collection": "epa_aqi_ozone",
        "label": "AQI Ozone",
        "siteIdName": aqiSiteIdName,
        "siteCollection": aqiSiteCollection,
        "sitePropertyFields": aqiSiteProperties
    },
    {
        "collection": "epa_aqi_carbon_monoxide",
        "label": "AQI Carbon Monoxide",
        "siteIdName": aqiSiteIdName,
        "siteCollection": aqiSiteCollection,
        "sitePropertyFields": aqiSiteProperties
    },
    {
        "collection": "epa_aqi_lead_pm10",
        "label": "AQI Lead PM10",
        "siteIdName": aqiSiteIdName,
        "siteCollection": aqiSiteCollection,
        "sitePropertyFields": aqiSiteProperties
    },
    {
        "collection": "epa_aqi_lead_tsp",
        "label": "AQI Lead TSP",
        "siteIdName": aqiSiteIdName,
        "siteCollection": aqiSiteCollection,
        "sitePropertyFields": aqiSiteProperties
    },
    {
        "collection": "epa_aqi_nitrogen",
        "label": "AQI Nitrogen",
        "siteIdName": aqiSiteIdName,
        "siteCollection": aqiSiteCollection,
        "sitePropertyFields": aqiSiteProperties
    },
    {
        "collection": "epa_aqi_pm10_total",
        "label": "AQI PM10 Total",
        "siteIdName": aqiSiteIdName,
        "siteCollection": aqiSiteCollection,
        "sitePropertyFields": aqiSiteProperties
    },
    {
        "collection": "epa_aqi_pm25",
        "label": "AQI PM25",
        "siteIdName": aqiSiteIdName,
        "siteCollection": aqiSiteCollection,
        "sitePropertyFields": aqiSiteProperties
    },
    {
        "collection": "epa_aqi_sulfur_dioxide",
        "label": "AQI Sulfur Dioxide",
        "siteIdName": aqiSiteIdName,
        "siteCollection": aqiSiteCollection,
        "sitePropertyFields": aqiSiteProperties
    }
]