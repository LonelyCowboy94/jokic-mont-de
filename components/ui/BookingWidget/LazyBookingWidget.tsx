'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

// Dinamički import BookingWidget bez SSR
const BookingWidget = dynamic(
  () => import('./BookingWidget'),
  { ssr: false }
);

export default function LazyBookingWidget() {
  const [loadWidget, setLoadWidget] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // učitava samo prvi put kada uđe
    threshold: 0.1,    // 10% vidljivo
  });

  if (inView && !loadWidget) {
    setLoadWidget(true);
  }

  return (
    <div ref={ref} style={{ minHeight: '400px' }}>
      {loadWidget ? <BookingWidget /> : <p>Loading Booking Widget...</p>}
    </div>
  );
}
