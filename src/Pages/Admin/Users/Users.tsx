import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";
import StatCard from "../../../Components/Admin/Common/StartCard/StartCard";
// import FormAddMovie from "../../../Components/Admin/Movies/FormAddMovie";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import "../../../tailwindStyle.css";
import { getOverView } from "../../../Admin/Admin.service";
import Chart, { ChartData } from "../../../Components/Admin/Chart/Chart";
import Header from "../../../Components/Admin/Common/Header/Header";
import TableUsers from "../../../Components/Admin/Common/Table/TableUsers";
import UsersTable from "../../../Components/Admin/Common/Table/UsersTable";
import { u } from "framer-motion/client";
import { User } from "../../../User/UserInterface";
import { getUsers } from "../../../User/User.Service";
import Loading from "../../../Components/Loading/Loading";
import Modal from "../../../Components/Modal/Modal";
import FormRegister from "../../../Components/Forms/FormRegister/FormRegister";

export interface OverViewInterface {
  userscount: number;
  moviesCount: number;
  favoritesCount: number;
  reactionsCount: number;
  moviesPerCategory: ChartData[];
  viewsPerCategory: ChartData[];
}

export interface UserDataPage {
  users: User[];
  count: number;
}

const UsersPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [usersData, setUsersData] = useState<UserDataPage>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const fetchUsers = async () => {
    const overview = await getUsers();
    setUsersData(overview);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // const chartData = [
  //   { name: "Electronics", value: 4500 },
  //   { name: "Clothing", value: 3200 },
  //   { name: "Home & Garden", value: 2800 },
  //   { name: "Books", value: 2100 },
  //   { name: "Sports & Outdoors", value: 1900 },
  // ];
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
          <Header title={"Visão Geral"} />
          {/* Aqui vai seu conteúdo principal */}
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total de usuários"
              icon={Users}
              value={1}
              color="#6366F1"
            />
            <StatCard
              name="Novos Usuários(Última semana)"
              icon={Zap}
              value={1}
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
            {usersData ? (
              <UsersTable
                setIsOpenModal={setIsOpenModal}
                users={usersData?.users}
              />
            ) : (
              <Loading color="red" size={50} padding={10} />
            )}
          </motion.div>
        </main>
      </div>
      {isOpenModal && (
        <Modal
          title={"Adicionar Usuário!"}
          children={<FormRegister />}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </>
  );
};

export default UsersPage;
