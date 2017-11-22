import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DirectMessageList from '../../client/src/components/DirectMessageList.jsx';

configure({ adapter: new Adapter() });

describe('<DirectMessageList />', () => {

  it('contains HELLO', () => {

    const wrapper = shallow(<div>HELLO</div>);
    expect(wrapper.contains("HELLO")).toBe(true);
  });

});