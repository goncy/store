import Papa from "papaparse";

const CSV_CONTENT_TYPES = ["text/csv", "text/plain"];

/**
 * Fetches a published spreadsheet CSV and parses it with a header row.
 *
 * Throws on a missing URL, a non-2xx response, or a non-CSV content type so
 * that callers inside `"use cache"` never store an error or HTML body as data.
 */
export async function fetchCsv<T>(url: string | undefined, source: string): Promise<T[]> {
  if (!url) {
    throw new Error(`${source}: missing CSV URL`);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${source}: request failed with status ${String(response.status)}`);
  }

  const contentType = response.headers.get("content-type")?.split(";")[0].trim().toLowerCase();

  if (!contentType || !CSV_CONTENT_TYPES.includes(contentType)) {
    throw new Error(`${source}: unexpected content type "${contentType ?? "none"}"`);
  }

  const csv = await response.text();

  return new Promise<T[]>((resolve, reject) => {
    Papa.parse<T>(csv, {
      header: true,
      complete: (results) => resolve(results.data),
      error: (error: Error) => reject(new Error(`${source}: ${error.message}`)),
    });
  });
}
