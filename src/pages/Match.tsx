import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Match = ({ fixture, handleFetchMatch }: MatchProps) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      handleFetchMatch(Number(id));
    }
  }, [id, handleFetchMatch]);

  return (
    <div className="bg-black h-screen pt-16">
      <div className="bg-zinc-900 h-40 mt-6"></div>
    </div>
  );
};

export default Match;
