"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

 function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined" && pathname) {
      window.gtag("config", "G-GCXJX0NMKZ", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

export default Analytics;