
import React from 'react';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('produtos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Usando o subdomínio 'lh3.googleusercontent.com' que é o CDN oficial do Google.
   * Este formato é muito mais confiável para exibir imagens do Drive sem bloqueios de segurança.
   */
  const avatarUrl = "https://lh3.googleusercontent.com/d/1XbOyIiZKOStTs_tLibLGbl3TtQCA-q_c";

  return (
    <section className="relative overflow-hidden bg-[#F8F7FF] pt-12 pb-20 px-6">
      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#E0D7FF] rounded-full blur-3xl opacity-50" />
      <div className="absolute top-40 -right-20 w-80 h-80 bg-[#FFD1DC] rounded-full blur-3xl opacity-30" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Left Side: Text Content */}
        <div className="space-y-8 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#E0D7FF] text-[#9C89FF] font-bold text-xs uppercase tracking-widest animate-bounce">
            Educação com Amor
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-extrabold text-[#4A4A4A] leading-[1.1]">
            Recursos Pedagógicos que <br />
            <span className="text-[#9C89FF]">Transformam</span> o Ensino
          </h2>
          
          <p className="text-lg text-gray-500 max-w-lg font-medium leading-relaxed">
            Potencialize suas aulas com materiais digitais criativos, lúdicos e prontos para aplicar. O futuro da educação começa aqui.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={scrollToProducts}
              className="bubble-button w-full sm:w-auto px-8 py-4 bg-[#9C89FF] text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Explorar Materiais
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="bubble-button w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#E0D7FF] text-[#9C89FF] rounded-full font-bold text-lg">
              Material Grátis
            </button>
          </div>
          
          {/* Trust badges */}
          <div className="flex items-center gap-4 justify-center md:justify-start pt-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i + 20}/40/40`} className="w-10 h-10 rounded-full border-2 border-white" alt="Teacher user" />
              ))}
            </div>
            <p className="text-sm font-medium text-gray-400">
              <span className="text-[#9C89FF] font-bold">+5.000</span> professores já usam
            </p>
          </div>
        </div>

        {/* Right Side: Avatar 3D Showcase */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-[450px] bg-gradient-to-br from-[#E0D7FF] to-[#FFD1DC] rounded-[60px] shadow-2xl overflow-hidden group border-8 border-white flex items-center justify-center">
            <img 
              src={avatarUrl} 
              alt="Avatar Oficial EDUC"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=EDUC";
              }}
            />
            {/* Overlay sutil para profundidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
