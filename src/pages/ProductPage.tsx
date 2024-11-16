import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const ProductPage: React.FC = () => {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/400" />
                        <Card.Body>
                            <Card.Title>Название товара</Card.Title>
                            <Card.Text>Описание товара</Card.Text>
                            <Button variant="primary">Добавить в корзину</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <h2>Отзывы</h2>
                    <Form>
                        <Form.Group controlId="formBasicReview">
                            <Form.Label>Ваш отзыв</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Отправить отзыв
                        </Button>
                    </Form>
                    {/* Здесь будет список отзывов */}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;