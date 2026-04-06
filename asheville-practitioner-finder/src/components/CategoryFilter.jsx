import { CATEGORIES } from '../data/practitioners'

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="category-filter">
      <div className="category-scroll">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selected === cat.id ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            <span className="cat-emoji">{cat.emoji}</span>
            <span className="cat-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
