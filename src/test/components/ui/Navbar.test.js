import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router";

import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";


describe('Pruebas en <Navbar />', () => {
    // Este objeto va a servir para fingir el history del Router
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    };

    const contextValue = {
        user: {
            name: "Francis",
            logged: true
        },
        dispatch: jest.fn()
    };

    const wrapper = mount(
        // Si la prueba usa un contexto de alguna manera hay que proveerlo
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe(contextValue.user.name);
    });

    test('debe de llamar el logout y usar history', () => {
        // wrapper.find("button").simulate("click");
        wrapper.find("button").prop("onClick")();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith("/login");

        


    });
});