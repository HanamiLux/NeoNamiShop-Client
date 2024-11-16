import React from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

const CatalogPage: React.FC = () => {
    return (
        <Container>
            <h1>Каталог товаров</h1>
            <Row>
                <Col md={3}>
                    <Form>
                        <Form.Group controlId="formBasicSearch">
                            <Form.Label>Поиск</Form.Label>
                            <Form.Control type="text" placeholder="Введите название товара" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Категория</Form.Label>
                            <Form.Control as="select">
                                <option>Все</option>
                                <option>Категория 1</option>
                                <option>Категория 2</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9}>
                    <Row>
                        {/* Здесь будет список товаров */}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default CatalogPage;