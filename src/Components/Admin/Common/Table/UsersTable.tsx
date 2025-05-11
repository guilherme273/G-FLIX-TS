import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { User } from "../../../../User/UserInterface";

interface TableProps {
  users: User[] | undefined;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersTable: React.FC<TableProps> = ({ users, setIsOpenModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users?.filter(
      (user: User) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <motion.div
      className="p-6 border shadow-lg section-start-card backdrop-blur-md rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="py-2 pl-10 pr-4 text-white placeholder-gray-200 bg-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <div className="flex flex-row items-center justify-center gap-1">
          <button onClick={() => setIsOpenModal(true)}>
            <Plus className="w-[35px] h-[35px] text-lime-500 hover:text-lime-600" />
          </button>
          <strong className="text-gray-200">Adicionar Novo Usuário</strong>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                tipo
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredUsers?.map((user: User) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full bg-gradient-to-r from-purple-400 to-blue-500">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.type === 1
                        ? "bg-green-800 text-green-100"
                        : "bg-blue-800 text-red-100"
                    }`}
                  >
                    {user.type === 1 ? "Administrador" : "Usuário Comun"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  <button
                    title="Editar"
                    className="mr-2 text-yellow-400 hover:text-yellow-200"
                  >
                    <Pencil />
                  </button>
                  <button
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
    </motion.div>
  );
};
export default UsersTable;
