
import React from 'react';
import { ICONS } from '../constants';

interface HeaderProps {
  cartCount: number;
  onNavigate: (view: 'home' | 'cart' | 'account') => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#9C89FF] flex items-center justify-center text-white font-bold text-2xl shadow-lg bubble-button">
            E
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-[#4A4A4A] leading-tight">
              EDUC
            </h1>
            <p className="text-[10px] text-[#9C89FF] font-semibold tracking-widest uppercase">
              Escrevendo o Futuro
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#9C89FF] transition-colors">
            <ICONS.Search />
          </div>
          <input
            type="text"
            placeholder="O que você quer ensinar hoje?"
            className="w-full bg-[#F3F0FF] border-2 border-transparent focus:border-[#9C89FF] focus:bg-white rounded-full py-2.5 pl-12 pr-4 outline-none transition-all placeholder:text-gray-400 text-sm font-medium"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={() => onNavigate('account')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#9C89FF] transition-colors group"
          >
            <div className="p-2 rounded-full bg-[#F3F0FF] group-hover:bg-[#E0D7FF]">
              <ICONS.User />
            </div>
            <span className="hidden lg:inline text-sm font-semibold">Minha Conta</span>
          </button>
          
          <button 
            onClick={() => onNavigate('cart')}
            className="relative flex items-center gap-2 text-gray-600 hover:text-[#9C89FF] transition-colors group"
          >
            <div className="p-2 rounded-full bg-[#F3F0FF] group-hover:bg-[#E0D7FF]">
              <ICONS.Cart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF95B2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden lg:inline text-sm font-semibold">Carrinho</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
