function numberToWords(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new Error("The input must be an integer.");
    }

    const feminineUnits = ["", "אחת", "שתיים", "שלוש", "ארבע", "חמש", "שש", "שבע", "שמונה", "תשע"];
    const units = ["", "אחד", "שניים", "שלושה", "ארבעה", "חמישה", "שישה", "שבעה", "שמונה", "תשעה"];
    const feminineBigUnits = ["", "", "שתי", "שלושת", "ארבעת", "חמשת", "ששת", "שבעת", "שמונת", "תשעת"];
    const bigUnits = ["", "", "שני", "שלוש", "ארבע", "חמש", "שש", "שבע", "שמונה", "תשע"];
    const feminineTeens = ["עשר", "אחת עשרה", "שתיים עשרה", "שלוש עשרה", "ארבע עשרה", "חמש עשרה", "שש עשרה", "שבע עשרה", "שמונה עשרה", "תשע עשרה"];
    const teens = ["עשרה", "אחד עשר", "שניים עשר", "שלושה עשר", "ארבעה עשר", "חמישה עשר", "שישה עשר", "שבעה עשר", "שמונה עשר", "תשעה עשר"];
    const tens = ["", "", "עשרים", "שלושים", "ארבעים", "חמישים", "שישים", "שבעים", "שמונים", "תשעים"];
    const hundreds = ["", "מאה", "מאתיים", "שלוש מאות", "ארבע מאות", "חמש מאות", "שש מאות", "שבע מאות", "שמונה מאות", "תשע מאות"];
    const bigNumbers = ["", "אלף", "מיליון", "מיליארד", "טריליון", "קוואדריליון", "קוונטיליון", "סקסטיליון", "ספטיליון", "אוקטיליון", "נוניליון"];

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
        const unts = bigNumbers ? bgu : su;
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
                words.push(tens[Math.floor(chunk / 10)]);
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
        for (let i = 0; i < parts.length; i++) {
            let text = '';
            if (parts[i] === 0 && i > 0) {
                continue;
            }
            const scale = parts.length - i - 1;
            if (scale === 1 && parts[i] === 1) {
                text = bigNumbers[scale];
            } else {
                if (scale > 1) {
                    text = chunkToWords(parts[i], true);
                } else {
                    text = chunkToWords(parts[i]);
                }
            }
            if (scale > 0 && parts[i] > 0) {
                text += " " + bigNumbers[scale];
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
        "שניים אלף": "אלפיים",
    };

    words = words.map(word => specialCases[word] || word);

    return words.join(" ").trim();
}