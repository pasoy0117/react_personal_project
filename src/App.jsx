import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 내가 만든 귀여운 컴포넌트들 불러오기 (경로는 본인 파일 위치에 맞게 조절하세요! ♥)
import Login from './Login';
import SignUp from './SignUp';
import PostList from './PostList';
import Post from './Post';
import EditPost from './EditPost';
import WritePost from './WritePost';
import NaviBar from './NaviBar';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NaviBar />
         <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/post/list' element={<PostList />} />
            <Route path='/post/:postId' element={<Post />} />
            <Route path='/post/create' element={<WritePost />} />
            <Route path='/post/edit/:postId' element={<EditPost />} />
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
