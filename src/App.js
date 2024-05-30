import './App.css';

import ScrollNavBar from './sections/Navbar/ScrollNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <ScrollNavBar/>
      <section id="home">HOME</section>
      <section id="expertise">Expertise</section>
      <section id="work">Work</section>
      <section id="experience">Experience</section>
      <section id="contact">Contact</section>
    </>
  );
}

export default App;
