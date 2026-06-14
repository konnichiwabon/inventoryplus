import './card.css'

type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

interface CardProps {
  icon?: string
  title?: string
  category?: string
  quantity?: number
  price?: number
  sku?: string
  status?: StockStatus
  onEdit?: () => void
  onDelete?: () => void
}

const statusLabel: Record<StockStatus, string> = {
  'in-stock': '● In Stock',
  'low-stock': '▲ Low Stock',
  'out-of-stock': '✕ Out of Stock',
}

export default function Card({
  icon = '📦',
  title = 'Product Name',
  category = 'Category',
  quantity = 0,
  price = 0.00,
  sku = 'SKU-0000',
  status = 'in-stock',
  onEdit,
  onDelete,
}: CardProps) {
  return (
    <div className="card-scene" aria-label={`Inventory card for ${title}`}>
      <div className="card-3d" role="article">

        {/* ── Front ── */}
        <div className="card-front">
          <div className="card-icon" aria-hidden="true">{icon}</div>

          <span className={`card-badge ${status}`}>
            {statusLabel[status]}
          </span>

          <h2 className="card-title">{title}</h2>
          <p className="card-category">{category}</p>

          <div className="card-divider" />

          <div className="card-stats">
            <div className="card-stat">
              <span className="card-stat-label">Qty</span>
              <span className="card-stat-value">{quantity}</span>
            </div>
            <div className="card-stat" style={{ textAlign: 'right' }}>
              <span className="card-stat-label">Price</span>
              <span className="card-stat-value">${price.toFixed(2)}</span>
            </div>
          </div>

          <p className="card-hint">⟳ Hover to see details</p>
        </div>

        {/* ── Back ── */}
        <div className="card-back">
          <p className="card-back-title">Item Details</p>

          <div className="card-detail-row">
            <span className="card-detail-key">SKU</span>
            <span className="card-detail-val">{sku}</span>
          </div>
          <div className="card-detail-row">
            <span className="card-detail-key">Category</span>
            <span className="card-detail-val">{category}</span>
          </div>
          <div className="card-detail-row">
            <span className="card-detail-key">Quantity</span>
            <span className="card-detail-val">{quantity} units</span>
          </div>
          <div className="card-detail-row">
            <span className="card-detail-key">Unit Price</span>
            <span className="card-detail-val">${price.toFixed(2)}</span>
          </div>
          <div className="card-detail-row">
            <span className="card-detail-key">Total Value</span>
            <span className="card-detail-val">${(quantity * price).toFixed(2)}</span>
          </div>

          <div className="card-actions">
            <button id={`edit-${sku}`} className="card-btn edit" onClick={onEdit}>
              ✏️ Edit
            </button>
            <button id={`delete-${sku}`} className="card-btn delete" onClick={onDelete}>
              🗑 Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
