import './membersTable.css';
import Table from 'react-bootstrap/esm/Table';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllMembers } from '../../repository/members.repository';
import { IMember } from '../../interfaces/IMember';
import { Spinner } from '../spinner/spinner';
import { formatDate } from '../../utils/helper';

export const MembersTable = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [members, setMembers] = useState<IMember[]>([]);

    useEffect(() => {
        const loadMembers = async () => {
            await getAllMembers()
                .then((response) => {
                    setMembers(response);
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoadingData(false);
        };
        loadMembers();
    }, []);

    return loadingData ? (
        <Spinner />
    ) : (
        <Table className='members-table' responsive hover>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Peso</th>
                    <th>Fecha De Nacimiento</th>
                    <th>Teléfono</th>
                    <th>Grado</th>
                    <th>Mensualidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {members.map((member: IMember) => (
                    <tr key={member.id}>
                        <td>{`${member.firstName} ${member.lastName}`}</td>
                        <td>{member.weight} kg</td>
                        <td>{formatDate(member.birthDate)}</td>
                        <td>{member.phone1}</td>
                        <td>{member.belt}</td>
                        <td>{member.totalAmountDue}</td>
                        <td>
                            <Link to={`/edit-member/${member.id}`}>Mas Información</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
