import { ListGroup } from 'react-bootstrap';
import SingleComment from './SingleComment.jsx';

export default function CommentsList({ comments = [] }) {
  if ( comments.length === 0) {
    return <p className="text-muted mb-0">Nessun commento per questo libro.</p>;
  }

  return (
    <ListGroup className="mb-3">
      {comments.map((c) => (
        <SingleComment key={c._id} comment={c} />
      ))}
    </ListGroup>
  );
}
