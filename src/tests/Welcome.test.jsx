import { render, screen } from '@testing-library/react';
import Welcome from '../components/Welcome.jsx';

describe('Welcome', () => {
  it('getBy* — mostra il titolo', () => {
    render(<Welcome />);
    expect(
      screen.getByRole('heading', { name: /benvenuti in epibooks!/i })
    ).toBeInTheDocument();
  });

  it('queryBy* — non mostra un sottotitolo inesistente', () => {
    render(<Welcome />);
    expect(screen.queryByText(/sottotitolo/i)).toBeNull();
  });

  it('getAllBy* — conta le intestazioni presenti', () => {
    render(<Welcome />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('findBy* — può attendere l’heading (asincrono)', async () => {
    render(<Welcome />);
    const h1 = await screen.findByRole('heading', { name: /benvenuti in epibooks!/i });
    expect(h1).toBeInTheDocument();
  });

  it('findAllBy* / queryAllBy* — collezioni', async () => {
    render(<Welcome />);
    const now = screen.queryAllByRole('heading');     // array (può essere vuoto)
    const later = await screen.findAllByRole('heading'); // attende se necessario
    expect(later.length).toBe(now.length);
  });
});
