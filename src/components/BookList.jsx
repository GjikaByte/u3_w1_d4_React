import { useState } from 'react';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import SingleBook from './SingleBook.jsx';
import CommentArea from './CommentArea.jsx';

export default function BookList({ books = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsin, setSelectedAsin] = useState(null); 
  const filtered = books.filter(b =>
    (b.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (asin) => {
    setSelectedAsin((prev) => (prev === asin ? null : asin));
  };

  return (
    <>

      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
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

      <Row className="mt-3">

        <Col xs={12} md={8}>
          <Row className="g-2">
            {filtered.map((b) => (
              <Col xs={12} sm={6} lg={4} key={b.asin}>
                <SingleBook
                  book={b}
                  selected={b.asin === selectedAsin}
                  onSelect={handleSelect}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={12} md={4} className="mb-3 mb-md-0">
          <div className="position-sticky py-3" style={{ top: '1rem' }}>
            {selectedAsin ? (
              <CommentArea asin={selectedAsin} />
            ) : (
              <Alert variant="secondary" className="mb-0">
                Seleziona un libro per vedere i commenti.
              </Alert>
            )}
          </div>
        </Col>

      </Row>
    </>
  );
}
