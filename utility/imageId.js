import crypto from "crypto"
export function generateFilename(originalname, ip) {
    const ext = originalname.split('.').pop();
    const fname = originalname;
    const hash = crypto.createHash('md5').update(fname + ip).digest('hex');
    const maxHashLength = 36 - ext.length;
    const truncatedHash = hash.substring(0, maxHashLength);
    const combined = truncatedHash + '.' + ext;

    return combined;
}