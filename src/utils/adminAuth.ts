export const isAdminAuthorized = (): boolean => {
  return localStorage.getItem('admin_authorized') === 'true';
};

export const setAdminAuthorized = (value: boolean): void => {
  if (value) {
    localStorage.setItem('admin_authorized', 'true');
  } else {
    localStorage.removeItem('admin_authorized');
  }
};

export const setupAdminKeyListener = (callback: () => void): (() => void) => {
  let typedCommand = '';
  
  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    typedCommand = typedCommand + key;
    
    if (typedCommand.endsWith('admin')) {
      setAdminAuthorized(true);
      callback();
      typedCommand = '';
    }
    
    if (typedCommand.length > 20) {
      typedCommand = typedCommand.slice(-20);
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  
  return () => {
    window.removeEventListener('keydown', handleKeyPress);
  };
};
