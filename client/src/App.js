import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Landing,  Register, Error,  MySubGreddIIIT, SubGreddIIIT, SavedPosts, SharedLayout, ProtectedRoutes, SingleSubGreddIIIT } from './pages';
import { FollowersPage, FollowingPage, SharedLayoutProfile  } from './pages/Dashboard/Profile/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
            <ProtectedRoutes>
              <SharedLayout/>
            </ProtectedRoutes>
          }>
          <Route index element ={<SubGreddIIIT/>}></Route>
          <Route path= 'my-subGreddiiit' element ={<MySubGreddIIIT/>}></Route>
          <Route path= 'profile/' element ={<SharedLayoutProfile/>}>
            <Route index element={<FollowersPage/>}/>
            <Route path='following' element={<FollowingPage/>}/>
          </Route>
          <Route path= 'saved-posts' element ={<SavedPosts/>}></Route>
          <Route path='single-subGreddiiit' element ={<SingleSubGreddIIIT/>}/>
        </Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/landing' element={<Landing/>}></Route>
        <Route path='*' element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
