import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb" style={styles.container}>
      <ol style={styles.list}>
        <li style={styles.item}>
          <Link to="/" style={styles.homeLink}>
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name} style={styles.item}>
              <span style={styles.separator}>&gt;</span>
              {isLast ? (
                <span style={styles.current}>{name}</span>
              ) : (
                <Link to={routeTo} style={styles.link}>
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const styles = {
  container: {
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
  },
  homeLink: {
    color: '#007bff',
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
    fontWeight: 600,
  },
  current: {
    color: '#6c757d',
    fontWeight: 600,
  },
  separator: {
    color: '#6c757d',
    margin: '0 0.5rem',
  },
};

export default Breadcrumb;