import './memberModal.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { IMember } from '../../interfaces/IMember';
import { formatDate, getAgeFromDate } from '../../utils/helper';

export const MemberModal = (props: any) => {
    const member: IMember = props.member;

    return (
        <>
            <Modal show={props.show} onHide={props.toggle} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong>{member.firstName + ' ' + member.lastName}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup className='list-group-flush'>
                        <ListGroup.Item>
                            <strong>Peso:</strong> {member.weight}kg
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Edad:</strong> {getAgeFromDate(member.birthDate)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Cinturón:</strong> {member.belt}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Tipo de sangre:</strong> {member.bloodType}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Identificación:</strong> {member.identification}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Email:</strong> {member.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Teléfono 1:</strong> {member.phone1}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Teléfono 2:</strong> {member.phone2}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Anualidad: </strong> {member.anualFee} RD$
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Mensualidad: </strong> {member.monthlyFee} RD$
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Total Adeudado: </strong> <u>{member.totalAmountDue} RD$</u>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Fecha de inscripción: </strong> {formatDate(member.signUpDate)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Dirección: </strong> {member.address}
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='outline-dark'
                        onClick={() => {
                            props.toggle(false);
                        }}>
                        Cerrar
                    </Button>
                    <Button variant='primary' onClick={() => {}}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
