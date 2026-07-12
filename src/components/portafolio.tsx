import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Folder, 
  Layers, 
  ExternalLink, 
  Send, 
  Check, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Github, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Code, 
  Sparkles,
  MousePointer,
  Maximize2,
  Info
} from 'lucide-react';


/**
 * CONFIGURACIÓN CENTRALIZADA DE DATOS (Fácil de editar)
 * Modifica este objeto para actualizar todo el contenido del portafolio al instante.
 */
const PORTFOLIO_CONFIG = {
  personal: {
    name: "Helen Tilaguy",
    role: "Diseñadora gráfica Audiovisual",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    aboutShort: "Diseñadora Gráfica y Audiovisual con experiencia especializada en animación 3D, motion graphics y edición de video. Apasionada por la narrativa visual, con dominio técnico en herramientas como Blender, Maya y Adobe Creative Suite para crear identidades dinámicas y contenido impactante para redes sociales y campañas corporativas.",
    bio: "Diseñadora gráfica y animadora de motion graphics con sólida experiencia en animación 3D y edición de video. Apasionada por la narrativa visual a través de diseños creativos e innovadores. Poseo habilidades avanzadas en software de diseño y animación, enfocándome en la originalidad y el impacto visual. Busco contribuir a equipos dinámicos que valoren la innovación, colaborando en proyectos que inspiren y sorprendan.",
    location: "Bogota, Colombia (Disponible para remoto internacional)",
    email: "Helentilaguyv@gmail.com",
    phone: "+57 3219620424",
    resumeUrl: "/Helen-Tilaguy-CV.pdf",
    stats: [
      { label: "Años de Experiencia", value: "8+" },
      { label: "Proyectos Completados", value: "140+" },
      { label: "Premios de Diseño", value: "12" },
      { label: "Clientes Satisfechos", value: "99%" }
    ]
  },
  
  theme: {
    accentColor: "indigo-600", // Clases Tailwind para botones e indicadores activos
    accentColorHover: "indigo-700",
    fontFamily: "sans-serif", // Utilizado para fuentes principales
  },

  socials: [
    { name: "Behance", url: "https://behance.net", icon: "Layers" },
    { name: "Dribbble", url: "https://dribbble.com", icon: "Sparkles" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { name: "Instagram", url: "https://instagram.com", icon: "Instagram" }
  ],

  services: [
    {
      id: "srv-1",
      title: "Identidad de Marca Premium",
      description: "Sistemas visuales completos, logotipos icónicos, manuales de marca de lujo y papelería corporativa de alta gama.",
      tags: ["Brandbook", "Logos", "Art Direction"]
    },
    {
      id: "srv-2",
      title: "Diseño Editorial & Packaging",
      description: "Libros de arte, revistas independientes, memorias corporativas y diseño de packaging estructural y gráfico premium.",
      tags: ["Packaging", "Editorial", "Print Tech"]
    },
    {
      id: "srv-3",
      title: "Dirección de Arte Digital",
      description: "Conceptualización de interfaces web sofisticadas, motion graphics para campañas de lujo y dirección fotográfica.",
      tags: ["Web Design", "3D Elements", "Motion"]
    }
  ],

  skills: {
    creative: [
      { name: "Dirección de Arte", level: 95 },
      { name: "Diseño de Tipografía", level: 85 },
      { name: "Diseño de Packaging", level: 90 },
      { name: "Branding de Lujo", level: 98 },
      { name: "Composición Editorial", level: 92 },
      { name: "Animación de Marca (Motion)", level: 80 }
    ],
    software: [
      { name: "Adobe Illustrator", level: 98, icon: "Ai" },
      { name: "Adobe Photoshop", level: 95, icon: "Ps" },
      { name: "Adobe InDesign", level: 90, icon: "Id" },
      { name: "Figma (UI/UX Design)", level: 88, icon: "Fg" },
      { name: "After Effects & Cinema 4D", level: 75, icon: "Ae" }
    ]
  },

  timeline: {
    experience: [
      {
        id: "exp-1",
        role: "Director Creativo Senior",
        company: "Studio Aura - Agencia de Lujo",
        period: "2023 - Presente",
        description: "Liderazgo de equipos de diseño gráfico para campañas internacionales de moda, joyería y automoción de alta gama. Rediseño completo de la identidad corporativa de 4 clientes Fortune 500."
      },
      {
        id: "exp-2",
        role: "Diseñador Gráfico Lead",
        company: "Vanguard Design Co.",
        period: "2020 - 2023",
        description: "Supervisión del equipo de diseño editorial y de packaging. Desarrollo de empaques sostenibles premiados en festivales internacionales de diseño como los Pentawards."
      },
      {
        id: "exp-3",
        role: "Diseñador Visual Junior & Mid",
        company: "Nova Brand Agency",
        period: "2018 - 2020",
        description: "Creación de logotipos, directrices de marca, diseño de revistas premium e ilustración editorial para medios de comunicación líderes del sector creativo."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Máster en Dirección de Arte y Estrategia de Marca",
        school: "Elisava School of Design - Barcelona",
        period: "2017 - 2018",
        description: "Especialización en creación de marcas premium y diseño conceptual aplicado a entornos físicos y digitales."
      },
      {
        id: "edu-2",
        degree: "Grado en Diseño Gráfico",
        school: "Universidad de Artes Visuales",
        period: "2013 - 2017",
        description: "Formación integral en tipografía analógica y digital, historia del arte, fotografía editorial y composición visual."
      }
    ],
    certifications: [
      { name: "Premio Pentawards de Oro - Diseño de Packaging Premium", year: "2023" },
      { name: "Adobe Certified Expert - Illustrator & InDesign", year: "2021" },
      { name: "Best Portfolio Award - Behance Community", year: "2022" }
    ]
  },

  projects: [
    {
      id: "proj-1",
      title: "Solitude - Identidad para Perfumería Francesa",
      category: "Branding",
      year: "2025",
      client: "Solitude Paris",
      role: "Director de Arte & Diseñador Principal",
      coverImage: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800",
      description: "Diseño integral de marca y envase de alta costura para una nueva fragancia minimalista. El concepto visual se centra en el vacío y la elegancia de la tipografía serif customizada tallada en cristal de alta pureza.",
      gallery: [
        "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800"
      ],
      tools: ["Typography Custom", "Cinema 4D", "Adobe Illustrator", "Linen Hot Stamping"]
    },
    {
      id: "proj-2",
      title: "Monolith - Libro de Fotografía y Arquitectura",
      category: "Editorial",
      year: "2024",
      client: "Museo de Arte Brutalista",
      role: "Diseñador Editorial",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      description: "Libro de tapa dura de gran formato con un diseño de rejilla suizo estricto, jugando con contrastes tipográficos extremos y papeles texturizados de origen ecológico.",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
      ],
      tools: ["Adobe InDesign", "Editorial Grid", "Ecolabel Textured Paper", "Serigraphy"]
    },
    {
      id: "proj-3",
      title: "Elysium - Packaging de Cosmética Orgánica",
      category: "Packaging",
      year: "2024",
      client: "Elysium Botanicals",
      role: "Diseñador de Packaging & Concepto",
      coverImage: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=800",
      description: "Estudio conceptual para una marca de cosmética bio premium. Se diseñaron frascos de cerámica blanca reutilizables con etiquetas de papel de semilla plantable.",
      gallery: [
        "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"
      ],
      tools: ["Ceramic Prototyping", "Sustainable Material Tech", "Minimalist Logo"]
    },
    {
      id: "proj-4",
      title: "Velvet - Dirección de Arte Digital",
      category: "UI/UX & Web",
      year: "2025",
      client: "Velvet Fashion Club",
      role: "Director de Arte Digital",
      coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
      description: "Experiencia de comercio electrónico interactivo y editorial web para una marca de alta costura contemporánea. Animaciones fluidas, transiciones de pantalla premium y tipografías responsivas.",
      gallery: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
      ],
      tools: ["Figma Web Design", "Interactive Flow", "Motion Graphic Presets"]
    },
    {
      id: "proj-5",
      title: "Krypton - Campaña Expositiva 3D",
      category: "Motion & 3D",
      year: "2023",
      client: "Krypton Virtual Center",
      role: "Artista 3D & Director de Arte",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      description: "Serie de renders de marca abstractos y posters impresos tridimensionales de neón para una exposición internacional sobre metaverso y escultura digital.",
      gallery: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
      ],
      tools: ["Cinema 4D", "Octane Render", "Posters Tridimensionales", "Photoshop CC"]
    },
    {
      id: "proj-6",
      title: "Nordic - Sistema Tipográfico Modular",
      category: "Branding",
      year: "2023",
      client: "Nordic Fonts Foundry",
      role: "Diseñador de Tipografía",
      coverImage: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=800",
      description: "Diseño y desarrollo de una fuente sans-serif geométrica con terminaciones orgánicas, inspirada en las runas nórdicas y el diseño escandinavo de mediados de siglo.",
      gallery: [
        "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=800"
      ],
      tools: ["Glyphs App", "Vector Refinement", "Kerning Optimization"]
    }
  ],

  testimonials: [
    {
      id: "test-1",
      quote: "Alex posee una sensibilidad estética excepcional. No solo diseñó el packaging más hermoso que nuestra marca ha tenido en su historia, sino que entendió perfectamente el alma comercial de nuestra marca premium.",
      author: "Hélene Dubois",
      position: "Fundadora, Solitude Paris",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: "test-2",
      quote: "Trabajar con Alex es garantía de excelencia. Sus sistemas visuales y manuales de marca son de un nivel técnico impresionante. Consiguió coordinar todo nuestro universo digital con una coherencia impecable.",
      author: "Marcus Vance",
      position: "Director de Marketing, Elysium",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
    }
  ],

  clients: [
    { name: "Vogue", logo: "VOGUE" },
    { name: "Audi", logo: "AUDI" },
    { name: "Hermes", logo: "HERMÈS" },
    { name: "Moët & Chandon", logo: "MOËT" },
    { name: "Pentagram Agency", logo: "PENTAGRAM" }
  ]
};


