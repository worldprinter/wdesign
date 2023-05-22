import { createStyles } from '@worldprint/wdesign-styles';

export interface CenterStylesParams {
  inline: boolean;
}

export default createStyles((theme, { inline }: CenterStylesParams) => ({
  root: {
    display: inline ? 'inline-flex' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
