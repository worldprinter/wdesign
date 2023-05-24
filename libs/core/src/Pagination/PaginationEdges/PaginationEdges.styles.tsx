import { createStyles } from '@worldprinter/wdesign-styles';

export default createStyles((theme) => ({
  icon: {
    transform: theme.dir === 'rtl' ? 'rotate(180deg)' : 'unset',
  },
}));
