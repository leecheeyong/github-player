"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecast = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
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
async function forecast(query, locale = 'en', needleOptions) {
    if (!query)
        throw new Error('Query cannot be empty!');
    if (!locale)
        throw new Error('Locale cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/forecast/${encodeURIComponent(query)}/${locale}`, needleOptions);
    if (response.body.toString() === 'ddg_spice_forecast();\n')
        return null;
    return (0, util_1.parseSpiceBody)(response.body, /ddg_spice_[\w]+\(\n?((?:.|\n)+)\n?\);?/);
}
exports.forecast = forecast;
