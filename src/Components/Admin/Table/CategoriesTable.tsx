import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Trash2 } from "lucide-react";
import {
  CategoryPage,
  MovieToCategoryPage,
} from "../../../Modules/Categories/CategoriesInterface";
import { delCategory } from "../../../Modules/Categories/Categories.service";
import Loading from "../../Loading/Loading";
import Confirm from "../../Confirm/Confirm";
import Modal from "../../Modal/Modal";
import FormAddCategory from "../Forms/Category/FormAddCategory";

interface TableProps {
  categories: CategoryPage[] | undefined;
  fetchCategories: () => Promise<void>;
}

const CategoriesTable: React.FC<TableProps> = ({
  categories,
  fetchCategories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategoryes, setFilteredCategoryes] =
    useState<CategoryPage[]>();
  const [openConfirmDel, setOpenConfirmDel] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const [isOpenModalRegister, setIsOpenModalRegister] =
    useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = categories?.filter((category: CategoryPage) =>
      category.name.toLowerCase().includes(term)
    );
    setFilteredCategoryes(filtered);
  };

  useEffect(() => {
    setFilteredCategoryes(categories);
  }, [categories]);

  const deleteCategory = (category_id: number) => {
    setCategoryToDelete(category_id);
    setOpenConfirmDel(true);
  };

  const handleDeleteConfirm = async () => {
    if (categoryToDelete !== null) {
      await delCategory(categoryToDelete);
      setCategoryToDelete(null);
      await fetchCategories();
    }
  };

  const getTotalViews = (movies: MovieToCategoryPage[]) => {
    let total: number = 0;
    movies.forEach((movie) => {
      total += movie.views.length;
    });
    return total;
  };

  return (
    <>
      <motion.div
        className="p-6 border shadow-lg section-start-card backdrop-blur-md rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {categories ? (
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
                <strong className="text-gray-200">
                  Adicionar Nova Categoria
                </strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      id
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Data de criação
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Filmes Relacionados
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Visualizações
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {filteredCategoryes?.map((category: CategoryPage) => (
                    <motion.tr
                      key={category.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {category.id}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {category.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {new Date(category.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {category.movies.length}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {getTotalViews(category.movies)}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <button
                          onClick={() => deleteCategory(category.id)}
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
          setOpenConfirm={setOpenConfirmDel}
          onConfirm={handleDeleteConfirm}
          mensagem="Tem certeza que deseja excluir esta categoria?"
        />
      )}
      {isOpenModalRegister && (
        <Modal
          title={"Adicionar Categoria"}
          children={<FormAddCategory fetch={fetchCategories} />}
          setIsOpenModal={setIsOpenModalRegister}
        />
      )}
    </>
  );
};
export default CategoriesTable;
