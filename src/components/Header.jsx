export default function Header({ searchTerm, onSearchChange, theme, onThemeToggle }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-logo">PinkStore</h1>
        </div>

        <div className="header-search">
          <input
            type="search"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search for products..."
            className="search-input"
          />
        </div>

        <nav className="header-nav">
          <button onClick={onThemeToggle} className="nav-button theme-toggle" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            )}
          </button>
          <button className="nav-button">
            Sign In
          </button>
          <button className="nav-button nav-button-primary">
            Sign Up
          </button>
          <button className="nav-button cart-button" title="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75a3 3 0 0 0-3-3H7.5Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 1.5a.75.75 0 0 1 .75.75v1.5H18a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5H13.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 0 1 .75-.75Zm-7.5 3-1.036 6.219a.75.75 0 0 0 .741.835h10.02a.75.75 0 0 0 .74-.835L18 4.5H8.25Z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}