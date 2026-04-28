// Konnecta — i18n + WhatsApp + Lead form
const { useState: uS, useEffect: uE, createContext, useContext } = React;

const WA_PHONE = "5545999637457";
const WA_MSG = {
  pt: "Wagner, vi o site da Konnecta. Quero entender como a IA pode resolver [meu desafio] na minha empresa.",
  es: "Wagner, vi el sitio de Konnecta. Quiero entender cómo la IA puede resolver [mi desafío] en mi empresa.",
};
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqewvddo";

function waLink(lang = "pt", custom) {
  const msg = custom || WA_MSG[lang] || WA_MSG.pt;
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
}
window.waLink = waLink;
window.WA_PHONE = WA_PHONE;

// === TRANSLATIONS ===
const T = {
  pt: {
    // NAV
    "nav.solutions": "Soluções",
    "nav.cases": "Cases",
    "nav.tech": "Tecnologia",
    "nav.about": "Consultoria",
    "nav.blog": "Blog",
    "nav.contact": "Contato",
    "nav.cta": "Diagnóstico gratuito",
    "lang.label": "ES",
    "lang.full": "Español",

    // HERO
    "hero.eyebrow": "",
    "hero.title.1": "",
    "hero.title.2": "Construímos a infraestrutura de IA",
    "hero.title.3": "que vai operar sua empresa.",
    "hero.sub": "Agentes autônomos, automações e integrações sob medida para o seu setor. Você lidera. A IA opera.",
    "hero.stat.1.n": "+50",
    "hero.stat.1.l": "Operações automatizadas",
    "hero.stat.2.n": "+2.5M",
    "hero.stat.2.l": "Mensagens processadas",
    "hero.stat.3.n": "+35%",
    "hero.stat.3.l": "Conversão média",
    "hero.stat.4.n": "24/7",
    "hero.stat.4.l": "Sempre online",

    // CTAs
    "btn.diagnostic": "Diagnóstico gratuito",
    "btn.solutions": "Ver soluções",
    "btn.whatsapp": "Conversar no WhatsApp",
    "btn.form": "Quero ser contatado",
    "btn.book.free": "Quero meu diagnóstico",
    "btn.see.all": "Ver todas",
    "btn.see.case": "Ver case completo",
    "btn.book.now": "Quero meu diagnóstico",
    "btn.book.consulting": "Agendar consultoria",
    "btn.know": "Conhecer",

    // SOLUTIONS
    "sol.eyebrow": "O que entregamos",
    "sol.title.a": "Sistemas de IA",
    "sol.title.b": "que pagam",
    "sol.title.c": "o próprio investimento.",
    "sol.see.all": "Ver tudo",
    "sol.bot.title": "Agentes de IA",
    "sol.bot.emph": "que vendem",
    "sol.bot.desc": "SDRs e atendentes que respondem em 30 segundos, qualificam o lead, agendam reunião e nunca tiram folga. Treinados na sua operação.",
    "sol.wpp.title": "WhatsApp",
    "sol.wpp.emph": "automatizado",
    "sol.wpp.desc": "Funis que recebem, qualificam e entregam o lead pronto para fechar.",
    "sol.crm.title": "CRM",
    "sol.crm.emph": "que pensa",
    "sol.crm.desc": "Pipeline com IA que prevê fechamento e cobra retorno do vendedor.",
    "sol.leads.title": "Qualificação",
    "sol.leads.emph": "automática",
    "sol.leads.desc": "IA que pontua cada lead, ranqueia por probabilidade de fechar e manda só os bons para o time.",
    "sol.erp.title": "Integrações",
    "sol.erp.emph": "& ERP",
    "sol.erp.desc": "Conectamos suas ferramentas. Dado entra uma vez, aparece em todo lugar.",
    "sol.bi.title": "Dashboards",
    "sol.bi.emph": "em tempo real",
    "sol.bi.desc": "Vendas, atendimento e operação em uma tela. Sem planilha, sem espera.",

    // CONSULTING
    "cons.eyebrow": "★ Especialidade",
    "cons.title.a": "Consultoria em",
    "cons.title.b": "IA agêntica",
    "cons.title.c": "para empresas que pensam grande.",
    "cons.lead": "Não vendemos ferramenta. Sentamos com a liderança, mapeamos onde sua operação sangra dinheiro e construímos uma infraestrutura de IA vertical — feita sob medida para o seu setor, suas regras e seus dados.",
    "cons.cta": "Agendar consultoria",
    "cons.system.active": "Sistema agêntico ativo",
    "cons.metrics": "req/min · 99.8% uptime",
    "cons.p1.t": "Diagnóstico estratégico",
    "cons.p1.d": "Mapeamos cada gargalo e identificamos os 3 processos com maior ROI para automatizar primeiro.",
    "cons.p2.t": "Arquitetura de IA vertical",
    "cons.p2.d": "Desenhamos a infraestrutura sob medida para o seu setor, suas regras e seu volume.",
    "cons.p3.t": "Implementação sênior",
    "cons.p3.d": "Time dedicado constrói, integra e valida cada sistema. Você acompanha em tempo real.",
    "cons.p4.t": "Operação contínua",
    "cons.p4.d": "Otimização mensal, novos agentes e expansão. A IA evolui junto com a empresa.",

    // PROCESS
    "proc.eyebrow": "Como trabalhamos",
    "proc.title.a": "Em 5 passos saímos",
    "proc.title.b": "do diagnóstico ao resultado.",
    "proc.s1.t": "Diagnóstico",
    "proc.s1.d": "Reunião de 60 min para entender a operação e identificar quick wins.",
    "proc.s2.t": "Estratégia",
    "proc.s2.d": "Roadmap com escopo, prazos e ROI projetado para cada automação.",
    "proc.s3.t": "Construção",
    "proc.s3.d": "Implementação ágil em sprints. A cada 2 semanas, algo novo no ar.",
    "proc.s4.t": "Lançamento",
    "proc.s4.d": "Go-live monitorado, treinamento do time e ajustes em tempo real.",
    "proc.s5.t": "Otimização",
    "proc.s5.d": "Acompanhamento contínuo, novos agentes e expansão da operação.",

    // PLATFORM
    "plat.eyebrow": "Plataforma Konnecta",
    "plat.title.a": "Tudo conectado.",
    "plat.title.b": "Em uma tela.",
    "plat.sub": "Vendas, atendimento, operação e dados conversando entre si — sem você ter que abrir 7 abas.",

    // CASE
    "case.eyebrow": "Case Konnecta",
    "case.title.a": "Clínica Vitalis:",
    "case.title.b": "+312% em agendamentos em 90 dias.",
    "case.client": "Cliente",
    "case.client.name": "Clínica Vitalis",
    "case.body": "Implementamos um agente no WhatsApp que responde, qualifica e marca consulta sozinho. Time humano só entra quando precisa fechar tratamento. Em 90 dias o agendamento triplicou e a clínica reduziu equipe de atendimento em 40%.",

    // STACK
    "stack.eyebrow": "Stack",
    "stack.title.a": "IA agêntica,",
    "stack.title.b": "OpenClaw",
    "stack.title.c": "e o melhor do mercado.",
    "stack.sub": "Trabalhamos com agentes autônomos, multi-modelo e orquestração avançada. Sem fidelidade a fornecedor — só com o que funciona.",

    // TESTIMONIALS
    "tst.eyebrow": "Quem já está rodando",
    "tst.title.a": "Quem usa, conta",
    "tst.title.b": "o que acontece.",

    // FINAL CTA
    "fcta.eyebrow": "Próximo passo",
    "fcta.title.a": "30 minutos.",
    "fcta.title.b": "Sai com um plano.",
    "fcta.sub": "Diagnóstico gratuito por videochamada. O Wagner entra junto, mapeia a operação e mostra exatamente onde a IA paga o investimento. Sem proposta enlatada, sem pitch.",
    "fcta.banner.eyebrow": "Diagnóstico gratuito · 30 minutos",
    "fcta.banner.title": "Saia da call sabendo onde a IA gera caixa.",
    "fcta.banner.sub": "Sem compromisso. Sem proposta pré-pronta.",

    // FORM
    "form.title": "Vamos conversar.",
    "form.subtitle": "Preencha. Wagner responde pessoalmente em até 24h. Em horário comercial, normalmente em menos de 2h.",
    "form.name": "Nome completo",
    "form.email": "E-mail corporativo",
    "form.phone": "Telefone / WhatsApp",
    "form.company": "Empresa",
    "form.size": "Porte da empresa",
    "form.size.opts": ["Selecione...", "Até 10 funcionários", "11 a 50", "51 a 200", "201 a 500", "Mais de 500"],
    "form.area": "O que você precisa resolver?",
    "form.area.opts": ["Consultoria estratégica em IA", "Agente de IA / SDR automatizado", "Automação no WhatsApp", "CRM com IA", "Qualificação de leads", "Integração de sistemas (ERP)", "Ainda não sei — quero conversar"],
    "form.message": "Me conta seu cenário (opcional)",
    "form.consent": "Posso receber contato sobre minha solicitação",
    "form.submit": "Enviar para Wagner",
    "form.sending": "Enviando...",
    "form.success.title": "Recebido.",
    "form.success.msg": "Wagner responde pessoalmente em até 24h. Quer falar agora? Chama no WhatsApp.",
    "form.error": "Falhou aqui. Tenta WhatsApp ou e-mail direto.",
    "form.cancel": "Cancelar",
    "form.required": "Campo obrigatório",

    // FOUNDER
    "founder.label": "Wagner Verçosa · Fundador",
    "founder.name": "Wagner Verçosa",
    "founder.role": "CEO & Fundador",
    "founder.title": "Você fala comigo.",
    "founder.location": "Foz do Iguaçu · Ciudad del Este",

    // FOOTER
    "footer.about": "Konnecta. Agência de IA na fronteira BR–PY que tira processos repetitivos da equipe e bota IA pra trabalhar no lugar.",
    "footer.col.solutions": "Soluções",
    "footer.col.company": "Konnecta",
    "footer.col.resources": "Recursos",
    "footer.l.about": "Sobre",
    "footer.l.cases": "Cases",
    "footer.l.career": "Trabalhe conosco",
    "footer.l.contact": "Contato",
    "footer.l.blog": "Blog",
    "footer.l.materials": "Materiais",
    "footer.l.docs": "Documentação",
    "footer.l.support": "Suporte",
    "footer.rights": "© 2026 Konnecta. Todos os direitos reservados.",
    "footer.privacy": "Privacidade",
    "footer.terms": "Termos",
    "wa.float.label": "Conversar no WhatsApp",
  },
  es: {
    // NAV
    "nav.solutions": "Soluciones",
    "nav.cases": "Casos",
    "nav.tech": "Tecnología",
    "nav.about": "Consultoría",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.cta": "Diagnóstico gratis",
    "lang.label": "PT",
    "lang.full": "Português",

    // HERO
    "hero.eyebrow": "",
    "hero.title.1": "",
    "hero.title.2": "Construimos la infraestructura de IA",
    "hero.title.3": "que va a operar tu empresa.",
    "hero.sub": "Agentes autónomos, automatizaciones e integraciones a medida para tu sector. Vos liderás. La IA opera.",
    "hero.stat.1.n": "+50",
    "hero.stat.1.l": "Operaciones automatizadas",
    "hero.stat.2.n": "+2.5M",
    "hero.stat.2.l": "Mensajes procesados",
    "hero.stat.3.n": "+35%",
    "hero.stat.3.l": "Conversión promedio",
    "hero.stat.4.n": "24/7",
    "hero.stat.4.l": "Siempre online",

    // CTAs
    "btn.diagnostic": "Diagnóstico gratis",
    "btn.solutions": "Ver soluciones",
    "btn.whatsapp": "Hablar por WhatsApp",
    "btn.form": "Quiero ser contactado",
    "btn.book.free": "Quiero mi diagnóstico",
    "btn.see.all": "Ver todas",
    "btn.see.case": "Ver caso completo",
    "btn.book.now": "Quiero mi diagnóstico",
    "btn.book.consulting": "Agendar consultoría",
    "btn.know": "Conocer",

    // SOLUTIONS
    "sol.eyebrow": "Lo que entregamos",
    "sol.title.a": "Sistemas de IA",
    "sol.title.b": "que se pagan",
    "sol.title.c": "solos.",
    "sol.see.all": "Ver todo",
    "sol.bot.title": "Agentes de IA",
    "sol.bot.emph": "que venden",
    "sol.bot.desc": "SDRs y atención que responden en 30 segundos, califican el lead, agendan reunión y nunca se cansan. Entrenados con tu operación.",
    "sol.wpp.title": "WhatsApp",
    "sol.wpp.emph": "automatizado",
    "sol.wpp.desc": "Embudos que reciben, califican y entregan el lead listo para cerrar.",
    "sol.crm.title": "CRM",
    "sol.crm.emph": "que piensa",
    "sol.crm.desc": "Pipeline con IA que predice cierre y persigue al vendedor.",
    "sol.leads.title": "Calificación",
    "sol.leads.emph": "automática",
    "sol.leads.desc": "IA que puntúa cada lead, los ordena por probabilidad de cierre y manda solo los buenos al equipo.",
    "sol.erp.title": "Integraciones",
    "sol.erp.emph": "& ERP",
    "sol.erp.desc": "Conectamos tus herramientas. El dato entra una vez, aparece en todos lados.",
    "sol.bi.title": "Dashboards",
    "sol.bi.emph": "en tiempo real",
    "sol.bi.desc": "Ventas, atención y operación en una pantalla. Sin planillas, sin esperas.",

    // CONSULTING
    "cons.eyebrow": "★ Especialidad",
    "cons.title.a": "Consultoría en",
    "cons.title.b": "IA agéntica",
    "cons.title.c": "para empresas que piensan en grande.",
    "cons.lead": "No vendemos herramientas. Nos sentamos con la dirección, mapeamos dónde tu operación pierde dinero y construimos una infraestructura de IA vertical — a medida de tu sector, tus reglas y tus datos.",
    "cons.cta": "Agendar consultoría",
    "cons.system.active": "Sistema agéntico activo",
    "cons.metrics": "req/min · 99.8% uptime",
    "cons.p1.t": "Diagnóstico estratégico",
    "cons.p1.d": "Mapeamos cada cuello de botella e identificamos los 3 procesos con mayor ROI para automatizar primero.",
    "cons.p2.t": "Arquitectura de IA vertical",
    "cons.p2.d": "Diseñamos la infraestructura a medida para tu sector, tus reglas y tu volumen.",
    "cons.p3.t": "Implementación senior",
    "cons.p3.d": "Equipo dedicado construye, integra y valida cada sistema. Vos seguís el progreso en tiempo real.",
    "cons.p4.t": "Operación continua",
    "cons.p4.d": "Optimización mensual, nuevos agentes y expansión. La IA evoluciona con tu empresa.",

    // PROCESS
    "proc.eyebrow": "Cómo trabajamos",
    "proc.title.a": "En 5 pasos vamos",
    "proc.title.b": "del diagnóstico al resultado.",
    "proc.s1.t": "Diagnóstico",
    "proc.s1.d": "Reunión de 60 min para entender la operación e identificar quick wins.",
    "proc.s2.t": "Estrategia",
    "proc.s2.d": "Roadmap con alcance, plazos y ROI proyectado para cada automatización.",
    "proc.s3.t": "Construcción",
    "proc.s3.d": "Implementación ágil en sprints. Cada 2 semanas, algo nuevo en producción.",
    "proc.s4.t": "Lanzamiento",
    "proc.s4.d": "Go-live monitoreado, capacitación del equipo y ajustes en tiempo real.",
    "proc.s5.t": "Optimización",
    "proc.s5.d": "Acompañamiento continuo, nuevos agentes y expansión de la operación.",

    // PLATFORM
    "plat.eyebrow": "Plataforma Konnecta",
    "plat.title.a": "Todo conectado.",
    "plat.title.b": "En una pantalla.",
    "plat.sub": "Ventas, atención, operación y datos hablando entre sí — sin que abras 7 pestañas.",

    // CASE
    "case.eyebrow": "Caso Konnecta",
    "case.title.a": "Clínica Vitalis:",
    "case.title.b": "+312% en agendamientos en 90 días.",
    "case.client": "Cliente",
    "case.client.name": "Clínica Vitalis",
    "case.body": "Implementamos un agente en WhatsApp que responde, califica y agenda consultas solo. El equipo humano entra solo cuando hay que cerrar tratamiento. En 90 días los agendamientos se triplicaron y la clínica redujo el equipo de atención un 40%.",

    // STACK
    "stack.eyebrow": "Stack",
    "stack.title.a": "IA agéntica,",
    "stack.title.b": "OpenClaw",
    "stack.title.c": "y lo mejor del mercado.",
    "stack.sub": "Trabajamos con agentes autónomos, multi-modelo y orquestación avanzada. Sin atadura a proveedor — solo con lo que funciona.",

    // TESTIMONIALS
    "tst.eyebrow": "Quién ya está corriendo",
    "tst.title.a": "Quien usa, cuenta",
    "tst.title.b": "lo que pasa.",

    // FINAL CTA
    "fcta.eyebrow": "Próximo paso",
    "fcta.title.a": "30 minutos.",
    "fcta.title.b": "Salís con un plan.",
    "fcta.sub": "Diagnóstico gratuito por videollamada. Wagner entra con vos, mapea la operación y muestra exactamente dónde la IA paga la inversión. Sin propuesta enlatada, sin pitch.",
    "fcta.banner.eyebrow": "Diagnóstico gratis · 30 minutos",
    "fcta.banner.title": "Salí de la call sabiendo dónde la IA genera caja.",
    "fcta.banner.sub": "Sin compromiso. Sin propuesta pre-armada.",

    // FORM
    "form.title": "Hablemos.",
    "form.subtitle": "Completá. Wagner responde personalmente en hasta 24h. En horario laboral, normalmente en menos de 2h.",
    "form.name": "Nombre completo",
    "form.email": "E-mail corporativo",
    "form.phone": "Teléfono / WhatsApp",
    "form.company": "Empresa",
    "form.size": "Tamaño de la empresa",
    "form.size.opts": ["Seleccionar...", "Hasta 10 empleados", "11 a 50", "51 a 200", "201 a 500", "Más de 500"],
    "form.area": "¿Qué necesitás resolver?",
    "form.area.opts": ["Consultoría estratégica en IA", "Agente de IA / SDR automatizado", "Automatización en WhatsApp", "CRM con IA", "Calificación de leads", "Integración de sistemas (ERP)", "Aún no sé — quiero conversar"],
    "form.message": "Contame tu escenario (opcional)",
    "form.consent": "Acepto recibir contacto sobre mi solicitud",
    "form.submit": "Enviar a Wagner",
    "form.sending": "Enviando...",
    "form.success.title": "Recibido.",
    "form.success.msg": "Wagner responde personalmente en hasta 24h. ¿Querés hablar ya? Escribí por WhatsApp.",
    "form.error": "Falló acá. Probá WhatsApp o e-mail directo.",
    "form.cancel": "Cancelar",
    "form.required": "Campo obligatorio",

    // FOUNDER
    "founder.label": "Wagner Verçosa · Fundador",
    "founder.name": "Wagner Verçosa",
    "founder.role": "CEO & Fundador",
    "founder.title": "Hablás conmigo.",
    "founder.location": "Foz do Iguaçu · Ciudad del Este",

    // FOOTER
    "footer.about": "Konnecta. Agencia de IA en la frontera BR–PY que saca procesos repetitivos del equipo y pone IA a trabajar en su lugar.",
    "footer.col.solutions": "Soluciones",
    "footer.col.company": "Konnecta",
    "footer.col.resources": "Recursos",
    "footer.l.about": "Nosotros",
    "footer.l.cases": "Casos",
    "footer.l.career": "Trabajá con nosotros",
    "footer.l.contact": "Contacto",
    "footer.l.blog": "Blog",
    "footer.l.materials": "Materiales",
    "footer.l.docs": "Documentación",
    "footer.l.support": "Soporte",
    "footer.rights": "© 2026 Konnecta. Todos los derechos reservados.",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "wa.float.label": "Hablar por WhatsApp",
  },
};

