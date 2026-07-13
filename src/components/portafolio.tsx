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
    avatar: `${import.meta.env.BASE_URL}perfil.png`,
    aboutShort: "Diseñadora Gráfica y Audiovisual con experiencia especializada en animación 3D, motion graphics y edición de video. Apasionada por la narrativa visual, con dominio técnico en herramientas como Blender, Maya y Adobe Creative Suite para crear identidades dinámicas y contenido impactante para redes sociales y campañas corporativas.",
    bio: "Diseñadora gráfica y animadora de motion graphics con sólida experiencia en animación 3D y edición de video. Apasionada por la narrativa visual a través de diseños creativos e innovadores. Poseo habilidades avanzadas en software de diseño y animación, enfocándome en la originalidad y el impacto visual. Busco contribuir a equipos dinámicos que valoren la innovación, colaborando en proyectos que inspiren y sorprendan.",
    location: "Bogota, Colombia (Disponible para remoto internacional)",
    email: "Helentilaguyv@gmail.com",
    phone: "+57 3219620424",
    resumeUrl: `${import.meta.env.BASE_URL}Helen-Tilaguy-CV.pdf`,
    stats: [
      { label: "Años de Experiencia", value: "5+" },
      { label: "Proyectos de Animación", value: "80+" },
      { label: "Videos Editados", value: "120+" },
      { label: "Clientes Satisfechos", value: "100%" }
    ]
  },
  
  theme: {
    accentColor: "indigo-600", // Clases Tailwind para botones e indicadores activos
    accentColorHover: "indigo-700",
    fontFamily: "sans-serif", // Utilizado para fuentes principales
  },

  socials: [
    { name: "Behance", url: "https://www.behance.net/Helen_Tilaguy", icon: "Layers" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/helentilaguy/", icon: "Linkedin" },
    { name: "Instagram", url: "https://www.instagram.com/helen_til/", icon: "Instagram" },
    { name: "ArtStation", url: "https://www.artstation.com/helentilaguy?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaATAwHRwZG9mAmV4dG4DYWVtAjExAHNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp9QH_9PfdugCdbEsqzChJ5jvUcEyNZeujtWKjXNxZEQOTqytdvd2r1IePp_O_aem_VS8jMpMm8Dch4dRBrskecg", icon: "Sparkles" }
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
      { name: "Adobe Premiere Pro", level: 90, icon: "Pr" },
      { name: "Adobe After Effects", level: 92, icon: "Ae" },
      { name: "Autodesk Maya", level: 85, icon: "Ma" },
      { name: "Blender", level: 88, icon: "Bl" },
      { name: "Marvelous Designer", level: 80, icon: "Md" },
      { name: "Capcut", level: 85, icon: "Cc" },
      { name: "Framer", level: 78, icon: "Fr" }
    ]
  },

  timeline: {
    experience: [
      {
        id: "exp-1",
        role: "Diseñadora gráfica / Audiovisual",
        company: "Chispa",
        period: "2024 - 2026",
        description: "Creación de contenido visual y audiovisual para redes sociales, campañas y proyectos internos. Edición de video, animaciones y piezas gráficas que fortalecieron la identidad visual de la marca."
      },
      {
        id: "exp-2",
        role: "Diseñador gráfico",
        company: "Digiway",
        period: "2022 - 2024",
        description: "Como diseñadora gráfica, creé material POP para puntos de venta y diseñé empaques atractivos. Además, produje contenido audiovisual para redes sociales, incluyendo videos y animaciones, para aumentar la visibilidad de la marca."
      },
      {
        id: "exp-3",
        role: "Diseñador / Editor de video",
        company: "Dude Media",
        period: "2021 - 2022",
        description: "Como editora de video, me especialicé en la edición de contenido audiovisual para redes sociales y YouTube, incluyendo motion graphics y animaciones de logo. También editaba audio, colaboraba en grabaciones y creaba piezas estáticas para las campañas visuales."
      },
      {
        id: "exp-4",
        role: "Diseñador / Animador",
        company: "Visión Software",
        period: "2020 - 2021",
        description: "Como diseñadora, me especialicé en la creación de animaciones 2D y motion graphics para campañas internas, contribuyendo a la comunicación visual de la empresa."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Animación 3D",
        school: "Servicio Nacional de Aprendizaje (SENA)",
        period: "2018 - 2020",
        description: "Formación en animación 3D, modelado, texturización y técnicas de motion graphics."
      },
      {
        id: "edu-2",
        degree: "Diseño y producción de modas",
        school: "Corporación Unificada Nacional de Educación Superior CUN",
        period: "2010 - 2016",
        description: "Formación integral en diseño visual, composición, colorimetría y técnicas de producción."
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
      id: "proj-11",
      title: "Snow",
      year: "2026",
      client: "Snow",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}snw/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño de piezas gráficas para la marca Snow. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}snw/media-1.mp4`,
        `${import.meta.env.BASE_URL}snw/media-2.mp4`,
        `${import.meta.env.BASE_URL}snw/media-3.mp4`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-10",
      title: "La Cantera",
      year: "2026",
      client: "La Cantera",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}cntra/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño de piezas gráficas para la marca La Cantera. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}cntra/media-1.mp4`,
        `${import.meta.env.BASE_URL}cntra/media-2.mp4`,
        `${import.meta.env.BASE_URL}cntra/media-3.mp4`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-9",
      title: "Chispa",
      year: "2024 - 2026",
      client: "Chispa",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}chsp/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño de piezas gráficas para la marca Chispa. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}chsp/media-1.mp4`,
        `${import.meta.env.BASE_URL}chsp/media-2.mp4`,
        `${import.meta.env.BASE_URL}chsp/media-3.mp4`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-6",
      title: "Kala",
      year: "2024 - 2026",
      client: "Kala",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}kl/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño de piezas gráficas para la marca Kala. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}kl/media-1.mp4`,
        `${import.meta.env.BASE_URL}kl/media-2.mp4`,
        `${import.meta.env.BASE_URL}kl/post.jpg`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-8",
      title: "Skala",
      year: "2024 - 2026",
      client: "Skala",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}skl/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño de piezas gráficas para la marca Skala. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}skl/media-1.mp4`,
        `${import.meta.env.BASE_URL}skl/media-2.mp4`,
        `${import.meta.env.BASE_URL}skl/post.jpg`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-1",
      title: "3 Cordilleras",
      year: "2024 - 2025",
      client: "3 Cordilleras",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}v3c/media-1.mp4`,
      description: "Producción de motion graphics y edición de video para la marca 3 Cordilleras. Creación de contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}v3c/media-1.mp4`,
        `${import.meta.env.BASE_URL}v3c/media-2.mp4`,
        `${import.meta.env.BASE_URL}v3c/media-3.mp4`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-13",
      title: "Cubun - Videojuego WebGL",
      year: "2024",
      client: "Tostacazoth",
      role: "Desarrolladora & Diseñadora",
      coverImage: "https://img.itch.zone/aW1nLzQwOTI4NzcucG5n/347x500/FHCzVD.png",
      description: "Juego WebGL de ficción interactiva desarrollado en Unity. Salva el ecosistema recolectando todos los cubun.",
      embed: '<iframe frameborder="0" src="https://itch.io/embed-upload/2621579?color=ffffff" allowfullscreen="" width="980" height="688"><a href="https://sebastianneuto.itch.io/cubun">Play Cubun on itch.io</a></iframe>',
      gallery: [],
      tools: ["Unity", "WebGL", "Interactive Fiction"]
    },
    {
      id: "proj-2",
      title: "Santa Rita",
      year: "2022 - 2024",
      client: "Santa Rita",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}sr/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño piezas gráficas para la marca Santa Rita. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}sr/media-1.mp4`,
        `${import.meta.env.BASE_URL}sr/post-sr.jpg`,
        `${import.meta.env.BASE_URL}sr/packaging-sr.jpg`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-3",
      title: "Caribeño",
      year: "2022 - 2024",
      client: "Caribeño",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}crb/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño de piezas gráficas para la marca Caribeño. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}crb/media-1.mp4`,
        `${import.meta.env.BASE_URL}crb/media-2.mp4`,
        `${import.meta.env.BASE_URL}crb/post.jpg`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-4",
      title: "Carnelly",
      year: "2022 - 2023",
      client: "Carnelly",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}crnl/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño de piezas gráficas para la marca Carnelly. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}crnl/media-1.mp4`,
        `${import.meta.env.BASE_URL}crnl/media-2.mp4`,
        `${import.meta.env.BASE_URL}crnl/media-3.mp4`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-5",
      title: "Casablanca",
      year: "2022 - 2023",
      client: "Casablanca",
      role: "Motion Designer & Editora",
      coverImage: `${import.meta.env.BASE_URL}csbln/media-1.mp4`,
      description: "Producción de motion graphics, edición de video y diseño de piezas gráficas para la marca Casablanca. Contenido audiovisual para campañas de comunicación y redes sociales.",
      gallery: [
        `${import.meta.env.BASE_URL}csbln/media-1.mp4`,
        `${import.meta.env.BASE_URL}csbln/media-2.mp4`,
        `${import.meta.env.BASE_URL}csbln/media-3.mp4`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator"]
    },
    {
      id: "proj-12",
      title: "Death & Granny",
      year: "2020",
      client: "Death & Granny",
      role: "Motion Designer & Modeladora 3D",
      coverImage: `${import.meta.env.BASE_URL}dng/media-1.mp4`,
      description: "Producción de motion graphics, modelado 3D y edición de video para el proyecto Death & Granny. Contenido audiovisual con animación 3D, texturizado y renderizado.",
      gallery: [
        `${import.meta.env.BASE_URL}dng/media-1.mp4`,
        `${import.meta.env.BASE_URL}dng/post-1.jpg`,
        `${import.meta.env.BASE_URL}dng/post-2.jpg`
      ],
      tools: ["Adobe After Effects", "Adobe Premiere", "Photoshop", "Illustrator", "Maya", "Substance Painter"]
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
  const [fullscreenMedia, setFullscreenMedia] = useState(null);
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
    return PORTFOLIO_CONFIG.projects;
  }, [activeCategory]);

  // Lista de categorías únicas del archivo de datos
  const categories = useMemo(() => {
    return ["All"];
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
              HT
            </span>
            <span className="font-serif-luxury text-xl tracking-wider">
              {PORTFOLIO_CONFIG.personal.name.split(' ')[0]}
              <span className="text-indigo-500 font-sans">.</span>
            </span>
          </a>

          {/* Menú de Escritorio */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#about" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Sobre mí</a>
            <a href="#portfolio" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Proyectos</a>
            <a href="#experience" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Trayectoria</a>
            <a href="#contact" onMouseEnter={() => triggerCursorHover(true)} onMouseLeave={() => triggerCursorHover(false)} className="hover:text-indigo-500 transition-colors">Contacto</a>
          </nav>

          {/* Acciones de Cabecera */}
          <div className="hidden md:flex items-center space-x-4">

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
              Contáctame
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
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-1">Proyectos</a>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-1">Trayectoria</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-1">Contacto</a>
              
              <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
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
              Animación, Motion Graphics & Diseño Visual
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
                download
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

      </section>

      {/* SECCIÓN SOBRE MÍ */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Texto de Filosofía Creativa */}
            <div className="space-y-6 text-left">
              <div className="text-indigo-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <Heart className="w-4 h-4" /> Sobre Mí
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Diseñando para marcas con <span className="font-serif-luxury italic text-indigo-400">alma</span> y propósito.
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                {PORTFOLIO_CONFIG.personal.bio}
              </p>
            </div>

            {/* Video Loop */}
            <div className="flex justify-center lg:justify-end">
              <video 
                src={`${import.meta.env.BASE_URL}hami.webm`}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full max-w-md rounded-2xl border border-white/10"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN DE SOFTWARE */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Software</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Programas que domino</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {PORTFOLIO_CONFIG.skills.software.map((sw, index) => (
              <div key={index} className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-neutral-900/60 border-white/5' : 'bg-white border-black/5'}`}>
                <div className="text-indigo-400 text-lg font-black mb-1">{sw.icon}</div>
                <div className="text-xs font-bold text-neutral-300">{sw.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN TRAYECTORIA (EXPERIENCIA & EDUCACIÓN) */}
      <section id="experience" className={`py-24 border-t ${darkMode ? 'bg-neutral-950/20 border-white/5' : 'bg-white border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Trayectoria Profesional</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Experiencia y aprendizaje</h2>
            <p className="text-neutral-400">Mi trayectoria en diseño gráfico, animación y producción audiovisual.</p>
            
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
              <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Proyectos</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Proyectos</h2>
              <p className="text-neutral-400 max-w-xl">Una selección de mis trabajos en animación, motion graphics, diseño y edición de video.</p>
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
                  {(project.coverImage.endsWith('.webm') || project.coverImage.endsWith('.mp4')) ? (
                    <video 
                      src={project.coverImage} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img 
                      src={project.coverImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  {/* Overlay interactivo */}
                  <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-4 bg-white/15 backdrop-blur-md rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>

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
                <div 
                  className="aspect-[4/3] rounded-2xl overflow-hidden shadow-inner cursor-pointer group relative"
                  onClick={() => setFullscreenMedia(selectedProject.coverImage)}
                >
                  {selectedProject.coverImage.endsWith('.webm') || selectedProject.coverImage.endsWith('.mp4') ? (
                    <video 
                      src={selectedProject.coverImage} 
                      className="w-full h-full object-cover"
                      autoPlay loop muted playsInline preload="metadata"
                    />
                  ) : (
                    <img 
                      src={selectedProject.coverImage} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center pointer-events-none">
                    <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                {/* Muestras extras si existen */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.gallery.map((media, i) => (
                    <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group relative" onClick={() => setFullscreenMedia(media)}>
                      {media.endsWith('.webm') || media.endsWith('.mp4') ? (
                        <video 
                          src={media} 
                          className="w-full h-full object-cover transition-all"
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img src={media} alt={`Visualización ${i + 1}`} className="w-full h-full object-cover transition-all" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center pointer-events-none">
                        <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalles textuales (Lado Derecho) */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">{selectedProject.title}</h2>
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

                  {/* Embed si existe */}
                  {selectedProject.embed && (
                    <div className="pt-4" dangerouslySetInnerHTML={{ __html: selectedProject.embed }} />
                  )}
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

      {/* FULLSCREEN MEDIA VIEWER */}
      {fullscreenMedia && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6" onClick={() => setFullscreenMedia(null)}>
          <button 
            onClick={() => setFullscreenMedia(null)}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {fullscreenMedia.endsWith('.webm') || fullscreenMedia.endsWith('.mp4') ? (
              <video 
                src={fullscreenMedia} 
                controls 
                autoPlay
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <img 
                src={fullscreenMedia} 
                alt="Vista completa" 
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}

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

              <div className="pt-6 space-y-3">
                <h3 className="text-xl font-bold">Universo Digital</h3>
                <p className="text-sm text-neutral-400">Sígueme en redes para ver mis proyectos de animación, motion clips y contenido audiovisual.</p>
                <div className="grid grid-cols-2 gap-3 pt-4">
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
                        {social.name === "LinkedIn" && <Linkedin className="w-3.5 h-3.5 text-blue-400" />}
                        {social.name === "Instagram" && <Instagram className="w-3.5 h-3.5 text-purple-400" />}
                        {social.name === "ArtStation" && <Sparkles className="w-3.5 h-3.5 text-green-400" />}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
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
              HT
            </span>
            <span className="font-serif-luxury text-xl tracking-wider text-white">
              {PORTFOLIO_CONFIG.personal.name}
            </span>
          </div>

          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {PORTFOLIO_CONFIG.personal.name}. Todos los derechos reservados.
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