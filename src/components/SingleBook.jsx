import { useState } from 'react';
import { Card } from 'react-bootstrap';
import CommentArea from './CommentArea.jsx';

export default function SingleBook({ book }) {
  const [selected, setSelected] = useState(false);

  if (!book) return null;

  return (
    <>
      <Card
        onClick={() => setSelected(s => !s)}
        style={{ border: selected ? '3px solid red' : 'none', cursor: 'pointer' }}
      >
        <Card.Img variant="top" src={book.img} alt={book.title} />
        <Card.Body>
          <Card.Title style={{ color: 'black' }}>{book.title}</Card.Title>
        </Card.Body>
      </Card>

      {/* mostra i commenti solo quando selected è true */}
      {selected && <CommentArea asin={book.asin} />}
    </>
  );
}
