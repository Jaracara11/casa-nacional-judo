import './membersTable.css';
import Table from 'react-bootstrap/esm/Table';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllMembers } from '../../repository/members.repository';
import { Member } from '../../interfaces/Member';
import { Spinner } from '../spinner/spinner';
import { formatDate } from '../../utils/helper';
import { MemberModal } from '../memberModal/memberModal';

export const MembersTable = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [members, setMembers] = useState<Member[]>([]);
    const [member, setMember] = useState({} as Member);
    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => setShowModal((prev) => !prev);

    useEffect(() => {
        getAllMembers()
            .then((response) => {
                setMembers(response);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoadingData(false);
            });
    }, []);

    return loadingData ? (
        <Spinner />
    ) : (
        <>
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
                    {members.map((member: Member) => (
                        <tr key={member.id}>
                            <td>{`${member.firstName} ${member.lastName}`}</td>
                            <td>{member.weight}kg</td>
                            <td>{formatDate(member.birthDate)}</td>
                            <td>{member.phone1}</td>
                            <td>{member.belt}</td>
                            <td>{member.totalAmountDue} RD$</td>
                            <td>
                                <Link
                                    to={'#'}
                                    onClick={() => {
                                        setMember(member);
                                        toggleModal();
                                    }}>
                                    Ver más
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {showModal && <MemberModal member={member} toggle={toggleModal} show={showModal} />}
        </>
    );
};
