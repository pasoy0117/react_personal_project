import React, { useState } from 'react';
import { User, Lock, FileText, MailOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const navigate = useNavigate();

  // 내가 설정할 관리자 지정 초대장 코드
  const ADMIN_INVITE_CODE = "1234"; 

  const handleSignup = (e) => {
    e.preventDefault();
    
    // 1. 빈값 검증
    if (!id.trim() || !name.trim() || !pw.trim() || !inviteCode.trim()) {
      alert('모든 항목을 입력해주세요! ♥');
      return;
    }

    // 2. 파이썬 스타일 알파벳+숫자 정규식 적용 (아이디 검증 예시)
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(id)) {
      alert('아이디는 영문 알파벳과 숫자만 사용할 수 있어요! ♥');
      return;
    }

    // 3. 초대장 코드 검증
    if (inviteCode !== ADMIN_INVITE_CODE) {
      alert('올바르지 않은 초대장 코드입니다! 💔');
      return;
    }

    // 4. 로컬스토리지 저장 로직 (임시 백엔드 대용)
    const users = JSON.parse(localStorage.getItem("user")) || [];
    
    // 중복 아이디 확인
    if (users.some((u) => u.id === id)) {
      alert('이미 존재하는 아이디입니다! 💔');
      return;
    }

    // 새 유저 추가
    const newUser = { id, name, password: pw };
    users.push(newUser);
    localStorage.setItem("user", JSON.stringify(users));

    alert(`${name}님, 가입을 진심으로 축하합니다! ♥`);
    navigate('/'); // 가입 성공 후 로그인 페이지로 이동
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

        {/* 3. 중앙 하얀색 회원가입 카드 */}
        <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-inner flex flex-col items-center border border-pink-200">
          
          {/* 타이틀 */}
          <h2 className="text-2xl font-bold text-red-700 flex items-center gap-1 mb-6 font-mono tracking-wide">
            ♥ 회원가입 ♥
          </h2>

          {/* 폼 영역 */}
          <form className="w-full space-y-4" onSubmit={handleSignup}>
            
            {/* 아이디 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2">아이디</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 text-pink-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="영문, 숫자만 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-pink-200 focus:border-red-400 focus:outline-none text-gray-700 placeholder-pink-300 bg-pink-50/30 text-sm transition-all"
                />
              </div>
            </div>

            {/* 이름 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2">이름</label>
              <div className="relative flex items-center">
                <FileText className="absolute left-4 text-pink-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

            {/* 초대장 코드 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2">초대장 코드</label>
              <div className="relative flex items-center">
                <MailOpen className="absolute left-4 text-pink-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="초대장 코드를 입력하세요"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-pink-200 focus:border-red-400 focus:outline-none text-gray-700 placeholder-pink-300 bg-pink-50/30 text-sm transition-all"
                />
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="w-full py-3.5 mt-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-full transition-all duration-200 active:scale-[0.98] shadow-md text-base tracking-wider"
            >
              가입하기
            </button>
          </form>

          {/* 하단 링크 */}
          <div className="flex justify-center w-full mt-6 text-xs text-red-700/80 font-medium px-2">
            <Link to="/" className="hover:underline hover:text-red-900 transition-colors">
              이미 계정이 있으신가요? 로그인하기 <span className="text-red-500 text-[10px]">♥</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
