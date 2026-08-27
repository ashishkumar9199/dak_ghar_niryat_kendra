/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { AIAssistant } from './components/AIAssistant';
import { ShipmentWizard } from './components/ShipmentWizard';
import { TariffCalculator } from './components/TariffCalculator';
import { ProhibitedChecker } from './components/ProhibitedChecker';
import { DGNKLocator } from './components/DGNKLocator';
import { ShipmentTracker } from './components/ShipmentTracker';
import { KnowledgeHub } from './components/KnowledgeHub';
import { RagInspectorModal } from './components/RagInspectorModal';
import { ExporterProfileModal } from './components/ExporterProfileModal';
import { WalletModal } from './components/WalletModal';
import { BulkUploadModal } from './components/BulkUploadModal';
import { AuthModal } from './components/AuthModal';
import { DnkLogo } from './components/DnkLogo';
import { ExporterProfile, SupportedLanguage } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { convertUserToExporterProfile } from './services/authService';
import { ShieldCheck, Heart, ExternalLink, Globe, Phone, Mail, Building } from 'lucide-react';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [language, setLanguage] = useState<SupportedLanguage>('EN');
  const [isRagInspectorOpen, setIsRagInspectorOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState<boolean>(false);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string>('');
  const [trackerInitialArticleId, setTrackerInitialArticleId] = useState<string>('EE928410294IN');

  const { 
    currentUser, 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab,
    updateUserWallet,
    updateUserProfile
  } = useAuth();

  const [profile, setProfile] = useState<ExporterProfile>({
    businessName: 'Varanasi Silk & Handicrafts Guild',
    contactPerson: 'Devendra Sharma',
    email: 'exports@varanasihandicrafts.org',
    phone: '+91 98390 12845',
    businessCategory: 'Handicrafts & Artifacts',
    hasIEC: true,
    iecCode: '0518029481',
    hasGST: true,
    gstin: '09AAAFV1284M1ZV',
    hasLUT: true,
    lutNumber: 'AD0903250084712',
    adCode: '02819405820194',
    preferredDGNK: 'Varanasi Cantt HPO DGNK (221002)',
    walletBalance: 18450
  });

  // Sync profile when auth user changes
  useEffect(() => {
    if (currentUser) {
      setProfile(convertUserToExporterProfile(currentUser));
    }
  }, [currentUser]);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAI = (promptText: string) => {
    setAssistantInitialQuery(promptText);
    setCurrentTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShipmentCreated = (createdShipment: any) => {
    if (createdShipment?.articleId) {
      setTrackerInitialArticleId(createdShipment.articleId);
    }
  };

  const handleBulkProcessed = (count: number) => {
    alert(`Successfully imported batch of ${count} export consignments. Ready for PBE generation!`);
    setCurrentTab('wizard');
  };

  const handleProfileSave = (newProf: ExporterProfile) => {
    setProfile(newProf);
    updateUserProfile(newProf);
  };

  const handleBalanceUpdate = (newBal: number) => {
    setProfile(p => ({ ...p, walletBalance: newBal }));
    updateUserWallet(newBal);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-800 flex flex-col font-sans selection:bg-[#FFC107] selection:text-[#D42426]">
      
      {/* Official India Post DGNK Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        language={language}
        setLanguage={setLanguage}
        onToggleLanguage={() => setLanguage(l => l === 'EN' ? 'HI' : 'EN')}
        onOpenRagInspector={() => setIsRagInspectorOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenWallet={() => setIsWalletModalOpen(true)}
        onOpenBulkUpload={() => setIsBulkUploadModalOpen(true)}
        profile={profile}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16">
        {currentTab === 'dashboard' && (
          <DashboardOverview
            profile={profile}
            language={language}
            onNavigate={handleNavigate}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenRagInspector={() => setIsRagInspectorOpen(true)}
          />
        )}

        {currentTab === 'assistant' && (
          <AIAssistant
            profile={profile}
            language={language}
            onOpenRagInspector={() => setIsRagInspectorOpen(true)}
            onNavigateToWizard={() => handleNavigate('wizard')}
          />
        )}

        {currentTab === 'wizard' && (
          <ShipmentWizard
            profile={profile}
            language={language}
            onShipmentCreated={handleShipmentCreated}
            onAskAI={handleAskAI}
          />
        )}

        {currentTab === 'calculator' && (
          <TariffCalculator
            language={language}
            onBookService={() => handleNavigate('wizard')}
          />
        )}

        {currentTab === 'prohibited' && (
          <ProhibitedChecker
            language={language}
            onAskAI={handleAskAI}
          />
        )}

        {currentTab === 'locator' && (
          <DGNKLocator
            language={language}
            onSelectCenter={(c) => {
              const updated = { ...profile, preferredDGNK: `${c.name} (${c.pincode})` };
              setProfile(updated);
              updateUserProfile(updated);
              alert(`Selected "${c.name} (${c.pincode})" as your default DGNK booking counter.`);
            }}
          />
        )}

        {currentTab === 'tracker' && (
          <ShipmentTracker
            initialArticleId={trackerInitialArticleId}
            language={language}
          />
        )}

        {currentTab === 'knowledge' && (
          <KnowledgeHub
            language={language}
            onOpenRagInspector={() => setIsRagInspectorOpen(true)}
            onAskAI={handleAskAI}
          />
        )}
      </main>

      {/* RAG Architecture Inspector Modal */}
      <RagInspectorModal
        isOpen={isRagInspectorOpen}
        onClose={() => setIsRagInspectorOpen(false)}
      />

      {/* Exporter Profile Settings Modal */}
      <ExporterProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleProfileSave}
      />

      {/* Exporter Prepaid Franking Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        profile={profile}
        language={language}
        onUpdateBalance={handleBalanceUpdate}
      />

      {/* Batch Consignment Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkUploadModalOpen}
        onClose={() => setIsBulkUploadModalOpen(false)}
        language={language}
        profile={profile}
        onBulkProcessed={handleBulkProcessed}
      />

      {/* Exporter Authentication Modal (Login / Register / Recover) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        language={language}
        initialTab={authModalTab}
      />

      {/* Footer from Vibrant Palette theme */}
      <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 text-[11px] flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <DnkLogo variant="badge" size="sm" />
              <div className="flex flex-wrap items-center gap-2 uppercase font-bold tracking-widest text-[10px]">
                <span className="text-white">© {new Date().getFullYear()} DAK GHAR NIRYAT KENDRA (DNK) • INDIA POST</span>
                <span className="text-gray-600">|</span>
                <span>MSME EXPORT HELPLINE: 1800-266-6868</span>
              </div>
            </div>

            <div className="flex items-center gap-6 uppercase font-bold tracking-widest text-[10px]">
              <button onClick={() => handleNavigate('knowledge')} className="hover:text-[#FFC107] transition-colors cursor-pointer">
                CBIC Circulars
              </button>
              <button onClick={() => handleNavigate('knowledge')} className="hover:text-[#FFC107] transition-colors cursor-pointer">
                DGFT FTP 2023
              </button>
              <button onClick={() => setIsRagInspectorOpen(true)} className="text-[#FFC107] hover:underline transition-colors cursor-pointer">
                RAG Pipeline
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

