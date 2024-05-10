import { useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';

import App from './App';


export default function RouterUrl() {
    return useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <App />
                }
            ]
        }
    ])
}
