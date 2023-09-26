import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Error.css'

export default function ErrorEmptyInput({showForEmptyInput, handleCloseEmpty}) {
    return (
        <Modal show={showForEmptyInput} onHide={handleCloseEmpty}>
            <Modal.Header>
            <Modal.Title>Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please enter a city/country name</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" className="button-close" onClick={handleCloseEmpty}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}