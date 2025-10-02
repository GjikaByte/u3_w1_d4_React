import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const BASE_URL = 'https://striveschool-api.herokuapp.com/api/comments/';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGRlNzBhYjk2MDFiZjAwMTViNGE3MzciLCJpYXQiOjE3NTk0MDgyOTksImV4cCI6MTc2MDYxNzg5OX0.Uzq4zcSW9kcIFserkiQEItDiM1zQG_YtajvtJpHFcEY';

export default function AddComment({ asin, onCreated }) {
  const [text, setText] = useState('');
  const [rate, setRate] = useState('5');
  const [saving, setSaving] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [okMsg, setOkMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!asin) return;

    setSaving(true);
    setErrMsg('');
    setOkMsg('');

    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: text,
          rate: String(rate), // 1..5 come stringa
          elementId: asin,
        }),
      });

      if (!res.ok) throw new Error(`POST failed: ${res.status}`);
      await res.json();

      setOkMsg('Commento aggiunto con successo!');
      setText('');
      setRate('5');
      onCreated?.(); // chiedi al parent di ricaricare i commenti
    } catch (err) {
      setErrMsg(err.message || 'Errore salvataggio commento');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errMsg && <Alert variant="danger">{errMsg}</Alert>}
      {okMsg && <Alert variant="success">{okMsg}</Alert>}

      <Form.Group className="mb-2" controlId="commentText">
        <Form.Label>Lascia un commento</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Scrivi qui…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="commentRate">
        <Form.Label>Voto</Form.Label>
        <Form.Select
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        >
          <option value="1">1 - Pessimo</option>
          <option value="2">2</option>
          <option value="3">3 - Così così</option>
          <option value="4">4</option>
          <option value="5">5 - Ottimo</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary" disabled={!asin || saving}>
        {saving ? <Spinner animation="border" size="sm" /> : 'Invia commento'}
      </Button>
    </Form>
  );
}
