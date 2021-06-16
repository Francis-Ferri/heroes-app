import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {

    const {user} = useContext(AuthContext);

    return (
        <Router>
            <div>

                <Switch>
                    <PublicRoute 
                        exact
                        path="/login" 
                        isAutenticated={user.logged} 
                        component={ LoginScreen }
                    />
                    <PrivateRoute 
                        path="/" 
                        isAutenticated={user.logged}
                        component={ DashboardRoutes } 
                    />
                </Switch>
            </div>
        </Router>
    );
}
