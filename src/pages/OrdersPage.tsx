import React from 'react';
import { Container, Table } from 'react-bootstrap';

const OrdersPage: React.FC = () => {
    return (
        <Container>
            <h1>Мои заказы</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Товар</th>
                    <th>Дата</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {/* Здесь будет список заказов */}
                </tbody>
            </Table>
        </Container>
    );
};

export default OrdersPage;