import { NeedleOptions } from 'needle';
/** A list of synonyms and antonyms. */
export interface ThesaurusList {
    /** The synonyms of this word */
    syn?: string[];
    /** The antonyms of this word */
    ant?: string[];
}
/**
 * The result from the thesaurus spice.
 */
export interface ThesaurusResult {
    [type: string]: ThesaurusList;
}
/**
 * Get synonyms and antonyms of a word.
 * Data provided by Big Huge Thesaurus.
 * @category Spice
 * @see https://words.bighugelabs.com/
 * @param word The word to define
 * @param needleOptions The options for the HTTP request
 * @since v2.2.0
 * @returns The thesaurus result
 */
export declare function thesaurus(word: string, needleOptions?: NeedleOptions): Promise<ThesaurusResult | null>;
