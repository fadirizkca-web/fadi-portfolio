import { Routes, Route } from 'react-router-dom';

import Home from '../components/Home';
import Layout from '../components/Layout';

import About from './about';
import Education from './education';
import Project from './project';
import Services from './services';
import Contact from './contact';

function MainRouter() {

  return (
    <div>

      <Layout />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/education"
          element={<Education />}
        />

        <Route
          path="/project"
          element={<Project />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

    </div>
  );
}

export default MainRouter;