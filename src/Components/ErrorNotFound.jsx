import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Error.css'

export default function ErrorNotFound({showForCityNotFound, handleCloseNotFound, inputCity}) {
    return (
        <Modal show={showForCityNotFound} onHide={handleCloseNotFound}>
            <Modal.Header>
            <Modal.Title>Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{`${inputCity}`} was not found</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" className="button-close" onClick={handleCloseNotFound}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
