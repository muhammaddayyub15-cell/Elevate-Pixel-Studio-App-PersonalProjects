// ─────────────────────────────────────────────
// USE AUTH HOOK
// Shortcut untuk mengakses AuthContext
// ─────────────────────────────────────────────

import { useAuthContext } from '../contexts/AuthContext'

export const useAuth = () => useAuthContext()