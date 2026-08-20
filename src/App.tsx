import React, { useState, useEffect } from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { DashboardLayout } from './components/common/DashboardLayout';

// Pages
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { LearningDashboard } from './pages/learning/LearningDashboard';
import { GuidedLessonPage } from './pages/learning/GuidedLessonPage';
import { PracticeLabPage } from './pages/learning/PracticeLabPage';
import { TopicTestsPage } from './pages/learning/TopicTestsPage';
import { MasteryPage } from './pages/learning/MasteryPage';

import { ArenaDashboard } from './pages/arena/ArenaDashboard';
import { SpeedRunPage } from './pages/arena/SpeedRunPage';
import { CodeBattlePage } from './pages/arena/CodeBattlePage';
import { BossBattlePage } from './pages/arena/BossBattlePage';
import { SurvivalModePage } from './pages/arena/SurvivalModePage';
import { CompetitionsPage } from './pages/arena/CompetitionsPage';
import { LeaderboardsPage } from './pages/arena/LeaderboardsPage';

import { PlayerProfilePage } from './pages/profile/PlayerProfilePage';
import { ProfileSettingsPage } from './pages/profile/ProfileSettingsPage';

export function AppContent() {
  const { isLoggedIn } = usePlayer();
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Landing Page has its own full-page hero layout (Member 1 Base)
  if (currentRoute === '/') {
    return <LandingPage onNavigate={navigate} />;
  }

  // Gladiator Login / Enrollment Gateway
  if (currentRoute === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  // If gladiator is not enrolled/logged in, require login before entering the Crucible
  if (!isLoggedIn) {
    return <LoginPage onNavigate={navigate} />;
  }

  // Route matching helper
  const renderRouteContent = () => {
    // 1. Learning Routes
    if (currentRoute === '/learning') {
      return <LearningDashboard onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/learning/lessons')) {
      const parts = currentRoute.split('/');
      const lessonId = parts[3]; // e.g. /learning/lessons/lesson-var-intro
      return <GuidedLessonPage lessonId={lessonId} onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/learning/practice')) {
      const parts = currentRoute.split('/');
      const problemId = parts[3]; // e.g. /learning/practice/prob-var-1
      return <PracticeLabPage initialProblemId={problemId} onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/learning/tests')) {
      const parts = currentRoute.split('/');
      const testId = parts[3]; // e.g. /learning/tests/test-variables
      return <TopicTestsPage initialTestId={testId} onNavigate={navigate} />;
    }

    if (currentRoute === '/learning/mastery') {
      return <MasteryPage onNavigate={navigate} />;
    }

    // 2. Arena Routes
    if (currentRoute === '/arena') {
      return <ArenaDashboard onNavigate={navigate} />;
    }

    if (currentRoute === '/arena/speed-run') {
      return <SpeedRunPage onNavigate={navigate} />;
    }

    if (currentRoute === '/arena/battles') {
      return <CodeBattlePage onNavigate={navigate} />;
    }

    if (currentRoute === '/arena/boss') {
      return <BossBattlePage onNavigate={navigate} />;
    }

    if (currentRoute === '/arena/survival') {
      return <SurvivalModePage onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/arena/competitions')) {
      const parts = currentRoute.split('/');
      const compId = parts[3];
      return <CompetitionsPage initialCompetitionId={compId} onNavigate={navigate} />;
    }

    if (currentRoute === '/arena/leaderboards') {
      return <LeaderboardsPage onNavigate={navigate} />;
    }

    // 3. Profile Routes
    if (currentRoute === '/profile') {
      return <PlayerProfilePage onNavigate={navigate} />;
    }

    if (currentRoute === '/profile/settings') {
      return <ProfileSettingsPage onNavigate={navigate} />;
    }

    // Fallback: default to learning overview
    return <LearningDashboard onNavigate={navigate} />;
  };

  return (
    <DashboardLayout currentRoute={currentRoute} onNavigate={navigate}>
      {renderRouteContent()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
}
