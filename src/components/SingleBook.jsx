import { Component } from 'react'
import { Card } from 'react-bootstrap'
import CommentArea from './CommentArea.jsx'

class SingleBook extends Component {
  state = { selected: false }

  render() {
    const { book } = this.props
    const { selected } = this.state

    return (
      <>
        <Card
          onClick={() => this.setState({ selected: !selected })}
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
    )
  }
}

export default SingleBook
