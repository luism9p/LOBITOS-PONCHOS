import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { CartDrawer } from './CartDrawer';
import { Button } from './ui/button';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    const isAdmin = user?.role === 'admin';

    return (
        <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-3 text-2xl font-light tracking-widest uppercase">
                            <img src="/fotos/logpa.png" alt="Lobitos Ponchos" className="h-12 w-auto object-contain" />
                            Lobitos Ponchos
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className={`text-sm uppercase tracking-wide hover:text-stone-600 ${location.pathname === '/' ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>{t('nav.home')}</Link>
                            <Link to="/shop" className={`text-sm uppercase tracking-wide hover:text-stone-600 ${location.pathname === '/shop' ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>{t('nav.shop')}</Link>
                            {isAdmin && (
                                <Link to="/admin" className={`text-sm uppercase tracking-wide hover:text-stone-600 ${location.pathname === '/admin' ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>{t('nav.admin')}</Link>
                            )}
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            {/* Language Switcher */}
                            {/* Language Switcher */}
                            <div className="flex items-center gap-2 border-r border-stone-200 pr-4 mr-2">
                                <button
                                    onClick={() => setLanguage('es')}
                                    className={`text-sm transition-colors hover:text-stone-900 ${language === 'es' ? 'font-bold text-stone-900' : 'font-medium text-stone-300'}`}
                                >
                                    ES
                                </button>
                                <span className="text-stone-300">|</span>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`text-sm transition-colors hover:text-stone-900 ${language === 'en' ? 'font-bold text-stone-900' : 'font-medium text-stone-300'}`}
                                >
                                    EN
                                </button>
                            </div>

                            {user ? (
                                <Button variant="ghost" size="sm" onClick={logout} className="text-xs uppercase">{t('nav.logout')}</Button>
                            ) : (
                                <Link to="/login">
                                    <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
                                </Link>
                            )}
                            <CartDrawer />
                        </div>

                        {/* Mobile Menu Button & Cart */}
                        <div className="md:hidden flex items-center gap-2">
                            <CartDrawer />
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-stone-100">
                        <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col">
                            <Link to="/" className="py-2 text-sm uppercase tracking-wide" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
                            <Link to="/shop" className="py-2 text-sm uppercase tracking-wide" onClick={() => setIsMenuOpen(false)}>{t('nav.shop')}</Link>
                            {isAdmin && (
                                <Link to="/admin" className="py-2 text-sm uppercase tracking-wide" onClick={() => setIsMenuOpen(false)}>{t('nav.admin')}</Link>
                            )}

                            {/* Mobile Language Switcher */}
                            <div className="flex items-center gap-4 py-2 border-t border-stone-100 mt-2 pt-4">
                                <span className="text-sm text-stone-500">Language:</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setLanguage('es')}
                                        className={`text-sm transition-colors hover:text-stone-900 ${language === 'es' ? 'font-bold text-stone-900' : 'font-medium text-stone-300'}`}
                                    >
                                        ES
                                    </button>
                                    <span className="text-stone-300">|</span>
                                    <button
                                        onClick={() => setLanguage('en')}
                                        className={`text-sm transition-colors hover:text-stone-900 ${language === 'en' ? 'font-bold text-stone-900' : 'font-medium text-stone-300'}`}
                                    >
                                        EN
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-stone-100 pt-2 mt-2 flex items-center justify-between">
                                {user ? (
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-sm uppercase">{t('nav.logout')}</button>
                                ) : (
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm uppercase">{t('nav.login')}</Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-stone-50 border-t border-stone-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-light uppercase tracking-widest mb-4">Lobitos Ponchos</h3>
                        <p className="text-stone-500 text-sm leading-relaxed">
                            Ponchos toalla diseñados para brindarte privacidad al cambiarte y abrigo al salir del mar. Hechos con orgullo en el norte peruano.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-light uppercase tracking-widest mb-4">Links</h3>
                        <ul className="space-y-2 text-sm text-stone-500">
                            <li><Link to="/shop" className="hover:text-stone-900">Tienda</Link></li>
                            <li><Link to="/about" className="hover:text-stone-900">Nosotros</Link></li>
                            <li><Link to="/contact" className="hover:text-stone-900">Contacto</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-light uppercase tracking-widest mb-4">Información</h3>
                        <p className="text-stone-500 text-sm mb-4">Suscríbete para recibir actualizaciones y descuentos especiales.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Ingresa tu correo" className="flex-1 px-4 py-2 border border-stone-200 focus:outline-none focus:border-stone-400 text-sm" />
                            <button className="px-6 py-2 bg-stone-900 text-white text-sm uppercase tracking-wide hover:bg-stone-800">Suscribirme</button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-200 text-center text-xs text-stone-400 uppercase tracking-wide">
                    © {new Date().getFullYear()} Lobitos Ponchos. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
};
