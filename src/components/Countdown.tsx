import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(weddingConfig.weddingDate) - +new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPassed: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-20 px-4 bg-wedding-bg overflow-hidden scroll-mt-24">
      
      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-wedding-gold font-script text-2xl">
            <Clock className="w-5 h-5" />
            <span>The Grand Day Awaits</span>
            <Clock className="w-5 h-5" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wedding-maroon">
            Counting Down To Forever ⏳
          </h2>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Countdown Box */}
        {timeLeft.isPassed ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 sm:p-12 rounded-3xl glass-luxury border-gold-glow shadow-card-soft space-y-4 max-w-xl mx-auto"
          >
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mx-auto animate-heartbeat" />
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-wedding-maroon">
              Today, Forever Begins. ❤️
            </h3>
            <p className="font-sans text-wedding-maroon/80 text-sm sm:text-base">
              Wishing {weddingConfig.brideName} & {weddingConfig.groomName} a lifetime of magic and joy!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative p-6 rounded-2xl glass-luxury border-gold-thin shadow-card-soft flex flex-col items-center justify-center space-y-2 group hover:border-wedding-gold transition-colors duration-300"
              >
                {/* Number */}
                <span className="font-serif text-4xl sm:text-6xl font-bold text-gold-gradient tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>

                {/* Label */}
                <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-wedding-maroon/70 font-medium">
                  {unit.label}
                </span>

                {/* Corner Decorative Dot */}
                <Sparkles className="absolute top-2 right-2 w-3.5 h-3.5 text-wedding-gold/40 group-hover:text-wedding-gold transition-colors" />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
