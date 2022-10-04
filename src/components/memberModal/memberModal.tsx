import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { debug } from 'console';

export const MemberModal = (displayModal: any) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log('Modal Rendered');
        displayModal && setShow(!show);
        return () => {
            setShow(!show);
        };
    }, []);

    return (
        displayModal && (
            <>
                <Modal
                    show={show}
                    onHide={() => {
                        setShow(!show);
                    }}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant='secondary'
                            onClick={() => {
                                setShow(!show);
                            }}>
                            Close
                        </Button>
                        <Button
                            variant='primary'
                            onClick={() => {
                                setShow(!show);
                            }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    );
};
