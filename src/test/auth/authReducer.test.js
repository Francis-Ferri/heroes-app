import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    test('debe de retornar el estado por defecto', () => {
        const newState = authReducer({logged: false}, {});
        expect(newState).toEqual({logged: false});
    });

    test('debe de autenticar y colocar el name del usuario', () => {
        const action = {
            type: types.login,
            payload: {name: "Francis"}
        };

        const newState = authReducer({logged: false}, action);
        
        const { name } = action.payload; 
        expect(newState).toEqual({name, logged:true});
    });

    test('debe de borra el  name del usuario y logged en false ', () => {
        const action = {type: types.logout};

        const newState = authReducer({logged: true, name: "Francis"}, action);

        expect(newState).toEqual({logged: false});
    });
});