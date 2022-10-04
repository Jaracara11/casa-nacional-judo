import './memberModal.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavigateBtn } from '../buttons/navigateButton/navigateBtn';
import { IMember } from '../../interfaces/IMember';
import { formatDate, getAgeFromDate } from '../../utils/helper';
import { getImageURL } from '../../repository/storage.repository';

export const MemberModal = (props: any) => {
    const member: IMember = props.member;
    const [imageURL, setImageURL] = useState<string>('');

    useEffect(() => {
        member.hasDocumentImage &&
            getImageURL(member.id!).then((url) => {
                setImageURL(url);
            });
    }, []);

    return (
        <div className='member-modal'>
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
                            <strong>Edad:</strong> {getAgeFromDate(member.birthDate)} años
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Fecha de nacimiento:</strong> {formatDate(member.birthDate)}
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
                        {imageURL && (
                            <ListGroup.Item>
                                <strong>Imagen de documento:</strong>
                                <img className='img-preview' src={imageURL} alt='Preview' />
                            </ListGroup.Item>
                        )}
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
                    <Link className='btn btn-primary' to={'/edit-member'} state={{ member, imageURL }}>
                        Editar
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
