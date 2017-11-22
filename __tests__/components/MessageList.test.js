import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageList from '../../client/src/components/MessageList.jsx';

configure({ adapter: new Adapter() });

describe('<MessageList />', () => {

  it('contains HELLO', () => {

    const wrapper = shallow(<div>HELLO</div>);
    expect(wrapper.contains("HELLO")).toBe(true);
  });

});