
import React from 'react';
import Hero from '../components/Hero';
import Storefront from '../components/Storefront';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ onAddToCart, products }) => {
  return (
    <>
      <Hero />
      <Storefront onAddToCart={onAddToCart} products={products} />
      
      {/* Why Us Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-3xl font-bold text-[#4A4A4A]">Por que escolher a EDUC?</h3>
            <p className="text-gray-500 font-medium">Diferenciais que encantam professores e alunos.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🎨", title: "Design Exclusivo", desc: "Materiais visualmente atraentes que prendem a atenção da criança.", color: "bg-[#E0D7FF]" },
              { icon: "📄", title: "Pronto para Imprimir", desc: "PDFs de alta qualidade otimizados para qualquer impressora.", color: "bg-[#FFD1DC]" },
              { icon: "🤝", title: "Apoio Pedagógico", desc: "Atividades alinhadas à BNCC e revisadas por especialistas.", color: "bg-[#FFD688]" }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-[40px] bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-[#E0D7FF] group">
                <div className={`w-16 h-16 rounded-3xl ${item.color} flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-[#4A4A4A] mb-3">{item.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
