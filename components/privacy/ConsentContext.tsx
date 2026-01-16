'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Consent = 'accepted' | 'declined' | null;

type ConsentContextType = {
  consent: Consent;
  closing: boolean;
  accept: () => void;
  decline: () => void;
    handleAccept: () => void;
    handleDecline: () => void;
};

const ConsentContext = createContext<ConsentContextType | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [closing, setClosing] = useState(false);

 useEffect(() => {
  setTimeout(() => {
    const saved = localStorage.getItem('jokic-mont-cookie-consent-gmap') as Consent;
    if (saved) setConsent(saved);
  }, 0);
}, []);

  const accept = () => {
    localStorage.setItem('jokic-mont-cookie-consent-gmap', 'accepted');
    setConsent('accepted');
  };

  const decline = () => {
    localStorage.setItem('jokic-mont-cookie-consent-gmap', 'declined');
    setConsent('declined');
  };

  const handleAccept = () => {
    setClosing(true);
    setTimeout(() => {
      accept();
      setClosing(false);
    }, 500);
  }

  const handleDecline = () => {
    setClosing(true);
    setTimeout(() => {
      decline();
      setClosing(false);
    }, 500);
  }

  return (
    <ConsentContext.Provider value={{ consent, handleAccept, handleDecline, closing, accept, decline }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