const I18nCtx = createContext({ lang: "pt", t: (k) => k, setLang: () => {}, openForm: () => {} });

function I18nProvider({ children }) {
  const [lang, setLang] = uS(() => {
    try { return localStorage.getItem("kn_lang") || "pt"; } catch { return "pt"; }
  });
  const [formOpen, setFormOpen] = uS(false);
  uE(() => {
    try { localStorage.setItem("kn_lang", lang); } catch {}
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "es";
  }, [lang]);
  const t = (k) => (T[lang] && T[lang][k]) || (T.pt[k] || k);
  return (
    <I18nCtx.Provider value={{ lang, setLang, t, openForm: () => setFormOpen(true) }}>
      {children}
      <LeadForm open={formOpen} onClose={() => setFormOpen(false)} />
      <WhatsAppFloat />
    </I18nCtx.Provider>
  );
}

function useI18n() { return useContext(I18nCtx); }

// === LANGUAGE TOGGLE (in nav) ===
function LangToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === "pt" ? "es" : "pt";
  return (
    <button
      onClick={() => setLang(next)}
      title={lang === "pt" ? "Cambiar a Español" : "Mudar para Português"}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 14px", borderRadius: 999,
        border: "1px solid var(--line-strong)",
        background: "rgba(255,255,255,0.03)",
        color: "#fff", fontSize: 12, fontWeight: 500,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.1em", textTransform: "uppercase",
        cursor: "pointer", transition: "all 0.25s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--lime)"; e.currentTarget.style.background = "rgba(203,255,0,0.06)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line-strong)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12 H21 M12 3 a14 14 0 0 1 0 18 a14 14 0 0 1 0 -18"/>
      </svg>
      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ color: lang === "pt" ? "var(--lime)" : "rgba(255,255,255,0.45)" }}>PT</span>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>
        <span style={{ color: lang === "es" ? "var(--lime)" : "rgba(255,255,255,0.45)" }}>ES</span>
      </span>
    </button>
  );
}

