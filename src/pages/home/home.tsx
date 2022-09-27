import { MembersTable } from '../../components/membersTable/membersTable';
import { NavigateBtn } from '../../components/buttons/navigateButton/navigateBtn';
import './home.css';

export const Home = () => {
    return (
        <div className='home-container'>
            <div className='btn-panel'>
                <NavigateBtn variant='primary' route='/add-member' text='Agregar Nuevo Miembro' />
            </div>
            <MembersTable />
        </div>
    );
};
