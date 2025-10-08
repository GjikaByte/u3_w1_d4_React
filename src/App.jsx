import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import Welcome from './components/Welcome'
// import AllTheBooks from './components/AllTheBooks'
import { Container } from 'react-bootstrap'
import BookList from './components/BookList'
import Componentfn from './components/componentfn'

import fantasy from './data/fantasy.json'
import { Component } from 'react'

function App() {

  return (
    <>
      <Componentfn/>
      <MyNav />
      <Container>
        <Welcome />
        {/* <AllTheBooks /> */}
        <BookList books={fantasy} />
      </Container>
      <MyFooter />
    </>
  )
}

export default App