// === WHATSAPP BUTTON helper (anchor wrapper) ===
function WaButton({ className = "btn-primary", children, msg, style }) {
  const { lang } = useI18n();
  return (
    <a href={waLink(lang, msg)} target="_blank" rel="noopener" className={className} style={style}>
      {children}
    </a>
  );
}

// === FORM BUTTON (opens modal) ===
function FormButton({ className = "btn-secondary", children, style }) {
  const { openForm } = useI18n();
  return (
    <button className={className} style={style} onClick={openForm}>{children}</button>
  );
}

// === FLOATING WHATSAPP ===
function WhatsAppFloat() {
  const { lang, t } = useI18n();
  const [show, setShow] = uS(false);
  uE(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href={waLink(lang)} target="_blank" rel="noopener"
      aria-label={t("wa.float.label")}
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 90,
        width: 60, height: 60, borderRadius: "50%",
        background: "var(--lime)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 10px 30px rgba(203,255,0,0.35), 0 0 0 8px rgba(203,255,0,0.08)",
        transform: show ? "scale(1) translateY(0)" : "scale(0.6) translateY(20px)",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        transition: "all 0.4s cubic-bezier(.2,.8,.2,1)",
      }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%",
        animation: "waPulse 2s ease-out infinite",
        boxShadow: "0 0 0 0 rgba(203,255,0,0.5)" }}></span>
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#000"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9c-.3-.1-.5-.1-.7.1c-.2.3-.7.9-.9 1.1c-.2.2-.3.2-.6.1c-.3-.1-1.3-.5-2.4-1.5c-.9-.8-1.5-1.7-1.7-2c-.2-.3 0-.5.1-.6c.1-.1.3-.3.5-.5c.1-.2.2-.3.3-.5c.1-.2.1-.4 0-.5c-.1-.1-.7-1.6-1-2.2c-.2-.6-.5-.5-.7-.5c-.2 0-.4 0-.6 0c-.2 0-.5.1-.8.4c-.3.3-1 1-1 2.5c0 1.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5c.7.3 1.3.5 1.7.6c.7.2 1.4.2 1.9.1c.6-.1 1.7-.7 2-1.4c.2-.6.2-1.2.2-1.4c-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.8 3.1 1.2 4.8 1.2c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2l-3.1.8l.8-3l-.2-.3C4.4 15 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8s-3.6 8-8 8z"/></svg>
    </a>
  );
}

