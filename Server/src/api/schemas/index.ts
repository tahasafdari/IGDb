/**
 * Import necessary modules and functions.
 * - `path` module helps work with file and directory paths.
 * - `loadFilesSync` function loads GraphQL type definitions from files.
 * - `mergeTypeDefs` function merges multiple sets of type definitions.
 */
import path from 'path';
import {loadFilesSync} from '@graphql-tools/load-files';
import {mergeTypeDefs} from '@graphql-tools/merge';

/**
 * Define the directory path where GraphQL type definitions are located.
 * You can customize the directory path as needed.
 */
const typesDirectory = path.join(__dirname, './**/*.graphql');

/**
 * Load GraphQL type definitions from files in the specified directory.
 * - `loadFilesSync` scans the directory and its subdirectories for `.graphql` files
 *   and loads their contents into an array.
 */
const typesArray = loadFilesSync(typesDirectory);

/**
 * Merge the loaded type definitions into a single set.
 * - `mergeTypeDefs` combines all the loaded type definitions into one cohesive schema.
 */
const typeDefs = mergeTypeDefs(typesArray);

/**
 * Export the merged type definitions as `typeDefs`,
 * making them available for use in your GraphQL server.
 */
export default typeDefs;
