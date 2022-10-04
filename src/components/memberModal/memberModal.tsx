import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const MemberModal = (props: any) => {
    return (
        <>
            <Modal show={props.show} onHide={props.toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
