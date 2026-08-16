import { supabase, isSupabaseConfigured, DbProfile } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export interface CustomerProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  tier: 'VIP Atelier' | 'Haute Patron' | 'Member';
  avatarUrl?: string;
}

export async function signUpWithEmail(email: string, password: string, fullName: string): Promise<{ user: User | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) return { user: null, error: error.message };

      if (data.user) {
        // Create profile in profiles table
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          tier: 'VIP Atelier',
        });
      }

      return { user: data.user, error: null };
    } catch (err: any) {
      return { user: null, error: err.message };
    }
  }

  // Fallback demo user simulation
  const mockUser: any = {
    id: 'vip-' + Math.random().toString(36).substring(2, 8),
    email,
    user_metadata: { full_name: fullName },
  };
  localStorage.setItem('dd_demo_user', JSON.stringify({ email, fullName, tier: 'VIP Atelier' }));
  return { user: mockUser, error: null };
}

export async function signInWithEmail(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { user: null, session: null, error: error.message };
      return { user: data.user, session: data.session, error: null };
    } catch (err: any) {
      return { user: null, session: null, error: err.message };
    }
  }

  // Fallback demo user simulation
  const mockUser: any = {
    id: 'vip-client-01',
    email,
    user_metadata: { full_name: email.split('@')[0].toUpperCase() },
  };
  localStorage.setItem('dd_demo_user', JSON.stringify({ email, fullName: email.split('@')[0], tier: 'VIP Atelier' }));
  return { user: mockUser, session: null, error: null };
}

export async function signOutUser(): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error ? error.message : null };
    } catch (err: any) {
      return { error: err.message };
    }
  }

  localStorage.removeItem('dd_demo_user');
  return { error: null };
}

export async function getProfile(userId: string): Promise<CustomerProfile | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          email: data.email,
          fullName: data.full_name || 'VIP Client',
          phone: data.phone || undefined,
          tier: data.tier || 'VIP Atelier',
          avatarUrl: data.avatar_url || undefined,
        };
      }
    } catch (err) {
      // fallback
    }
  }

  try {
    const saved = localStorage.getItem('dd_demo_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        id: userId || 'vip-demo',
        email: parsed.email || 'vip@doozydream.com',
        fullName: parsed.fullName || 'Madame Genevieve',
        tier: parsed.tier || 'VIP Atelier',
      };
    }
  } catch (e) {
    // ignore
  }

  return null;
}
