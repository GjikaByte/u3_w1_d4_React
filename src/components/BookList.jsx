import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import SingleBook from './SingleBook.jsx';

export default function BookList({ books = [] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = books.filter(b =>
    (b.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={4} className="text-center">
          <Form.Group>
            <Form.Control
              type="search"
              placeholder="Cerca un libro"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-2 mt-3">
        {filtered.map((b) => (
          <Col xs={12} md={4} key={b.asin}>
            <SingleBook book={b} />
          </Col>
        ))}
      </Row>
    </>
  );
}
