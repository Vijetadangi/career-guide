const MatchCircle = ({ percent }) => {
  return (
    <div className="match-circle">
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#e6e6e6"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#2f5bea"
          strokeWidth="10"
          fill="none"
          strokeDasharray={314}
          strokeDashoffset={314 - (314 * percent) / 100}
          strokeLinecap="round"
        />
      </svg>
      <span className="match-text">{percent}%</span>
    </div>
  );
};

export default MatchCircle;
