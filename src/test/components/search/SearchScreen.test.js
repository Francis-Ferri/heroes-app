import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {
    
    test('debe de mostrarse correctamnete con valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe("Search a hero");
    });
    
    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        
        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de mostar un eror si o se necuentra el hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=no-existe']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        
        expect(wrapper.find('input').prop('value')).toBe('no-existe');
        expect(wrapper.find('.alert-danger').exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de llamar el push del history', () => {
        const history = {
            push: jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=no-existe']}>
                <Route 
                    path="/search" 
                    component={() => <SearchScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: "searchText",
                value: "batman"
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        expect( history.push ).toHaveBeenCalledWith('?q=batman');
    });
});