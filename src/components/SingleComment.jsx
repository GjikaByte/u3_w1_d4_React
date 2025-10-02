import { ListGroup } from 'react-bootstrap';

export default function SingleComment({ comment }) {
  // comment: { _id, comment, rate, elementId, ... }
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <strong>{comment.author}</strong>
      <span>{comment.comment}</span>
      <small>⭐ {comment.rate}</small>
    </ListGroup.Item>
  );
}
