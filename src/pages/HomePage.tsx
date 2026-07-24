import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { CoursesSection } from '../components/home/CoursesSection';
import { SuccessStories } from '../components/home/SuccessStories';
import { AnnouncementsWidget } from '../components/home/AnnouncementsWidget';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { QuickContactMap } from '../components/home/QuickContactMap';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <WhyChooseUs />
      <CoursesSection />
      <SuccessStories />
      <AnnouncementsWidget />
      <GalleryPreview />
      <QuickContactMap />
    </div>
  );
};
