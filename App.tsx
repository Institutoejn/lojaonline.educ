
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Account from './pages/Account';
import AdminDashboard from './components/AdminDashboard';
import { ICONS } from './constants';
import { Product, AppView, Category, Grade } from './types';

const App: React.FC = () => {
  // Estado de Navegação
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  // Estado Central de Produtos (Fonte da verdade para Admin e Vitrine)
  const [products, setProducts] = useState<Product[]>([
    { 
      id: '1', 
      title: 'Alfabetização Divertida Vol. 1', 
      price: 19.90, 
      category: Category.ALFABETIZACAO, 
      grade: Grade.FUNDAMENTAL_1,
      image: 'https://picsum.photos/seed/p1/400/300',
      description: 'Material focado em vogais e primeiras sílabas para reforço escolar e engajamento.'
    },
    { 
      id: '2', 
      title: 'Matemática com Jogos', 
      price: 25.00, 
      category: Category.MATEMATICA_LUDICA, 
      grade: Grade.FUNDAMENTAL_1,
      image: 'https://picsum.photos/seed/p2/400/300',
      description: 'Jogos de tabuleiro para imprimir e aprender somas de forma lúdica.'
    },
    { 
      id: '3', 
      title: 'Sequência Didática: Animais', 
      price: 0.00, 
      category: Category.SEQUENCIA_DIDATICA, 
      grade: Grade.INFANTIL,
      image: 'https://picsum.photos/seed/p3/400/300',
      description: 'Explorando o reino animal com os pequenos através de atividades integradas.'
    },
  ]);

  // Efeito simples para simular rota /admin
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setCurrentView('admin');
    }
  }, []);

  // Estado do Carrinho
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setCurrentView('cart');
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCurrentView('home');
  };

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.me/5500000000000', '_blank');
  };

  // Se estiver no admin, renderizamos o painel sem o header/footer padrão
  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        products={products} 
        onUpdateProducts={setProducts} 
        onExit={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-quicksand">
      <Header 
        cartCount={cartItems.length} 
        onNavigate={setCurrentView} 
      />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <Home onAddToCart={handleAddToCart} products={products} />
        )}
        
        {currentView === 'cart' && (
          <Cart 
            items={cartItems} 
            onRemove={handleRemoveFromCart} 
            onBack={() => setCurrentView('home')}
            onSuccess={handleClearCart}
          />
        )}

        {currentView === 'account' && (
          <Account />
        )}
      </main>

      <Footer />

      {/* WhatsApp Float Button */}
      <button 
        onClick={handleWhatsAppRedirect}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center z-[100] bubble-button group overflow-hidden"
      >
        <ICONS.WhatsApp />
        <span className="absolute right-full mr-4 bg-white text-[#4A4A4A] px-4 py-2 rounded-2xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Falar no WhatsApp
        </span>
      </button>

      {/* Admin Mode Toggle */}
      <button 
        onClick={() => setCurrentView('admin')}
        className="fixed bottom-4 left-4 opacity-10 hover:opacity-100 text-[8px] text-gray-300 font-bold uppercase transition-all"
      >
        Admin Mode
      </button>
    </div>
  );
};

export default App;
