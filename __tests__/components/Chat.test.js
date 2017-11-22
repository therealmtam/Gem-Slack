import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chat from '../../client/src/components/Chat.jsx';

configure({ adapter: new Adapter() });

describe('<Chat />', () => {

  it('contains HELLO', () => {

    const wrapper = shallow(<div>HELLO</div>);
    expect(wrapper.contains("HELLO")).toBe(true);
  });

});