/**
 * Separator — a simple horizontal rule for use inside Portable Text body fields.
 */

import { defineType } from 'sanity';

export const separatorType = defineType({
  name: 'separator',
  title: 'Separator',
  type: 'object',
  fields: [
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [{ title: 'Line', value: 'line' }],
        layout: 'radio',
      },
      initialValue: 'line',
    },
  ],
  preview: {
    prepare() {
      return { title: '─── Separator ───' };
    },
  },
});
