import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  valueColor,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      className="bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-gray-300 text-lg font-medium">
          {title}
        </h3>

        <Icon className={`text-2xl ${iconColor}`} />
      </div>

      <h2 className={`text-5xl font-bold mt-5 ${valueColor}`}>
        {value}
      </h2>
    </motion.div>
  );
};

export default StatCard;