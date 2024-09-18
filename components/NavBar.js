import styles from '../styles/Navbar.module.css';

const Navbar = ({ setSearchTerm }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.hamburgerMenu}>
        <button>
          <i className="fas fa-bars"></i> {/* Font Awesome hamburger icon */}
        </button>
        <ul>
          <li>Action</li>
          <li>Adventure</li>
          <li>Puzzle</li>
          {/* Add more genres as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
