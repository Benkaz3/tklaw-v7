import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogPage from './pages/BlogPage';
import PoliciesPage from './pages/PoliciesPage';
import BlogPost from './pages/BlogPost';
import OurTeamPage from './pages/OurTeamPage';
import PracticeDetailsPage from './pages/PracticeDetailsPage';
import PracticesAndSectorsSection from './pages/PracticesAndSectorsPage';
import AuthorProfile from './pages/AuthorProfile';
import BlogCategoryPage from './pages/BlogCategoryPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Navigate replace to='/vi' />} />
          <Route path='/en' element={<HomePage />} />
          <Route path='/vi' element={<HomePage />} />
            <Route
              path='/vi/linh-vuc-hanh-nghe/:slug'
              element={<PracticeDetailsPage />}
            />
            <Route
              path='/en/practices/:slug'
              element={<PracticeDetailsPage />}
            />
            <Route
              path='/en/practices'
              element={<PracticesAndSectorsSection />}
            />
            <Route
              path='/vi/linh-vuc-hanh-nghe'
              element={<PracticesAndSectorsSection />}
            />
            <Route path='/vi/lien-he' element={<ContactPage />} />
            <Route path='/en/contact' element={<ContactPage />} />
            <Route path='/en/blog' element={<BlogPage />} />
            <Route path='/vi/blog' element={<BlogPage />} />
            <Route path='/vi/blog/:slug' element={<BlogPost />} />
            <Route path='/en/blog/:slug' element={<BlogPost />} />
            <Route path='/en/attorneys' element={<OurTeamPage />} />
            <Route path='/vi/luat-su' element={<OurTeamPage />} />
            <Route path='/vi/luat-su/:slug' element={<AuthorProfile />} />
            <Route path='/en/attorneys/:slug' element={<AuthorProfile />} />
            <Route path='/en/policies' element={<PoliciesPage />} />
            <Route path='/vi/chinh-sach' element={<PoliciesPage />} />
            <Route
              path='/vi/blog/chu-de/:slug'
              element={<BlogCategoryPage />}
            />
            <Route
              path='/en/blog/category/:slug'
              element={<BlogCategoryPage />}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