// Inyectamos estilos CSS personalizados para animaciones sutiles, fuentes y el cursor
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
    
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      scroll-behavior: smooth;
    }

    .font-serif-luxury {
      font-family: 'Playfair Display', serif;
    }

    /* Animación de Marquee Continuo */
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 25s linear infinite;
    }

    /* Animación Flotante */
    @keyframes floating {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .animate-floating {
      animation: floating 6s ease-in-out infinite;
    }

    /* Efectos de vidrio de alta gama */
    .glass-premium-dark {
      background: rgba(18, 18, 22, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    
    .glass-premium-light {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    /* Transición de colores global */
    .theme-transition {
      transition: background-color 0.5s ease, border-color 0.5s ease, text-color 0.5s ease;
    }

    /* Personalización de la barra de scroll */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0d0d0f;
    }
    ::-webkit-scrollbar-thumb {
      background: #27272a;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #3f3f46;
    }

    /* Gradiente dinámico de fondo animado */
    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animated-grad {
      background-size: 200% 200%;
      animation: gradientBG 15s ease infinite;
    }

    /* Animación de pulso para loader */
    @keyframes linePulse {
      0% { width: 0%; }
      50% { width: 70%; }
      100% { width: 100%; }
    }
    .loader-progress {
      animation: linePulse 2.2s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
    }
  `}} />
);


export default function Portfolio() {
  // Configuración de temas e interactividad
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("experience"); // "experience" | "education" | "certifications"
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  
  // Estados para formulario de contacto
  const [formData, setFormData] = useState({ name: "", email: "", budget: "Premium (<5K€)", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Estado para la documentación interactiva interna
  const [showDocs, setShowDocs] = useState(false);

  // Monitorización del scroll para barra de progreso superior e iluminar headers
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Simular el cargador premium
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Seguimiento del cursor
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // Control de scroll
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledRatio = (winScroll / height) * 100;
      setScrollProgress(scrolledRatio);

      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filtrado de proyectos del portafolio
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PORTFOLIO_CONFIG.projects;
    return PORTFOLIO_CONFIG.projects.filter(proj => 
      proj.category.toLowerCase().includes(activeCategory.toLowerCase()) || 
      activeCategory.toLowerCase().includes(proj.category.toLowerCase())
    );
  }, [activeCategory]);

  // Lista de categorías únicas del archivo de datos
  const categories = useMemo(() => {
    const list = new Set(PORTFOLIO_CONFIG.projects.map(p => p.category));
    return ["All", ...Array.from(list)];
  }, []);

  // Manejar el envío simulado del formulario con alta fidelidad
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", budget: "Premium (<5K€)", message: "" });
      // Resetear mensaje de éxito después de unos segundos
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1500);
  };

  // Helper para alternar cursor interactivo al pasar el ratón por elementos interactivos
  const triggerCursorHover = (isHovering) => {
    setCursorHovered(isHovering);
  };


  return (
    <div className={`theme-transition min-h-screen relative overflow-x-hidden ${darkMode ? 'bg-[#0a0a0c] text-neutral-100' : 'bg-[#fafafc] text-neutral-900'}`}>
      <CustomStyles />

      {/* Cursor Personalizado (Se esconde en dispositivos táctiles) */}
      <div 
        className={`hidden md:block fixed pointer-events-none z-50 rounded-full transition-transform duration-100 mix-blend-difference -translate-x-1/2 -translate-y-1/2 ${
          cursorHovered ? 'w-12 h-12 bg-white scale-110 opacity-60' : 'w-4 h-4 bg-indigo-500'
        }`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* PANTALLA DE CARGA (PREMIUM INTRO) */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-[#0d0d0f] flex flex-col justify-center items-center px-6">
          <div className="max-w-md w-full space-y-8 text-center">
            {/* Logo de la carga */}
            <div className="inline-flex p-3 bg-neutral-900 border border-white/10 rounded-2xl mb-4 animate-floating">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-serif-luxury text-white tracking-widest uppercase">
                {PORTFOLIO_CONFIG.personal.name}
              </h2>
              <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                {PORTFOLIO_CONFIG.personal.role}
              </p>
            </div>

            {/* Línea de carga sofisticada */}
            <div className="w-full h-[2px] bg-neutral-800 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 loader-progress" />
            </div>

            <p className="text-xs text-neutral-600 tracking-wider">
              Diseño sofisticado • Portafolio interactivo v2.5
            </p>
          </div>
        </div>
      )}

      {/* BARRA DE PROGRESO DE SCROLL */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {}

      {/* MENÚ DE NAVEGACIÓN */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? darkMode ? 'glass-premium-dark py-4 shadow-xl' : 'glass-premium-light py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center space-x-2.5 text-lg font-bold tracking-tight"
            onMouseEnter={() => triggerCursorHover(true)}
            onMouseLeave={() => triggerCursorHover(false)}
          >
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-500/20">
              AV
            </span>
            <span className="font-serif-luxury text-xl tracking-wider">
              {PORTFOLIO_CONFIG.personal.name.split(' ')[0]}
              <span className="text-indigo-500 font-sans">.</span>
            </span>
          </a>

          {/* Menú de Escritorio */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#about" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Sobre mí</a>
            <a href="#services" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Servicios</a>
            <a href="#portfolio" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Proyectos</a>
            <a href="#experience" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Trayectoria</a>
            <a href="#contact" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Contacto</a>
          </nav>

          {/* Acciones de Cabecera */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Botón Docs Informativo */}
            <button
              onClick={() => setShowDocs(!showDocs)}
              className={`p-2 rounded-lg transition-all ${
                darkMode ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300' : 'bg-white hover:bg-neutral-100 text-neutral-700'
              } border ${darkMode ? 'border-white/5' : 'border-black/5'} flex items-center gap-1.5 text-xs font-semibold`}
              title="Instrucciones de Despliegue & Edición"
              onMouseEnter={() => triggerCursorHover(true)}
              onMouseLeave={() => triggerCursorHover(false)}
            >
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Ayuda Dev</span>
            </button>

            {/* Alternar Tema */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-lg border transition-all ${
                darkMode ? 'bg-neutral-900 hover:bg-neutral-800 border-white/5 text-yellow-400' : 'bg-white hover:bg-neutral-100 border-black/5 text-indigo-600'
              }`}
              onMouseEnter={() => triggerCursorHover(true)}
              onMouseLeave={() => triggerCursorHover(false)}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Botón CTA */}
            <a 
              href="#contact" 
              className={`px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all duration-300 ${
                darkMode 
                  ? 'bg-white hover:bg-indigo-600 text-neutral-950 hover:text-white shadow-white/5' 
                  : 'bg-neutral-950 hover:bg-indigo-600 text-white shadow-black/10'
              }`}
              onMouseEnter={() => triggerCursorHover(true)}
              onMouseLeave={() => triggerCursorHover(false)}
            >
              Trabajemos
            </a>
          </div>

          {/* Botones móviles */}
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border ${
                darkMode ? 'bg-neutral-900 border-white/5 text-yellow-400' : 'bg-white border-black/5 text-indigo-600'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${
                darkMode ? 'bg-neutral-900 border-white/5 text-white' : 'bg-white border-black/5 text-neutral-900'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú de navegación móvil expandido */}
        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full p-6 transition-all duration-300 border-t ${
            darkMode ? 'bg-[#0f0f12]/95 border-white/10' : 'bg-white/95 border-neutral-200'
          } shadow-2xl backdrop-blur-lg`}>
            <div className="flex flex-col space-y-4">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-1">Sobre mí</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-1">Servicios</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-1">Proyectos</a>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-1">Trayectoria</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-1">Contacto</a>
              
              <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
                <button
                  onClick={() => { setShowDocs(true); setMobileMenuOpen(false); }}
                  className="w-full py-3 px-4 bg-indigo-600/10 text-indigo-400 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Info className="w-4 h-4" /> Guía de Edición
                </button>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-3 text-center rounded-lg text-sm font-bold ${
                    darkMode ? 'bg-white text-neutral-950' : 'bg-neutral-950 text-white'
                  }`}
                >
                  Contacto Directo
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {}

      {/* SECCIÓN HERO (Presentación de Alto Impacto) */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Fondo abstracto con círculos de brillo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-pink-600/10 blur-[130px]" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Textos del Hero */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              Diseño de Identidad Premium & Vanguardia
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
                {PORTFOLIO_CONFIG.personal.name.split(' ')[0]} <br />
                <span className="font-serif-luxury font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400">
                  {PORTFOLIO_CONFIG.personal.name.split(' ')[1]}
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-neutral-400 max-w-xl">
                {PORTFOLIO_CONFIG.personal.role}
              </h2>
            </div>

            <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
              {PORTFOLIO_CONFIG.personal.aboutShort}
            </p>

            {/* Acciones principales */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#portfolio" 
                className="px-8 py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-1"
                onMouseEnter={() => triggerCursorHover(true)}
                onMouseLeave={() => triggerCursorHover(false)}
              >
                Mis Trabajos
              </a>
              <a 
                href={PORTFOLIO_CONFIG.personal.resumeUrl} 
                className={`px-8 py-4 rounded-xl font-bold border flex items-center gap-2 transition-all transform hover:-translate-y-1 ${
                  darkMode 
                    ? 'bg-neutral-900/60 border-white/10 text-white hover:bg-neutral-800' 
                    : 'bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50'
                }`}
                onMouseEnter={() => triggerCursorHover(true)}
                onMouseLeave={() => triggerCursorHover(false)}
              >
                <Download className="w-4 h-4" />
                Descargar CV
              </a>
            </div>

            {/* Indicadores numéricos del Hero */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-neutral-800/20">
              {PORTFOLIO_CONFIG.personal.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl md:text-3xl font-black text-indigo-400">{stat.value}</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen Interactiva / Canvas Conceptual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl animate-floating border border-white/10 group">
              {/* Overlay de gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-transparent z-10" />
              
              {/* Imagen Principal */}
              <img 
                src={PORTFOLIO_CONFIG.personal.avatar} 
                alt={PORTFOLIO_CONFIG.personal.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Tag flotante */}
              <div className="absolute bottom-6 left-6 right-6 z-20 p-4 rounded-xl bg-neutral-900/90 border border-white/10 backdrop-blur-md flex items-center justify-between">
                <div>
                  <h4 className="text-xs text-neutral-400 tracking-widest uppercase">Ubicación</h4>
                  <p className="text-sm font-bold text-white">{PORTFOLIO_CONFIG.personal.location}</p>
                </div>
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" title="Disponible para proyectos" />
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll flotante inferior */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
          <span className="text-xs tracking-widest uppercase">Saber más</span>
          <div className="w-1 h-8 bg-neutral-800 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* MARQUESINA CLIENTES DE PRESTIGIO */}
      <section className={`py-12 border-y ${darkMode ? 'bg-neutral-950/40 border-white/5' : 'bg-neutral-100/50 border-neutral-200'} overflow-hidden`}>
        <div className="flex whitespace-nowrap overflow-hidden relative">
          <div className="flex animate-marquee space-x-16 text-2xl font-bold uppercase tracking-[0.2em] text-neutral-500/60">
            {/* Repetimos elementos para scroll infinito */}
            {[...PORTFOLIO_CONFIG.clients, ...PORTFOLIO_CONFIG.clients, ...PORTFOLIO_CONFIG.clients].map((client, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-indigo-500/40" />
                {client.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {}

      {/* SECCIÓN SOBRE MÍ */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Texto de Filosofía Creativa */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-indigo-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <Heart className="w-4 h-4" /> Sobre Mí
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Diseñando para marcas con <span className="font-serif-luxury italic text-indigo-400">alma</span> y propósito.
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                {PORTFOLIO_CONFIG.personal.bio}
              </p>
              <div className="p-6 rounded-2xl border bg-indigo-500/5 border-indigo-500/10 space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  Compromiso de calidad premium
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Cada identidad conceptual, packaging o diseño web se trata como una obra de arte independiente. Dedico el tiempo necesario para estudiar a tu competencia directa, pulir hasta el último vector y asegurar un lanzamiento inolvidable.
                </p>
              </div>
            </div>

            {/* Cuadrícula de Información & Redes */}
            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Carta de Datos Personales */}
                <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-[#0f0f12] border-white/5' : 'bg-white border-black/5'} space-y-4 shadow-sm`}>
                  <h3 className="text-xl font-bold">Datos de contacto</h3>
                  <div className="space-y-3.5 text-sm text-neutral-400">
                    <p className="flex justify-between border-b border-neutral-800/40 pb-2">
                      <span className="font-semibold text-neutral-300">Ubicación</span>
                      <span>{PORTFOLIO_CONFIG.personal.location.split(' ')[0]}</span>
                    </p>
                    <p className="flex justify-between border-b border-neutral-800/40 pb-2">
                      <span className="font-semibold text-neutral-300">Email</span>
                      <a href={`mailto:${PORTFOLIO_CONFIG.personal.email}`} className="text-indigo-400 hover:underline">{PORTFOLIO_CONFIG.personal.email}</a>
                    </p>
                    <p className="flex justify-between border-b border-neutral-800/40 pb-2">
                      <span className="font-semibold text-neutral-300">Teléfono</span>
                      <span>{PORTFOLIO_CONFIG.personal.phone}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold text-neutral-300">Idiomas</span>
                      <span>Español, Inglés</span>
                    </p>
                  </div>
                </div>

                {/* Redes Sociales y enlaces externos */}
                <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-[#0f0f12] border-white/5' : 'bg-white border-black/5'} flex flex-col justify-between shadow-sm`}>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">Universo Digital</h3>
                    <p className="text-sm text-neutral-400">Sígueme en redes y plataformas de arte para ver mis bocetos diarios y experimentos interactivos.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-6">
                    {PORTFOLIO_CONFIG.socials.map((social, i) => (
                      <a 
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl border text-center font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          darkMode 
                            ? 'bg-neutral-900 border-white/5 hover:bg-neutral-800 text-white' 
                            : 'bg-neutral-50 border-black/5 hover:bg-neutral-100 text-neutral-900'
                        }`}
                        onMouseEnter={() => triggerCursorHover(true)}
                        onMouseLeave={() => triggerCursorHover(false)}
                      >
                        {social.name === "Behance" && <Layers className="w-3.5 h-3.5 text-indigo-400" />}
                        {social.name === "Dribbble" && <Sparkles className="w-3.5 h-3.5 text-pink-400" />}
                        {social.name === "LinkedIn" && <Linkedin className="w-3.5 h-3.5 text-blue-400" />}
                        {social.name === "Instagram" && <Instagram className="w-3.5 h-3.5 text-purple-400" />}
                        <span>{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* Carta Grande de Enfoque */}
              <div className={`p-8 rounded-2xl border ${
                darkMode ? 'bg-gradient-to-br from-[#0f0f12] to-neutral-900/40 border-white/5' : 'bg-white border-black/5'
              } flex flex-col md:flex-row items-center gap-8 shadow-sm`}>
                <div className="w-20 h-20 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Code className="w-10 h-10 text-indigo-400 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold">Diseño Integrado & Front-End Inteligente</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    A diferencia de los diseñadores puros, entiendo el desarrollo tecnológico. Domino CSS, React, Figma y las especificaciones de interfaz para que los programadores reciban activos listos para desplegar al pixel.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section id="services" className={`py-24 border-t ${darkMode ? 'bg-neutral-950/20 border-white/5' : 'bg-[#f4f4f7] border-neutral-200'} relative`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Servicios Especializados</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Soluciones de diseño sofisticadas</h2>
            <p className="text-neutral-400">Conceptos que transforman percepciones, aumentan ventas y construyen identidades inolvidables.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PORTFOLIO_CONFIG.services.map((service, index) => (
              <div 
                key={service.id}
                className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group ${
                  darkMode ? 'bg-[#0f0f12] border-white/5 hover:border-indigo-500/50' : 'bg-white border-black/5 hover:border-indigo-600/50'
                } flex flex-col justify-between`}
              >
                <div className="space-y-6">
                  {/* Número identificativo */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-neutral-500">0{index + 1}</span>
                    <div className="p-3 rounded-2xl bg-indigo-500/5 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {index === 0 && <Layers className="w-6 h-6" />}
                      {index === 1 && <Folder className="w-6 h-6" />}
                      {index === 2 && <Sparkles className="w-6 h-6" />}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{service.description}</p>
                  </div>
                </div>

                <div className="pt-8 flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-neutral-800/30 text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      { }

      {/* SECCIÓN DE HABILIDADES & PROGRAMAS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Destreza Técnica</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Especialidades & software creativo</h2>
            <p className="text-neutral-400 leading-relaxed">
              La creatividad necesita herramientas rigurosas. Equilibro la destreza analógica clásica, bocetos a mano y dirección artística con el dominio absoluto de la suite de Adobe Creative Cloud, 3D y diseño de interfaces en Figma.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 rounded-xl bg-neutral-800/40 text-sm font-bold border border-white/5">Vector Design</span>
              <span className="px-4 py-2 rounded-xl bg-neutral-800/40 text-sm font-bold border border-white/5">Art Direction</span>
              <span className="px-4 py-2 rounded-xl bg-neutral-800/40 text-sm font-bold border border-white/5">UI Systems</span>
              <span className="px-4 py-2 rounded-xl bg-neutral-800/40 text-sm font-bold border border-white/5">Blender renders</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {/* Pestañas de habilidades */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Especialidades Creativas
              </h3>
              <div className="space-y-4">
                {PORTFOLIO_CONFIG.skills.creative.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programas */}
            <div className="pt-6 border-t border-neutral-800/40">
              <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5" /> Dominio de Programas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {PORTFOLIO_CONFIG.skills.software.map((sw, index) => (
                  <div key={index} className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-neutral-900/60 border-white/5' : 'bg-white border-black/5'}`}>
                    <div className="text-indigo-400 text-lg font-black mb-1">{sw.icon}</div>
                    <div className="text-xs font-bold text-neutral-300">{sw.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-1">{sw.level}% experto</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {}

      {/* SECCIÓN TRAYECTORIA (EXPERIENCIA & EDUCACIÓN) */}
      <section id="experience" className={`py-24 border-t ${darkMode ? 'bg-neutral-950/20 border-white/5' : 'bg-white border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Trayectoria Profesional</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Experiencia y aprendizaje</h2>
            <p className="text-neutral-400">Una historia de dedicación en agencias de renombre internacional y formación académica continua.</p>
            
            {/* Controles del Timeline Tabs */}
            <div className="flex justify-center gap-4 pt-6">
              <button 
                onClick={() => setActiveTab("experience")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                  activeTab === "experience" 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : darkMode ? 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white' : 'bg-neutral-50 border-black/5 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Experiencia laboral
              </button>
              <button 
                onClick={() => setActiveTab("education")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                  activeTab === "education" 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : darkMode ? 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white' : 'bg-neutral-50 border-black/5 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Educación
              </button>
              <button 
                onClick={() => setActiveTab("certifications")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                  activeTab === "certifications" 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : darkMode ? 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white' : 'bg-neutral-50 border-black/5 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Premios y Certificados
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto relative pl-6 border-l border-neutral-800">
            {activeTab === "experience" && PORTFOLIO_CONFIG.timeline.experience.map((exp, index) => (
              <div key={exp.id} className="mb-12 relative group">
                {/* Marcador en el borde */}
                <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#0a0a0c] border-[3px] border-indigo-500 flex items-center justify-center transition-all group-hover:bg-indigo-500" />
                
                <div className="space-y-3 pl-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors">{exp.role}</h3>
                    <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-neutral-900 border border-white/5 text-neutral-400 self-start md:self-auto">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">{exp.company}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}

            {activeTab === "education" && PORTFOLIO_CONFIG.timeline.education.map((edu, index) => (
              <div key={edu.id} className="mb-12 relative group">
                {/* Marcador en el borde */}
                <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#0a0a0c] border-[3px] border-indigo-500 flex items-center justify-center transition-all group-hover:bg-indigo-500" />
                
                <div className="space-y-3 pl-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors">{edu.degree}</h3>
                    <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-neutral-900 border border-white/5 text-neutral-400 self-start md:self-auto">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-pink-400 uppercase tracking-widest">{edu.school}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">{edu.description}</p>
                </div>
              </div>
            ))}

            {activeTab === "certifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
                {PORTFOLIO_CONFIG.timeline.certifications.map((cert, index) => (
                  <div key={index} className="p-6 rounded-2xl border bg-neutral-900/40 border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base leading-tight">{cert.name}</h4>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Concedido en {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {}

      {/* SECCIÓN PORTFOLIO (Grid con Filtros y Lightbox) */}
      <section id="portfolio" className={`py-24 ${darkMode ? 'bg-neutral-950/40' : 'bg-[#fafafc]'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Galería de Trabajos</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Obras de arte y proyectos premium</h2>
              <p className="text-neutral-400 max-w-xl">Filtrados para revelar la excelencia creativa y de ejecución de cada campaña.</p>
            </div>

            {/* Filtros de Categorías */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : darkMode ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300' : 'bg-white hover:bg-neutral-100 text-neutral-700'
                  }`}
                  onMouseEnter={() => triggerCursorHover(true)}
                  onMouseLeave={() => triggerCursorHover(false)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Masonry Interactiva */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border ${
                  darkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-black/5'
                } hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300`}
                onMouseEnter={() => triggerCursorHover(true)}
                onMouseLeave={() => triggerCursorHover(false)}
              >
                {/* Contenedor de Imagen */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay interactivo */}
                  <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-4 bg-white/15 backdrop-blur-md rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                  {/* Categoría flotante en la foto */}
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0a0a0c]/80 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-indigo-400 border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Info básica inferior */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-xs text-neutral-500 uppercase tracking-widest font-bold">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tools.slice(0, 2).map((tool, i) => (
                      <span key={i} className="text-[10px] bg-neutral-800/50 text-neutral-400 px-2.5 py-1 rounded-md uppercase font-bold tracking-wider">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX / VENTANA MODAL DE DETALLE DE PROYECTO */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className={`w-full max-w-5xl rounded-3xl overflow-hidden border ${
            darkMode ? 'bg-[#0f0f12] border-white/10' : 'bg-white border-neutral-200'
          } shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto`}>
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-neutral-900/80 text-white border border-white/10 hover:bg-indigo-600 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Grid del Proyecto */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Carrusel de Galería (Lado Izquierdo) */}
              <div className="lg:col-span-7 bg-neutral-950 p-6 flex flex-col justify-center gap-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
                  <img 
                    src={selectedProject.coverImage} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Muestras extras si existen */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.gallery.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden">
                      <img src={img} alt={`Visualización ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalles textuales (Lado Derecho) */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div>
                    <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight mt-4">{selectedProject.title}</h2>
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Ficha técnica */}
                  <div className="border-t border-neutral-800 pt-6 space-y-3 text-sm">
                    <div className="flex justify-between border-b border-neutral-800/40 pb-2">
                      <span className="font-semibold text-neutral-400">Cliente</span>
                      <span className="font-bold text-white">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-800/40 pb-2">
                      <span className="font-semibold text-neutral-400">Rol desempeñado</span>
                      <span className="font-bold text-white">{selectedProject.role}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-800/40 pb-2">
                      <span className="font-semibold text-neutral-400">Año de Entrega</span>
                      <span className="font-bold text-white">{selectedProject.year}</span>
                    </div>
                  </div>

                  {/* Herramientas utilizadas */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Software & Técnicas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool, i) => (
                        <span key={i} className="text-[10px] bg-neutral-900 border border-white/5 text-neutral-300 px-3 py-1.5 rounded-lg font-bold tracking-wider uppercase">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Acciones del Lightbox */}
                <div className="pt-6 border-t border-neutral-800 flex gap-4">
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      // Scroll hasta el contacto directo
                      document.getElementById("contact").scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all"
                  >
                    Consultar por proyecto
                  </button>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-3 border border-neutral-700 hover:bg-neutral-800 text-white rounded-xl transition-all font-bold"
                  >
                    Cerrar
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {}

      {/* SECCIÓN TESTIMONIOS (Reviews Premium) */}
      <section className={`py-24 border-t ${darkMode ? 'bg-neutral-950/20 border-white/5' : 'bg-neutral-100/50 border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Opinión de Clientes</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Avalado por fundadores y directores de arte</h2>
            <p className="text-neutral-400">Testimonios de colaboraciones reales diseñadas para elevar la comunicación corporativa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PORTFOLIO_CONFIG.testimonials.map((test) => (
              <div 
                key={test.id}
                className={`p-8 rounded-3xl border ${
                  darkMode ? 'bg-[#0f0f12] border-white/5' : 'bg-white border-black/5'
                } relative flex flex-col justify-between space-y-8`}
              >
                {/* Comillas flotantes de lujo */}
                <span className="absolute top-6 right-8 text-6xl font-serif-luxury text-indigo-500/20 leading-none">“</span>

                <p className="text-base text-neutral-400 leading-relaxed italic z-10 relative">
                  "{test.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={test.avatar} 
                    alt={test.author} 
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-bold text-white text-base">{test.author}</h4>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider">{test.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}

      {/* SECCIÓN CONTACTO DIRECTO */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Luces de fondo del formulario */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[40%] right-[5%] w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />
          <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-purple-600/10 blur-[90px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Texto de Llamada al proyecto */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Establece Contacto</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Comencemos el viaje creativo</h2>
              <p className="text-neutral-400 leading-relaxed">
                ¿Tienes un lanzamiento de producto, un rediseño de marca o necesitas dirección artística integral para tu agencia? Cuéntame sobre tu proyecto y hablemos de cómo llevarlo a un nivel premium.
              </p>
              
              <div className="space-y-4 pt-4 text-sm text-neutral-400">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-indigo-400">@</span>
                  <p>{PORTFOLIO_CONFIG.personal.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-indigo-400">+</span>
                  <p>{PORTFOLIO_CONFIG.personal.phone}</p>
                </div>
              </div>

              {/* Tag de Respuesta rápida */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Tiempo de respuesta habitual: Menos de 24 horas</span>
              </div>
            </div>

            {/* Formulario Interactivo */}
            <div className={`lg:col-span-7 p-8 md:p-10 rounded-3xl border ${
              darkMode ? 'bg-[#0f0f12] border-white/5' : 'bg-white border-black/5'
            } shadow-2xl`}>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Tu nombre completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Sofia Loren"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/40 border border-white/5 text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Dirección de correo</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Ej. sofia@loren.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/40 border border-white/5 text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                    />
                  </div>

                </div>

                {/* Selección de Presupuesto */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Presupuesto Estimado</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Premium (<5K€)", "Gold (5K-10K€)", "Signature (>10K€)", "Mensual/Retainer"].map((budgetOpt) => (
                      <button
                        key={budgetOpt}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: budgetOpt })}
                        className={`py-3 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                          formData.budget === budgetOpt
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {budgetOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mensaje */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Detalles del encargo</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Cuéntame sobre la identidad visual, el número de empaques o el plazo estimado..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/40 border border-white/5 text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500 text-sm transition-all resize-none"
                  />
                </div>

                {/* Botón enviar interactivo */}
                <button
                  type="submit"
                  disabled={isSending || formSubmitted}
                  className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                  onMouseEnter={() => triggerCursorHover(true)}
                  onMouseLeave={() => triggerCursorHover(false)}
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Transmitiendo idea...
                    </span>
                  ) : formSubmitted ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-400" /> ¡Enviado con Éxito! Te escribiré pronto.
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Enviar mensaje premium
                    </span>
                  )}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {}

      {/* FOOTER DEL PORTAFOLIO */}
      <footer className={`py-12 border-t ${darkMode ? 'bg-[#060608] border-white/5' : 'bg-neutral-100 border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-md">
              AV
            </span>
            <span className="font-serif-luxury text-xl tracking-wider text-white">
              {PORTFOLIO_CONFIG.personal.name}
            </span>
          </div>

          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {PORTFOLIO_CONFIG.personal.name}. Todos los derechos reservados. Diseñado bajo estándares de vanguardia de Awwwards.
          </p>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-xs text-neutral-400 hover:text-white font-bold"
            >
              Volver arriba ↑
            </button>
          </div>
        </div>
      </footer>

      {/* PANEL MODAL DE DOCUMENTACIÓN INTERACTIVA (DESPLEGAR & EDITAR) */}
      {showDocs && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0f0f12] border border-white/10 rounded-3xl p-8 relative space-y-6">
            <button 
              onClick={() => setShowDocs(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-white border border-white/5 hover:bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex p-2 bg-indigo-600/10 rounded-xl text-indigo-400">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Guía de Despliegue & Edición</h3>
              <p className="text-sm text-neutral-400">
                Instrucciones útiles para que personalices tu portafolio premium y lo publiques en internet en minutos.
              </p>
            </div>

            <div className="space-y-4 text-sm text-neutral-300">
              <div className="p-4 bg-neutral-900 rounded-xl border border-white/5 space-y-2">
                <h4 className="font-bold text-indigo-400">1. ¿Cómo editar tu información?</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Todo el contenido dinámico del sitio (Nombres, Logros, Proyectos, Redes, Servicios, Certificaciones) está centralizado en el objeto <code className="text-pink-400 font-mono">PORTFOLIO_CONFIG</code> al principio de este mismo archivo. Al modificarlo, toda la web se adaptará automáticamente sin tocar código de interfaz.
                </p>
              </div>

              <div className="p-4 bg-neutral-900 rounded-xl border border-white/5 space-y-2">
                <h4 className="font-bold text-indigo-400">2. Requisitos Previos e Instalación</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Puedes copiar este archivo directamente en tu proyecto React. Asegúrate de instalar los iconos lucide con: <br />
                  <code className="text-pink-400 font-mono block p-1.5 bg-neutral-950 rounded mt-1">npm install lucide-react</code>
                </p>
              </div>

              <div className="p-4 bg-neutral-900 rounded-xl border border-white/5 space-y-2">
                <h4 className="font-bold text-indigo-400">3. Despliegue Gratuito en Producción</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Para publicar el sitio gratis en internet, te recomiendo usar plataformas con integración Git instantánea como: <strong className="text-white">Vercel</strong>, <strong className="text-white">Netlify</strong> o <strong className="text-white">GitHub Pages</strong>. Sólo vinculas el repositorio y se generará tu URL en segundos.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDocs(false)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm"
            >
              Entendido, volver a explorar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}