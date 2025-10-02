import { Component } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import CommentsList from './CommentsList.jsx';
import AddComment from './AddComment.jsx';

const BASE_URL = 'https://striveschool-api.herokuapp.com/api/comments/';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGRlNzBhYjk2MDFiZjAwMTViNGE3MzciLCJpYXQiOjE3NTk0MDgyOTksImV4cCI6MTc2MDYxNzg5OX0.Uzq4zcSW9kcIFserkiQEItDiM1zQG_YtajvtJpHFcEY';

export default class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    errMsg: '',
  };

  async fetchComments(asin) {
    if (!asin) return;
    this.setState({ isLoading: true, errMsg: '' });
    try {
      const res = await fetch(`${BASE_URL}${encodeURIComponent(asin)}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      const data = await res.json();
      this.setState({ comments: data, isLoading: false, errMsg: '' });
    } catch (err) {
      this.setState({
        errMsg: err.message || 'Errore di rete',
        isLoading: false,
      });
    }
  }

  componentDidMount() {
    this.fetchComments(this.props.asin);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.fetchComments(this.props.asin);
    }
  }

  // chiamato da AddComment dopo una POST andata a buon fine
  handleCreated = () => {
    this.fetchComments(this.props.asin);
  };

  render() {
    const { comments, isLoading, errMsg } = this.state;
    const { asin } = this.props;

    return (
      <div className="mt-3">
        <h6 className="mb-2">Commenti</h6>

        {isLoading && (
          <div className="ml-2 mb-2">
            <Spinner animation="border" size="sm" /> Caricamento commenti…
          </div>
        )}

        {errMsg && <Alert variant="warning">Cannot load the data: {errMsg}</Alert>}

        {!isLoading && !errMsg && (
          <>
            <CommentsList comments={comments} />
            {/* key=asin così il form si resetta quando cambi libro */}
            <AddComment key={asin} asin={asin} onCreated={this.handleCreated} />
          </>
        )}
      </div>
    );
  }
}
