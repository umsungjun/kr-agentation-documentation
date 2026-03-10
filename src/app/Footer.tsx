export function Footer() {
  return (
    <footer
      className="footer"
      style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>
          제작:{' '}
          <a
            href="https://x.com/benjitaylor"
            target="_blank"
            rel="noopener noreferrer"
          >
            Benji Taylor
          </a>
          ,{' '}
          <a
            href="https://x.com/seldom"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dennis Jin
          </a>
          ,{' '}
          <a
            href="https://x.com/alexvanderzon"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alex Vanderzon
          </a>
        </p>
        <a href="/colophon">콜로폰</a>
      </div>
      <p>
        번역:{' '}
        <a
          href="https://github.com/umsungjun"
          target="_blank"
          rel="noopener noreferrer"
        >
          umsungjun
        </a>{' '}
        ·{' '}
        <a
          href="https://www.linkedin.com/in/frontend-developer-umsungjun"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
}
