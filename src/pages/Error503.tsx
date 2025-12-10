const Error503 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" 
         style={{
           background: 'radial-gradient(circle at 0% 0%, #d529ff22 0, #05050a 45%), radial-gradient(circle at 100% 100%, #5b6cff33 0, #05050a 55%), #05050a'
         }}>
      <div className="relative max-w-[420px] w-full p-8 pb-6 rounded-3xl overflow-hidden"
           style={{
             background: 'rgba(5, 5, 15, 0.9)',
             border: '1px solid rgba(213, 41, 255, 0.25)',
             boxShadow: '0 0 40px rgba(213, 41, 255, 0.25), 0 0 80px rgba(91, 108, 255, 0.35)'
           }}>
        
        <div className="absolute inset-[-40%] opacity-30 pointer-events-none"
             style={{
               background: 'radial-gradient(circle at 0 0, rgba(213, 41, 255, 0.3), transparent 55%)'
             }} />

        <div className="relative z-10">
          <div className="relative w-[72px] h-[72px] rounded-full p-[2px] mb-5"
               style={{
                 background: 'conic-gradient(from 220deg, #d529ff, #5b6cff, #d529ff)'
               }}>
            <div className="w-full h-full rounded-full flex items-center justify-center text-[22px] font-bold tracking-wider"
                 style={{
                   background: '#05050a',
                   fontFamily: '"Montserrat", system-ui, sans-serif'
                 }}>
              <span style={{ color: '#d529ff' }}>D</span>
              <span style={{ color: '#f5f5f7' }}>F</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider mb-3.5"
               style={{
                 background: 'rgba(10, 10, 20, 0.9)',
                 border: '1px solid rgba(245, 245, 247, 0.16)',
                 color: '#b3b3c6'
               }}>
            <div className="w-2 h-2 rounded-full"
                 style={{
                   background: 'radial-gradient(circle, #ffb347, #ff4d4d)',
                   boxShadow: '0 0 10px #ff4d4d'
                 }} />
            Сервис недоступен
          </div>

          <div className="text-[13px] uppercase tracking-wider mb-1.5"
               style={{ color: '#8b8ba3' }}>
            Код ошибки
          </div>

          <h1 className="text-6xl font-bold mb-2 tracking-tight"
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #d529ff 0%, #5b6cff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            503
          </h1>

          <p className="text-xl mb-6" style={{ color: '#f5f5f7' }}>
            Сервис временно недоступен
          </p>

          <p className="text-sm leading-relaxed mb-6"
             style={{ color: '#b3b3c6' }}>
            Сервер временно не может обработать ваш запрос из-за технического обслуживания 
            или перегрузки. Пожалуйста, попробуйте позже.
          </p>

          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #d529ff 0%, #5b6cff 100%)',
              color: '#ffffff',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(213, 41, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Вернуться на главную
          </a>

          <div className="mt-6 pt-4 text-center text-xs"
               style={{
                 borderTop: '1px solid rgba(245, 245, 247, 0.1)',
                 color: '#6b6b7f'
               }}>
            Dilman FLOW™ • 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error503;