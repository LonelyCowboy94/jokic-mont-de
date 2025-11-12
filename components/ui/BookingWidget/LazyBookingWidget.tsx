"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const BookingWidget = dynamic(() => import("./BookingWidget"), {
  ssr: false,
});

export default function LazyBookingWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect(); 
        }
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{show && <BookingWidget />}</div>;
}
