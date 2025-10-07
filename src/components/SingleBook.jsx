import { Card } from 'react-bootstrap';

export default function SingleBook({ book, selected = false, onSelect }) {
  if (!book) return null;

  const handleClick = () => {
    // send the asin up to BookList
    onSelect?.(book.asin);
  };

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
