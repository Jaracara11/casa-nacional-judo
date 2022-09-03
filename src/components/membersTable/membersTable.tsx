import Table from 'react-bootstrap/esm/Table';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import { getAllMembers } from '../../services/members.service';
import { formatTimeStamp } from '../../utils/helper';
import IMember from '../../interfaces/IMember';

const MembersTable = () => {
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
    <Table className='table table-hover'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cedula</th>
          <th>Fecha De Nacimiento</th>
          <th>Teléfono</th>
          <th>Grado</th>
          <th>Mensualidad</th>
        </tr>
      </thead>
      <tbody>
        {members.map((x: IMember) => (
          <tr key={x.id}>
            <td>{`${x.firstName} ${x.lastName}`}</td>
            <td>{x.identification}</td>
            <td>{formatTimeStamp(x.birthDate)}</td>
            <td>{x.phone1}</td>
            <td>{x.belt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MembersTable;
