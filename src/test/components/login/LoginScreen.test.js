import React from 'react';
import { mount } from "enzyme";
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {
    
    const history = {
        length: 10,
        replace: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ history }/>
        </AuthContext.Provider>
    );

    test('debe de mostrase correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de realizar el dispatch y la navegacion', () => {
        
        const action = {
            type: types.login,
            payload: {
                name: "Francis Ferri"
            }
        };

        const handleClick = wrapper.find("button").prop("onClick");
        handleClick();
        
        expect(contextValue.dispatch).toHaveBeenCalledWith(action);
        expect(history.replace).toHaveBeenCalledWith("/");
        
        localStorage.setItem('lastPath', "dc");
        
        handleClick();
        expect(history.replace).toHaveBeenCalledWith("dc");
    });
});