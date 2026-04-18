/**
 * Schema barrel — export all document and object types here.
 * Add new types to this array and they will appear in the Sanity Studio.
 */

import { postType }      from './post';
import { separatorType } from './separator';

export const schemaTypes = [postType, separatorType];
