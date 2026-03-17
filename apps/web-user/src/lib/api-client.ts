import type { ApiResponse, ApiError } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const isMockEnabled =
  process.env.NEXT_PUBLIC_USE_MOCK !== "false";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const res = await fetch(url.toString());
    if (!res.ok) {
      const body = (await res.json()) as ApiError;
      throw new Error(body.error.message);
    }
    const json = (await res.json()) as ApiResponse<T>;
    return json.data;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(new URL(path, this.baseUrl).toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const json = (await res.json()) as ApiError;
      throw new Error(json.error.message);
    }
    const json = (await res.json()) as ApiResponse<T>;
    return json.data;
  }
}

export const apiClient = new ApiClient(BASE_URL);
