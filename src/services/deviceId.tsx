export const getDeviceId = () => {
    let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    if (window.crypto && window.crypto.randomUUID) {
      deviceId = window.crypto.randomUUID();
    } else {
      // Fallback for older browsers
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);

      // RFC 4122 v4
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;

      deviceId = [...bytes].map((b, i) =>
        (i === 4 || i === 6 || i === 8 || i === 10 ? "-" : "") +
        b.toString(16).padStart(2, "0")
      ).join("");
    }

    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}