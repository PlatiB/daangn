import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { initializeApp } from '../store/slices/categorySlice';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 앱 초기화 시 데이터 로딩
    dispatch(initializeApp());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer; 