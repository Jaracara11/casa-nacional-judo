import './membersTable.css';
import Table from 'react-bootstrap/esm/Table';
import { useState, useEffect } from 'react';
import { getAllMembers } from '../../services/members.service';
import { IMember } from '../../interfaces/IMember';
import { Spinner } from '../spinner/spinner';
import { NavigateBtn } from '../buttons/navigateButton/navigateBtn';

export const MembersTable = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const loadMembers = async () => {
      await getAllMembers()
        .then((response) => {
          setMembers(response);
          console.log(response);
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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cedula</th>
          <th>Fecha De Nacimiento</th>
          <th>Teléfono</th>
          <th>Grado</th>
          <th>Mensualidad</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {members.map((x: IMember) => (
          <tr key={x.id}>
            <td>{`${x.firstName} ${x.lastName}`}</td>
            <td>{x.identification}</td>
            <td>{x.birthDate}</td>
            <td>{x.phone1}</td>
            <td>{x.belt}</td>
            <td>{x.totalAmountDue}</td>
            <td>
              <NavigateBtn route={`/edit-member/${x.id}`} variant='btn btn-success btn-sm' text={'Mas Información'} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
