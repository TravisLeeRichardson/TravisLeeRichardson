export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by name, specialty, or neighborhood..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button className="clear-btn" onClick={() => onChange('')} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
