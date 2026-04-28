// Konnecta — main app
const App = () => {
  return (
    <I18nProvider>
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <LogoStrip />
      <ConsultingSection />
      <Solutions />
      <Process />
      <Platform />
      <ROICalculator />
      <CaseStudy />
      <Stack />
      <Testimonials />
      <FinalCTA />
      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
          .grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
          .grid-6 { grid-template-columns: repeat(3, 1fr) !important; }
          .platform-grid { grid-template-columns: 1fr !important; }
          .grid-2-stack { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-5 { grid-template-columns: 1fr !important; }
          .grid-6 { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
    </I18nProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
