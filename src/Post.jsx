import React, { useState, useEffect } from 'react';
import { Heart, Calendar, User, ArrowLeft, Edit3 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Post() {
  const [post, setPost] = useState(null);
  const [loginUser, setLoginUser] = useState(null); // 🌟 로그인한 유저 정보를 담을 상태 추가
  
  const { id, postId } = useParams(); 
  const navigate = useNavigate();

  // 1. 로컬스토리지에서 해당 글 및 로그인 유저 정보 가져오기
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const urlId = Number(postId || id);
    const targetPost = posts.find((p) => p.id === urlId);

    if (targetPost) {
      setPost(targetPost);
    } else {
      alert('존재하지 않거나 삭제된 글입니다! 💔');
      navigate('/post/list');
      return;
    }

    
    try {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setLoginUser(JSON.parse(savedUser));
      }
    } catch (e) {
      // 혹시 단순 문자열 ID만 들어있는 경우를 대비한 복구 로직
      setLoginUser({ id: localStorage.getItem("currentUser") });
    }
  }, [id, postId, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-pink-100 text-red-700 font-bold">
        소중한 글을 불러오는 중... ♥
      </div>
    );
  }

  // 🌟 현재 로그인 중인 유저의 ID와 글을 작성한 사람의 ID가 일치하는지 판별
  const isAuthor = loginUser && loginUser.id === post.writeId;

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

        {/* 3. 중앙 하얀색 글 상세 카드 */}
        <div className="bg-white rounded-[32px] p-8 w-full shadow-inner flex flex-col border border-pink-200">
          
          {/* 상단 네비게이션 및 수정 링크 영역 */}
          <div className="flex justify-between items-center w-full mb-6 text-xs font-semibold text-red-700/80">
            <Link to="/post/list" className="flex items-center gap-1 hover:text-red-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> 목록으로
            </Link>
            
            
            {isAuthor && (
              <Link 
                to={`/post/edit/${post.id}`} 
                className="flex items-center gap-1 hover:text-red-900 transition-colors bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full border border-pink-200"
              >
                <Edit3 className="w-3.5 h-3.5 text-pink-500" /> 수정하기
              </Link>
            )}
          </div>

          

          <div className="w-full border-b-2 border-dashed border-pink-200 pb-4 mb-4">
            <h1 className="text-2xl font-bold text-red-700 leading-snug break-all flex items-start gap-2">
              <span className="text-pink-400 shrink-0">♥</span>
              {post.title}
            </h1>
            
            
            <div className="flex gap-4 mt-3 text-xs text-pink-400 font-medium pl-5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {post.createdAt}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {post.writeName || post.writeId || '익명의 하트'} 
              </span>
            </div>
          </div>

          {/* 내용 영역 */}
          <div className="w-full min-h-[200px] text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-all bg-pink-50/20 p-4 rounded-[24px] border border-pink-100/50">
            {post.content}
          </div>

          {/* 하단 공감 데코레이션 */}
          <div className="flex justify-center w-full mt-8">
            <button 
              onClick={() => alert('이 글을 마음에 저장했어요! ♥')}
              className="flex items-center gap-2 px-6 py-2.5 bg-pink-50 hover:bg-pink-100 text-red-500 font-bold text-sm rounded-full border-2 border-pink-200 transition-all active:scale-95 shadow-sm"
            >
              <Heart className="w-4 h-4 fill-red-400 text-red-400 animate-pulse" /> 마음에 들어요
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
