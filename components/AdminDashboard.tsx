
import React, { useState, useMemo, useRef } from 'react';
import { Category, Grade, Product } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onUpdateProducts, onExit }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' ou 'produtos'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const stats = [
    { label: 'Ativos', value: products.length.toString(), icon: '📚', color: 'bg-[#E0D7FF]' },
    { label: 'Faturamento', value: 'R$ 2.450', icon: '💰', color: 'bg-[#FFD1DC]' },
    { label: 'Média', value: 'R$ 22,50', icon: '📈', color: 'bg-[#FFD688]' },
  ];

  const handleDelete = (id: string) => {
    if (window.confirm('Deseja mesmo remover este material da sua vitrine? 🌸')) {
      onUpdateProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setImagePreview(product.image);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData = {
      title: formData.get('title') as string,
      price: parseFloat(formData.get('price') as string) || 0,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      grade: Grade.FUNDAMENTAL_1,
      image: imagePreview || `https://picsum.photos/seed/${Date.now()}/400/300`,
    };

    if (editingProduct) {
      onUpdateProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      const newProduct: Product = { id: Date.now().toString(), ...productData };
      onUpdateProducts(prev => [newProduct, ...prev]);
    }
    setIsModalOpen(false);
  };

  const NavButtons = (isMobile: boolean = false) => (
    <>
      <button 
        onClick={() => {
          setActiveTab('dashboard');
          if (isMobile) setIsMobileMenuOpen(false);
        }}
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'dashboard' ? 'bg-[#9C89FF] text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
      >
        <span className="text-xl">📊</span> Dashboard
      </button>
      <button 
        onClick={() => {
          setActiveTab('produtos');
          if (isMobile) setIsMobileMenuOpen(false);
        }}
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'produtos' ? 'bg-[#9C89FF] text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
      >
        <span className="text-xl">🛍️</span> Materiais
      </button>
      {isMobile && (
        <button 
          onClick={onExit}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm text-gray-400 hover:bg-gray-50"
        >
          <span className="text-xl">🏠</span> Ver Loja
        </button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex flex-col lg:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-[#E0D7FF] flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-[#9C89FF] flex items-center justify-center text-white font-bold text-2xl shadow-lg">E</div>
          <h1 className="text-2xl font-black text-[#4A4A4A]">EDUC</h1>
        </div>
        <nav className="flex-1 space-y-4">
          {NavButtons()}
        </nav>
        <div className="mt-auto bg-[#F3F0FF] p-6 rounded-[32px] text-center">
          <p className="text-xs font-black text-[#9C89FF] uppercase tracking-wider">Gestora EDUC</p>
          <p className="text-[11px] text-gray-500 font-medium mt-2">"Transformando o futuro com carinho." 🌸</p>
        </div>
      </aside>

      {/* Header Mobile */}
      <header className="lg:hidden bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-[100] border-b border-[#E0D7FF] shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#9C89FF] flex items-center justify-center text-white font-bold">E</div>
          <span className="font-black text-[#4A4A4A] tracking-tight">EDUC ADMIN</span>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors"
        >
          <div className={`w-6 h-0.5 bg-[#9C89FF] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-[#9C89FF] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-[#9C89FF] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Menu Hambúrguer Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[90] transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-2xl p-8 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} rounded-l-[40px]`}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#9C89FF] flex items-center justify-center text-white font-bold">E</div>
            <h2 className="text-lg font-black text-[#4A4A4A]">Menu</h2>
          </div>
          <nav className="space-y-4">
            {NavButtons(true)}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-5 sm:p-10 lg:p-14 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#4A4A4A] leading-tight">
                {activeTab === 'dashboard' ? 'Performance Estratégica' : 'Gerenciar Vitrine'}
              </h2>
              <p className="text-gray-400 font-medium text-sm sm:text-base mt-1">Bem-vinda, Gestora! ✨</p>
            </div>
            {activeTab === 'produtos' && (
              <button 
                onClick={handleOpenAddModal}
                className="w-full sm:w-auto px-8 py-4 bg-[#FF95B2] text-white rounded-full font-black text-lg shadow-xl shadow-pink-100 bubble-button flex items-center justify-center gap-2"
              >
                <span>+</span> Novo Material
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className={`bg-white p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] shadow-sm border border-white flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${idx === 2 ? 'col-span-2 lg:col-span-1' : ''}`}>
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${stat.color} rounded-2xl flex items-center justify-center text-xl sm:text-3xl shadow-inner`}>
                  {stat.icon}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-black text-[#4A4A4A]">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {activeTab === 'dashboard' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
              <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-sm border border-white">
                <h4 className="text-xl sm:text-2xl font-black text-[#4A4A4A] mb-8">Relatório de Vendas</h4>
                <div className="space-y-6">
                  {[
                    { name: 'Alfabetização', percent: 45, color: 'bg-[#9C89FF]' },
                    { name: 'Matemática', percent: 30, color: 'bg-[#FFD688]' },
                    { name: 'Gratuitos', percent: 25, color: 'bg-[#FF95B2]' },
                  ].map((cat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-[#4A4A4A]">
                        <span>{cat.name}</span>
                        <span>{cat.percent}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#9C89FF] to-[#7C69E0] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                 <span className="text-4xl mb-4">💡</span>
                 <h4 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">Dica da Gestora</h4>
                 <p className="text-white/80 font-medium leading-relaxed sm:text-lg">
                   "Materiais com títulos lúdicos vendem 40% mais! Experimente usar emojis nos nomes."
                 </p>
                 <button onClick={onExit} className="mt-8 px-8 py-4 bg-white text-[#9C89FF] rounded-2xl font-black text-sm bubble-button w-fit">
                   Voltar para a Loja
                 </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[32px] sm:rounded-[40px] p-4 sm:p-8 shadow-sm border border-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h4 className="font-black text-[#4A4A4A] text-lg sm:text-xl">Materiais ({filteredProducts.length})</h4>
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:min-w-[280px] bg-[#F8F7FF] border-none rounded-2xl px-5 py-3 text-sm font-bold outline-none" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-[#F8F7FF] rounded-[24px] p-4 flex flex-col gap-4 border border-white shadow-sm group">
                    <img src={product.image} className="w-full h-32 rounded-2xl object-cover shadow-sm" alt="" />
                    <div className="flex-1">
                      <h5 className="font-black text-[#4A4A4A] text-sm truncate">{product.title}</h5>
                      <p className="text-[10px] font-black text-[#9C89FF] uppercase mt-0.5">{product.category}</p>
                      <p className="text-sm font-black text-[#4A4A4A] mt-2">
                        {product.price === 0 ? <span className="text-[#FF95B2]">Grátis</span> : `R$ ${product.price.toFixed(2).replace('.', ',')}`}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => handleOpenEditModal(product)}
                          className="flex-1 py-2 bg-[#FFD688] text-white rounded-xl font-bold text-xs"
                        >Editar</button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 py-2 bg-[#FFB3B3] text-white rounded-xl font-bold text-xs"
                        >Excluir</button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="col-span-full py-20 text-center text-gray-400 italic">Nenhum material encontrado. 🌸</div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal - Cadastro e Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl sm:text-2xl font-black text-[#4A4A4A]">
                  {editingProduct ? 'Editar Material' : 'Novo Material'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-[#FF95B2] text-2xl">✕</button>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Nome do Material</label>
                  <input name="title" defaultValue={editingProduct?.title || ''} required className="w-full bg-[#F8F7FF] rounded-[20px] px-6 py-4 outline-none font-bold text-[#4A4A4A] text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Preço (R$)</label>
                    <input name="price" type="number" step="0.01" defaultValue={editingProduct?.price || ''} required className="w-full bg-[#F8F7FF] rounded-[20px] px-6 py-4 outline-none font-bold text-[#4A4A4A] text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Categoria</label>
                    <select name="category" defaultValue={editingProduct?.category || Category.ALFABETIZACAO} className="w-full bg-[#F8F7FF] rounded-[20px] px-6 py-4 outline-none font-bold text-[#4A4A4A] text-sm appearance-none">
                      {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Capa do Material</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-40 bg-[#F8F7FF] rounded-[20px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:border-[#9C89FF]/30 transition-all overflow-hidden relative group"
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-white font-black text-xs uppercase">Trocar Foto</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl mb-2">📸</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase">Clique para enviar a capa</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Descrição</label>
                  <textarea name="description" defaultValue={editingProduct?.description || ''} className="w-full bg-[#F8F7FF] rounded-[20px] px-6 py-4 outline-none font-bold text-[#4A4A4A] h-24 resize-none text-sm" placeholder="O que este material ensina?"></textarea>
                </div>

                <button type="submit" className="w-full py-5 bg-[#9C89FF] text-white rounded-full font-black text-lg shadow-xl shadow-indigo-100 bubble-button">
                  {editingProduct ? 'Salvar Mudanças' : 'Cadastrar Material'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
