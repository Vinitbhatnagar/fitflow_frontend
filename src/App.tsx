import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { showToast } from './utils/toast';
import { Dumbbell, Activity, Shield, Zap } from 'lucide-react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!loading && heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col font-sans" ref={containerRef}>
      {/* Navbar */}
      <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-200">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl flex items-center gap-2 text-primary font-bold">
            <Dumbbell className="w-6 h-6" />
            FitFlow
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 font-medium hidden md:flex">
            <li><Link to="/">Programs</Link></li>
            <li><Link to="/">Trainers</Link></li>
          </ul>
          <a className="btn btn-primary btn-sm ml-4 rounded-full px-6">Join Now</a>
        </div>
      </div>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center py-32 px-4 bg-gradient-to-br from-base-100 to-base-200/50 min-h-[90vh]">
        <div className="max-w-5xl text-center space-y-8">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-medium text-sm border border-secondary/20">
            Welcome to the future of fitness
          </div>
          <h1 
            ref={heroTextRef}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight opacity-0"
          >
            Unleash Your<br />Ultimate Potential
          </h1>
          <p className="text-xl md:text-2xl text-base-content/70 font-light max-w-3xl mx-auto leading-relaxed">
            Experience next-generation fitness tracking and personalized workouts powered by AI. Designed for athletes, built for everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <button 
              onClick={() => showToast.success('Welcome! Your free trial has started.')}
              className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/30 hover:scale-105 transition-transform duration-300">
              Start Free Trial
            </button>
            <Link to="/" className="btn btn-outline btn-lg rounded-full px-10 hover:scale-105 transition-transform duration-300">
              View Plans
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 px-4">Why Choose FitFlow?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="card bg-base-100 shadow-xl border border-base-200 p-2">
                <div className="card-body">
                  <Skeleton circle width={64} height={64} className="mb-6" />
                  <Skeleton height={32} width="80%" className="mb-4" />
                  <Skeleton count={3} className="mb-2" />
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="card bg-base-100 shadow-xl border border-base-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="card-body">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                    <Activity className="w-8 h-8" />
                  </div>
                  <h3 className="card-title text-3xl mb-2">Smart Tracking</h3>
                  <p className="text-base-content/70 text-lg leading-relaxed">Automatically log your reps, sets, and rests with our innovative AI recognition system.</p>
                </div>
              </div>
              
              <div className="card bg-base-100 shadow-xl border border-base-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="card-body">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-content transition-all duration-300">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="card-title text-3xl mb-2">Lightning Fast</h3>
                  <p className="text-base-content/70 text-lg leading-relaxed">Our app is optimized for speed, ensuring you spend less time logging and more time lifting.</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl border border-base-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="card-body">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-content transition-all duration-300">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="card-title text-3xl mb-2">Data Protection</h3>
                  <p className="text-base-content/70 text-lg leading-relaxed">Your health data is encrypted and securely stored. We value your privacy above everything.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* spacer to check lenis smooth scrolling */}
      <div className="h-64 flex items-center justify-center text-base-content/40 italic">
        Scroll down to see the magic.
      </div>
      
      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content mt-auto">
        <aside>
          <Dumbbell className="w-12 h-12 text-primary mb-2" />
          <p className="text-lg font-bold">FitFlow Industries Ltd.</p>
          <p className="opacity-70">Providing reliable fitness tech since 2024</p>
        </aside> 
        <nav>
          <h6 className="footer-title">Services</h6> 
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav> 
        <nav>
          <h6 className="footer-title">Company</h6> 
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav> 
        <nav>
          <h6 className="footer-title">Legal</h6> 
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="mb-4">Page not found.</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
