function CastCell({ name, profile_path, role }) {
  return (
    <div className="is-flex is-align-items-center" style={{ gap: "12px", borderRadius: "8px", padding: "10px 0", display: "inline-flex" }}>
      <figure className="image is-48x48" style={{ flexShrink: 0 }}>
        <img
          className="is-rounded"
          src={`https://image.tmdb.org/t/p/w185${profile_path}`}
          style={{ objectFit: "cover", width: "48px", height: "48px" }}
        />
      </figure>
      <div>
        <p style={{ color: "white", fontWeight: "500", marginBottom: "2px" }}>{name}</p>
        <p style={{ color: "#aaa", fontSize: "0.85rem" }}>Director</p>
      </div>
    </div>
  );
}

export default CastCell;