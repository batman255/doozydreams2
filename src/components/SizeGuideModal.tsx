import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Ruler, Sparkles, Check, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

const SIZE_CHART_INCHES = [
  { size: 'XS', us: '0–2', uk: '4–6', fr: '32–34', it: '36–38', bust: '31–32"', waist: '24–25"', hip: '34–35"' },
  { size: 'S', us: '4–6', uk: '8–10', fr: '36–38', it: '40–42', bust: '33–34"', waist: '26–27"', hip: '36–37"' },
  { size: 'M', us: '8–10', uk: '12–14', fr: '40–42', it: '44–46', bust: '35–36"', waist: '28–29"', hip: '38–39"' },
  { size: 'L', us: '12–14', uk: '16–18', fr: '44–46', it: '48–50', bust: '37–39"', waist: '30–32"', hip: '40–42"' },
  { size: 'XL', us: '16', uk: '20', fr: '48', it: '52', bust: '40–42"', waist: '33–35"', hip: '43–45"' },
];

const SIZE_CHART_CM = [
  { size: 'XS', us: '0–2', uk: '4–6', fr: '32–34', it: '36–38', bust: '78–82 cm', waist: '60–64 cm', hip: '86–90 cm' },
  { size: 'S', us: '4–6', uk: '8–10', fr: '36–38', it: '40–42', bust: '84–88 cm', waist: '66–70 cm', hip: '92–96 cm' },
  { size: 'M', us: '8–10', uk: '12–14', fr: '40–42', it: '44–46', bust: '90–94 cm', waist: '72–76 cm', hip: '98–102 cm' },
  { size: 'L', us: '12–14', uk: '16–18', fr: '44–46', it: '48–50', bust: '96–102 cm', waist: '78–84 cm', hip: '104–110 cm' },
  { size: 'XL', us: '16', uk: '20', fr: '48', it: '52', bust: '104–108 cm', waist: '86–90 cm', hip: '112–116 cm' },
];

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, setIsAIStylistOpen } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const chart = unit === 'inches' ? SIZE_CHART_INCHES : SIZE_CHART_CM;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-[#111111] border border-[#2B2B2B] rounded-lg shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-[#0B0B0B] border-b border-[#222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h2 className="font-serif text-2xl text-white">
                Haute Atelier Size & Measurement Guide
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Standard Parisian Haute Couture sizing matrix & international conversions
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-200">
          {/* Unit Switcher */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
              Measurement Standard:
            </span>
            <div className="flex border border-neutral-700 rounded bg-[#161616] p-0.5">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-mono uppercase rounded transition-colors ${
                  unit === 'inches' ? 'bg-[#C5A059] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Inches (IN)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-mono uppercase rounded transition-colors ${
                  unit === 'cm' ? 'bg-[#C5A059] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Centimeters (CM)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-neutral-800 rounded-lg">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#181818] text-[#C5A059] border-b border-neutral-800 uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Size</th>
                  <th className="p-3.5">US</th>
                  <th className="p-3.5">UK</th>
                  <th className="p-3.5">FR / EU</th>
                  <th className="p-3.5">IT</th>
                  <th className="p-3.5">Bust</th>
                  <th className="p-3.5">Waist</th>
                  <th className="p-3.5">Hip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {chart.map((row) => (
                  <tr key={row.size} className="hover:bg-[#1C180E] transition-colors">
                    <td className="p-3.5 font-bold text-white">{row.size}</td>
                    <td className="p-3.5 text-neutral-400">{row.us}</td>
                    <td className="p-3.5 text-neutral-400">{row.uk}</td>
                    <td className="p-3.5 text-[#E8D3A2]">{row.fr}</td>
                    <td className="p-3.5 text-neutral-400">{row.it}</td>
                    <td className="p-3.5 text-white font-medium">{row.bust}</td>
                    <td className="p-3.5 text-white font-medium">{row.waist}</td>
                    <td className="p-3.5 text-white font-medium">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measurement Advice */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-light text-neutral-300">
            <div className="p-4 bg-[#161616] rounded border border-neutral-800 space-y-1">
              <strong className="text-[#C5A059] block font-mono text-[11px] uppercase">1. Bust Circumference</strong>
              <p>Measure across the fullest part of your bust, keeping the tape parallel to the floor.</p>
            </div>
            <div className="p-4 bg-[#161616] rounded border border-neutral-800 space-y-1">
              <strong className="text-[#C5A059] block font-mono text-[11px] uppercase">2. Natural Waist</strong>
              <p>Measure the narrowest point of your torso, typically 1–2 inches above your navel.</p>
            </div>
            <div className="p-4 bg-[#161616] rounded border border-neutral-800 space-y-1">
              <strong className="text-[#C5A059] block font-mono text-[11px] uppercase">3. Low Hip Curve</strong>
              <p>Stand with feet together and measure around the fullest curve of your hips and seat.</p>
            </div>
          </div>

          {/* Bespoke Fit Callout */}
          <div className="p-4 bg-gradient-to-r from-[#1C170E] to-[#121212] border border-[#C5A059]/40 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h4 className="font-serif text-sm text-white">Need Bespoke Custom Tailoring?</h4>
                <p className="text-xs text-neutral-400 font-light">
                  Our master patternmakers can tailor any garment to your exact measurements.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSizeGuideOpen(false);
                setIsAIStylistOpen(true);
              }}
              className="px-4 py-2 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase rounded shrink-0 ml-4"
            >
              Consult Stylist
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
