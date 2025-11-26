// script.js - controls dark mode, language, modal content, contact form, and breakout game bootstrap wiring

document.addEventListener('DOMContentLoaded', ()=> {
  // ---------- Utilities ----------
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Set year in footer(s)
  const year = new Date().getFullYear();
  $$('#year, #yearClients').forEach(el => { if(el) el.textContent = year; });

  // ---------- Dark Mode (persistente) ----------
  const root = document.documentElement;
  const darkToggle = $('#darkToggle');
  function applyTheme(theme){
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('site-theme', theme); } catch(e){}
    if(darkToggle) darkToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  const savedTheme = (function(){
    try { return localStorage.getItem('site-theme') || 'light'; } catch(e){ return 'light'; }
  })();
  applyTheme(savedTheme);
  if(darkToggle){
    darkToggle.addEventListener('click', ()=> {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // ---------- i18n (troca de linguagem simples) ----------
  const translations = {
    pt: {
"service.webDesc1": "Sites modernos, rápidos e personalizados para o seu negócio.",
"service.webDesc2": "Interfaces bonitas, funcionais e pensadas para a melhor experiência do usuário.",
"service.webDesc3": "Organização, otimização e gerenciamento profissional de bancos de dados.",
"service.webDesc4": "Desenvolvemos seu site do zero, totalmente do seu jeito.",
"service.webDesc5": "Wireframes prontos, organizados e ideais para validar ideias rapidamente.",
"service.webDesc6": "Criação de sites de vendas eficientes, visualmente atraentes e preparados para conversão.",
      "service.webTitle": "Websites Profissionais",
"service.uiTitle": "Design de UI",
"service.dbTitle": "Gestão de Bancos",
"service.zeroTitle": "Seu Site do Zero",
"service.wireTitle": "Wireframes Prontos",
"service.salesTitle": "Sites de Vendas",
      "brand":"Boltides",
      "nav.home":"Início",
      "nav.clients":"Clientes",
      "nav.services":"Serviços",
      "nav.about":"Sobre",
      "nav.contact":"Contato",
      "hero.title":"Soluções digitais que transformam ideias em resultados.",
      "hero.subtitle":"Sites modernos, rápidos e responsivos — prontos para tornar sua empresa maior.",
      "hero.cta":"Ver serviços",
      "hero.contact":"Fale conosco",
      "carousel.title1":"Design centrado no usuário",
      "carousel.desc1":"Experiência que converte visitantes em clientes.",
      "carousel.title2":"Performance otimizada",
      "carousel.desc2":"Velocidade e SEO desde o início.",
      "carousel.title3":"Suporte e manutenção",
      "carousel.desc3":"Parceiros para o longo prazo.",
      "home.showcaseTitle":"Nossos serviços",
      "service.web":"Websites Profissionais",
      "service.webDesc":"Sites responsivos, rápidos e focados em conversão.",
      "service.ecom":"E-commerce",
      "service.ecomDesc":"Lojas online com checkout seguro e analytics integrado.",
      "service.brand":"Branding & UI/UX",
      "service.brandDesc":"Identidade visual e interfaces que encantam usuários.",
      "service.learn":"Saiba mais",
      "service.contact":"Quero contratar",
      "home.videoTitle":"Conheça Mais",
      "home.videoDesc":"Um rápido tour por uma produção autoral.",
      "home.faqTitle":"Perguntas frequentes",
      "faq.q1":"Quanto tempo para criar um site?",
      "faq.a1":"Depende do escopo, normalmente 2–6 semanas.",
      "faq.q2":"Oferecem suporte pós-lançamento?",
      "faq.a2":"Sim, oferecemos planos mensais de manutenção.",
      "game.desc":"Divirta-se por alguns minutos :D",
      "game.score":"Pontuação:",
      "game.restart":"Reiniciar",
      "contact.title":"Entre em contato",
      "contact.name":"Nome",
      "contact.email":"Email",
      "contact.phone":"Telefone",
      "contact.message":"Mensagem",
      "contact.nameReq":"Informe seu nome.",
      "contact.emailReq":"Email válido é obrigatório.",
      "contact.phoneReq":"Informe telefone.",
      "contact.messageReq":"Digite sua mensagem.",
      "contact.cancel":"Cancelar",
      "contact.send":"Enviar",
      "clients.title":"Nossos Clientes",
      "clients.subtitle":"Conheça 20 dos nossos principais clientes.",
      "clients.back":"Voltar",
      "services.title":"Nossos Serviços",
      "services.subtitle":"Explore o nosso showcase.",
      "about.title":"Sobre a Empresa",
      "about.mission":"A Boltides Technology nasceu com uma visão clara: transformar ideias em experiências digitais que brilham. Somos uma empresa de tecnologia focada no desenvolvimento de sites modernos, responsivos e cheios de personalidade — criados sob medida para cada cliente que confia no nosso trabalho. Mais do que simplesmente criar páginas na web, nós construímos presenças digitais completas, capazes de conectar pessoas, negócios e oportunidades. Acreditamos que cada site deve ser único, carregando alma, estética e propósito. Por isso, dedicamos tempo para entender profundamente as necessidades de cada projeto, guiando nossos clientes desde a primeira conversa até o lançamento oficial. A equipe da Boltides combina criatividade, técnica e inovação, buscando sempre o equilíbrio perfeito entre design bonito e funcionamento impecável. Utilizamos tecnologias modernas, boas práticas de desenvolvimento e uma pitada de ousadia para entregar resultados que impressionam. Aqui, não entregamos só códigos: entregamos experiências. Não criamos só sites: criamos identidade. Não seguimos o mercado: buscamos ir além. A Boltides Technology é movida por paixão, curiosidade e aquele desejo constante de fazer mais, melhorar sempre e superar expectativas. É isso que nos faz crescer — e é isso que oferecemos a cada cliente que nos escolhe. Boltides Technology — projetando o futuro, um site de cada vez.",
      "about.teamTitle":"Equipe",
      "about.role":"Função: CEO",
      "about.role1":"Função:Co-Founder",
      "about.role2":"Função: Manager",
      "about.role3":"Função: Dev/Designer",
      "about.role4":"Função: Analista",
      "about.full":"Informações completas",
      "about.aa": "A história da Boltides Technology começa no início de 2024, dentro de uma sala de aula. O projeto nasceu na escola, quando um grupo de jovens desenvolvedores, movidos por criatividade e ambição, decidiu transformar simples ideias em algo maior. A inspiração veio da estampa da camiseta que um dos membros usava naquele dia, um símbolo marcante que despertou a visão de criar uma empresa de tecnologia capaz de entregar soluções digitais modernas e cheias de identidade. Desde então, a Boltides cresceu apoiada em inovação constante, excelência técnica e paixão pela criação digital. A empresa ganhou destaque pelo foco em sites bem estruturados, responsivos e tecnicamente sólidos, seguindo princípios como arquitetura limpa e escalável, design orientado à experiência do usuário, boas práticas de código, segurança, acessibilidade e performance otimizada. Ao longo de sua jornada, a Boltides se consolidou como uma empresa que combina tecnologia robusta com estética refinada, entregando resultados acima do padrão. O que começou como uma ideia espontânea na escola tornou-se uma marca com valores fortes, visão moderna e busca incansável por qualidade. A Boltides Technology segue evoluindo e inovando, determinada a elevar o nível da web um projeto de cada vez.",
      "footer.rights":"Todos os direitos reservados.",
"sector.tech": "Setor: Tecnologia",
"sector.education": "Setor: Educação",
"sector.clothes": "Setor: Vestimentas",
"sector.food": "Setor: Alimentos",
"sector.streaming": "Setor: Streaming",
"sector.sales": "Setor: Vendas",
"sector.music": "Setor: Música",
"sector.entertainment": "Setor: Entretenimento",



    },
    en: {
      "service.webDesc1": "Modern, fast, and fully customized websites for your business.",
"service.webDesc2": "Beautiful and functional interfaces designed for the best user experience.",
"service.webDesc3": "Professional organization, optimization, and management of databases.",
"service.webDesc4": "We build your website from scratch, tailored exactly to your needs.",
"service.webDesc5": "Ready-to-use wireframes, well-structured and perfect for quick validation.",
"service.webDesc6": "High-performance sales websites with clean design and strong conversion focus.",
      "service.webTitle": "Professional Websites",
"service.uiTitle": "UI Design",
"service.dbTitle": "Database Management",
"service.zeroTitle": "Your Website From Scratch",
"service.wireTitle": "Ready Wireframes",
"service.salesTitle": "Sales Websites",
      "brand":"Boltides",
      "nav.home":"Home",
      "nav.clients":"Clients",
      "nav.services":"Services",
      "nav.about":"About",
      "nav.contact":"Contact",
      "hero.title":"Digital solutions that turn ideas into results.",
      "hero.subtitle":"Modern, fast and responsive websites — ready for your business growth.",
      "hero.cta":"See services",
      "hero.contact":"Talk to us",
      "carousel.title1":"User-centered design",
      "carousel.desc1":"Experiences that convert visitors into customers.",
      "carousel.title2":"Optimized performance",
      "carousel.desc2":"Speed and SEO from day one.",
      "carousel.title3":"Support & maintenance",
      "carousel.desc3":"Long-term partners.",
      "home.showcaseTitle":"Our services",
      "service.web":"Professional Websites",
      "service.webDesc":"Responsive, fast and conversion-focused sites.",
      "service.ecom":"E-commerce",
      "service.ecomDesc":"Online stores with secure checkout and analytics.",
      "service.brand":"Branding & UI/UX",
      "service.brandDesc":"Visual identity and interfaces that delight users.",
      "service.learn":"Learn more",
      "service.contact":"Hire us",
      "home.videoTitle":"Learn More",
      "home.videoDesc":"A quick tour of our creative process and deliveries.",
      "home.faqTitle":"FAQ",
      "faq.q1":"How long to create a website?",
      "faq.a1":"Depends on scope, typically 2–6 weeks.",
      "faq.q2":"Do you offer post-launch support?",
      "faq.a2":"Yes, monthly maintenance plans.",
      "game.desc":"Enjoy a few minutes :D",
      "game.score":"Score:",
      "game.restart":"Restart",
      "contact.title":"Get in touch",
      "contact.name":"Name",
      "contact.email":"Email",
      "contact.phone":"Phone",
      "contact.message":"Message",
      "contact.nameReq":"Please tell us your name.",
      "contact.emailReq":"A valid email is required.",
      "contact.phoneReq":"Provide a phone.",
      "contact.messageReq":"Write your message.",
      "contact.cancel":"Cancel",
      "contact.send":"Send",
      "clients.title":"Our Clients",
      "clients.subtitle":"Meet 20 of our top clients.",
      "clients.back":"Back",
      "services.title":"Our Services",
      "services.subtitle":"Explore our showcase.",
      "about.title":"About the Company",
      "about.mission": "Boltides Technology was born with a clear vision: to transform ideas into digital experiences that truly shine. We are a technology company focused on creating modern, responsive, and personality-packed websites — crafted specifically for each client who trusts our work. More than simply building web pages, we create complete digital presences capable of connecting people, businesses, and opportunities. We believe that every website should be unique, carrying soul, aesthetics, and purpose. That’s why we take the time to deeply understand the needs of each project, guiding our clients from the very first conversation all the way to the final launch. The Boltides team combines creativity, technique, and innovation, always seeking the perfect balance between beautiful design and flawless performance. We use modern technologies, best development practices, and a touch of boldness to deliver results that impress. Here, we don’t just deliver code — we deliver experiences. We don’t just create websites — we create identity. We don’t follow the market — we strive to go beyond it. Boltides Technology is driven by passion, curiosity, and the constant desire to do more, always improve, and exceed expectations. That’s what makes us grow — and that’s what we offer to every client who chooses us. Boltides Technology — shaping the future, one website at a time.",
      "about.teamTitle":"Team",
      "about.role":"Role: CEO",
      "about.role1":"Role:Co-Founder",
      "about.role2":"Role: Manager",
      "about.role3":"Role: Dev/Designer",
      "about.role4":"Role: Analyst",
      "about.full":"Full information",
      "about.aa": "The story of Boltides Technology begins in early 2024, inside a classroom. The project was born at school when a group of young developers, driven by creativity and ambition, decided to turn simple ideas into something bigger. The initial inspiration came from the design on a shirt one of the members was wearing that day—a striking symbol that sparked the vision of creating a technology company capable of delivering modern, identity-rich digital solutions. Since then, Boltides has grown through constant innovation, technical excellence, and a passion for digital creation. The company became known for its well-structured, responsive, and technically solid websites, following principles such as clean and scalable architecture, user-experience-oriented design, best coding practices, security, accessibility, and optimized performance. Throughout its journey, Boltides has established itself as a company that combines robust technology with refined aesthetics, delivering results above industry standards. What began as a spontaneous idea at school has become a brand with strong values, a modern vision, and a relentless pursuit of quality. Boltides Technology continues evolving and innovating, determined to elevate the web one project at a time.",
      "footer.rights":"All rights reserved.",
"sector.tech": "Sector: Technology",
"sector.education": "Sector: Education",
"sector.clothes": "Sector: Apparel",
"sector.food": "Sector: Food",
"sector.streaming": "Sector: Streaming",
"sector.sales": "Sector: Sales",
"sector.music": "Sector: Music",
"sector.entertainment": "Sector: Entertainment",



    },
    fr: {
      "service.webDesc1": "Sites modernes, rapides et entièrement personnalisés pour votre entreprise.",
"service.webDesc2": "Interfaces belles et fonctionnelles, conçues pour offrir la meilleure expérience utilisateur.",
"service.webDesc3": "Organisation, optimisation et gestion professionnelle de bases de données.",
"service.webDesc4": "Nous créons votre site depuis zéro, selon vos besoins.",
"service.webDesc5": "Wireframes prêts à l’emploi, bien structurés et parfaits pour valider vos idées.",
"service.webDesc6": "Sites de vente performants, élégants et optimisés pour la conversion.",
      "service.webTitle": "Sites Professionnels",
"service.uiTitle": "Design UI",
"service.dbTitle": "Gestion de Bases de Données",
"service.zeroTitle": "Votre Site Depuis Zéro",
"service.wireTitle": "Wireframes Prêts",
"service.salesTitle": "Sites de Vente",
      "brand":"Boltides",
      "nav.home":"Accueil",
      "nav.clients":"Clients",
      "nav.services":"Services",
      "nav.about":"À propos",
      "nav.contact":"Contact",
      "hero.title":"Solutions numériques transformant les idées en résultats.",
      "hero.subtitle":"Sites modernes, rapides et responsives — prêts pour votre croissance.",
      "hero.cta":"Voir les services",
      "hero.contact":"Contactez-nous",
      "carousel.title1":"Design centré utilisateur",
      "carousel.desc1":"Expériences qui transforment visiteurs en clients.",
      "carousel.title2":"Performance optimisée",
      "carousel.desc2":"Vitesse et SEO dès le départ.",
      "carousel.title3":"Support & maintenance",
      "carousel.desc3":"Partenaires à long terme.",
      "home.showcaseTitle":"Nos services",
      "service.web":"Sites professionnels",
      "service.webDesc":"Sites responsives, rapides et orientés conversion.",
      "service.ecom":"E-commerce",
      "service.ecomDesc":"Boutiques en ligne avec paiement sécurisé et analytics.",
      "service.brand":"Branding & UI/UX",
      "service.brandDesc":"Identité visuelle et interfaces qui plaisent.",
      "service.learn":"En savoir plus",
      "service.contact":"Nous engager",
      "home.videoTitle":"Découvrez-en plus",
      "home.videoDesc":"Un rapide tour d’une production d’auteur.",
      "home.faqTitle":"FAQ",
      "faq.q1":"Combien de temps pour créer un site ?",
      "faq.a1":"Dépend du scope, en général 2–6 semanas.",
      "faq.q2":"Proposez-vous un support après le lancement ?",
      "faq.a2":"Oui, plans mensais de maintenance.",
      "game.desc":"Amusez-vous :D",
      "game.score":"Score :",
      "game.restart":"Recomecar",
      "contact.title":"Contactez-nous",
      "contact.name":"Nom",
      "contact.email":"E-mail",
      "contact.phone":"Téléphone",
      "contact.message":"Message",
      "contact.nameReq":"Veuillez indiquer votre nom.",
      "contact.emailReq":"Un e-mail valide est requis.",
      "contact.phoneReq":"Indiquez um telefone.",
      "contact.messageReq":"Écrivez votre message.",
      "contact.cancel":"Annuler",
      "contact.send":"Envoyer",
      "clients.title":"Nos Clients",
      "clients.subtitle":"Découvrez 20 de nos meilleurs clients.",
      "clients.back":"Retour",
      "services.title":"Nos Services",
      "services.subtitle":"Explorez notre showcase.",
      "about.title":"À propos de l'entreprise",
      "about.mission": "Boltides Technology est née avec une vision claire : transformer des idées en expériences numériques éclatantes. Nous sommes une entreprise de technologie spécialisée dans la création de sites web modernes, responsifs et pleins de personnalité — réalisés sur mesure pour chaque client qui nous fait confiance. Plus que de simples pages web, nous construisons de véritables présences numériques capables de connecter des personnes, des entreprises et des opportunités. Nous croyons que chaque site doit être unique, porteur d’une âme, d’une esthétique et d’un but. C’est pourquoi nous prenons le temps de comprendre en profondeur les besoins de chaque projet, en accompagnant nos clients depuis la première conversation jusqu’au lancement final. L’équipe Boltides allie créativité, technique et innovation, toujours à la recherche de l’équilibre parfait entre un design élégant et un fonctionnement irréprochable. Nous utilisons des technologies modernes, de bonnes pratiques de développement et une touche d’audace pour offrir des résultats impressionnants. Ici, nous ne livrons pas seulement du code — nous livrons des expériences. Nous ne créons pas seulement des sites — nous créons une identité. Nous ne suivons pas le marché — nous cherchons à aller au-delà. Boltides Technology est animée par la passion, la curiosité et le désir constant de faire plus, de toujours s’améliorer et de dépasser les attentes. C’est ce qui nous fait grandir — et c’est ce que nous offrons à chaque client qui nous choisit. Boltides Technology — façonnant l’avenir, un site à la fois.",
      "about.teamTitle":"Équipe",
      "about.role":"Rôle: PDG",
      "about.role1":"Rôle: Co-Fondateur",
      "about.role2":"Rôle: Directeur",
      "about.role3":"Rôle: Développeur/Concepteur",
      "about.role4":"Rôle: Analyste",
      "about.full":"Informations complètes",
      "about.aa": "L’histoire de Boltides Technology commence au début de l’année 2024, dans une salle de classe. Le projet est né à l’école, lorsqu’un groupe de jeunes développeurs, animés par la créativité et l’ambition, a décidé de transformer de simples idées en quelque chose de plus grand. L’inspiration initiale est venue du motif sur le t-shirt que l’un des membres portait ce jour-là — un symbole frappant qui a éveillé la vision de créer une entreprise technologique capable de fournir des solutions numériques modernes et riches en identité. Depuis lors, Boltides s’est développée grâce à une innovation constante, une excellence technique et une passion pour la création digitale. L’entreprise s’est démarquée par ses sites web bien structurés, responsifs et techniquement solides, suivant des principes tels qu’une architecture propre et évolutive, un design orienté vers l’expérience utilisateur, de bonnes pratiques de développement, la sécurité, l’accessibilité et des performances optimisées. Au fil de son parcours, Boltides s’est imposée comme une entreprise alliant technologie robuste et esthétique raffinée, offrant des résultats supérieurs aux standards du marché. Ce qui a commencé comme une idée spontanée à l’école est devenu une marque aux valeurs fortes, à la vision moderne et à la quête incessante de qualité. Boltides Technology continue d’évoluer et d’innover, déterminée à élever le niveau du web, un projet à la fois.",
      "footer.rights":"Tous droits réservés.",
"sector.tech": "Secteur : Technologie",
"sector.education": "Secteur : Éducation",
"sector.clothes": "Secteur : Vêtements",
"sector.food": "Secteur : Alimentation",
"sector.streaming": "Secteur : Streaming",
"sector.sales": "Secteur : Ventes",
"sector.music": "Secteur : Musique",
"sector.entertainment": "Secteur : Divertissement",


    }
  };

  const langSelect = document.getElementById('langSelect');
  const currentLang = (function(){ try { return localStorage.getItem('site-lang') || 'pt'; } catch(e){ return 'pt'; } })();
  if(langSelect) langSelect.value = currentLang;

  function applyTranslations(lang){
    const map = translations[lang] || translations['pt'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(map[key] !== undefined){
        // for elements where textContent is not desired (e.g. inputs), this keeps it simple:
        el.textContent = map[key];
      }
    });
    try { localStorage.setItem('site-lang', lang); } catch(e){}
  }

  applyTranslations(currentLang);
  if(langSelect){
    langSelect.addEventListener('change', (e)=> {
      applyTranslations(e.target.value);
    });
  }

  // ---------- Service modal dynamic content ----------
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalBody = document.getElementById('serviceModalBody');
  const serviceModalTitle = document.getElementById('serviceModalTitle');

const servicesContent = {
  web: {
    title: "Websites Profissionais",
    html: `
      <p>Desenvolvemos sites rápidos, modernos e totalmente personalizados.</p>
      <ul>
        <li>Responsividade total</li>
        <li>SEO otimizado</li>
        <li>Painel de gerenciamento</li>
      </ul>
    `
  },
  ui: {
    title: "Design de UI",
    html: `
      <p>Interfaces bonitas, funcionais e preparadas para alta conversão.</p>
      <ul>
        <li>Layouts modernos</li>
        <li>Figma profissional</li>
        <li>Sistemas de design completos</li>
      </ul>
    `
  },
  db: {
    title: "Gestão de Bancos",
    html: `
      <p>Administração profissional de bancos de dados.</p>
      <ul>
        <li>Modelagem eficiente</li>
        <li>Queries otimizadas</li>
        <li>Integração com sistemas</li>
      </ul>
    `
  },
  zero: {
    title: "Seu Site do Zero",
    html: `
      <p>Criamos o seu site totalmente novo, do jeito que você imaginar.</p>
      <ul>
        <li>Planejamento completo</li>
        <li>Design exclusivo</li>
        <li>Desenvolvimento total</li>
      </ul>
    `
  },
  wire: {
    title: "Wireframes Prontos",
    html: `
      <p>Wireframes rápidos e funcionais para validar ideias.</p>
      <ul>
        <li>Layouts base</li>
        <li>Protótipos navegáveis</li>
        <li>Entrega em poucas horas</li>
      </ul>
    `
  },
  sales: {
    title: "Sites de Vendas",
    html: `
      <p>Sites focados em conversão e experiência de compra.</p>
      <ul>
        <li>Checkout simplificado</li>
        <li>Analytics integrado</li>
        <li>Design profissional de loja</li>
      </ul>
    `
},

ecom: {
  titleKey: 'service.ecom',
  body: `
    <h3>🇧🇷</h3>
    <p>Loja online com integração de pagamento, painel administrativo e acompanhamento de conversões.</p>

    <h3>🇺🇸</h3>
    <p>Online store with payment integration, admin dashboard, and conversion tracking.</p>

    <h3>🇫🇷</h3>
    <p>Boutique en ligne avec intégration de paiement, tableau de bord administrateur et suivi des conversions.</p>
  `
},

brand: {
  titleKey: 'service.brand',
  body: `
    <h3>🇧🇷</h3>
    <p>Branding e UI/UX: criação de identidade visual, guidelines e protótipos interativos.</p>

    <h3>🇺🇸</h3>
    <p>Branding and UI/UX: visual identity creation, guidelines, and interactive prototypes.</p>

    <h3>🇫🇷</h3>
    <p>Branding et UI/UX : création d'identité visuelle, guidelines et prototypes interactifs.</p>
  `
  }
};


  // open modal and fill content based on data-service
  document.querySelectorAll('[data-bs-target="#serviceModal"]').forEach(btn => {
    btn.addEventListener('click', (e)=>{
      const key = btn.dataset.service;
      const info = servicesContent[key] || servicesContent['web'];
      // translation for title:
      const lang = (function(){ try { return localStorage.getItem('site-lang') || 'pt'; } catch(e){ return 'pt'; } })();
      const title = (translations[lang] && translations[lang][info.titleKey]) ? translations[lang][info.titleKey] : info.titleKey;
      if(serviceModalTitle) serviceModalTitle.textContent = title;
      if(serviceModalBody) serviceModalBody.innerHTML = info.body;

      // ensure any dynamic content inside modal gets translation keys applied (if any)
      applyTranslations(lang);
    });
  });

  // ---------- Contact form basic validation & mock submit ----------
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      e.stopPropagation();
      if(!contactForm.checkValidity()){
        contactForm.classList.add('was-validated');
        return;
      }
      // Mock submit: show success then reset
      const modalEl = document.getElementById('contactModal');
      const bsModal = modalEl ? bootstrap.Modal.getInstance(modalEl) : null;
      if(bsModal) bsModal.hide();
      const lang = (function(){ try { return localStorage.getItem('site-lang') || 'pt'; } catch(e){ return 'pt'; } })();
      const sendText = (translations[lang] && translations[lang]['contact.send']) ? translations[lang]['contact.send'] : 'Enviar';
      try { alert(sendText + ' — Obrigado!'); } catch(e){}
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    }, false);
  }

  // ---------- Simple accessibility nicety: focus trap for modals handled by bootstrap ----------

  // ---------- BREAKOUT GAME ----------
  // Only initialize if canvas present
  
  const canvas = document.getElementById('breakoutCanvas');
  if(canvas){
    // Setup canvas and game variables
    const ctx = canvas.getContext && canvas.getContext('2d') ? canvas.getContext('2d') : null;
    if(!ctx){
      console.warn('Canvas 2D context not available.');
    } else {
      let paddle = { w: 100, h: 12, x: 0, speed: 5 };
// detecta se é celular
const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

// bola (velocidade reduzida só no mobile)
let ball = { 
  x: 0, 
  y: 0, 
  r: 8, 
  vx: isMobile ? 2.5 : 4, 
  vy: isMobile ? -2.5 : -4 
};

      let bricks = [];
      let rows = 4, cols = 8, brickW = 60, brickH = 18, brickPadding = 6;
      let score = 0;
      const scoreEl = document.getElementById('gameScore');
      const restartBtn = document.getElementById('gameRestart');

      // color generator - always 6 hex digits
      function Color(){
        return '#'+Math.floor.toString(16).padStart(6,'0');
      }

      function initBricks(){
        bricks = [];
        for(let r=0;r<rows;r++){
          for(let c=0;c<cols;c++){
            let bx = c*(brickW+brickPadding)+3;
            let by = 40 + r*(brickH+6);
            bricks.push({x:bx,y:by,w:brickW,h:brickH,alive:true});
          }
        }
      }

      function resetGame(){
        // size canvas to its parent width for responsive behavior
        const parent = canvas.parentElement || document.body;
        const parentStyle = getComputedStyle(parent);
        const parentPaddingLeft = parseFloat(parentStyle.paddingLeft) || 0;
        const parentPaddingRight = parseFloat(parentStyle.paddingRight) || 0;
        const parentWidth = Math.floor(parent.clientWidth - parentPaddingLeft - parentPaddingRight);

        // ensure a reasonable minimum width so game elements compute correctly
        const newWidth = Math.max(600, parentWidth || 800);
        canvas.width = newWidth;
        // maintain aspect ratio ~2:1
        canvas.height = Math.floor(canvas.width * 0.5);

        // initialize sizes relative to canvas
        paddle.w = Math.min(160, canvas.width*0.12 + 60);
        paddle.x = (canvas.width - paddle.w)/2;
        ball.x = canvas.width/2;
        ball.y = canvas.height - 80;
        ball.vx = (isMobile ? 1.5 : 4) * (Math.random() > .5 ? 1 : -1);
        ball.vy = isMobile ? -1.5 : -4;

        rows = 4;
        cols = Math.max(6, Math.floor(canvas.width / 100) * 2);
        brickPadding = 6;
        brickW = Math.floor((canvas.width - (cols+1)*brickPadding) / cols);
        brickH = 18;
        initBricks();
        score = 0;
        if(scoreEl) scoreEl.textContent = score;
      }

      function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // bricks
        bricks.forEach(b=>{
          if(!b.alive) return;
          ctx.fillStyle = Color();
          ctx.fillRect(b.x,b.y,b.w,b.h);
        });
        // paddle
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(paddle.x, canvas.height - 30, paddle.w, paddle.h);
        // ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
        ctx.fill();
      }

      function step(){
        // move ball
        ball.x += ball.vx;
        ball.y += ball.vy;

        // wall collisions
        if(ball.x - ball.r < 0){ ball.x = ball.r; ball.vx *= -1; }
        if(ball.x + ball.r > canvas.width){ ball.x = canvas.width - ball.r; ball.vx *= -1; }
        if(ball.y - ball.r < 0){ ball.y = ball.r; ball.vy *= -1; }

        // paddle collision
        const paddleY = canvas.height - 30;
        if(ball.y + ball.r >= paddleY){
          if(ball.x >= paddle.x && ball.x <= paddle.x + paddle.w){
            ball.vy *= -1;
            // change angle depending on where it hits
            let hitPos = (ball.x - paddle.x) / paddle.w - 0.5;
            ball.vx += hitPos * 4;
          } else if(ball.y + ball.r > canvas.height){
            // lose -> reset positions but keep game running
            resetGame();
          }
        }

        // brick collisions
        bricks.forEach(b=>{
          if(!b.alive) return;
          if(ball.x + ball.r > b.x && ball.x - ball.r < b.x + b.w &&
             ball.y + ball.r > b.y && ball.y - ball.r < b.y + b.h){
            b.alive = false;
            ball.vy *= -1;
            score += 10;
            if(scoreEl) scoreEl.textContent = score;
          }
        });

        draw();
      }

      // animation loop
      let anim;
      function loop(){
        step();
        anim = requestAnimationFrame(loop);
      }

      // controls
      canvas.addEventListener('mousemove', (e)=>{
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        paddle.x = Math.min(Math.max(0, mx - paddle.w/2), canvas.width - paddle.w);
      });
      window.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowLeft') paddle.x = Math.max(0, paddle.x - paddle.speed);
        if(e.key === 'ArrowRight') paddle.x = Math.min(canvas.width - paddle.w, paddle.x + paddle.speed);
      });

      // --- Touch controls (para celular) ---
      canvas.addEventListener('touchstart', handleTouch);
      canvas.addEventListener('touchmove', handleTouch);

      function handleTouch(e){
      e.preventDefault(); // impede scroll da página enquanto joga
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0]; // primeiro dedo
      const mx = touch.clientX - rect.left;

  // mesma lógica do mouse:
  paddle.x = Math.min(Math.max(0, mx - paddle.w/2), canvas.width - paddle.w);
}


      if(restartBtn){
        restartBtn.addEventListener('click', ()=> {
          resetGame();
        });
      }

      // responsive handling
      let resizeTimeout;
      window.addEventListener('resize', ()=> {
        // debounce resize a bit
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(()=> {
          resetGame();
        }, 80);
      });

      // init & start
      resetGame();
      loop();
    }
  }

  

}); // DOMContentLoaded