import { NeedleOptions } from 'needle';
export declare type DictionaryHyphenationType = 'stress' | 'secondary stress';
/**
 * The result from the dictionary hyphenation spice.
 * @see https://developer.wordnik.com/docs#!/word/getHyphenation
 */
export interface DictionaryHyphenationResult {
    text: string;
    seq: number;
    type?: DictionaryHyphenationType;
}
/**
 * Get word syllables.
 * Data provided by Wordnik.
 * @category Spice
 * @see https://www.wordnik.com/
 * @param word The word to define
 * @param needleOptions The options for the HTTP request
 * @returns The dictionary hyphenation result
 */
export declare function dictionaryHyphenation(word: string, needleOptions?: NeedleOptions): Promise<DictionaryHyphenationResult[]>;
