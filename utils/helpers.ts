export const emailRegExp = (email: string): boolean => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const isNullorUndefined = (value: unknown): boolean => {
    return value === null || value === undefined;
}

export const isObject = (obj: unknown): boolean => {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}

type SetTimeoutType = ReturnType<typeof setTimeout>
type Fn<T = void> = (...args: any[]) => T;
export const getDebounce = () => {
    let timer: SetTimeoutType;
    return (fn: Fn, d: number) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, d);
    }
}

type Base64ToBlob = (rawBase64: string) => Promise<Blob>
export const base64ToBlob: Base64ToBlob = async (rawBase64) => {
    const base64 = await fetch(rawBase64);
    const blob = await base64.blob();
    return blob
}

// export const getDataURLFromFile = async (file, setter, state, key) => {
//     if (!file) return
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//     };
// }

export const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize),
            byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
};


