import { shallowMount } from '@vue/test-utils';
import messageFormatterMixin from '../messageFormatterMixin';

describe('messageFormatterMixin', () => {
  it('returns correct plain text', () => {
    const Component = {
      render() {},
      mixins: [messageFormatterMixin],
    };
    const wrapper = shallowMount(Component);
    const message =
      '<b>Clientx is an opensource tool. https://www.clientx.io</b>';
    expect(wrapper.vm.getPlainText(message)).toMatch(
      'Clientx is an opensource tool. https://www.clientx.io'
    );
  });
});
