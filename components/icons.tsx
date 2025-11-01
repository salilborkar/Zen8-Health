import React from 'react';

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const FoodIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.25 2.25h3.5a1.5 1.5 0 011.5 1.5v1.25a1.5 1.5 0 01-1.5 1.5h-3.5a1.5 1.5 0 01-1.5-1.5V3.75a1.5 1.5 0 011.5-1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.75 6.75h6.5a2.5 2.5 0 012.5 2.5v9a2.5 2.5 0 01-2.5 2.5h-6.5a2.5 2.5 0 01-2.5-2.5v-9a2.5 2.5 0 012.5-2.5z" />
  </svg>
);

export const WaterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75l1.83 2.063a11.26 11.26 0 0015.84 0l1.83-2.063M3.75 6.75c.995 0 1.95.16 2.87.464M20.25 6.75c-.995 0-1.95.16-2.87.464m-10.76 6c.552.622 1.18 1.176 1.868 1.666a11.19 11.19 0 009.784 0c.688-.49 1.316-1.044 1.868-1.666m-13.524-3.536A11.205 11.205 0 0112 5.25c2.31 0 4.45.698 6.264 1.964M12 5.25c-.995 0-1.95-.16-2.87-.464" />
    </svg>
);

export const WorkoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75c.5-1 1.5-2.25 3-2.25s2.5 1.25 3 2.25c.5-1 1.5-2.25 3-2.25s2.5 1.25 3 2.25M12 18.75c.5-1 1.5-2.25 3-2.25s2.5 1.25 3 2.25c.5-1 1.5-2.25 3-2.25s2.5 1.25 3 2.25M3 6.75c.5-1 1.5-2.25 3-2.25s2.5 1.25 3 2.25c.5-1 1.5-2.25 3-2.25s2.5 1.25 3 2.25M3 18.75c.5-1 1.5-2.25 3-2.25s2.5 1.25 3 2.25c.5-1 1.5-2.25 3-2.25s2.5 1.25 3 2.25" />
    </svg>
);


export const MentalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a4.5 4.5 0 014.5 4.5c0 1.554-.836 2.922-2.074 3.654a10.46 10.46 0 01-4.852 0C8.336 11.922 7.5 10.554 7.5 9a4.5 4.5 0 014.5-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5c-2.454 1.91-5.786 3-9.5 3s-7.046-1.09-9.5-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5a9 9 0 01-15 0" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const BarcodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5a2.25 2.25 0 012.25-2.25h12a2.25 2.25 0 012.25 2.25v15a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-15zm3 3.75h.008v.008H6.75v-.008zm3.75 0h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008zm-3.75 0h.008v.008H6.75v-.008zm0 3.75h.008v.008H6.75v-.008zm3.75 0h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008zm-3.75 0h.008v.008H6.75v-.008zm6-11.25h3.75v15h-3.75v-15z" />
  </svg>
);

export const BadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

export const LeaderboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1-1.5m1 1.5l1-1.5m3.75 0l-1-1.5m1 1.5l1-1.5m-3.75 0h3.75m-3.75 0l1-1.5m-1 1.5l1-1.5M6 16.5v3M6 19.5v-3m0 0l-1-1.5m1 1.5l1-1.5m-1-1.5h1.5m-1.5 0h-1.5m12 0v3m0-3v3m0 0l-1-1.5m1 1.5l1-1.5m-1-1.5h1.5m-1.5 0h-1.5" />
  </svg>
);

export const StreakIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
  </svg>
);