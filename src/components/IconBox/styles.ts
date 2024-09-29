import { styled } from '../../theme/stitches.config';

export type ISizeProps = 'SMALL' | 'NORMAL';

export const IconBoxContainer = styled('View', {
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: '$GRAY_700',

  borderRadius: 6,

  marginRight: 12,

  variants: {
    size: {
      SMALL: {
        width: 32,
        height: 32,
      },
      NORMAL: {
        width: 46,
        height: 46,
      },
    },
  },

  defaultVariants: {
    size: 'NORMAL',
  },
});
