import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 🌟 1. 키 이름을 "posts" (복수형)로 수정하여 상세 페이지와 데이터 저장소를 통일합니다!
    const savedPosts = localStorage.getItem("posts") || "[]";
    setPosts(JSON.parse(savedPosts));
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-pink-100 p-4 bg-cover bg-center relative" style={{ backgroundImage: `url('https://unsplash.com')` }}>
      {/* 1. 전체 배경 블러 오버레이 */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

      {/* 2. 빨간 땡땡이 레이스 테두리 박스 */}
      <div className="relative z-10 p-6 rounded-[40px] w-full max-w-2xl shadow-2xl border-4 border-dashed border-white/40" 
           style={{ backgroundColor: '#e14d59', backgroundImage: 'radial-gradient(#ffffff 15%, transparent 16%)', backgroundSize: '16px 16px' }}>
        
        {/* 레이스 외곽의 미세한 귀여운 물결 테두리 효과 (링 효과) */}
        <div className="absolute inset-[-6px] rounded-[46px] border-4 border-red-400 opacity-60 pointer-events-none" />

        {/* 3. 중앙 하얀색 글 목록 카드 */}
        <div className="bg-white rounded-[32px] p-6 w-full shadow-inner flex flex-col border border-pink-200">
          
          {/* 상단 타이틀 및 글쓰기 버튼 영역 */}
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-2xl font-bold text-red-700 flex items-center gap-1 font-mono tracking-wide">
              ♥ 글 목록 ♥
            </h2>
            <Link to='/post/create' className="flex items-center gap-1 bg-red-400 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full transition-all active:scale-[0.95] shadow-sm">
              글쓰기 <span className="text-[10px]">♥</span>
            </Link>
          </div>

          {/* 게시글 리스트 영역 */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {posts.length === 0 ? (
              <div className="text-center py-8 text-sm text-pink-400 font-medium">
                아직 등록된 소중한 글이 없어요... ♥
              </div>
            ) : (
              posts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/post/${post.id}`} 
                  className="flex items-center justify-between p-4 rounded-2xl border-2 border-pink-100 hover:border-red-300 bg-pink-50/20 hover:bg-pink-50/50 transition-all group"
                >
                  {/* 왼쪽: 제목 및 작성 정보 */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-700 group-hover:text-red-600 transition-colors flex items-center gap-1.5">
                      <span className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">♥</span>
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-pink-400 font-medium pl-3">
                      {/* 🌟 2. 필드명을 author -> writeId, date -> createdAt 으로 연동 수정! */}
                      <span>{post.writeName || '익명의 하트'}</span>
                      <span className="text-[8px] opacity-50">•</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>

                  {/* 오른쪽: 화살표 아이콘 */}
                  <div className="flex items-center gap-3">
                    <ChevronRight className="w-5 h-5 text-pink-300 group-hover:text-red-400 transition-colors" />
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* 하단 페이지네이션 / 안내 링크 */}
          <div className="flex justify-center w-full mt-6 text-xs text-red-700/80 font-medium border-t border-pink-100 pt-4">
            <div className="flex gap-4">
              <button className="hover:text-red-900 transition-colors disabled:opacity-30" disabled>이전</button>
              <span className="text-red-500 font-bold">1</span>
              <button className="hover:text-red-900 transition-colors">다음</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostList;
