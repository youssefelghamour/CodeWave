import React from 'react';
import { shallow, mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';


describe('WithLogging HOC', () => {
    it('should log mounted and unmounted messages for pure HTML', () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        const WrappedComponent = WithLogging(() => <p>Test</p>);
        const wrapper = mount(<WrappedComponent />);
        
        expect(consoleLogSpy).toHaveBeenCalledWith('Component Component is mounted');
        
        wrapper.unmount();
        
        expect(consoleLogSpy).toHaveBeenCalledWith('Component Component is going to unmount');
        
        consoleLogSpy.mockRestore();
    });

    it('should log mounted and unmounted messages for the Login component', () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        const WrappedLogin = WithLogging(Login);
        const wrapper = mount(<WrappedLogin />);
        
        expect(consoleLogSpy).toHaveBeenCalledWith('Component Login is mounted');
        
        wrapper.unmount();
        
        expect(consoleLogSpy).toHaveBeenCalledWith('Component Login is going to unmount');
        
        consoleLogSpy.mockRestore();
    });
});