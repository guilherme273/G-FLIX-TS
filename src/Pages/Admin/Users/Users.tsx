import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";
import StatCard from "../../../Components/Admin/Common/StartCard/StartCard";
import { Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import "../../../tailwindStyle.css";

import { ChartData } from "../../../Components/Admin/Chart/Chart";
import Header from "../../../Components/Admin/Common/Header/Header";

import UsersTable from "../../../Components/Admin/Table/UsersTable";

import { User } from "../../../User/UserInterface";
import { getUsers } from "../../../User/User.Service";
import Loading from "../../../Components/Loading/Loading";
import LineChartComponent from "../../../Components/Admin/LineChart/LineChart";

export interface OverViewInterface {
  userscount: number;
  moviesCount: number;
  favoritesCount: number;
  reactionsCount: number;
  moviesPerCategory: ChartData[];
  viewsPerCategory: ChartData[];
}

export interface UserGrowthData {
  month: string;
  users: number;
}

export interface UserDataPage {
  users: User[];
  count: number;
  userGrowthData: UserGrowthData[];
  countAdmin: number;
}

const UsersPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [usersData, setUsersData] = useState<UserDataPage>();

  const fetchUsers = async () => {
    const overview = await getUsers();
    setUsersData(overview);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    console.log(usersData);
  }, [usersData]);

  // const chartData = [
  //   { name: "Electronics", value: 4500 },
  //   { name: "Clothing", value: 3200 },
  //   { name: "Home & Garden", value: 2800 },
  //   { name: "Books", value: 2100 },
  //   { name: "Sports & Outdoors", value: 1900 },
  // ];
  const userGrowthData = [
    { month: "Jan", users: 1000 },
    { month: "Feb", users: 1500 },
    { month: "Mar", users: 2000 },
    { month: "Abr", users: 3000 },
    { month: "Mai", users: 4000 },
    { month: "Jun", users: 5000 },
  ];
  return (
    <>
      <div className="flex h-[100%] w-[100%] relative section-overview flex-row">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main
          className={`transition-all duration-300 ease-in-out ml-20 p-4 min-h-[100vh] w-[100%]`}
        >
          <Header title={"Usuários"} />
          {/* Aqui vai seu conteúdo principal */}
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total de usuários"
              icon={Users}
              value={usersData?.count}
              color="#6366F1"
            />
            <StatCard
              name="Total Administradores"
              icon={Zap}
              value={usersData?.countAdmin}
              color="#8B5CF6"
            />
            {/* <StatCard
              name="Total adicionado aos favoritos"
              icon={ShoppingBag}
              value={overviewData?.favoritesCount}
              color="#EC4899"
            />
            <StatCard
              name="Total de Reações"
              icon={BarChart2}
              value={overviewData?.reactionsCount}
              color="#10B981"
            /> */}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-1 lg:grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* <Chart
              title="Filmes Por Categoria"
              chartData={overviewData?.moviesPerCategory}
            />
            <Chart
              title="Visualizações Por Categoria"
              chartData={overviewData?.viewsPerCategory}
            /> */}
            {/* <FormAddMovie /> */}
            <LineChartComponent
              data={usersData?.userGrowthData}
              title={"Crescimento de usuários (Ultimos 12 meses)"}
            />
            <UsersTable fetchUsers={fetchUsers} users={usersData?.users} />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default UsersPage;
