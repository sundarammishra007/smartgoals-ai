import React, { useState } from 'react';

interface LandingPageProps {
  onSignIn: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignIn }) => {
  const [selectedFramework, setSelectedFramework] = useState('General');
  const [intensity, setIntensity] = useState('Intermediate');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">
       {/* Header */}
       <header className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
          <div className="text-2xl font-extrabold tracking-tight flex items-center cursor-pointer" onClick={() => window.location.reload()}>
            <span className="text-[#a855f7]">SMART</span><span className="ml-1">Goals</span>
          </div>
          <div className="flex items-center gap-8">
             <button onClick={onSignIn} className="text-gray-400 hover:text-white text-sm font-semibold transition-colors hidden sm:block">Create Path</button>
             <button onClick={onSignIn} className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]">
               Sign In
             </button>
          </div>
       </header>

       {/* Main Content */}
       <main className="flex flex-col items-center justify-center px-4 pt-8 pb-20 w-full max-w-6xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-12 relative w-full">
             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
             
             {/* Faded background text mimicking the image's top text */}
             <div className="absolute top-0 left-0 w-full overflow-hidden h-32 pointer-events-none opacity-20 hidden md:block">
                 <div className="text-[100px] font-black text-gray-800 leading-none whitespace-nowrap animate-marquee">
                    BUILD SCALABLE GOALS  •  STARTUP  •  CAREER  •  FINANCE  •  
                 </div>
             </div>

             <div className="relative mt-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">
                   Turn Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Action</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                   Select a strategic framework below to structure your goals and accelerate your path to success.
                </p>
             </div>
          </div>

          <div className="w-full max-w-5xl">
             <div className="text-center mb-8">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Select Strategic Framework</span>
             </div>
             
             {/* Framework Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                 <FrameworkCard 
                    label="Founder" sub="STARTUPS & SCALEUPS" 
                    selected={selectedFramework === 'Founder'} 
                    onClick={() => setSelectedFramework('Founder')} 
                 />
                 <FrameworkCard 
                    label="Business" sub="REVENUE & OPERATIONS" 
                    selected={selectedFramework === 'Business'} 
                    onClick={() => setSelectedFramework('Business')} 
                 />
                 <FrameworkCard 
                    label="Professional" sub="CAREER ADVANCEMENT" 
                    selected={selectedFramework === 'Professional'} 
                    onClick={() => setSelectedFramework('Professional')} 
                 />
                 <FrameworkCard 
                    label="UPSC CSE" sub="CIVIL SERVICES" 
                    selected={selectedFramework === 'UPSC CSE'} 
                    onClick={() => setSelectedFramework('UPSC CSE')} 
                 />
                 <FrameworkCard 
                    label="Banking" sub="PO/CLERK EXAMS" 
                    selected={selectedFramework === 'Banking'} 
                    onClick={() => setSelectedFramework('Banking')} 
                 />
                 <FrameworkCard 
                    label="MBA (CAT)" sub="MANAGEMENT ENTRANCE" 
                    selected={selectedFramework === 'MBA (CAT)'} 
                    onClick={() => setSelectedFramework('MBA (CAT)')} 
                 />
                 {/* General spans 2 cols on large screens to center/emphasize */}
                 <div className="sm:col-span-2 lg:col-span-2">
                    <FrameworkCard 
                        label="General" sub="CUSTOM SKILLS" 
                        selected={selectedFramework === 'General'} 
                        onClick={() => setSelectedFramework('General')} 
                        isPurple={true}
                    />
                 </div>
             </div>

             {/* Intensity Toggle */}
             <div className="text-center mb-6">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Knowledge / Intensity Level</span>
             </div>
             
             <div className="flex justify-center mb-12">
               <div className="inline-flex bg-[#0f0f0f] p-1.5 rounded-full border border-[#1f1f1f] shadow-2xl">
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <button
                      key={level}
                      onClick={() => setIntensity(level)}
                      className={`px-6 py-2 md:px-10 md:py-3 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                        intensity === level 
                          ? 'bg-white text-black shadow-lg transform scale-105' 
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
               </div>
             </div>
             
             {/* CTA */}
             <div className="text-center">
                 <button onClick={onSignIn} className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-[#1a1a1a] font-lg rounded-full hover:bg-[#252525] border border-[#333] hover:border-purple-500/50">
                    <span className="mr-2">Continue with {selectedFramework}</span>
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                 </button>
             </div>
          </div>
       </main>

       {/* Floating gradient orb in bottom right */}
       <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[150px] pointer-events-none"></div>
    </div>
  );
};

const FrameworkCard = ({ label, sub, selected, onClick, isPurple }: any) => (
  <button
    onClick={onClick}
    className={`
      relative p-6 rounded-[2rem] border text-center transition-all duration-300 flex flex-col items-center justify-center h-32 w-full group overflow-hidden
      ${selected 
        ? isPurple 
            ? 'bg-[#7c3aed] border-[#7c3aed] shadow-[0_0_50px_rgba(124,58,237,0.4)] z-10 scale-[1.02]' 
            : 'bg-[#1a1a1a] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] z-10 scale-[1.02]'
        : 'bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#333] hover:bg-[#111]'
      }
    `}
  >
    {/* Shine effect */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-white/5 to-transparent`}></div>
    
    <div className={`font-bold text-lg mb-1 relative z-10 ${selected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
        {label}
    </div>
    <div className={`text-[10px] font-bold tracking-widest uppercase relative z-10 ${selected ? (isPurple ? 'text-purple-200' : 'text-gray-300') : 'text-gray-700 group-hover:text-gray-500'}`}>
        {sub}
    </div>
  </button>
);

export default LandingPage;