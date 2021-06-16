import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom'; // Parece que tambien funciona con REact Router solo

describe('Pruebas en <PrivateRoute />', () => {
    
    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    Storage.prototype.setItem = jest.fn();

    // Esta prueba no queria pasar por el adapter, toco bjar la version de React
    test('debe de mostar el componente si esta autenticado y guardar localStorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute // Debe de estar dentro de un router siempre
                    isAutenticated={true} 
                    component={ () => <span>Listo</span>} // Espera una funcion
                    {...props}
                />
            </MemoryRouter>
        );

        // Si es false la autentivcacon, el HTML del componete es vacio
        // El redirect es un string vacio
        expect(wrapper.find("span").exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', props.location.pathname);
    });

    test('debe de mostar el componente si no esta autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute // Debe de estar dentro de un router siempre
                    isAutenticated={false} 
                    component={ () => <span>Listo</span>} // Espera una funcion
                    {...props}
                />
            </MemoryRouter>
        );
        expect(wrapper.find("span").exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', props.location.pathname);
    });
});