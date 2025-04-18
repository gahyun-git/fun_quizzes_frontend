import Link from 'next/link';
import '../styles/styles.css';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white">FunQuizzes</Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              {/* <Link href="/" className="text-white hover:text-gray-200 transition duration-300">홈</Link> */}
            </li>
            <li>
              <Link href="/past-life" className="text-white hover:text-gray-200 transition duration-300">전생테스트</Link>
            </li>
            <li>
              {/* <Link href="/contact" className="text-white hover:text-gray-200 transition duration-300">문의</Link> */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;