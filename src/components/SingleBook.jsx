import { useState } from 'react';
import { Card } from 'react-bootstrap';

export default function SingleBook({ book, selected = false, onSelect }) {
  const [selectedAsin, setSelectedAsin] = useState(null);

  const handleClick = () => {
    const next = selectedAsin === book.asin ? null : book.asin;
    setSelectedAsin(next);
    onSelect?.(next); 
  };

  if (!book) return null;

  return (
    <Card
      onClick={handleClick}
      style={{
        border: selected ? '3px solid red' : 'none',
        cursor: 'pointer',
      }}
      role="button"
      aria-pressed={selected}
    >
      <Card.Img variant="top" src={book.img} alt={book.title} />
      <Card.Body>
        <Card.Title style={{ color: 'black' }}>{book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}
