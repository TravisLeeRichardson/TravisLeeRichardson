import { useState, useMemo } from 'react'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import PractitionerCard from './components/PractitionerCard'
import { practitioners, CATEGORIES } from './data/practitioners'

export default function App() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return practitioners.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
      if (!matchesCategory) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [search, selectedCategory])

  const activeCategoryLabel = CATEGORIES.find((c) => c.id === selectedCategory)?.label

  function handleCategorySelect(id) {
    setSelectedCategory(id)
    setSearch('')
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="hero-badge">🏔️ Asheville, NC</div>
          <h1 className="hero-title">Find Your Practitioner</h1>
          <p className="hero-subtitle">
            Discover holistic health and wellness practitioners right here in the Blue Ridge Mountains.
          </p>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="mountain-silhouette" aria-hidden="true" />
      </header>

      <main className="main-content">
        <CategoryFilter selected={selectedCategory} onSelect={handleCategorySelect} />

        <div className="results-header">
          <p className="results-count">
            <strong>{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'practitioner' : 'practitioners'}
            {selectedCategory !== 'all' && ` in ${activeCategoryLabel}`}
            {search && ` matching "${search}"`}
          </p>
          {(selectedCategory !== 'all' || search) && (
            <button
              className="clear-filters-btn"
              onClick={() => { setSelectedCategory('all'); setSearch('') }}
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="practitioners-grid">
            {filtered.map((p) => (
              <PractitionerCard key={p.id} practitioner={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🌿</div>
            <h3>No practitioners found</h3>
            <p>Try adjusting your search or browse a different category.</p>
            <button className="btn btn-primary" onClick={() => { setSelectedCategory('all'); setSearch('') }}>
              View All Practitioners
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          🏔️ Asheville Practitioner Finder &mdash; Supporting the local wellness community
        </p>
        <p className="footer-sub">
          Are you a practitioner? <a href="mailto:hello@ashevillepractitioners.com">Get listed →</a>
        </p>
      </footer>
    </div>
  )
}
