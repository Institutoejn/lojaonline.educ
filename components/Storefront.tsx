
import React, { useState } from 'react';
import { Category, Grade, Product } from '../types';
import { ICONS } from '../constants';

interface StorefrontProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

const Storefront: React.FC<StorefrontProps> = ({ onAddToCart, products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const categories = ['Todos', ...Object.values(Category)];
  const grades = Object.values(Grade);

  const displayedProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="produtos" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24">
      {/* Detalhes Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#4A4A4A]/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden relative animate-scale-up">
            <button 
              onClick={() => setViewingProduct(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#FF95B2] hover:text-white transition-all z-10"
            >
              ✕
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 aspect-square bg-gray-100">
                <img src={viewingProduct.image} alt={viewingProduct.title} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="px-3 py-1 bg-[#E0D7FF] text-[#9C89FF] rounded-full text-[10px] font-black uppercase tracking-widest">
                      {viewingProduct.category}
                    </span>
                    <h3 className="text-2xl font-black text-[#4A4A4A] mt-2 leading-tight">
                      {viewingProduct.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {viewingProduct.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#4A4A4A] flex items-center gap-2">
                      ✅ Arquivo Digital em PDF
                    </p>
                    <p className="text-xs font-bold text-[#4A4A4A] flex items-center gap-2">
                      ✅ Download Instantâneo
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-2xl font-black text-[#9C89FF]">
                    {viewingProduct.price === 0 ? 'Grátis' : `R$ ${viewingProduct.price.toFixed(2).replace('.', ',')}`}
                  </div>
                  <button 
                    onClick={() => {
                      onAddToCart(viewingProduct);
                      setViewingProduct(null);
                    }}
                    className="px-6 py-3 bg-[#FF95B2] text-white rounded-2xl font-black text-sm shadow-lg shadow-pink-100 bubble-button"
                  >
                    Comprar Agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-[#4A4A4A]">Nossos Produtos</h3>
          <p className="text-gray-500 font-medium">Encontre o material perfeito para sua turma.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {grades.map(grade => (
            <button 
              key={grade}
              className="px-4 py-2 rounded-full border-2 border-[#E0D7FF] text-sm font-bold text-[#9D7BFF] hover:bg-[#9D7BFF] hover:text-white transition-all"
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-6 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
              selectedCategory === cat 
              ? 'bg-[#9D7BFF] text-white scale-105' 
              : 'bg-white text-gray-500 border border-gray-100 hover:border-[#E0D7FF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedProducts.map(product => (
            <div 
              key={product.id} 
              className="group bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all border border-gray-50 flex flex-col"
            >
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4 cursor-pointer"
                onClick={() => setViewingProduct(product)}
              >
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Product thumbnail" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-[#9D7BFF] shadow-sm uppercase">
                  PDF Digital
                </div>
              </div>
              
              <div className="space-y-1 mb-6 flex-grow">
                <p className="text-[10px] font-bold text-[#FF85A1] uppercase tracking-wider">{product.category}</p>
                <h4 className="font-bold text-[#4A4A4A] line-clamp-2 leading-snug">{product.title}</h4>
                <p className="text-[11px] text-gray-400 font-medium italic">BNCC & Atividades Lúdicas</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {product.price > 0 && <span className="text-[10px] text-gray-400 line-through">R$ {(product.price + 10).toFixed(2).replace('.', ',')}</span>}
                  <span className="text-xl font-extrabold text-[#4A4A4A]">
                    {product.price === 0 ? 'Grátis' : `R$ ${product.price.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewingProduct(product)}
                    className="px-3 py-2 rounded-xl bg-[#F3F0FF] text-[#9C89FF] text-[10px] font-black uppercase tracking-wider bubble-button border border-[#E0D7FF]"
                    title="Ver detalhes"
                  >
                    Detalhes
                  </button>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-10 h-10 rounded-full bg-[#9D7BFF] text-white flex items-center justify-center shadow-lg shadow-indigo-100 bubble-button"
                    title="Adicionar ao carrinho"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        )}
        {displayedProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold italic">
            Ainda não temos materiais nesta categoria. Explore as outras! 🌸
          </div>
        )}
      </div>
      
      <div className="mt-16 text-center">
        <button className="px-10 py-4 bg-[#FFD1DC] text-[#FF85A1] rounded-full font-bold text-lg bubble-button shadow-xl shadow-pink-50">
          Ver Todos os Materiais
        </button>
      </div>
    </section>
  );
};

export default Storefront;
