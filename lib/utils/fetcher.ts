/**
 * Fetcher - Wrapper לפניות HTTP
 */

export class FetchError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        message: string
    ) {
        super(message);
        this.name = "FetchError";
    }
}

/**
 * Fetch wrapper עם error handling
 */
export async function fetcher<T = any>(
    url: string,
    options?: RequestInit
): Promise<T | null> {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText);
            throw new FetchError(
                response.status,
                response.statusText,
                errorText || `Failed to fetch: ${response.status}`
            );
        }

        // If response is empty (204 No Content or 205 Reset Content)
        if (response.status === 204 || response.status === 205) {
            return null;
        }

        const contentType = response.headers.get("content-type");

        // Handle empty response body
        const contentLength = response.headers.get("content-length");
        if (contentLength === "0") {
            return null;
        }

        // Parse JSON
        if (contentType?.includes("application/json")) {
            const text = await response.text();
            if (!text.trim()) {
                return null;
            }
            try {
                return JSON.parse(text);
            } catch (parseError) {
                throw new FetchError(
                    response.status,
                    "Invalid JSON",
                    "Response contains invalid JSON"
                );
            }
        }

        // Handle other content types
        if (contentType?.includes("text/")) {
            return (await response.text()) as T;
        }

        // For binary data or unknown content types, return as blob
        if (contentType?.includes("application/octet-stream") || 
            contentType?.includes("image/") || 
            contentType?.includes("video/") || 
            contentType?.includes("audio/")) {
            return (await response.blob()) as T;
        }

        // Default: try to parse as text
        return (await response.text()) as T;
    } catch (error) {
        if (error instanceof FetchError) {
            throw error;
        }
        throw new Error(
            error instanceof Error ? error.message : "Network error occurred"
        );
    }
}

/**
 * GET request
 */
export async function get<T = any>(url: string): Promise<T | null> {
    return fetcher<T>(url, { method: "GET" });
}

/**
 * POST request
 */
export async function post<T = any>(
    url: string,
    data?: any
): Promise<T | null> {
    return fetcher<T>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * PUT request
 */
export async function put<T = any>(
    url: string,
    data?: any
): Promise<T | null> {
    return fetcher<T>(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * DELETE request
 */
export async function del<T = any>(url: string): Promise<T | null> {
    return fetcher<T>(url, { method: "DELETE" });
}

/**
 * Download file
 */
export async function downloadFile(
    url: string,
    filename: string
): Promise<void> {
    if (typeof window === "undefined" || typeof document === "undefined") {
        throw new Error("downloadFile can only be used in browser environments");
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to download: ${response.statusText}`);
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Download failed"
        );
    }
}
