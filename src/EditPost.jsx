import React, { useState, useEffect } from 'react';
import { PenTool, Heart, AlignLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // 🌟 App.js의 path='/post/edit/:postId' 와 완벽하게 일치하도록 postId만 명확하게 꺼냅니다.
  const { postId } = useParams(); 
  const navigate = useNavigate();

  // 1. 기존 글 데이터 불러오기
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    // 🌟 파라미터로 넘어온 postId를 숫자로 변환하여 posts 배열에서 매칭되는 글을 찾습니다.
    const targetPost = posts.find((p) => p.id === Number(postId));

    if (targetPost) {
      setTitle(targetPost.title);
      setContent(targetPost.content);
    } else {
      alert('존재하지 않거나 삭제된 글입니다! 💔');
      navigate('/post/list');
    }
  }, [postId, navigate]);

  // 2. 글 수정 처리
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 채워주세요! ♥');
      return;
    }

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map((p) => 
      p.id === Number(postId) 
        ? { ...p, title, content, updatedAt: new Date().toLocaleDateString() } 
        : p
    );

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    alert('소중한 글이 수정되었습니다! ♥');
    
    // 🌟 수정이 완료되면 방금 수정한 글의 상세 페이지(/post/글ID)로 안전하게 돌려보냅니다.
    navigate(`/post/${postId}`); 
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

        {/* 3. 중앙 하얀색 글수정 카드 */}
        <div className="bg-white rounded-[32px] p-8 w-full shadow-inner flex flex-col items-center border border-pink-200">
          
          {/* 타이틀 */}
          <h2 className="text-2xl font-bold text-red-700 flex items-center gap-1 mb-6 font-mono tracking-wide">
            ♥ 글 수정방 ♥
          </h2>

          {/* 폼 영역 */}
          <form className="w-full space-y-5" onSubmit={handleUpdate}>
            
            {/* 제목 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2 flex items-center gap-1">
                <PenTool className="w-4 h-4 text-pink-400" /> 제목 수정
              </label>
              <input
                type="text"
                placeholder="수정할 제목을 적어주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-3 rounded-full border-2 border-pink-200 focus:border-red-400 focus:outline-none text-gray-700 placeholder-pink-300 bg-pink-50/30 text-sm transition-all"
              />
            </div>

            {/* 내용 입력란 */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-red-700 ml-2 flex items-center gap-1">
                <AlignLeft className="w-4 h-4 text-pink-400" /> 내용 수정
              </label>
              <textarea
                placeholder="여기에 소중한 이야기들을 수정해보세요... ♥"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="8"
                className="w-full px-6 py-4 rounded-[24px] border-2 border-pink-200 focus:border-red-400 focus:outline-none text-gray-700 placeholder-pink-300 bg-pink-50/30 text-sm transition-all resize-none leading-relaxed"
              />
            </div>

            {/* 수정 버튼 */}
            <button
              type="submit"
              className="w-full py-3.5 mt-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-full transition-all duration-200 active:scale-[0.98] shadow-md text-base tracking-wider flex items-center justify-center gap-2"
            >
              고치기 완료 <Heart className="w-4 h-4 fill-white" />
            </button>
          </form>

          {/* 하단 취소 링크 */}
          <div className="flex justify-center w-full mt-6 text-xs text-red-700/80 font-medium px-2">
            <Link to="/post/list" className="hover:underline hover:text-red-900 transition-colors">
              수정 취소하고 돌아가기
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
