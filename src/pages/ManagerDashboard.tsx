import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const ManagerDashboard: React.FC = () => {
    return (
        <Container>
            <h1>Менеджер-панель</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Товар</th>
                    <th>Категория</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {/* Здесь будет список товаров */}
                </tbody>
            </Table>
            <Button variant="primary">Добавить товар</Button>
        </Container>
    );
};

export default ManagerDashboard;