/**
 * Asynchronously fetch data from the specified URL using the `fetch` API.
 * @template T - The expected type of the response data.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Additional options for the fetch request.
 * @throws {Error} - Throws an error if the response status is not OK (2xx).
 * @returns {Promise<T>} - A promise that resolves to the fetched data of the specified type.
 */

// eslint-disable-next-line node/no-extraneous-require
const fetch = require('node-fetch');
export default async function fetchData<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, options);

  // Check if the response status is not OK (not in the range 200-299).
  if (!response.ok) {
    throw new Error('Error while fetching');
  }

  // Parse the response body as JSON and return it as the specified type.
  const json = (await response.json()) as T;
  return json;
}
