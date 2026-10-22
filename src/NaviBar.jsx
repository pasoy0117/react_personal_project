import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, FileText, PenTool, UserPlus, LogIn } from 'lucide-react';

export default function NaviBar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 🌟 기존 "user" 대신 현재 로그인된 세션 상태인 "currentUser"가 있는지를 체크합니다!
  const isLoggedIn = !!localStorage.getItem("currentUser"); 

  const handleLogout = () => {
    // 🌟 로그아웃 시 현재 유저 세션 키 정보를 삭제합니다.
    localStorage.removeItem("currentUser");
    alert("로그아웃 되었습니다! ♥");
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-pink-100/80 backdrop-blur-md border-b-4 border-dashed border-pink-200 sticky top-0 z-50 px-4 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* 왼쪽: 로고 / 홈 링크 */}
        <Link 
          to={isLoggedIn ? "/post/list" : "/"} 
          className="relative px-5 py-2 rounded-full border-2 border-white/60 shadow-md font-mono font-black text-white text-sm tracking-wider transition-all hover:scale-105 active:scale-95"
          style={{ 
            backgroundColor: '#e77882',
            backgroundImage: 'radial-gradient(#ffffff 15%, transparent 15%)', 
            backgroundSize: '10px 10px' 
          }}
        >
          ♥ 자근 일기장 ♥
          <div className="absolute inset-[-4px] rounded-full border-2 border-red-400 opacity-40 pointer-events-none" />
        </Link>

        {/* 오른쪽: 메뉴 네비게이션 */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              
              <Link
                to="/post/list"
                className={`flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-full transition-all border ${
                  isActive('/post/list')
                    ? 'bg-red-400 text-white border-red-400 shadow-sm'
                    : 'text-red-700 bg-white border-pink-200 hover:bg-pink-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                글목록
              </Link>

              <Link
                to="/post/create"
                className={`flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-full transition-all border ${
                  isActive('/post/create')
                    ? 'bg-red-400 text-white border-red-400 shadow-sm'
                    : 'text-red-700 bg-white border-pink-200 hover:bg-pink-50'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                글쓰기 <span className="text-[9px] text-red-500">♥</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-red-500 transition-all ml-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                로그아웃
              </button>
            </>
          ) : (
            <>
              
              <Link
                to="/"
                className={`flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-full transition-all border ${
                  isActive('/')
                    ? 'bg-red-400 text-white border-red-400 shadow-sm'
                    : 'text-red-700 bg-white border-pink-200 hover:bg-pink-50'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                로그인
              </Link>

              <Link
                to="/signup"
                className={`flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-full transition-all border ${
                  isActive('/signup')
                    ? 'bg-red-400 text-white border-red-400 shadow-sm'
                    : 'text-red-700 bg-white border-pink-200 hover:bg-pink-50'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                회원가입
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
