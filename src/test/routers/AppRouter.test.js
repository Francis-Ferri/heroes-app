import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    
    test('debe de mopstarr el login si no esta autenticado', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot(); // Prueba rapida, se podria buscar si existen elementos etc
    });

    test('debe de mostar el componente de Marvel si esta autenticado', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: "Francis"
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper.find('.navbar').exists()).toBe(true);
    });
});