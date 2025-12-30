
import React, { useState } from 'react';
import { Product } from '../types';

interface CartProps {
  items: Product[];
  onRemove: (id: string) => void;
  onBack: () => void;
  onSuccess: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onBack, onSuccess }) => {
  const [step, setStep] = useState<'cart' | 'pix'>('cart');
  const [copied, setCopied] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    setStep('pix');
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913EDUC EDUCATIVO6008SAO PAULO62070503***6304E2CA");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'pix') {
    return (
      <div className="min-h-[80vh] py-12 px-6 flex items-center justify-center animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-[40px] p-8 shadow-2xl border border-[#E0D7FF] relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#9C89FF] via-[#FF95B2] to-[#FFD688]"></div>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#F3F0FF] text-[#25D366] text-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              💠
            </div>
            <h2 className="text-2xl font-black text-[#4A4A4A]">Pagamento via Pix</h2>
            <p className="text-sm text-gray-500 font-medium mt-2">Escaneie o QR Code ou copie o código abaixo para liberar seu material instantaneamente.</p>
          </div>

          <div className="bg-[#F8F7FF] rounded-3xl p-6 mb-6 flex flex-col items-center border border-dashed border-[#9C89FF]">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913EDUC EDUCATIVO6008SAO PAULO62070503***6304E2CA&color=4A4A4A`} 
              alt="QR Code Pix" 
              className="w-48 h-48 rounded-xl mix-blend-multiply mb-4"
            />
            <p className="font-black text-2xl text-[#9C89FF]">R$ {total.toFixed(2).replace('.', ',')}</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleCopyPix}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${copied ? 'bg-[#25D366] text-white' : 'bg-white border-2 border-[#E0D7FF] text-[#9C89FF] hover:bg-[#F3F0FF]'}`}
            >
              {copied ? (
                <>✨ Código Copiado!</>
              ) : (
                <>📋 Copiar Código Pix</>
              )}
            </button>

            <button 
              onClick={onSuccess}
              className="w-full py-4 bg-[#9C89FF] text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 bubble-button"
            >
              Já fiz o pagamento
            </button>
            
            <button 
              onClick={() => setStep('cart')}
              className="w-full py-2 text-gray-400 font-bold text-xs hover:text-[#FF95B2] transition-colors"
            >
              Voltar para o carrinho
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Cart View
  return (
    <div className="min-h-[80vh] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-[#9C89FF] font-bold text-sm transition-colors">
          ← Continuar Comprando
        </button>

        <h2 className="text-3xl font-extrabold text-[#4A4A4A] mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-[#FF95B2] flex items-center justify-center text-white text-xl shadow-lg">🛒</span>
          Meu Carrinho
        </h2>

        {items.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bg-white rounded-[30px] p-4 flex items-center gap-4 shadow-sm border border-gray-50 hover:shadow-md transition-all">
                  <img src={item.image} alt={item.title} className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-[#4A4A4A] text-sm leading-tight mb-1">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.category}</p>
                    <p className="text-[#9C89FF] font-black mt-1">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-gray-300 hover:text-[#FF95B2] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#E0D7FF] h-fit sticky top-24">
              <h3 className="font-bold text-[#4A4A4A] mb-6 border-b pb-4 border-gray-100">Resumo do Pedido</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Itens ({items.length})</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-[#4A4A4A] pt-4 border-t border-gray-50">
                  <span>Total</span>
                  <span className="text-[#9C89FF]">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="bubble-button w-full py-4 bg-[#FF95B2] text-white rounded-full font-black text-lg shadow-xl shadow-pink-100 flex items-center justify-center gap-2"
              >
                Finalizar Compra →
              </button>
              <p className="text-center mt-4 text-[10px] text-gray-400 font-medium">
                🔒 Pagamento 100% Seguro via Pix
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[50px] p-12 text-center shadow-xl border border-dashed border-[#E0D7FF] flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-[#F3F0FF] mb-6 flex items-center justify-center text-4xl">
               🛒
            </div>
            <h3 className="text-2xl font-black text-[#4A4A4A] mb-2">Opa! Seu carrinho está vazio.</h3>
            <p className="text-gray-500 font-medium mb-8">Vamos enchê-lo de aprendizagem e diversão?</p>
            <button onClick={onBack} className="bubble-button px-8 py-4 bg-[#9C89FF] text-white rounded-full font-bold shadow-lg">
              Ver Materiais Incríveis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
