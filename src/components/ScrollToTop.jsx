import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Also reset Lenis if it's external, but since we use it in App.jsx, 
        // we can also trigger a reset there if needed.
        // However, window.scrollTo usually works with most smooth scroll libs if they listen to it.
    }, [pathname]);

    return null;
}
