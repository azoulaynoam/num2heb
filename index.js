function numberToWords(num) {
    if (!Number.isInteger(num)) {
        throw new Error("The input must be an integer.");
    }

    const units = ["", "אחד", "שניים", "שלושה", "ארבעה", "חמישה", "שישה", "שבעה", "שמונה", "תשעה"];
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

    function chunkToWords(chunk) {
        const words = [];
        let addVav = false;
        if (chunk >= 100) {
            words.push(hundreds[Math.floor(chunk / 100)]);
            chunk %= 100;
            addVav = true;
        }
        if (chunk >= 10 && chunk < 20) {
            let t = teens[chunk - 10];
            if (addVav) {
                t = "ו" + t;
                addVav = false;
            }
            words.push(t);
        } else {
            if (chunk >= 20) {
                let t = tens[Math.floor(chunk / 10)];
                if (addVav && chunk % 10 === 0) {
                    t = "ו" + t;
                    addVav = false;
                } else {
                    addVav = true;
                }
                words.push(t);
                chunk %= 10;
            }
            if (chunk > 0) {
                if (addVav) {
                    words.push("ו" + units[chunk]);
                    addVav = false;
                } else {
                    words.push(units[chunk]);
                }
            }
        }
        return words.join(" ");
    }

    function handleSpecialCases(parts) {
        const result = [];
        for (let i = 0; i < parts.length; i++) {
            let text = '';
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
            if (i > 0) {
                text = "ו" + text;
            }
            result.push(text);
        }
        return result;
    }

    const parts = chunkNumber(num);
    const words = handleSpecialCases(parts);
    let result = words.join(" ").trim();

    result = result.replace("אחד מיליון", "מיליון");
    result = result.replace("אחד אלף", "אלף");
    result = result.replace("שניים אלף", "אלפיים");
    result = result.replace("שתיים אלף", "אלפיים");

    return result;
}

module.exports = numberToWords;
