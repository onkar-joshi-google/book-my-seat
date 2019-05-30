import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App', () => {
  it('shallow render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toEqual(2);
  });
});

describe('App', () => {
  it('mount', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('div').length).toEqual(2);
  });
});

describe('App', () => {
  it('should initially have 1 label', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('label')).toHaveLength(1);
  });
});

describe('App', () => {
  it('should initially have 1 select', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('select')).toHaveLength(1);
  });
});

// Testing state

describe('App', () => {
  it('showBookingDetails should initially be set to false', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().showBookingDetails).toEqual(false);
  });
});

describe('App', () => {
  it('should change state.selectedshow if function showchanged() is called', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    instance.showChanged(0);
    expect(wrapper.state().selectedShow).toEqual(0);
  });
});

// Testing store shows

describe('App', () => {
  it('should initally contain 3 show details', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().store.shows).toHaveLength(3);
  });
});

describe('App', () => {
  it('should have default value of first select to be ""', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('select').prop('defaultValue')).toEqual('');
    wrapper.find('select').simulate('change', {target: {value: 1}})
    expect(wrapper.find('select')).toHaveLength(2);
  });
});

describe('App', () => {
  it('should change select option and the state accordingly', () => {
    const wrapper = mount(<App />);
    wrapper.find('select').simulate('change', {target: {value: 1}})
    expect(wrapper.state().selectedShow).toEqual(1);
  });
});

describe('App', () => {
  it('should change select option add another select to the dom', () => {
    const wrapper = mount(<App />);
    wrapper.find('select').simulate('change', {target: {value: 1}})
    expect(wrapper.find('select')).toHaveLength(2);
  });
});

