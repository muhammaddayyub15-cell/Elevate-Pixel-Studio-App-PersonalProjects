// ─────────────────────────────────────────────
// USE FETCH HOOK
// Generic hook untuk data fetching dengan
// loading, error, dan data state management
// ─────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'

// ── Hook ──
// apiFn  : fungsi dari api/*.js
// params : query params opsional
// ─────────────────────────────────────────────
export const useFetch = (apiFn, params = null, deps = []) => {

  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFn(params)
      setData(res.data.data ?? res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }, deps)

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}