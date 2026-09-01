import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Image, Mail, Clock, Heart } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'wish', label: 'Wish', icon: Heart },
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'memories', label: 'Memories', icon: Image },
  { id: 'letter', label: 'Letter', icon: Mail },
  { id: 'countdown', label: 'Countdown', icon: Clock },
];

export const FloatingNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] sm:w-auto max-w-2xl px-2 sm:px-0"
    >
      <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-1.5 p-1.5 rounded-full glass-luxury border-gold-thin shadow-card-soft backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0 z-10 whitespace-nowrap ${
                isActive
                  ? 'text-wedding-maroon-deep font-semibold'
                  : 'text-wedding-maroon/70 hover:text-wedding-maroon'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavBg"
                  className="absolute inset-0 bg-gradient-to-r from-wedding-gold/80 to-wedding-gold-accent rounded-full shadow-xs -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-wedding-maroon-deep' : 'text-wedding-gold-dark'}`} />
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
};
