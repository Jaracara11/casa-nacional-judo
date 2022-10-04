import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { IMember } from '../../interfaces/IMember';
import { ListGroupItem } from 'react-bootstrap';
import { getAgeFromDate } from '../../utils/helper';

export const MemberModal = (props: any) => {
    const member: IMember = props.member;

    return (
        <>
            <Modal show={props.show} onHide={props.toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{member.firstName + ' ' + member.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup className='list-group-flush'>
                        <ListGroup.Item>
                            <strong>Peso:</strong> {member.weight} kg
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Cinturón:</strong> {member.belt}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Edad:</strong> {getAgeFromDate(member.birthDate)}
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            props.toggle(false);
                        }}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={() => {}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
