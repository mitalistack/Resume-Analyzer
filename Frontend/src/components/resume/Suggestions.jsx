import {
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

const Suggestions = ({ suggestions = [] }) => {

  const getSuggestionStyle = (type) => {
    switch (type) {
      case "critical":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          container:
            "bg-red-500/10 border-red-500/30",
          iconColor: "text-red-400",
          titleColor: "text-red-300",
        };

      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          container:
            "bg-yellow-500/10 border-yellow-500/30",
          iconColor: "text-yellow-400",
          titleColor: "text-yellow-300",
        };

      case "success":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          container:
            "bg-green-500/10 border-green-500/30",
          iconColor: "text-green-400",
          titleColor: "text-green-300",
        };

      default:
        return {
          icon: <Lightbulb className="w-5 h-5" />,
          container:
            "bg-blue-500/10 border-blue-500/30",
          iconColor: "text-blue-400",
          titleColor: "text-blue-300",
        };
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Resume Improvement Suggestions
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Personalized recommendations based on your resume analysis
          </p>
        </div>

        <Lightbulb className="w-7 h-7 text-yellow-400" />
      </div>

      {suggestions.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />

          <p className="text-green-400 font-semibold">
            Your resume looks good!
          </p>

          <p className="text-gray-400 text-sm mt-1">
            No major improvements were detected.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {suggestions.map((suggestion, index) => {

            // Backward compatibility in case an old
            // string suggestion is returned.
            if (typeof suggestion === "string") {
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
                >
                  <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />

                  <p className="text-gray-200">
                    {suggestion}
                  </p>
                </div>
              );
            }

            const style = getSuggestionStyle(
              suggestion.type
            );

            return (
              <div
                key={index}
                className={`flex items-start gap-4 border rounded-xl p-4 ${style.container}`}
              >

                <div
                  className={`${style.iconColor} mt-0.5 shrink-0`}
                >
                  {style.icon}
                </div>

                <div>
                  <h3
                    className={`font-semibold ${style.titleColor}`}
                  >
                    {suggestion.title}
                  </h3>

                  <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                    {suggestion.description}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Suggestions;