// === LEAD FORM MODAL ===
function LeadForm({ open, onClose }) {
  const { t, lang } = useI18n();
  const [data, setData] = uS({ name: "", email: "", phone: "", company: "", size: "", area: "", message: "", consent: false });
  const [errors, setErrors] = uS({});
  const [status, setStatus] = uS("idle"); // idle | sending | success | error

  uE(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  uE(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!data.name.trim()) errs.name = true;
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) errs.email = true;
    if (!data.phone.trim()) errs.phone = true;
    if (!data.consent) errs.consent = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    // Use Formspree's AJAX endpoint. The user must replace FORMSPREE_ENDPOINT with their own form ID
    // created at https://formspree.io targeting wagnergv8@gmail.com.
    try {
      const body = new FormData();
      Object.entries(data).forEach(([k, v]) => body.append(k, String(v)));
      body.append("_subject", `[Konnecta Lead] ${data.name} — ${data.company || "—"}`);
      body.append("_replyto", data.email);
      body.append("language", lang);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      if (res.ok) {
        setStatus("success");
      } else {
        // fallback: open mailto so the lead still reaches Wagner
        const mail = `mailto:wagnergv8@gmail.com?subject=${encodeURIComponent(`[Konnecta Lead] ${data.name}`)}&body=${encodeURIComponent(JSON.stringify(data, null, 2))}`;
        window.location.href = mail;
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const inputStyle = (err) => ({
    width: "100%", padding: "12px 14px", borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${err ? "rgba(255,80,80,0.6)" : "var(--line)"}`,
    color: "#fff", fontSize: 14, fontFamily: "inherit",
    outline: "none", transition: "border-color 0.2s",
  });
  const labelStyle = { fontSize: 11, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'JetBrains Mono', monospace", marginBottom: 6, display: "block" };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "fadeIn 0.25s",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 580, maxHeight: "90vh", overflowY: "auto",
        background: "linear-gradient(180deg, #0a0a0a, #050505)",
        border: "1px solid var(--line-strong)", borderRadius: 24, padding: 36,
        position: "relative", animation: "slideUp 0.35s cubic-bezier(.2,.8,.2,1)",
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: "absolute", top: 18, right: 18,
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", border: "1px solid var(--line)",
          color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M6 6 L18 18 M6 18 L18 6"/></svg>
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--lime)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" stroke="#000" strokeWidth="3" fill="none"><path d="M5 12 L10 18 L20 6"/></svg>
            </div>
            <h3 className="display" style={{ fontSize: 28, color: "#fff", marginBottom: 12 }}>{t("form.success.title")}</h3>
            <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 380, margin: "0 auto 24px" }}>{t("form.success.msg")}</p>
            <a href={waLink(lang)} target="_blank" rel="noopener" className="btn-primary" style={{ display: "inline-flex" }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#000"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9c-.3-.1-.5-.1-.7.1c-.2.3-.7.9-.9 1.1c-.2.2-.3.2-.6.1c-.3-.1-1.3-.5-2.4-1.5c-.9-.8-1.5-1.7-1.7-2c-.2-.3 0-.5.1-.6c.1-.1.3-.3.5-.5c.1-.2.2-.3.3-.5c.1-.2.1-.4 0-.5c-.1-.1-.7-1.6-1-2.2c-.2-.6-.5-.5-.7-.5c-.2 0-.4 0-.6 0c-.2 0-.5.1-.8.4c-.3.3-1 1-1 2.5c0 1.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5c.7.3 1.3.5 1.7.6c.7.2 1.4.2 1.9.1c.6-.1 1.7-.7 2-1.4c.2-.6.2-1.2.2-1.4c-.1-.2-.3-.2-.6-.4z"/></svg>
              {t("btn.whatsapp")}
            </a>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)", boxShadow: "0 0 12px var(--lime)" }}></span>
                <span className="mono" style={{ fontSize: 11, color: "var(--lime)", textTransform: "uppercase", letterSpacing: "0.2em" }}>Konnecta · Wagner Verçosa</span>
              </div>
              <h3 className="display" style={{ fontSize: 32, color: "#fff", marginBottom: 8 }}>{t("form.title")}</h3>
              <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{t("form.subtitle")}</p>
            </div>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>{t("form.name")} *</label>
                <input style={inputStyle(errors.name)} value={data.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row">
                <div>
                  <label style={labelStyle}>{t("form.email")} *</label>
                  <input type="email" style={inputStyle(errors.email)} value={data.email} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>{t("form.phone")} *</label>
                  <input style={inputStyle(errors.phone)} value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+55 ..." />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row">
                <div>
                  <label style={labelStyle}>{t("form.company")}</label>
                  <input style={inputStyle()} value={data.company} onChange={(e) => update("company", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>{t("form.size")}</label>
                  <select style={inputStyle()} value={data.size} onChange={(e) => update("size", e.target.value)}>
                    {t("form.size.opts").map((o, i) => <option key={i} value={i === 0 ? "" : o} style={{ background: "#0a0a0a" }}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>{t("form.area")}</label>
                <select style={inputStyle()} value={data.area} onChange={(e) => update("area", e.target.value)}>
                  <option value="" style={{ background: "#0a0a0a" }}>—</option>
                  {t("form.area.opts").map((o, i) => <option key={i} value={o} style={{ background: "#0a0a0a" }}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>{t("form.message")}</label>
                <textarea rows={3} style={{ ...inputStyle(), resize: "vertical", minHeight: 80 }} value={data.message} onChange={(e) => update("message", e.target.value)} />
              </div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: errors.consent ? "rgba(255,120,120,0.9)" : "var(--text-dim)", cursor: "pointer", lineHeight: 1.5 }}>
                <input type="checkbox" checked={data.consent} onChange={(e) => update("consent", e.target.checked)} style={{ marginTop: 2, accentColor: "#CBFF00" }} />
                <span>{t("form.consent")}</span>
              </label>

              {status === "error" && (
                <div style={{ padding: 12, borderRadius: 10, background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.3)", color: "#ff9090", fontSize: 12 }}>
                  {t("form.error")}
                </div>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                <button type="submit" disabled={status === "sending"} className="btn-primary" style={{ flex: 1, minWidth: 200, justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}>
                  {status === "sending" ? t("form.sending") : t("form.submit")}
                  {status !== "sending" && <KArrow size={12} color="#000" />}
                </button>
                <a href={waLink(lang)} target="_blank" rel="noopener" className="btn-secondary" style={{ minWidth: 140, justifyContent: "center" }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9c-.3-.1-.5-.1-.7.1c-.2.3-.7.9-.9 1.1c-.2.2-.3.2-.6.1c-.3-.1-1.3-.5-2.4-1.5c-.9-.8-1.5-1.7-1.7-2c-.2-.3 0-.5.1-.6c.1-.1.3-.3.5-.5c.1-.2.2-.3.3-.5c.1-.2.1-.4 0-.5c-.1-.1-.7-1.6-1-2.2c-.2-.6-.5-.5-.7-.5c-.2 0-.4 0-.6 0c-.2 0-.5.1-.8.4c-.3.3-1 1-1 2.5c0 1.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5c.7.3 1.3.5 1.7.6c.7.2 1.4.2 1.9.1c.6-.1 1.7-.7 2-1.4c.2-.6.2-1.2.2-1.4c-.1-.2-.3-.2-.6-.4z"/></svg>
                  WhatsApp
                </a>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", marginTop: 4 }}>
                wagnergv8@gmail.com · +55 45 99963-7457
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes waPulse {
          0% { box-shadow: 0 0 0 0 rgba(203,255,0,0.5); }
          100% { box-shadow: 0 0 0 24px rgba(203,255,0,0); }
        }
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, {
  I18nProvider, I18nCtx, useI18n, LangToggle, WaButton, FormButton, LeadForm, WhatsAppFloat, waLink, T,
});
