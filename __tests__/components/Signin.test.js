import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Signin from '../../client/src/components/Signin.jsx';

configure({ adapter: new Adapter() });

describe('<Signin />', () => {

  it('contains HELLO', () => {

    const wrapper = shallow(<div>HELLO</div>);
    expect(wrapper.contains("HELLO")).toBe(true);
  });

});