export const stripBase64Prefix = (value: string) =>
  value.replace(/^data:.*;base64,/, "");

export const blobToBase64 = async (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const result = String(reader.result ?? "");
        const base64 = result.includes(",")
          ? result.split(",")[1] ?? ""
          : result;
        resolve(base64 || "");
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read blob"));
    };
    reader.readAsDataURL(blob);
  });
