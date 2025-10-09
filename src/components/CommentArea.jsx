import { useEffect, useState, useCallback } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import CommentsList from './CommentsList.jsx';
import AddComment from './AddComment.jsx';

const BASE_URL = 'https://striveschool-api.herokuapp.com/api/comments/';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGRlNzBhYjk2MDFiZjAwMTViNGE3MzciLCJpYXQiOjE3NTk0MDgyOTksImV4cCI6MTc2MDYxNzg5OX0.Uzq4zcSW9kcIFserkiQEItDiM1zQG_YtajvtJpHFcEY';

export default function CommentArea({ asin }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const fetchComments = useCallback(async (id) => {
    if (!id) return;
    setIsLoading(true);
    setErrMsg('');
    try {
      const res = await fetch(`${BASE_URL}${encodeURIComponent(id)}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrMsg(err.message || 'Errore di rete');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments(asin);
  }, [asin, fetchComments]);

  const handleCreated = () => fetchComments(asin);

  return (
    <div className="mt-3">
      {/* sticky wrapper so the panel stays in view while scrolling the page */}
      <div className="position-sticky" style={{ top: '4rem' }}>
        <h6 className="mb-2">Commenti</h6>

        {isLoading && (
          <div className="ml-2 mb-2">
            <Spinner animation="border" size="sm" /> Caricamento commenti…
          </div>
        )}

        {errMsg && <Alert variant="warning">Cannot load the data: {errMsg}</Alert>}

        {!isLoading && !errMsg && (
          <>
            {/* scrollable list area */}
            <div
              style={{
                maxHeight: '60vh',         // adjust to your layout
                overflowY: 'auto',
                paddingRight: '.25rem',    // a bit of space for scrollbar
                overscrollBehavior: 'contain',
              }}
            >
              <CommentsList comments={comments} />
            </div>

            {/* form stays visible below the list */}
            <AddComment key={asin} asin={asin} onCreated={handleCreated} />
          </>
        )}
      </div>
    </div>
  );
}
