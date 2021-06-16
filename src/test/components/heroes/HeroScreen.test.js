import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router';

describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };
    
    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero']}>
            <HeroScreen history={history}/>
        </MemoryRouter>
    );
    
    test('debe de mostarr el componente redirect si no hay argumentos en el url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history}/>
            </MemoryRouter>
        );
        expect(wrapper.find("Redirect").exists()).toBe(true);
    });

    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find(".row").exists()).toBe(true);

    });

    test('debe de regresar a la raiz con push', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={(props) => <HeroScreen history={history}/>} />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();

    });

    test('debe de regresar a la pantalla anterior con goBack', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={(props) => <HeroScreen history={history}/>} />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.push).not.toHaveBeenCalled();
        expect(history.goBack).toHaveBeenCalled();
    });

    test('debe de llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/algo-inventado']}>
                <Route path="/hero/:heroeId" component={(props) => <HeroScreen history={history}/>} />
            </MemoryRouter>
        );
        expect(wrapper.text()).toBe('');

    });
});