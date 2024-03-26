'use client'
export default function SearchComponet() {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="search-area">
      <div className="search-bar">
        <BiSearch className="search-icon" />
        <input
          type="search"
          name=""
          id="searchInput"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
