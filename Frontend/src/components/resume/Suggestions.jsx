const Suggestions = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Resume Suggestions
      </h2>

      <ul className="space-y-3">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="bg-red-50 border-l-4 border-red-500 p-3 rounded"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;