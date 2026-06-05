export function RatingBadge({ score }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 10);

  const color = score >= 7 ? "#21d07a" : score >= 4 ? "#d2d531" : "#db2360";

  return (
    <svg width="60" height="60" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="34" fill="rgba(0,0,0,0.4)" />
      <circle
        cx="40" cy="40" r="30"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 40 40)"
      />
      <text x="40" y="46" textAnchor="middle" fontSize="18" fontWeight="700" fill="white" fontFamily="sans-serif">
        {score?.toFixed(1)}
      </text>
    </svg>
  );
}