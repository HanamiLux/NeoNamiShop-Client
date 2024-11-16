import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface AuthModalProps {
    show: boolean;
    onHide: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onHide }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = () => {
        // Логика для обработки входа
        console.log('Вход выполнен');
        onHide(); // Закрыть модальное окно после входа
    };

    const handleRegister = () => {
        // Логика для обработки регистрации
        console.log('Регистрация выполнена');
        onHide(); // Закрыть модальное окно после регистрации
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isLogin ? 'Вход' : 'Регистрация'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {!isLogin && (
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control type="text" placeholder="Введите имя" />
                        </Form.Group>
                    )}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите пароль" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={isLogin ? handleLogin : handleRegister}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
                <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AuthModal;