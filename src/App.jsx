import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Building2, BriefcaseBusiness, CalendarDays, CheckCircle2, Code2, Compass, ExternalLink, Github, Globe2, Linkedin, Mail, Menu, MousePointer2, Phone, Send, Sparkles, X, Clock3, MapPin, ChevronRight, Laptop, Bot, Palette, GraduationCap, Layers3 } from 'lucide-react';
import World from './components/World.jsx';
import { siteConfig } from './config/siteConfig.js';

const iconMap = { about: Globe2, services: BriefcaseBusiness, internships: GraduationCap, projects: Code2, contact: Mail };
const serviceIcons = [Laptop, Bot, Palette, GraduationCap, Layers3, Code2];
const initialAppointment = { name: '', email: '', type: 'Virtual company visit', date: '', time: '11:00 AM – 1:00 PM', topic: '', message: '' };

export default function App() {
  const [room, setRoom] = useState(false);
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState(false);
  const [started, setStarted] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointment, setAppointment] = useState(initialAppointment);
  const [appointmentReady, setAppointmentReady] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const selected = siteConfig.sections.find(s => s.id === active);
  const service = serviceIndex === null ? null : siteConfig.services[serviceIndex];
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const openAppointment = (type = 'Virtual company visit') => {
    setAppointment(v => ({ ...v, type }));
    setAppointmentReady(false);
    setAppointmentOpen(true);
    setActive(null);
    setServiceIndex(null);
  };
  const submitAppointment = (e) => {
    e.preventDefault();
    const subject = `Appointment request — ${appointment.type} — ${appointment.name}`;
    const body = [
      'Hello Internlytic Technologies,', '', 'I would like to request an appointment / virtual visit.',
      `Name: ${appointment.name}`, `Email: ${appointment.email}`, `Request type: ${appointment.type}`,
      `Preferred date: ${appointment.date || 'Please suggest a date'}`, `Preferred time: ${appointment.time}`,
      `Topic: ${appointment.topic || 'Not specified'}`, '', `Message: ${appointment.message || 'No additional message'}`, '',
      'Please confirm availability by replying to this email.'
    ].join('\n');
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setAppointmentReady(true);
  };
  const goToWorld = () => { setStarted(true); setActive(null); setServiceIndex(null); document.getElementById('virtual-office')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); };

  return <main className="app-shell" style={{ '--brand': siteConfig.primaryColor, '--accent': siteConfig.accentColor, '--page-bg': siteConfig.backgroundColor }}>
    <header className="topbar">
      <a className="brand" href="#home" onClick={() => { setRoom(false); setActive(null); setServiceIndex(null); }}><span className="brand-mark">IT</span><span><b>{siteConfig.companyName}</b><small>{siteConfig.tagline}</small></span></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>
      <nav className={menu ? 'nav-links open' : 'nav-links'}>{siteConfig.sections.map(s => <button key={s.id} onClick={() => { setActive(s.id); setMenu(false); }}>{s.title}</button>)}</nav>
      <button className="top-cta" onClick={() => openAppointment('Consultation appointment')}>Book a visit <CalendarDays size={15}/></button>
    </header>

    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot"/> A NEW WAY TO VISIT A TECHNOLOGY COMPANY</div>
        <h1>Walk in.<br/><span>Look around.</span><br/>Build what’s next.</h1>
        <p>Visit Internlytic Technologies through an interactive 3D experience. Explore our virtual office, discover services, learn about internship pathways, and request an appointment with the team.</p>
        <div className="hero-actions"><button className="primary-btn" onClick={goToWorld}><Compass size={17}/> Enter the virtual office <ArrowRight size={16}/></button><button className="text-btn" onClick={() => openAppointment()}>Schedule a visit <CalendarDays size={15}/></button></div>
        <div className="hero-meta"><span><span className="meta-dot"/> Interactive 3D walkthrough</span><span><MousePointer2 size={14}/> Desktop + mobile controls</span><span><CheckCircle2 size={14}/> Services and visit requests</span></div>
      </div>
      <div className="hero-side-note"><span className="side-line"/><span>VIRTUAL HEADQUARTERS<br/><b>{siteConfig.location}</b></span></div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-core"><Building2 size={38}/><span>IT</span></div></div>
    </section>

    <section className="world-section" id="virtual-office" aria-label="Interactive 3D virtual office">
      <div className="world-heading"><div><span className="section-kicker">01 / THE EXPERIENCE</span><h2>Your visit starts at the street.</h2></div><div className="world-heading-note">Walk toward the entrance, step inside, and explore the virtual headquarters.<br/>The experience is designed for desktop and mobile.</div></div>
      <div className="world-frame"><World room={room} setRoom={setRoom}/><div className="world-corner-label"><Building2 size={15}/> INTERNLYTIC HQ <span>•</span> 3D EXPERIENCE</div>{!started && !room && <div className="welcome-card"><span className="welcome-icon"><Compass size={19}/></span><div><b>Your virtual visit is ready</b><p>Move with WASD / arrow keys or use the mobile pad. Approach the entrance and press E.</p></div><button aria-label="Start exploring" onClick={() => setStarted(true)}><ArrowRight size={18}/></button></div>}</div>
      <div className="world-footer"><span>Explore at your own pace. Use the page below to learn about our work.</span><span>MOVE <b>W A S D</b> <span className="footer-sep">/</span> LOOK <b>DRAG</b> <span className="footer-sep">/</span> ENTER <b>E</b></span></div>
      <div className="visit-actions"><div><span className="section-kicker">READY TO TALK?</span><h3>Make your virtual visit a real conversation.</h3><p>Request a meeting about a service, internship pathway, or collaboration idea.</p></div><button className="primary-btn" onClick={() => openAppointment('Virtual company visit')}>Request an appointment <ArrowRight size={16}/></button></div>
    </section>

    <section className="services-section" id="services"><div className="section-head"><div><span className="section-kicker">02 / SERVICES</span><h2>Find the right solution.</h2></div><p>Choose a service to explore what it includes, then request a consultation if you want to discuss your idea.</p></div>
      <div className="service-grid">{siteConfig.services.map((s,i)=>{const Icon=serviceIcons[i]||Sparkles;return <button className="service-card" key={s.title} onClick={() => setServiceIndex(i)}><span className="service-icon"><Icon size={21}/></span><span className="service-category">{s.category}</span><h3>{s.title}</h3><p>{s.description}</p><span className="feature-link">View details <ArrowRight size={15}/></span></button>})}</div>
    </section>

    <section className="discover-section" id="discover"><div className="discover-intro"><span className="section-kicker">03 / INSIDE INTERNLYTIC</span><h2>Technology with<br/><span>a human purpose.</span></h2><p>Explore our mission, internship pathways, and project-first approach to learning and digital problem-solving.</p><button className="outline-btn" onClick={() => setActive('about')}>Meet Internlytic <ArrowRight size={15}/></button></div><div className="feature-grid">{siteConfig.sections.filter(s=>s.id!=='contact').map((s,i)=>{const Icon=iconMap[s.id]||Sparkles;return <button className="feature-card" key={s.id} onClick={() => setActive(s.id)}><div className="feature-top"><span className="feature-icon"><Icon size={19}/></span><span className="feature-number">0{i+1}</span></div><span className="feature-eyebrow">{s.eyebrow}</span><h3>{s.title}</h3><p>{s.body}</p><span className="feature-link">Explore section <ArrowRight size={15}/></span></button>})}</div></section>

    <section className="appointment-band"><div className="appointment-symbol"><CalendarDays size={25}/></div><div className="appointment-copy"><span className="section-kicker">04 / APPOINTMENTS</span><h2>Plan a visit with our team.</h2><p>Tell us what you want to discuss and your preferred time. Your email app will open with a pre-filled request addressed to Internlytic Technologies.</p></div><button className="primary-btn" onClick={() => openAppointment('Consultation appointment')}>Book an appointment <ArrowRight size={16}/></button></section>

    <section className="contact-band"><div><span className="section-kicker">05 / YOUR NEXT STEP</span><h2>Let’s turn your idea<br/>into something real.</h2><p>Founder & CEO: {siteConfig.founder} · {siteConfig.location}</p></div><div className="contact-band-actions"><button className="primary-btn" onClick={() => openAppointment('Project / service consultation')}>Discuss a project <ArrowRight size={16}/></button><a className="outline-btn" href={`mailto:${siteConfig.email}`}><Mail size={15}/> Email the team</a></div></section>

    <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">IT</span><span><b>{siteConfig.companyName}</b><small>{siteConfig.tagline}</small></span></a><p>© {new Date().getFullYear()} {siteConfig.companyName}. Learn. Build. Innovate.</p><div className="socials"><a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a href={siteConfig.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><ExternalLink size={17}/></a></div></footer>

    {selected && <div className="modal-backdrop" role="presentation" onClick={() => setActive(null)}><section className="info-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={() => setActive(null)} aria-label="Close"><X/></button><span className="section-kicker">{selected.eyebrow}</span><h2>{selected.title}</h2><p>{selected.body}</p>{selected.id==='services' ? <div className="modal-service-list">{siteConfig.services.map((s,i)=><button key={s.title} onClick={()=>{setActive(null);setServiceIndex(i)}}><span>{s.title}</span><ChevronRight size={16}/></button>)}</div> : selected.id==='contact' ? <div className="contact-options"><a href={`mailto:${siteConfig.email}`}><Mail size={17}/><span><b>Email the team</b><small>{siteConfig.email}</small></span><ArrowRight size={16}/></a><button onClick={()=>openAppointment()}><CalendarDays size={17}/><span><b>Request a visit</b><small>Choose a preferred date and time</small></span><ArrowRight size={16}/></button></div> : <button className="primary-btn modal-action" onClick={()=>{setActive(null);goToWorld()}}>Return to the 3D world <ArrowRight size={16}/></button>}</section></div>}

    {service && <div className="modal-backdrop" role="presentation" onClick={() => setServiceIndex(null)}><section className="info-modal service-modal" role="dialog" aria-modal="true" aria-label={service.title} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={() => setServiceIndex(null)} aria-label="Close"><X/></button><span className="section-kicker">{service.category}</span><h2>{service.title}</h2><p>{service.description}</p><h3 className="modal-subhead">What this can include</h3><ul className="detail-list">{service.details.map(d=><li key={d}><CheckCircle2 size={16}/>{d}</li>)}</ul><div className="modal-actions-row"><button className="primary-btn" onClick={()=>openAppointment(`Service consultation: ${service.title}`)}>Discuss this service <ArrowRight size={15}/></button><button className="outline-btn" onClick={()=>setServiceIndex(null)}>Close</button></div><small className="modal-note">Scope, timeline, pricing, and availability are confirmed individually with the team.</small></section></div>}

    {appointmentOpen && <div className="modal-backdrop" role="presentation" onClick={() => setAppointmentOpen(false)}><section className="info-modal appointment-modal" role="dialog" aria-modal="true" aria-label="Request an appointment" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={() => setAppointmentOpen(false)} aria-label="Close"><X/></button><span className="section-kicker">VISIT INTERNLYTIC</span><h2>Request an appointment.</h2><p>Share your details and preferred time. We’ll prepare an email request for you to review and send.</p>{appointmentReady && <div className="inline-success"><CheckCircle2 size={18}/><span>Your email app should open with the appointment request filled in. Please send the email to submit it.</span></div>}<form className="appointment-form" onSubmit={submitAppointment}><label>Full name<input required value={appointment.name} onChange={e=>setAppointment({...appointment,name:e.target.value})} placeholder="Your name"/></label><label>Email address<input required type="email" value={appointment.email} onChange={e=>setAppointment({...appointment,email:e.target.value})} placeholder="you@example.com"/></label><label>What would you like to discuss?<select value={appointment.type} onChange={e=>setAppointment({...appointment,type:e.target.value})}><option>Virtual company visit</option><option>Consultation appointment</option><option>Service consultation</option><option>Internship enquiry</option><option>Project / service consultation</option><option>Partnership or collaboration</option></select></label><div className="form-two"><label>Preferred date<input type="date" min={minDate} value={appointment.date} onChange={e=>setAppointment({...appointment,date:e.target.value})}/></label><label>Preferred time<select value={appointment.time} onChange={e=>setAppointment({...appointment,time:e.target.value})}><option>9:00 AM – 11:00 AM</option><option>11:00 AM – 1:00 PM</option><option>1:00 PM – 3:00 PM</option><option>3:00 PM – 5:00 PM</option><option>Please suggest a time</option></select></label></div><label>Topic / service<input value={appointment.topic} onChange={e=>setAppointment({...appointment,topic:e.target.value})} placeholder="e.g. Website development, UI/UX, internship"/></label><label>Message<textarea rows="3" value={appointment.message} onChange={e=>setAppointment({...appointment,message:e.target.value})} placeholder="Tell us briefly what you need"/></label><button className="primary-btn form-submit" type="submit"><Send size={16}/> Prepare appointment email <ArrowRight size={15}/></button><small className="form-privacy">This prototype does not store bookings on a server. Your email app opens so you can send the request yourself.</small></form></section></div>}
  </main>;
}
