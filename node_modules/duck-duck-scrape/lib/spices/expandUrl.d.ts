import { NeedleOptions } from 'needle';
/**
 * The result from the expandUrl spice.
 */
export interface ExpandUrlResult {
    requested_url: string;
    success: boolean;
    resolved_url: string;
    usage_count: number;
    remaining_calls: number;
    error?: string;
}
/**
 * Expand a shortened link.
 * Data provided by Unshorten.me.
 * @category Spice
 * @see https://unshorten.me/
 * @param url The URL to unshorten
 * @param needleOptions The options for the HTTP request
 * @since v2.2.0
 * @returns The expandUrl result
 */
export declare function expandUrl(url: string, needleOptions?: NeedleOptions): Promise<ExpandUrlResult>;
