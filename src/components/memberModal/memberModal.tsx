import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { IMember } from '../../interfaces/IMember';
import { getAgeFromDate } from '../../utils/helper';

export const MemberModal = (props: any) => {
    const member: IMember = props.member;

    return (
        <>
            <Modal show={props.show} onHide={props.toggle} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>{member.firstName + ' ' + member.lastName}</Modal.Title>
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
