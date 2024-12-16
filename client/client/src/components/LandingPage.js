import React from 'react';


function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">PayMeMaybe</h1>
        <div className="nav-links">
          <a href="/login" className="nav-button">Login</a>
          <a href="/signup" className="nav-button">Sign Up</a>
        </div>
      </nav>
//arsim continue with hero section  or smth else  then gazmend with the footer and finishin it 
{/* Hero Section */}
      <header className="hero-section">
        <h2>Your Gateway to Secure Freelance Payments</h2>
        <p>Simplify your workflow and connect with top talent worldwide.</p>
        <div className="hero-buttons">
          <a href="/signup" className="primary-button">Get Started</a>
          <a href="/learn-more" className="secondary-button">Learn More</a>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature">
          <h3>Secure Payments</h3>
          <p>Experience peace of mind with escrow-based transactions.</p>
        </div>
        <div className="feature">
          <h3>Global Network</h3>
          <p>Collaborate with professionals across the globe.</p>
        </div>
        <div className="feature">
          <h3>24/7 Support</h3>
          <p>Get assistance whenever you need it.</p>
        </div>
      </section>
  //arsim's work is done gazmend can countinue
