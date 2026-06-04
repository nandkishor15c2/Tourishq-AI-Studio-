const fs = require('fs');
const path = require('path');

const APP_TSX_PATH = path.join(__dirname, '../../src/App.tsx');
const PAGES_DIR = path.join(__dirname, '../../src/pages');

let appContent = fs.readFileSync(APP_TSX_PATH, 'utf-8');

// Helper to extract a block based on start and end markers
function extractBlock(content, startMarker, endMarkerRegex) {
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return { block: null, newContent: content };
  
  const tail = content.slice(startIndex);
  const match = tail.match(endMarkerRegex);
  if (!match) return { block: null, newContent: content };
  
  const block = tail.slice(0, match.index);
  const newContent = content.slice(0, startIndex) + content.slice(startIndex + match.index);
  
  return { block, newContent };
}

// 1. Extract View 1
const view1Start = '{/* VIEW 1: IMMERSIVE HOME */}';
const view1Res = extractBlock(appContent, view1Start, /\n\s*{\/\* VIEW 2/);
if (view1Res.block) {
  const code = `import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Star, PlayCircle, ArrowRight, CheckCircle2, Navigation, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HomePage = ({ currentTheme, navigate, activeTab, getActiveTabColor, destinations }: any) => {
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcNights, setCalcNights] = useState(5);
  const [calcExtraHeli, setCalcExtraHeli] = useState(false);
  const [checkedPackingItems, setCheckedPackingItems] = useState<Record<string, boolean>>({});

  return (
    <>
${view1Res.block}
    </>
  );
};`;
  fs.writeFileSync(path.join(PAGES_DIR, 'HomePage.tsx'), code);
  appContent = view1Res.newContent.replace(view1Start, '{/* VIEW 1: IMMERSIVE HOME */}\n        {activeTab === \'home\' && <HomePage currentTheme={currentTheme} navigate={navigate} activeTab={activeTab} getActiveTabColor={getActiveTabColor} destinations={destinations} />}');
}

// Write back to App.tsx
fs.writeFileSync(APP_TSX_PATH, appContent);
console.log('Successfully extracted HomePage.tsx and updated App.tsx');
