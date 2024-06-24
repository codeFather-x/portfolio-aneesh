import './App.css';
import ScrollNavBar from './components/Navbar/ScrollNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './sections/Home/Home';
import Contact from './sections/Contact/Contact';

function App() {
  return (
    <>
      <ScrollNavBar/>
      <section id="home"><Home/></section>
      <section id="expertise">Expertise</section>
      <section id="work">Work</section>
      <section id="experience">Experience</section>
      <section id="contact"><Contact/></section>
    </>
  );
}

export default App;
