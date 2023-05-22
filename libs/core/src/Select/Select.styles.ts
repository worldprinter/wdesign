import { createStyles } from '@worldprint/wdesign-styles';

export default createStyles(() => ({
  input: {
    '&:not(:disabled)': {
      cursor: 'pointer',

      '&::selection': {
        backgroundColor: 'transparent',
      },
    },
  },
}));
