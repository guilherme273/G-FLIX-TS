import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import "../../../tailwindStyle.css";

import Header from "../../../Components/Admin/Common/Header/Header";
import MoviesTable from "../../../Components/Admin/Table/MoviesTable";
import { getMoviesAdmin } from "../../../Contexts/Movies/Movie.service";
import { Movie } from "../../../Contexts/Movies/MovieInterface";

interface MoviesData {
  movies: Movie[];
}

const MoviesPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [moviesData, setMoviesData] = useState<MoviesData>();

  const fetchMovies = async () => {
    const data = await getMoviesAdmin();
    setMoviesData(data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  useEffect(() => {
    console.log(moviesData);
  }, [moviesData]);

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
          <Header title={"Movies"} />
          {/* Aqui vai seu conteúdo principal */}
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-1 lg:grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <MoviesTable
              movies={moviesData?.movies}
              fetchMovies={fetchMovies}
            />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default MoviesPage;
