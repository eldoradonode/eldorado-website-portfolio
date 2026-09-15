import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, isOpen, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10002] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-8 sm:right-8 text-text hover:text-gold transition-colors w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-bg/70 backdrop-blur-md border border-gold/20 z-[10003] cursor-pointer"
          aria-label="Close image viewer"
        >
          <X size={26} />
        </button>

        <div className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            src={images[currentIndex]}
            alt={`Architecture preview ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-gold/20"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-2 md:left-[-60px] top-1/2 -translate-y-1/2 w-11 h-11 md:w-16 md:h-16 min-w-[44px] min-h-[44px] glass flex items-center justify-center text-gold hover:bg-gold/20 rounded-full cursor-pointer z-20"
                aria-label="Previous image"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-2 md:right-[-60px] top-1/2 -translate-y-1/2 w-11 h-11 md:w-16 md:h-16 min-w-[44px] min-h-[44px] glass flex items-center justify-center text-gold hover:bg-gold/20 rounded-full cursor-pointer z-20"
                aria-label="Next image"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          <div className="absolute bottom-[-45px] md:bottom-[-50px] left-1/2 -translate-x-1/2 flex items-center gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className="min-w-[32px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-gold' : 'w-2 bg-gold/30 hover:bg-gold/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
