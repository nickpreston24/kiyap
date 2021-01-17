import { observer } from 'mobx-react-lite';
import React from 'react'
import BugsPage from './bugs'

export const AdminPage = observer(() => {
    return (
        <div>
            <BugsPage />
        </div>
    )
});

export default AdminPage;
