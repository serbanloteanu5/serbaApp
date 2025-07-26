
import { Messenger, RestrictedMessenger } from '@serbaapp/base-controller';
import { getNftControllerMessenger } from './nft-controller-messenger';

describe('getNftControllerMessenger', () => {
  it('returns a restricted messenger', () => {
    const nftControllerMessenger = getNftControllerMessenger(new Messenger<never, never>());

    expect(nftControllerMessenger).toBeInstanceOf(RestrictedMessenger);
  });
});
