import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import AIVision from './sections/AIVision';
import AIAssistant from './components/AIAssistant';
import Contact from './sections/Contact';

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <AIVision />
        <AIAssistant />
        <Contact />
      </main>
    </>
  );
}

export default App;
