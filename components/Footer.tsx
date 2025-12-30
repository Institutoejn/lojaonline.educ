
import React from 'react';

const Footer: React.FC = () => {
  const avatarUrl = "https://lh3.googleusercontent.com/d/1XbOyIiZKOStTs_tLibLGbl3TtQCA-q_c";

  return (
    <footer className="bg-[#F3F0FF] pt-20 pb-10 px-6 rounded-t-[60px]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-[#E0D7FF] pb-16">
        {/* Branding */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#9D7BFF] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              E
            </div>
            <h1 className="text-xl font-bold text-[#4A4A4A]">EDUC</h1>
          </div>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            A EDUC nasceu do desejo de tornar o aprendizado mais leve, colorido e eficaz. Juntos, escrevemos o futuro da educação.
          </p>
          <div className="flex gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#9D7BFF] cursor-pointer shadow-sm transition-colors">
                <div className="w-4 h-4 bg-current rounded-sm"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-[#4A4A4A] mb-6">Explore</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-500">
            <li className="hover:text-[#9D7BFF] cursor-pointer transition-colors">Novidades</li>
            <li className="hover:text-[#9D7BFF] cursor-pointer transition-colors">Mais Vendidos</li>
            <li className="hover:text-[#9D7BFF] cursor-pointer transition-colors">Combos Promocionais</li>
            <li className="hover:text-[#9D7BFF] cursor-pointer transition-colors">Grátis para Você</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#4A4A4A] mb-6">Suporte</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-500">
            <li className="hover:text-[#9D7BFF] cursor-pointer transition-colors">Como Comprar</li>
            <li className="hover:text-[#9D7BFF] cursor-pointer transition-colors">Perguntas Frequentes</li>
            <li className="hover:text-[#9D7BFF] cursor-pointer transition-colors">Termos de Uso</li>
            <li className="hover:text-[#9D7BFF] cursor-pointer transition-colors">Fale Conosco</li>
          </ul>
        </div>

        {/* Owner Avatar Section */}
        <div className="bg-white/50 backdrop-blur rounded-[40px] p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#FFD1DC] border-4 border-white overflow-hidden shadow-sm">
            <img 
              src={avatarUrl} 
              alt="Pollyana - Fundadora da EDUC" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pollyana";
              }}
            />
          </div>
          <div>
            <h5 className="font-bold text-[#4A4A4A]">Olá, eu sou a Pollyana</h5>
            <p className="text-xs text-gray-400 font-medium">Fundadora da EDUC</p>
          </div>
          <p className="text-[10px] text-gray-500">"Educar é tocar a alma e plantar sementes de futuro."</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
        <p>© 2024 EDUC - Escrevendo o Futuro. Todos os direitos reservados.</p>
        <p>Feito com ❤️ para educadores extraordinários</p>
      </div>
    </footer>
  );
};

export default Footer;
