const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:4000';

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'x-actor-type': 'employee',
      'x-actor-id': '9001',
      'x-tenant-id': '1',
      ...(init.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error((data as any)?.message || `HTTP_${res.status}`);
    (err as any).code = (data as any)?.code || `HTTP_${res.status}`;
    throw err;
  }
  return data as T;
}

export type PTenant = { id: number; name: string; type: string; status: string };
export type PStatsOverview = {
  latest: { day: string; metrics: Record<string, number> } | null;
  history: Array<{ day: string; metrics: Record<string, number> }>;
};
export type PPermissionMatrix = {
  roles: Array<{ id: number; key: string; name: string }>;
  permissions: Array<{ id: number; key: string; name: string }>;
  rolePermissions: Array<{ id: number; roleId: number; permissionId: number }>;
};

type TrackPayload = {
  event: string;
  properties?: Record<string, unknown>;
};

export const pApi = {
  tenants: () => request<{ list: PTenant[] }>('/api/p/tenants'),
  stats: () => request<PStatsOverview>('/api/p/stats/overview?limit=7'),
  rebuildStats: () => request<{ ok: boolean; snapshot: any }>('/api/p/stats/rebuild', { method: 'POST', body: JSON.stringify({}) }),
  permissions: () => request<PPermissionMatrix>('/api/p/permissions/matrix'),
};

export function trackEvent(payload: TrackPayload): Promise<{ ok: boolean }> {
  return request<{ ok: boolean }>('/api/track/events', {
    method: 'POST',
    headers: {
      'x-client-source': 'p-web',
      'x-client-path': typeof window === 'undefined' ? '' : window.location.pathname,
    },
    body: JSON.stringify(payload),
  });
}
