function numberToWords(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new Error("The input must be an integer.");
    }

    const feminineUnits = ["", "אחת", "שתיים", "שלוש", "ארבע", "חמש", "שש", "שבע", "שמונה", "תשע"];
    const units = ["", "אחד", "שניים", "שלושה", "ארבעה", "חמישה", "שישה", "שבעה", "שמונה", "תשעה"];
    const feminineBigUnits = ["", "אחת", "שתי", "שלושת", "ארבעת", "חמשת", "ששת", "שבעת", "שמונת", "תשעת"];
    const bigUnits = ["", "אחד", "שני", "שלוש", "ארבע", "חמש", "שש", "שבע", "שמונה", "תשע"];
    const feminineTeens = ["עשרת", "אחת עשרה", "שתיים עשרה", "שלוש עשרה", "ארבע עשרה", "חמש עשרה", "שש עשרה", "שבע עשרה", "שמונה עשרה", "תשע עשרה"];
    const teens = ["עשרה", "אחד עשר", "שניים עשר", "שלושה עשר", "ארבעה עשר", "חמישה עשר", "שישה עשר", "שבעה עשר", "שמונה עשר", "תשעה עשר"];
    const tens = ["", "", "עשרים", "שלושים", "ארבעים", "חמישים", "שישים", "שבעים", "שמונים", "תשעים"];
    const hundreds = ["", "מאה", "מאתיים", "שלוש מאות", "ארבע מאות", "חמש מאות", "שש מאות", "שבע מאות", "שמונה מאות", "תשע מאות"];
    const bigNumbers = ["", "אלף", "מיליון", "מיליארד", "טריליון"];
    const bigNumbersMany = ["", "אלפים"];

    if (num === 0) {
        return "אפס";
    }

    function chunkNumber(n) {
        const parts = [];
        while (n > 0) {
            parts.push(n % 1000);
            n = Math.floor(n / 1000);
        }
        return parts.reverse();
    }

    function chunkToWords(chunk, bigNumbers = false, feminine = false) {
        const words = [];
        const su = feminine ? feminineUnits : units;
        const bgu = feminine ? feminineBigUnits : bigUnits;
        const unts = bigNumbers && chunk < 10 ? bgu : su;
        const tns = feminine ? feminineTeens : teens;
        let addVe = false;

        if (chunk >= 100) {
            words.push(hundreds[Math.floor(chunk / 100)]);
            chunk %= 100;
            addVe = true;
        }
        if (chunk >= 10 && chunk < 20) {
            let t = tns[chunk - 10];
            if (addVe) {
                t = "ו" + t;
            }
            words.push(t);
        } else {
            if (chunk >= 20) {
                let t = tens[Math.floor(chunk / 10)];
                words.push(t);
                chunk %= 10;
            }
            if (chunk > 0) {
                if (words.length > 0) {
                    words.push(`ו${unts[chunk]}`);
                } else {
                    words.push(unts[chunk]);
                }
            }
        }

        return words.join(" ");
    }

    function handleSpecialCases(parts) {
        const result = [];
        const cleanParts = [];

        // Create clean parts array (remove trailing zeros)
        for (let part of [...parts].reverse()) {
            if (part === 0 && cleanParts.length === 0) {
                continue;
            }
            cleanParts.push(part);
        }

        for (let i = 0; i < parts.length; i++) {
            let text = '';
            if (parts[i] === 0 && i > 0) {
                continue;
            }
            const scale = parts.length - i - 1;
            if (scale === 1 && parts[i] === 1) {
                text = bigNumbers[scale];  // "אלף"
            } else {
                if (!(cleanParts.length === 1 && parts[i] === 1 && parts.length > 1)) {
                    text = chunkToWords(parts[i], (scale > 0), (scale === 1));
                }
                if (scale > 0 && parts[i] > 0) {
                    if (scale === 1 && parts.length === 2 && parts[i] <= 10) {
                        text += " " + bigNumbersMany[scale];
                    } else {
                        text += " " + bigNumbers[scale];
                    }
                }
            }
            if (i + 1 === (parts.length - 1 && parts[parts.length - 1] === 0 ? parts.length - 1 : parts.length) && parts.length > 1) {
                text = "ו" + text;
            }
            result.push(text);
        }
        return result;
    }

    const parts = chunkNumber(num);
    let words = handleSpecialCases(parts);

    const specialCases = {
        "שתי אלפים": "אלפיים",
    };

    words = words.map(word => specialCases[word] || word);

    return words.join(" ").trim();
}