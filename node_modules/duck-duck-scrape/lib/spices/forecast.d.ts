import { NeedleOptions } from 'needle';
export declare type ForecastIcon = 'partly-cloudy-day' | 'partly-cloudy-night' | 'cloudy' | 'rain' | 'clear-day' | 'snow' | 'fog' | 'clear-night' | 'clear-day';
export declare type ForecastPrecipType = 'rain' | 'snow';
export declare type ForecastAlertSeverity = 'advisory';
export interface ForecastMinutelyData {
    /** The timestamp of the data point. */
    time: number;
    precipIntensity: number;
    precipProbability: number;
}
export interface ForecastHourlyData extends ForecastMinutelyData {
    summary: string;
    icon: ForecastIcon;
    precipType?: ForecastPrecipType;
    temperature: number;
    apparentTemperature: number;
    dewPoint: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windGust: number;
    windBearing: number;
    cloudCover: number;
    uvIndex: number;
    visibility: number;
    ozone: number;
    solar?: {
        azimuth: number;
        altitude: number;
        dni: number;
        ghi: number;
        dhi: number;
        etr: number;
    };
}
export interface ForecastDailyData extends Omit<ForecastHourlyData, 'apparentTemperature' | 'solar'> {
    sunriseTime: number;
    sunsetTime: number;
    moonPhase: number;
    precipIntensityMax: number;
    precipIntensityMaxTime: number;
    temperatureHigh: number;
    temperatureHighTime: number;
    temperatureLow: number;
    temperatureLowTime: number;
    apparentTemperatureHigh: number;
    apparentTemperatureHighTime: number;
    apparentTemperatureLow: number;
    apparentTemperatureLowTime: number;
    windGustTime: number;
    uvIndexTime: number;
    temperatureMin: number;
    temperatureMinTime: number;
    temperatureMax: number;
    temperatureMaxTime: number;
    apparentTemperatureMin: number;
    apparentTemperatureMinTime: number;
    apparentTemperatureMax: number;
    apparentTemperatureMaxTime: number;
}
export interface ForecastAlert {
    /** The title of the alert. */
    title: string;
    /** The regions where this alert applies to. */
    regions: string[];
    /** The severity of the alert. */
    severity: ForecastAlertSeverity;
    /** The time of the alert. */
    time: 1618790400;
    /** The time when the alert expires. */
    expires: 1618826400;
    /** The description of the alert. */
    description: string;
    /** The URL of the alert. (i.e. https://alerts.weather.gov/cap/wwacapget.php?x=WY12619ACC3C34.SpecialWeatherStatement.12619AD9E960WY.RIWSPSRIW.9e2be4e2b73121e0cb1c2b66684b32b4) */
    uri: string;
}
/**
 * The result from the forecast spice.
 */
export interface ForecastResult {
    latitude: number;
    longitude: number;
    timezone: string;
    currently: Omit<ForecastHourlyData, 'precipType'> & {
        nearestStormDistance: number;
        nearestStormBearing: number;
        precipIntensity: number;
        precipProbability: number;
    };
    minutely: {
        summary: string;
        icon: ForecastIcon;
        data: ForecastMinutelyData[];
    };
    hourly: {
        summary: string;
        icon: ForecastIcon;
        data: ForecastHourlyData[];
    };
    daily: {
        summary: string;
        icon: ForecastIcon;
        data: ForecastDailyData[];
    };
    alerts: ForecastAlert[];
    flags: {
        sources: string[];
        'nearest-station': number;
        units: string;
        'darksky-unavailable'?: string;
        'ddg-location': string;
    };
    offset: number;
}
/**
 * Get the forecast of a location. Returns `null` if there are no results.
 * Data provided by Dark Sky and other sources.
 * @category Spice
 * @see https://darksky.net/
 * @param query The query to search with
 * @param locale The locale to give the summaries in
 * @param needleOptions The options for the HTTP request
 * @returns The forecast result
 */
export declare function forecast(query: string, locale?: string, needleOptions?: NeedleOptions): Promise<ForecastResult | null>;
