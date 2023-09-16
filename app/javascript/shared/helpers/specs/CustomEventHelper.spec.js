import { dispatchWindowEvent } from '../CustomEventHelper';

describe('dispatchWindowEvent', () => {
  it('dispatches correct event', () => {
    window.dispatchEvent = jest.fn();
    dispatchWindowEvent({ eventName: 'clientx.ready' });
    expect(dispatchEvent).toHaveBeenCalled();
  });
});
