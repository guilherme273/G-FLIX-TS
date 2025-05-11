import "./HeaderStyle.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-[100%] mt-2 mb-8">
      <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
    </header>
  );
};
export default Header;
