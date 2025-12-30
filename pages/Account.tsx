
import React from 'react';

const Account: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-6 bg-[#F8F7FF]">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-[40px] p-8 shadow-xl border border-white flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-[#E0D7FF] border-4 border-[#9C89FF] overflow-hidden shadow-lg">
             <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" 
                alt="Foto do Professor" 
                className="w-full h-full object-cover"
              />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-[#4A4A4A]">Olá, Prof. Maria Silva! ✨</h2>
            <p className="text-gray-500 font-medium">Bem-vinda de volta ao seu painel criativo.</p>
          </div>
          <button className="px-6 py-2 rounded-full border-2 border-[#FFD1DC] text-[#FF95B2] font-bold text-sm hover:bg-[#FF95B2] hover:text-white transition-all">
            Editar Perfil
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Meus Materiais */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-black text-[#4A4A4A] flex items-center gap-2">
              <span className="text-2xl">📥</span> Meus Materiais
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-[32px] p-5 shadow-sm hover:shadow-md transition-all border border-gray-50 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F3F0FF] flex items-center justify-center text-xl group-hover:bg-[#9C89FF] group-hover:text-white transition-colors">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#4A4A4A] text-sm truncate">Material Pedagógico Vol. {i}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Comprado em: 10/02/2024</p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-[#E0D7FF] text-[#9C89FF] rounded-xl font-bold text-xs bubble-button">
                    Baixar Agora
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Histórico e Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-6 shadow-lg">
              <h4 className="font-black text-[#4A4A4A] mb-4 flex items-center gap-2 text-sm">
                <span className="text-lg">📜</span> Pedidos Recentes
              </h4>
              <div className="space-y-4">
                {[
                  { id: '#4582', date: '10 Fev', total: 'R$ 19,90' },
                  { id: '#4321', date: '02 Jan', total: 'R$ 45,00' }
                ].map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-bold border-b border-gray-50 pb-3">
                    <span className="text-[#9C89FF]">{order.id}</span>
                    <span className="text-gray-400">{order.date}</span>
                    <span className="text-[#4A4A4A]">{order.total}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FF95B2] to-[#FFD1DC] rounded-[40px] p-6 text-white text-center shadow-lg shadow-pink-100">
              <p className="text-sm font-black mb-2 uppercase tracking-widest">Apoio Exclusivo</p>
              <p className="text-xs font-medium mb-4">Dúvidas sobre os materiais ou precisa de ajuda?</p>
              <button className="w-full py-3 bg-white text-[#FF95B2] rounded-2xl font-black text-sm bubble-button">
                Chamar no Zap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
