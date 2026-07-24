import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import AIExpertise from './sections/AIExpertise';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Workflow from './sections/Workflow';
import TechStack from './sections/TechStack';
import Metrics from './sections/Metrics';
import AIAssistant from './components/AIAssistant';
import Contact from './sections/Contact';

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <AIExpertise />
        <Experience />
        <Projects />
        <Workflow />
        <TechStack />
        <Metrics />
        <AIAssistant />
        <Contact />
      </main>
    </>
  );
}

export default App;
