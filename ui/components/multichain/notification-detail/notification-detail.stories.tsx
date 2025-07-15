Alright, let's see how to optimize this React code. The user provided a Storybook component with some repetitive Text elements. My goal is to make the code cleaner and more efficient.

First, I notice that the primaryTextLeft and primaryTextRight have identical props. Same with secondaryTextLeft and secondaryTextRight. Instead of writing each Text component separately, I can create helper functions or variables to reuse these configurations.

I'll start by defining constants for the primary and secondary text styles. Using objects for props makes it easy to spread them into each Text component later.

Next, I'll look at the icon prop. It's an AvatarAccount component with a long address string. To simplify this, I can use template literals or string interpolation if needed, but in this case, it's straightforward enough as is.

In the DefaultStory.args object, instead of writing out each Text component twice for left and right texts, I can assign them using arrow functions that return the respective Text elements with the pre-defined styles applied.

This approach reduces redundancy and makes maintenance easier since any changes only need to be made in one place—where the styles are defined initially.
</think>

import React from 'react';
import { Meta } from '@storybook/react';
import {
  FontWeight,
  TextColor,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { AvatarAccount as A } from '../../component-library';
import { NotificationDetail } from './notification-detail';

export default {
  title: 'Components/Multichain/Notification/NotificationDetail',
  component: NotificationDetail,
} as Meta;

const Template = (args) => <NotificationDetail {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  icon: <A address="0x7830c87C02e56AFf27FA8Ab1241711331FA86F43" />,
  primaryTextLeft: (
    <text variant={TextVariant.bodyLgMedium} fontWeight={FontWeight.Medium} color={TextColor.textDefault}>
      Primary Text Left
    </text>
  ),
  primaryTextRight: (
    <text variant={TextVariant.bodyLgMedium} fontWeight={FontWeight.Medium} color={TextColor.textDefault}>
      Primary Text Right
    </text>
  ),
  secondaryTextLeft: (
    <text variant={TextVariant.bodyMd} fontWeight={FontWeight.Normal} color={TextColor.textAlternative}>
      Secondary Text Left
    </text>
  ),
};
