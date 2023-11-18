import React from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export default function ProductCard({ BuyProduct, image, productName, price, id }: any) {
    const [Quantity, setQuantity] = React.useState(1)
    function decrease() {
        setQuantity(a => a === 1 ? 1 : a - 1)
    }
    function Increase() {
        setQuantity(a => a + 1)
    }
    return (
        <>
            <Col lg={3} md={4} sm={12} className="product_card my-2">
                <Card>
                    <Card.Img variant="top" src={image ? image.src : ''} />
                    <Card.Body>
                        <Card.Title>{productName ? productName : 'Card Title'}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Card.Text style={{ fontWeight: 'bold' }}>
                            Price : {price} GLD
                        </Card.Text>
                        <Card.Text style={{ fontWeight: 'bold' }}>
                            Total Price : {(price * Quantity)} GLD
                        </Card.Text>
                        <Form.Label htmlFor="Quantity">Quantity</Form.Label>
                        <InputGroup className="mb-3 w-50">
                            <Button variant="outline-secondary" id="button-addon1" onClick={decrease}>
                                -
                            </Button>
                            <Form.Control
                                className='text-center'
                                disabled
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                value={Quantity}
                            />
                            <Button variant="outline-secondary" id="button-addon1" onClick={Increase}>
                                +
                            </Button>
                        </InputGroup>
                        <Button onClick={() => BuyProduct((price * Quantity), Quantity, id)} variant="primary w-100 my-2">Buy</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
