const HeadToHead = ({ teamOne, teamTwo }: HeadToHead) => {
  return (
    <div className="bg-green-800 p-4 rounded-lg shadow-md justify-self-center">
      <h2>Head to Head</h2>
      <p>
        {teamOne} vs {teamTwo}
      </p>
    </div>
  );
};

export default HeadToHead;
