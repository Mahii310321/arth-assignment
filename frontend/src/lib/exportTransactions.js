import { apiClient } from "@/lib/apiClient";

export async function downloadTransactionsCsv() {
  const response = await apiClient.get("/api/export/transactions.csv", {
    responseType: "blob"
  });

  const blobUrl = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = "transactions.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
}
