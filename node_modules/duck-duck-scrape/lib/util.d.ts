import { NeedleOptions } from 'needle';
/** @internal */
export declare const SPICE_BASE = "https://duckduckgo.com/js/spice";
/** @internal */
export declare const VQD_REGEX: RegExp;
/** The safe search values when searching DuckDuckGo. */
export declare enum SafeSearchType {
    /** Strict filtering, no NSFW content. */
    STRICT = 0,
    /** Moderate filtering. */
    MODERATE = -1,
    /** No filtering. */
    OFF = -2
}
/** The type of time ranges of the search results in DuckDuckGo. */
export declare enum SearchTimeType {
    /** From any time. */
    ALL = "a",
    /** From the past day. */
    DAY = "d",
    /** From the past week. */
    WEEK = "w",
    /** From the past month. */
    MONTH = "m",
    /** From the past year. */
    YEAR = "y"
}
export declare function queryString(query: Record<string, string>): string;
/**
 * Get the VQD of a search query.
 * @param query The query to search
 * @param ia The type(?) of search
 * @param options The options of the HTTP request
 * @returns The VQD
 */
export declare function getVQD(query: string, ia?: string, options?: NeedleOptions): Promise<string>;
export declare function ensureJSON(body: any): any;
export declare function parseSpiceBody(body: any, regex?: RegExp): any;
