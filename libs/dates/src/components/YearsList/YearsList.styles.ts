import { createStyles, rem } from '@worldprinter/wdesign-core';

export default createStyles(() => ({
  yearsList: {
    borderCollapse: 'collapse',
    borderWidth: 0,
  },

  yearsListCell: {
    padding: 0,

    '&[data-with-spacing]': {
      padding: rem(0.5),
    },
  },

  yearsListRow: {},
}));
