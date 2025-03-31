import { v4 as uuidv4 } from 'uuid';

/**
 * Utility class with static helper methods for common operations
 */
export class Utility {
  /**
   * Generate a UUID v4
   * @returns {string} A new UUID v4
   */
  static generateUuid(): string {
    return uuidv4();
  }

  /**
   * Safely parse a JSON string
   * @param {string} jsonString - The JSON string to parse
   * @param {any} defaultValue - The default value to return if parsing fails
   * @returns {any} The parsed JSON or the default value
   */
  static safeJsonParse(jsonString: string, defaultValue: any = {}): any {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return defaultValue;
    }
  }

  /**
   * Check if a string is a valid MongoDB ObjectId
   * @param {string} id - The string to check
   * @returns {boolean} True if the string is a valid ObjectId
   */
  static isValidObjectId(id: string): boolean {
    // MongoDB ObjectId is a 24 character hex string
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
  }

  /**
   * Remove all undefined properties from an object
   * @param {Record<string, any>} obj - The object to clean
   * @returns {Record<string, any>} The cleaned object
   */
  static removeUndefined(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj)
      .filter(([_, v]) => v !== undefined)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }

  /**
   * Validates an email address
   * @param {string} email - The email to validate
   * @returns {boolean} True if the email is valid
   */
  static isValidEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * Format a date to a standard string format
   * @param {Date} date - The date to format
   * @returns {string} The formatted date string
   */
  static formatDate(date: Date): string {
    return date.toISOString();
  }

  /**
   * Deep clone an object
   * @param {T} obj - The object to clone
   * @returns {T} The cloned object
   */
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Paginate an array
   * @param {T[]} array - The array to paginate
   * @param {number} page - The page number (1-indexed)
   * @param {number} limit - The number of items per page
   * @returns {T[]} The paginated array
   */
  static paginate<T>(array: T[], page: number = 1, limit: number = 10): T[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return array.slice(startIndex, endIndex);
  }

  /**
   * Sleep for a specified number of milliseconds
   * @param {number} ms - The number of milliseconds to sleep
   * @returns {Promise<void>} A promise that resolves after the specified time
   */
  static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 