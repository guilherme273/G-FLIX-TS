import { useForm } from "react-hook-form";
import { addMovieDto } from "../../../Contexts/Movies/MovieInterface";
import { Link } from "lucide-react";
import { postMovie } from "../../../Contexts/Movies/Movie.service";
import { useEffect, useState } from "react";
import { Category } from "../../../Categories/CategoriesInterface";
import { getCategories } from "../../../Categories/Categories.service";

const FormAddMovie: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<addMovieDto>();

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const categoryData = await getCategories();
    setCategories(categoryData);
  };

  useEffect(() => {
    fetchCategories();
  });

  const addMovie = async (data: addMovieDto) => {
    await postMovie(data);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Adicionar Filme do YouTube
        </h2>

        <form onSubmit={handleSubmit(addMovie)} className="w-full space-y-4">
          <div className="flex flex-col gap-1">
            <select
              {...register("category_id", {
                required: "Selecione uma categoria",
                validate: (value) =>
                  value !== "0" || "Selecione uma categoria válida",
              })}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">Escolha uma categoria</option>
              {categories?.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errors.category_id && (
              <span className="text-red-500 text-xs">
                {errors.category_id.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {/* Input com ícone e erro */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <Link className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="URL do YouTube"
                  className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
                  {...register("url", {
                    required: "Url obrigatória",
                  })}
                />
              </div>
              {errors.url && (
                <span className="text-red-500 text-xs">
                  {errors.url.message}
                </span>
              )}
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            >
              Adicionar Filme
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormAddMovie;
