import { useForm } from "react-hook-form";
import { addMovieDto } from "../../../Contexts/Movies/MovieInterface";
import { Layers, Link } from "lucide-react";
import { postMovie } from "../../../Contexts/Movies/Movie.service";
import { useEffect, useState } from "react";
import { Category } from "../../../Categories/CategoriesInterface";
import { getCategories } from "../../../Categories/Categories.service";
import "./FormAddMovieStyle.css";
import Loading from "../../Loading/Loading";

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
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 mx-auto shadow-md rounded-2xl section-start-card">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-100">
          Adicionar Filme do YouTube
        </h2>

        <form onSubmit={handleSubmit(addMovie)} className="w-full space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center w-full">
              <Layers className="w-5 h-5 mr-2 text-gray-400" />
              <select
                {...register("category_id", {
                  required: "Selecione uma categoria",
                  validate: (value) =>
                    value !== "0" || "Selecione uma categoria válida",
                })}
                className="w-full px-3 py-2 text-sm text-gray-100 placeholder-gray-400 bg-gray-900 border border-red-500 rounded focus:outline-none"
              >
                <option value="0">Escolha uma categoria</option>
                {categories?.map((cat, index) => (
                  <option key={index} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.category_id && (
              <span className="text-xs text-red-500 ml-7">
                {errors.category_id.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {/* Input com ícone e erro */}
            <div className="flex flex-col w-full gap-1">
              <div className="flex items-center w-full">
                <Link className="w-5 h-5 mr-2 text-gray-400" />
                <input
                  type="text"
                  placeholder="URL do YouTube"
                  className="w-full p-2 text-sm text-gray-100 placeholder-gray-400 bg-gray-900 border border-red-500 rounded focus:outline-none"
                  {...register("url", {
                    required: "Url obrigatória",
                  })}
                />
              </div>
              {errors.url && (
                <span className="text-xs text-red-500 ml-7">
                  {errors.url.message}
                </span>
              )}
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 text-sm font-medium text-gray-100 ${
                isSubmitting
                  ? "submit-button-add-movie-disable"
                  : "submit-button-add-movie"
              }`}
            >
              {isSubmitting ? (
                <Loading color="red" size={10} padding={0} />
              ) : (
                "Adicionar Filme"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormAddMovie;
