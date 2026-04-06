import { CATEGORIES } from '../data/practitioners'

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="stars" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <span key={i}>★</span>
        if (i === full && half) return <span key={i} className="half">★</span>
        return <span key={i} className="empty">★</span>
      })}
    </span>
  )
}

export default function PractitionerCard({ practitioner }) {
  const { name, category, tagline, description, neighborhood, phone, website, rating, reviews, accepting, tags } = practitioner
  const cat = CATEGORIES.find((c) => c.id === category)

  return (
    <div className={`practitioner-card ${!accepting ? 'not-accepting' : ''}`}>
      <div className="card-header">
        <div className="card-emoji">{cat?.emoji}</div>
        <div className="card-header-text">
          <h3 className="practitioner-name">{name}</h3>
          <p className="practitioner-tagline">{tagline}</p>
        </div>
        <span className={`availability-badge ${accepting ? 'accepting' : 'full'}`}>
          {accepting ? 'Accepting' : 'Waitlist'}
        </span>
      </div>

      <p className="practitioner-description">{description}</p>

      <div className="card-tags">
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="card-footer">
        <div className="card-meta">
          <span className="neighborhood">📍 {neighborhood}</span>
          <div className="rating-row">
            <StarRating rating={rating} />
            <span className="rating-number">{rating}</span>
            <span className="review-count">({reviews} reviews)</span>
          </div>
        </div>
        <div className="card-actions">
          <a href={`tel:${phone}`} className="btn btn-secondary">{phone}</a>
          <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Visit Website
          </a>
        </div>
      </div>
    </div>
  )
}
