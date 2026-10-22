import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // 🌟 1. 괄호()를 붙여 정상적으로 훅을 호출하도록 수정했습니다!
  
  const login = (e) => {
    e.preventDefault();
    
    if (!id.trim() || !pw.trim()) {
      alert('아이디와 비밀번호를 모두 입력해주세요! ♥');
      return;
    }

    const user = JSON.parse(localStorage.getItem("user")) || [];
    const savedUser = user.find((u) => u.id === id && u.password === pw);
    
    if (!savedUser) {
      return alert('아이디 또는 비밀번호가 틀렸습니다');
    }
    
    // 🌟 2. 글쓰기 창(WritePost)과 연동되도록 로그인된 사용자 객체를 로컬스토리지에 박제합니다!
    localStorage.setItem("currentUser", JSON.stringify(savedUser));
    
    setCurrentUser(savedUser);
    alert(`${savedUser.id}님, 로그인을 환영합니다! ♥`);
    navigate("/post/list");
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-pink-100 p-4 bg-cover bg-center relative"
      style={{ 
        backgroundImage: `url('https://unsplash.com')`,
      }}
    >
      {/* 1. 전체 배경 블러 오버레이 */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

      {/* 2. 빨간 땡땡이 레이스 테두리 박스 */}
      <div 
        className="relative z-10 p-6 rounded-[40px] bg-red-500 shadow-2xl border-4 border-dashed border-white/40"
        style={{
          backgroundColor: '#e14d59',
          backgroundImage: 'radial-gradient(#ffffff 15%, transparent 16%)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* 레이스 외곽의 미세한 귀여운 물결 테두리 효과 대용 (링 효과) */}
        <div className="absolute inset-[-6px] rounded-[46px] border-4 border-red-400 opacity-60 pointer-events-none" />

        {/* 3. 중앙 하얀색 로그인 카드 */}
        <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-inner flex flex-col items-center border border-pink-200">
          
          {/* 타이틀 */}
          <h2 className="text-2xl font-bold text-red-700 flex items-center gap-1 mb-6 font-mono tracking-wide">
            ♥ 로그인 ♥
          </h2>

          {/* 폼 영역 */}
          <form className="w-full space-y-4" onSubmit={login}>
            
            {/* 아이디 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2">아이디</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 text-pink-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-pink-200 focus:border-red-400 focus:outline-none text-gray-700 placeholder-pink-300 bg-pink-50/30 text-sm transition-all"
                />
              </div>
            </div>

            {/* 비밀번호 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2">비밀번호</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-pink-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-pink-200 focus:border-red-400 focus:outline-none text-gray-700 placeholder-pink-300 bg-pink-50/30 text-sm transition-all"
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 bg-red-400 hover:bg-red-500 text-white font-bold rounded-full transition-all duration-200 active:scale-[0.98] shadow-md text-base tracking-wider"
            >
              로그인
            </button>
          </form>

          {/* 하단 링크 */}
          <div className="flex justify-between w-full mt-6 text-xs text-red-700/80 font-medium px-2">
            <button type="button" className="hover:underline hover:text-red-900 transition-colors">
              아이디/비밀번호 찾기
            </button>
            <Link to="/signup" className="hover:underline hover:text-red-900 transition-colors flex items-center gap-0.5">
              회원가입 <span className="text-red-500 text-[10px]">♥</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
