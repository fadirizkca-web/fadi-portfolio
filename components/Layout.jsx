import { NavLink } from 'react-router-dom';

function Layout() {

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/about' },
    { label: 'Projects', path: '/project' },
    { label: 'Education', path: '/education' },
    { label: 'Services', path: '/services' },
    { label: 'Contact Me', path: '/contact' }
  ];

  return (
    <header className="site-header">

      <div className="container navigation-wrapper">

        <NavLink
          className="brand"
          to="/"
        >
          <span className="logo-mark">
            FR
          </span>

          <span className="brand-name">
            Fadi Rizk
          </span>
        </NavLink>

        <nav aria-label="Main navigation">

          {navigationLinks.map((link) => (

            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              {link.label}
            </NavLink>

          ))}

        </nav>

      </div>

    </header>
  );
}

export default Layout;