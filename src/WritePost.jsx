import React, { useState, useEffect } from 'react';
import { PenTool, Heart, AlignLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function WritePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // 🌟 주소창 입력을 통한 비로그인 익명 접근을 감지하고 차단하는 보안 가드 추가
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) {
      alert("로그인한 사용자만 글을 작성할 수 있어요! 💔");
      navigate("/"); // 로그인 화면으로 강제 이동
    }
  }, [navigate]);

  const handlePublish = (e) => {
    e.preventDefault();

    // 1. 빈값 검증
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 채워주세요! ♥');
      return;
    }

    // 2. 키 이름을 "posts" 로 통일하여 기존 저장 데이터 안전하게 불러오기
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    // 3. 로그인 정보 가져오기
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요. 💔");
      navigate("/");
      return;
    }
    
    const currentUser = JSON.parse(savedUser);

    // 4. 새 게시글 데이터 구조 설계 (식별자를 id 로 매핑하여 연동 버그 영구 해결)
    const newPost = {
      id: Date.now(), // 🌟 정상적인 'id' 속성으로 명확히 연동되도록 재설정
      title,
      content,
      createdAt: new Date().toLocaleDateString(),
      writeId: currentUser.id,      // 로그인한 사람의 아이디 고정
      writeName: currentUser.name || "익명의 하트"  // 로그인한 사람의 이름 고정
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert('소중한 글이 등록되었습니다! ♥');
    navigate('/post/list'); // 글 등록 후 목록 페이지로 이동
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
        className="relative z-10 p-6 rounded-[40px] bg-red-500 shadow-2xl border-4 border-dashed border-white/40 w-full max-w-2xl"
        style={{
          backgroundColor: '#e14d59',
          backgroundImage: 'radial-gradient(#ffffff 15%, transparent 16%)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* 레이스 외곽의 미세한 귀여운 물결 테두리 효과 대용 (링 효과) */}
        <div className="absolute inset-[-6px] rounded-[46px] border-4 border-red-400 opacity-60 pointer-events-none" />

        {/* 3. 중앙 하얀색 글쓰기 카드 */}
        <div className="bg-white rounded-[32px] p-8 w-full shadow-inner flex flex-col items-center border border-pink-200">
          
          {/* 타이틀 */}
          <h2 className="text-2xl font-bold text-red-700 flex items-center gap-1 mb-6 font-mono tracking-wide">
            ♥ 글쓰기 방 ♥
          </h2>

          {/* 폼 영역 */}
          <form className="w-full space-y-5" onSubmit={handlePublish}>
            
            {/* 제목 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2 flex items-center gap-1">
                <PenTool className="w-4 h-4 text-pink-400" /> 제목
              </label>
              <input
                type="text"
                placeholder="오늘의 제목을 적어주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-3 rounded-full border-2 border-pink-200 focus:border-red-400 focus:outline-none text-gray-700 placeholder-pink-300 bg-pink-50/30 text-sm transition-all"
              />
            </div>

            {/* 내용 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2 flex items-center gap-1">
                <AlignLeft className="w-4 h-4 text-pink-400" /> 내용
              </label>
              <textarea
                placeholder="여기에 소중한 이야기들을 마구 채워보세요... ♥"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="8"
                className="w-full px-6 py-4 rounded-[24px] border-2 border-pink-200 focus:border-red-400 focus:outline-none text-gray-700 placeholder-pink-300 bg-pink-50/30 text-sm transition-all resize-none leading-relaxed"
              />
            </div>

            {/* 등록 버튼 */}
            <button
              type="submit"
              className="w-full py-3.5 mt-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-full transition-all duration-200 active:scale-[0.98] shadow-md text-base tracking-wider flex items-center justify-center gap-2"
            >
              간직하기 <Heart className="w-4 h-4 fill-white" />
            </button>
          </form>

          {/* 하단 취소 링크 */}
          <div className="flex justify-center w-full mt-6 text-xs text-red-700/80 font-medium px-2">
            <Link to="/post/list" className="hover:underline hover:text-red-900 transition-colors">
              돌아가기
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
