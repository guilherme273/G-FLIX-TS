import Header from "../../../Components/Admin/Common/Header/Header";
import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";
import "./OverviewStyle.css";
import StatCard from "../../../Components/Admin/Common/StartCard/StartCard";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import "../../../tailwindStyle.css";
const Overview: React.FC = () => {
  return (
    <>
      <div className="flex h-screen w-[100%] section-overview flex-row ">
        {/* BG */}

        <Sidebar />
        <div className="flex flex-col h-screen w-[100%]">
          <Header title={"Visão Geral"} />
          {/* STATS */}

          <div className="flex flex-col w-[100%] gap-2 p-5">
            <motion.div
              className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Total de usuários"
                icon={Users}
                value={22}
                color="#6366F1"
              />
              <StatCard
                name="Total de filmes"
                icon={Zap}
                value={22}
                color="#8B5CF6"
              />
              <StatCard
                name="Total adicionado aos favoritos"
                icon={ShoppingBag}
                value={22}
                color="#EC4899"
              />
              <StatCard
                name="Total de Reações"
                icon={BarChart2}
                value={22}
                color="#10B981"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
