"use client";
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AuthForms from '../../components/account/AuthForms';
import Dashboard from '../../components/account/Dashboard';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sleigh_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sleigh_user');
    setUser(null);
    window.location.reload();
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />
      <section className="py-12">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <AuthForms />
        )}
      </section>
      <Footer />
    </main>
  );
}
