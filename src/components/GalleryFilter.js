import "./GalleryFilter.css";

function GalleryFilter({
  tagCounts,
  selectedTags,
  onToggleTag,
  onClearTags,
  sortOrder,
  onChangeSort,
}) {
  return (
    <aside className="gallery-filter">
      <h2>Filters</h2>

      <div className="filter-section">
        <h3>Tags</h3>
        <ul>
          {Object.entries(tagCounts).map(([tag, count]) => (
            <li key={tag}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onToggleTag(tag)}
                />
                <span className="tag-label">
                  {tag} <span className="tag-count">({count})</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
        {selectedTags.length > 0 && (
          <button className="clear-btn" onClick={onClearTags}>
            Clear filters
          </button>
        )}
      </div>

      <div className="filter-section">
        <h3>Sort</h3>
        <select value={sortOrder} onChange={e => onChangeSort(e.target.value)}>
          <option value="latest">Newest first</option>
          <option value="none">No sorting</option>
        </select>
      </div>
    </aside>
  );
}

export default GalleryFilter;