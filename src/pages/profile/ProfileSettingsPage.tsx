import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import {
  Settings,
  User,
  Sliders,
  Check,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  LogOut
} from 'lucide-react';

interface ProfileSettingsPageProps {
  onNavigate: (route: string) => void;
}

export const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = ({ onNavigate }) => {
  const { username, handle, bio, avatar, settings, updateSettings, resetProgress, logout } = usePlayer();

  const [displayName, setDisplayName] = useState(username);
  const [userHandle, setUserHandle] = useState(handle);
  const [userBio, setUserBio] = useState(bio);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const [editorFontSize, setEditorFontSize] = useState(settings.editorFontSize);
  const [editorTabSize, setEditorTabSize] = useState(settings.editorTabSize);
  const [autoRunTests, setAutoRunTests] = useState(settings.autoRunTests);
  const [savedToast, setSavedToast] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const avatarsList = ['🧑‍💻', '🧙‍♂️', '🥷', '🐍', '🤖', '👑', '⚡', '🐉', '⚔️', '🌟'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      displayName,
      handle: userHandle,
      bio: userBio,
      avatarId: selectedAvatar,
      editorFontSize,
      editorTabSize,
      autoRunTests
    });

    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-16 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <button onClick={() => onNavigate('/profile')} className="hover:text-white">
              Profile
            </button>
            <span>/</span>
            <span className="text-sky-400">Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-slate-400" />
            Profile &amp; Sandbox Settings
          </h1>
        </div>

        <button
          onClick={() => onNavigate('/profile')}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-xl space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <User className="w-4 h-4 text-sky-400" />
            <span>Gladiator Identity</span>
          </h2>

          {/* Avatar Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Select Player Avatar:
            </label>
            <div className="flex flex-wrap gap-2">
              {avatarsList.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-12 h-12 rounded-2xl border text-2xl flex items-center justify-center transition-all ${
                    selectedAvatar === av
                      ? 'border-[#ffd43b] bg-amber-500/20 scale-105 shadow-md shadow-amber-500/20'
                      : 'border-slate-800 bg-[#090d16] hover:border-slate-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#4b8bbe]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Handle</label>
              <input
                type="text"
                value={userHandle}
                onChange={(e) => setUserHandle(e.target.value)}
                className="w-full p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#4b8bbe]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Biography / Motto</label>
            <textarea
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
              className="w-full p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-slate-200 resize-none h-20 focus:outline-none focus:border-[#4b8bbe]"
            />
          </div>
        </div>

        {/* Editor Preferences */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0d121f] shadow-xl space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#ffd43b]" />
            <span>Python Code Sandbox Preferences</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Font Size</label>
              <select
                value={editorFontSize}
                onChange={(e) => setEditorFontSize(Number(e.target.value))}
                className="w-full p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value={12}>12px (Compact)</option>
                <option value={14}>14px (Standard)</option>
                <option value={16}>16px (Comfortable)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Tab Indentation</label>
              <select
                value={editorTabSize}
                onChange={(e) => setEditorTabSize(Number(e.target.value))}
                className="w-full p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces (PEP 8 Standard)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#090d16] border border-slate-800 text-xs">
            <div>
              <p className="font-bold text-white">Auto-evaluate on submit</p>
              <p className="text-[11px] text-slate-400">Run through all test cases immediately upon click.</p>
            </div>
            <input
              type="checkbox"
              checked={autoRunTests}
              onChange={(e) => setAutoRunTests(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700"
            />
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="px-4 py-2.5 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800 text-amber-300 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch Gladiator</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Level 1</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {savedToast && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-rose-800 bg-[#0d121f] p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-white">Reset Progress to Level 1?</h3>
            <p className="text-xs text-slate-300">
              This will clear all crucible records, reset your gladiator strictly to Level 1 (0 XP), and restore default initial settings.
            </p>

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                  onNavigate('/login');
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition-colors"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
