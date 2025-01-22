function numberToWords(num: number): string {
  if (!Number.isInteger(num)) {
    throw new Error("The input must be an integer.");
  }

  const units = [
    "",
    "אחד",
    "שניים",
    "שלושה",
    "ארבעה",
    "חמישה",
    "שישה",
    "שבעה",
    "שמונה",
    "תשעה",
  ];
  const teens = [
    "עשרה",
    "אחד עשר",
    "שניים עשר",
    "שלושה עשר",
    "ארבעה עשר",
    "חמישה עשר",
    "שישה עשר",
    "שבעה עשר",
    "שמונה עשר",
    "תשעה עשר",
  ];
  const tens = [
    "",
    "",
    "עשרים",
    "שלושים",
    "ארבעים",
    "חמישים",
    "שישים",
    "שבעים",
    "שמונים",
    "תשעים",
  ];
  const hundreds = [
    "",
    "מאה",
    "מאתיים",
    "שלוש מאות",
    "ארבע מאות",
    "חמש מאות",
    "שש מאות",
    "שבע מאות",
    "שמונה מאות",
    "תשע מאות",
  ];
  const bigNumbers = [
    "",
    "אלף",
    "מיליון",
    "מיליארד",
    "טריליון",
    "קוואדריליון",
    "קוונטיליון",
    "סקסטיליון",
    "ספטיליון",
    "אוקטיליון",
    "נוניליון",
  ];

  if (num === 0) {
    return "אפס";
  }

  function chunkNumber(n: number): number[] {
    const parts: number[] = [];
    while (n > 0) {
      parts.push(n % 1000);
      n = Math.floor(n / 1000);
    }
    return parts.reverse();
  }

  function chunkToWords(chunk: number): string {
    const words: string[] = [];
    if (chunk >= 100) {
      words.push(hundreds[Math.floor(chunk / 100)]);
      chunk %= 100;
    }
    if (chunk >= 10 && chunk < 20) {
      words.push(teens[chunk - 10]);
    } else {
      if (chunk >= 20) {
        words.push(tens[Math.floor(chunk / 10)]);
        chunk %= 10;
      }
      if (chunk > 0) {
        if (words.length > 0) {
          words.push("ו" + units[chunk]);
        } else {
          words.push(units[chunk]);
        }
      }
    }
    return words.join(" ");
  }

  function handleSpecialCases(parts: number[]): string[] {
    const result: string[] = [];
    for (let i = 0; i < parts.length; i++) {
      let text = "";
      const part = parts[i];
      if (part === 0) {
        continue;
      }
      const scale = parts.length - i - 1;
      if (scale === 1 && part === 1) {
        text = bigNumbers[scale];
      } else {
        text = chunkToWords(part);
      }
      if (scale > 0 && part > 0) {
        text = text + " " + bigNumbers[scale];
      }
      if (i + 1 === parts.length && parts.length > 1) {
        text = "ו" + text;
      }
      result.push(text);
    }
    return result;
  }

  const parts = chunkNumber(num);
  const words = handleSpecialCases(parts);

  const specialCases: Record<string, string> = {
    "אחד מיליון": "מיליון",
    "אחד אלף": "אלף",
    "שניים אלף": "אלפיים",
    "שלושה אלף": "שלושת אלפים",
    "ארבעה אלף": "ארבעת אלפים",
    "חמישה אלף": "חמשת אלפים",
    "שישה אלף": "ששת אלפים",
    "שבעה אלף": "שבעת אלפים",
    "שמונה אלף": "שמונת אלפים",
    "תשעה אלף": "תשעת אלפים",
    "שניים מליון": "שני מיליון",
  };

  for (let i = 0; i < words.length; i++) {
    if (specialCases[words[i]]) {
      words[i] = specialCases[words[i]];
    }
  }

  return words.join(" ").trim();
}

export default numberToWords;
