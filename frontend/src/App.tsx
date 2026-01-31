import './App.css'
import NavBar from './components/NavBar'
import TopView from './components/TopView'
import QuestionView from './components/QuestionView'
import ResultView from './components/ResultView'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (

    <>
      {/* ナビゲーションバー */}
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TopView></TopView>}></Route>
          <Route path='question' element={<QuestionView></QuestionView>}></Route>
          <Route path='result' element={<ResultView></ResultView>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App