
import { useTheme } from "../context/ThemeContext"; // Import hook

export default function Layout() {
  const { theme, toggleTheme } = useTheme(); // Lấy hàm toggle
    console.log(useTheme());

  return (
    // dark:bg-slate-900 nghĩa là: bình thường thì trắng, khi có class dark thì thành màu slate-900
    // dark:text-white nghĩa là: bình thường chữ đen (mặc định), khi tối thì chữ trắng
    <div className="min-h-screen bg-white text-gray-900 dark:bg-slate-900 dark:text-white transition-colors duration-300">
      
      <header className="p-4 border-b dark:border-slate-700 flex justify-between items-center">
        <h1>Movie App</h1>
        
        {/* Nút chuyển đổi */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded bg-gray-200 dark:bg-slate-700 hover:opacity-80"
        >
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main className="p-4">
        <h1> testing </h1>
      </main>
      
    </div>
  );
}