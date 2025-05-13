import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import Confirm from "../../Confirm/Confirm";

import Modal from "../../Modal/Modal";
import FormRegister from "../../Forms/FormRegister/FormRegister";

import Loading from "../../Loading/Loading";
import { Movie } from "../../../Contexts/Movies/MovieInterface";
import { delMovie } from "../../../Contexts/Movies/Movie.service";
import FormAddMovie from "../Movies/FormAddMovie";

interface TableProps {
  movies: Movie[] | undefined;
  fetchMovies: () => Promise<void>;
}
export interface UserChange {
  id: number;
  name: string;
  type: number;
}

const MoviesTable: React.FC<TableProps> = ({ movies, fetchMovies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>();
  const [openConfirmDel, seOpenConfirmDel] = useState<boolean>(false);
  const [movieToDelete, setMovieToDelete] = useState<number | null>(null);

  const [isOpenModalRegister, setIsOpenModalRegister] =
    useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = movies?.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(term)
    );
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const deletMovie = (movie_id: number) => {
    setMovieToDelete(movie_id);
    seOpenConfirmDel(true);
  };

  const handleDeleteConfirm = async () => {
    if (movieToDelete !== null) {
      await delMovie(movieToDelete);
      setMovieToDelete(null);
      await fetchMovies();
    }
  };

  return (
    <>
      <motion.div
        className="p-6 border shadow-lg section-start-card backdrop-blur-md rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {movies ? (
          <>
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full py-2 pl-10 pr-4 text-white placeholder-gray-200 bg-gray-800 rounded-lg sm:w-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <div className="flex flex-row items-center justify-center gap-1">
                <button onClick={() => setIsOpenModalRegister(true)}>
                  <Plus className="w-[35px] h-[35px] text-lime-500 hover:text-lime-600" />
                </button>
                <strong className="text-gray-200">Adicionar Novo Filme</strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Total de visualisações
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Total de Reações
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Adicionado a favorito por
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {filteredMovies?.map((movie: Movie) => (
                    <motion.tr
                      key={movie.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full bg-gradient-to-r from-purple-400 to-blue-500">
                              <img
                                src={`${movie.cover}`}
                                alt=""
                                className="object-cover w-full h-full rounded-full"
                              />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div
                              title={movie.title}
                              className="text-sm font-medium text-gray-100"
                            >
                              {movie.title.split(" ").slice(0, 6).join(" ")}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {movie.category_id}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {movie.views.length}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {movie.reactions.length}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {`${movie.favorites.length} ${
                            movie.favorites.length === 1
                              ? "Usuário"
                              : "Usuários"
                          }`}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <button
                          //   onClick={() =>
                          //     // changePermission(user.id, user.name, user.type)
                          //   }
                          title="Editar"
                          className="mr-2 text-yellow-400 hover:text-yellow-200"
                        >
                          <Pencil />
                        </button>
                        <button
                          onClick={() => deletMovie(movie.id)}
                          title="Deletar"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Loading color="red" size={50} padding={10} />
        )}
      </motion.div>

      {openConfirmDel && (
        <Confirm
          setOpenConfirm={seOpenConfirmDel}
          onConfirm={handleDeleteConfirm}
          mensagem="Tem certeza que deseja excluir este filme?"
        />
      )}
      {isOpenModalRegister && (
        <Modal
          title={"Adicionar Filme"}
          children={<FormAddMovie fetch={fetchMovies} />}
          setIsOpenModal={setIsOpenModalRegister}
        />
      )}
    </>
  );
};
export default MoviesTable;
