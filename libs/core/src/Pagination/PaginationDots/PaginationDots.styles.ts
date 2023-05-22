import { createStyles, getSize } from '@worldprint/wdesign-styles';
import { sizes } from '../PaginationControl/PaginationControl.styles';

export default createStyles((theme, _params, { size }) => ({
  dots: {
    height: getSize({ size, sizes }),
    minWidth: getSize({ size, sizes }),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
}));
