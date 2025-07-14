import { DividerElement } from '@serbaapp/snaps-sdk/jsx';
import { BorderColor } from '../../../../../helpers/constants/design-system';

export const divider = (): DividerElement => ({
  element: 'Box',
  props: {
    className: 'snap-ui-renderer__divider',
    backgroundColor: BorderColor.borderMuted,
  },
});
