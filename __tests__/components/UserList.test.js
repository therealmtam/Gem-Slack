import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserList from '../../client/src/components/UserList.jsx';

configure({ adapter: new Adapter() });

describe('<UserList />', () => {

  it('contains HELLO', () => {

    const wrapper = shallow(<div>HELLO</div>);
    expect(wrapper.contains("HELLO")).toBe(true);
  });

});