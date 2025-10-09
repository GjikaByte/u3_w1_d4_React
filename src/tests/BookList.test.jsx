import { render } from '@testing-library/react';
import BookList from '../components/BookList.jsx';
import fantasy from '../data/fantasy.json';

describe('BookList', () => {
  it('renderizza una card per ogni libro nel JSON', () => {
    const { container } = render(<BookList books={fantasy} />);
    const cards = container.querySelectorAll('.card'); // bootstrap card
    expect(cards.length).toBe(fantasy.length);
  });
});
