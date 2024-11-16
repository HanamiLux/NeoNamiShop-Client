import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const ProfilePage: React.FC = () => {
    return (
        <Container>
            <h1>Мой профиль</h1>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" placeholder="Введите имя" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Введите email" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Сохранить
                </Button>
            </Form>
        </Container>
    );
};

export default ProfilePage;