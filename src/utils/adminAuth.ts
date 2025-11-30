export const isAdminAuthorized = (): boolean => {
  return localStorage.getItem('admin_authorized') === 'true';
};

export const isAdminLiteAuthorized = (): boolean => {
  return localStorage.getItem('admin_lite_authorized') === 'true';
};

export const setAdminAuthorized = (value: boolean): void => {
  if (value) {
    localStorage.setItem('admin_authorized', 'true');
  } else {
    localStorage.removeItem('admin_authorized');
  }
  
  window.dispatchEvent(new CustomEvent('adminAuthChanged', { detail: { authorized: value } }));
};

export const setAdminLiteAuthorized = (value: boolean): void => {
  if (value) {
    localStorage.setItem('admin_lite_authorized', 'true');
  } else {
    localStorage.removeItem('admin_lite_authorized');
  }
  
  window.dispatchEvent(new CustomEvent('adminLiteAuthChanged', { detail: { authorized: value } }));
};

export const setupAdminKeyListener = (callback: () => void): (() => void) => {
  let typedCommand = '';
  
  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    typedCommand = typedCommand + key;
    
    if (typedCommand.endsWith('master')) {
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

export const setupAdminLiteKeyListener = (callback: () => void): (() => void) => {
  let typedCommand = '';
  
  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    typedCommand = typedCommand + key;
    
    if (typedCommand.endsWith('admin')) {
      setAdminLiteAuthorized(true);
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