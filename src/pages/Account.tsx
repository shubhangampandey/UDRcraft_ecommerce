import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut, Store, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: 'Profile', desc: 'Manage your personal information', href: '#' },
    { icon: Package, label: 'Orders', desc: 'Track and manage your orders', href: '/order-tracking' },
    { icon: Heart, label: 'Wishlist', desc: 'View your saved items', href: '/wishlist' },
    { icon: MapPin, label: 'Addresses', desc: 'Manage shipping addresses', href: '#' },
  ];

  if (user?.role === 'vendor') {
    menuItems.push({ icon: Store, label: 'Vendor Dashboard', desc: 'Manage your store and products', href: '/vendor' });
  }
  if (user?.role === 'admin') {
    menuItems.push({ icon: Shield, label: 'Admin Panel', desc: 'Platform management', href: '/admin' });
  }

  return (
    <main className="pt-20 md:pt-24 min-h-screen">
      <div className="luxury-container max-w-3xl mx-auto">
        <div className="text-center py-12 md:py-16">
          <h1 className="luxury-heading">My Account</h1>
          {user && (
            <div className="mt-4">
              <p className="font-body text-sm text-muted-foreground">{user.email}</p>
              <span className="font-body text-xs uppercase tracking-[0.15em] px-3 py-1 bg-secondary inline-block mt-2">{user.role}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map(item => (
            <Link key={item.label} to={item.href}
              className="border border-border p-8 hover:bg-secondary luxury-hover group">
              <item.icon size={20} className="text-muted-foreground group-hover:text-foreground luxury-hover mb-4" />
              <h3 className="font-display text-xl font-light mb-1">{item.label}</h3>
              <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
            </Link>
          ))}
        </div>

        <button onClick={handleLogout}
          className="mt-8 flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground luxury-hover mx-auto">
          <LogOut size={14} /> Sign Out
        </button>

        <div className="py-20" />
      </div>
    </main>
  );
};

export default Account;
